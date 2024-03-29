import { globalTracer } from 'opentracing';
import { RequestContext } from './http/request.context.js';

const startChild = (ctx: any, name: string) => {
    if (ctx.hasOwnProperty('span')) {
        return { span: globalTracer().startSpan(name, { childOf: ctx.span }) };
    }
    return { span: globalTracer().startSpan(name) };
};

/**
 * A function decorator used to adding traceability of the function for reporting in sites like
 * Datadog.
 *
 * @uses
 * ```
 * @Trace
 * public myFunction() {}
 * ```
 */
export const Trace = (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
        const parentSpan = RequestContext.getSpan();
        const childSpan = startChild({ span: parentSpan }, propertyKey).span;
        RequestContext.setSpan(childSpan);
        try {
            return await originalMethod.apply(this, args);
        } catch (e) {
            childSpan.addTags({error: true, message: e.message});
            throw e;
        } finally {
            childSpan.finish();
            RequestContext.setSpan(parentSpan);
        }
    };
};
