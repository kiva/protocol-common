import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { startChild, context as spanContext } from './tracer';
import { Logger } from './logger';

/**
 * This interceptor adds a span to every endpoint and handles recording errors and closing the span when done
 */
@Injectable()
export class SpanInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const req = context.switchToHttp().getRequest();
        // Format the endpoint has an underscored label for tracking the span
        const label = req.method.toLowerCase() + req.url.replace('/', '_');
        Logger.log(`SpanInterceptor - ${label}`);
        let ctx;
        // TODO: replace with code that finds parent
        ctx = startChild(spanContext(req), label);
        return next.handle().pipe(
            catchError(async (err) => {
                Logger.log(`catchError - ${label}`);
                ctx.span.addTags({error: true, message: err.message});
                // We need to rethrow the error so it can get handled by the ExceptionFilter
                throw err;
            }),
            finalize(async () => {
                Logger.log(`finalize - ${label}`);
                ctx.span.finish();
            }),
        );
    }
}
