import { Logger } from './logger';
import { RequestContext } from './http-context/request.context';
import { startChild } from './tracer';

export function PeformanceTracker(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
        Logger.log(`started ${propertyKey}`);
        const parentSpan = RequestContext.getSpan();
        const childSpan = startChild({ span: parentSpan }, propertyKey).span;
        RequestContext.setSpan(childSpan);
        try {
            return await originalMethod.apply(this, args);
        } catch (e) {
            Logger.log(`catch ${propertyKey}`);
            childSpan.addTags({error: true, message: e.message});
            throw e;
        } finally {
            Logger.log(`finally ${propertyKey}`);
            childSpan.finish();
            RequestContext.setSpan(parentSpan);
        }
    };
}
