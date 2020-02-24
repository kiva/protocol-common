import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from './logger';
import { HttpConstants } from './http-context/http.constants';

/**
 * Logs the request access information.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor() {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        Logger.log(`${req.method} ${req.url} ${req.headers[HttpConstants.REQUEST_ID_HEADER]}`);
        return next.handle();
    }
}