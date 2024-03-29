import * as cls from 'cls-hooked';
import { ProtocolException } from '../protocol.exception.js';
import { ProtocolErrorCode } from '../protocol.errorcode.js';
import { HttpConstants } from './http.constants.js';
import { globalTracer, Span, FORMAT_HTTP_HEADERS } from 'opentracing';

/**
 * The Request context for setting http request context related information like request id.
 */
export class RequestContext {
    public static NSID = '93198722-71ef-4a43-8ced-03c112636a8d';
    private requestId: string;
    private span: Span;

    constructor(req) {
        this.requestId = req.headers[HttpConstants.REQUEST_ID_HEADER];
        this.span = req.span;
    }

    /**
     * Returns the request id belonging to the current request.
     */
    public static requestId(throwError?: boolean): string {
        const requestContext = RequestContext.currentRequestContext();

        if (requestContext) {
            const reqid: any = requestContext.requestId;
            if (reqid) {
                return reqid;
            }
        }

        if (throwError) {
            throw new ProtocolException(ProtocolErrorCode.MISSING_REQUEST_ID, 'Missing request id.');
        }

        return null;
    }

    /**
     * Returns the current request context.
     */
    private static currentRequestContext(): RequestContext {
        const session = cls.getNamespace(RequestContext.NSID);
        if (session && session.active) {
            return session.get(RequestContext.name);
        }

        return null;
    }

    /**
     * Injects request id and span id headers for outbound http requests
     *
     * @param headers is a carrier header object that is updated and returned (for composibility)
     */
    public static withTraceHeaders(headers: any) {
        const requestContext = RequestContext.currentRequestContext();
        if (!requestContext) {
            return headers;
        }

        headers[HttpConstants.REQUEST_ID_HEADER] = requestContext.requestId || null;

        const sp = requestContext.span;
        if (sp != null) {
          globalTracer().inject(sp, FORMAT_HTTP_HEADERS, headers);
        }

        return headers;
    }

    /**
     * Gets span off the current context
     */
    public static getSpan() {
        const requestContext = RequestContext.currentRequestContext();
        if (!requestContext || !requestContext.span) {
            throw new ProtocolException(ProtocolErrorCode.MISSING_SPAN, 'Missing span on request context');
        }
        return requestContext.span;
    }

    /**
     * Sets the most recent child span onto the request context
     */
    public static setSpan(span) {
        const session = cls.getNamespace(RequestContext.NSID);
        if (!session || !session.active) {
            throw new ProtocolException(ProtocolErrorCode.MISSING_SPAN, 'Missing span on request context');
        }
        const requestContext =  session.get(RequestContext.name);
        if (!requestContext || !requestContext.span) {
            throw new ProtocolException(ProtocolErrorCode.MISSING_SPAN, 'Missing span on request context');
        }
        requestContext.span = span;
        session.set(RequestContext.name, requestContext);
    }
}
