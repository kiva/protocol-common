import { HttpService } from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ProtocolException } from './protocol.exception';
import { ProtocolErrorCode } from './protocol.errorcode';
import { Observable } from 'rxjs';
import { RequestContext } from './http-context/request.context';
import { Logger } from './logger';

/**
 * This is a wrapper around the default nestjs http service which handles retry logic and error handling
 * All http calls should go through here and not through http service directly
 */
export class ProtocolHttpService {

    private retryCount: number;
    private exponentialDelay: number;

    constructor(private readonly http: HttpService) {
        this.retryCount = parseInt(process.env.RESTFUL_CLIENT_RETRY, 10) || 5;
        this.exponentialDelay = parseInt(process.env.RESTFUL_CLIENT_DELAY, 10) || 250;
    }

    public async requestWithRetry(config: AxiosRequestConfig, retryCount?: number, exponentialDelay?: number): Promise<any> {
        retryCount = retryCount || this.retryCount;
        exponentialDelay = exponentialDelay || this.exponentialDelay;

        // Always add trace headers
        config.headers = RequestContext.withTraceHeaders(config.headers || {});

        if (retryCount <= 0) {
            return await this.http.request(config).toPromise();
        }
        return await this.httpWithRetry(this.http.request(config), retryCount, exponentialDelay);
    }

    /**
     * This retries the http request if the service is down with an increasing back-off
     */
    public async httpWithRetry(observable: Observable<AxiosResponse<any>>, times: number, delay: number): Promise<any> {
        return new Promise((resolve, reject) => {
            let error;
            const attempt = () => {
                if (times === 0) {
                    // If the service still isn't up, throw a custom error
                    const details = {
                        code: error.code,
                        url: error.config.url,
                        method: error.config.method,
                    };
                    reject(new ProtocolException(ProtocolErrorCode.INTERNAL_SERVER_ERROR, error.message, details, 500));
                    return;
                }
                return observable.toPromise().then(resolve)
                .catch((e) => {
                    switch (e.code) {
                        case 'ENOTFOUND':
                        case 'ECONNREFUSED':
                            Logger.warn(`Retying on ErrorCode: ${e.code}`);
                            times--;
                            error = e;
                            setTimeout(() => {
                                attempt();
                            }, delay);
                            // Increase the delay
                            delay = delay * 2;
                            break;
                        default:
                            // Handle regular http errors
                            if (e.response && e.response.data && e.response.data.code && (e.response.data.message !== undefined)) {
                                // This is a well formatted micro service exception that we need to bubble up
                                const data = e.response.data;
                                reject(new ProtocolException(data.code, data.message, data.details, e.response.status));
                            } else {
                                // This is an unexpected micro service error, we hard code to internal server error with a 500 code
                                const message = this.getMessage(e);
                                const details = this.getDetails(e);
                                reject(new ProtocolException(ProtocolErrorCode.INTERNAL_SERVER_ERROR, message, details, 500));
                            }
                            break;
                    }
                });
            };
            return attempt();
        });
    }

    /**
     * Depending on the type of exception the message can be in a lot of different places
     */
    private getMessage(e: any): string {
        if (e.response && e.response.data && e.response.data.message) {
            return e.response.data.message;
        }
        if (e.response && e.response.message) {
            return e.response.message;
        }
        if (e.message) {
            return e.message;
        }
        return 'Unexpected message';
    }

    /**
     * Depending on the type of exception the details can be in a lot of different places
     */
    private getDetails(e: any): any {
        if (e.response && e.response.data) {
            return e.response.data;
        }
        if (e.stack) {
            return e.stack;
        }
        return e;
    }
}
