import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cls from 'cls-hooked';
import { RequestContext } from './request.context';

/**
 * The middleware for setting request context related information.
 */
@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const requestContext = new RequestContext(req);
        const session = cls.getNamespace(RequestContext.NSID) || cls.createNamespace(RequestContext.NSID);

        session.run(async () => {
            session.set(RequestContext.name, requestContext);
            next();
        });
    }
}
