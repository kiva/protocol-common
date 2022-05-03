import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Logger } from './logger.js';
import { HttpConstants } from './http/http.constants.js';
import { Reflector } from '@nestjs/core';

/**
 * Logs the request access information.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    constructor(@Inject(Reflector.name) private reflector: Reflector) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        const autoLoggingDisabled: boolean = this.reflector.getAllAndOverride<boolean | undefined>(
            'autoLoggingDisabled',
            [context.getHandler(), context.getClass()]
        ) || false;
        if (!autoLoggingDisabled) {
            const req = context.switchToHttp().getRequest();
            Logger.log(`${req.method as string} ${req.url as string} ${req.headers[HttpConstants.REQUEST_ID_HEADER] as string}`);
        }
        return next.handle();
    }
}
