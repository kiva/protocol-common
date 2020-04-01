import { Logger } from './logger';
import { RequestContext } from './http-context/request.context';
import { startChild } from './tracer';

export function SubSpan(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args: any[]) {
        Logger.log(`started ${propertyKey}`);
        const request = RequestContext.currentRequestContext();
        const ctx = startChild((request ? request.getSpan() : undefined), propertyKey);
        try {
            return await originalMethod.apply(this, args);
        } catch (e) {
            Logger.log('catch');
            ctx.span.addTags({error: true, message: e.message});
            throw e;
        } finally {
            Logger.log('finally');
            ctx.span.finish();
        }
    };
}
