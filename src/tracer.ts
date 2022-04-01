import { initGlobalTracer } from 'opentracing';
import { initTracerFromEnv } from 'jaeger-client';
import { tracer as ddtracer } from 'dd-trace';
import middleware from 'express-opentracing';
import { Logger } from './logger';

/**
 * tracer
 *
 * This module contains functions to initialize the OpenTracing global tracer
 * and wrap HTTP server handlers with middleware that reports spans to an
 * OpenTracing collector.
 */

/**
 * initJaegerTracer
 *
 * This function will set all OpenTracing spans to go to a Jaeger collector
 * endpoint configured by JAEGER_ENDPOINT.
 *
 * @param serviceName is the name of the microservice as it will appear in
 * the Jaeger interface.
 *
 * Callers should use initTracer instead to allow for different OpenTracing
 * vendors to be used.
 */
const initJaegerTracer = (serviceName: string) => {
    const config = {
        serviceName,
        sampler: {
            type: 'const',
            param: 1,
        },
        reporter: {
            logSpans: true,
        },
    };
    const options = {
        logger: {
            info: (msg: string) => {
                Logger.log(msg);
            },
            error: (msg: string) => {
                Logger.error(msg);
            },
        },
    };
    const tracer = initTracerFromEnv(config, options);
    initGlobalTracer(tracer);
    return tracer;
};

/**
 * initDatadogTracer
 *
 * This function will set all OpenTracing spans to go to a Datadog collector
 * endpoint.
 *
 * @param serviceName is the name of the microservice as it will appear in
 * the Datadog interface.
 *
 * Callers should use initTracer instead to allow for different OpenTracing
 * vendors to be used.
 */
const initDatadogTracer = (serviceName: string) => {
    const tracer = ddtracer.init({
        service: serviceName,
        logger: {
            debug: message => Logger.log(message),
            info: message => Logger.info(message),
            warn: message => Logger.warn(message),
            error: err => Logger.error(err.toString()),
        },
    });
    initGlobalTracer(tracer);
    return tracer;
};

/**
 * initTracer
 *
 * This function will set all OpenTracing spans to go to the tracer configured
 * by the TRACER environment variable.
 *
 * TRACER=jaeger  # traces will go to a Jaeger collector
 * TRACER=datadog # traces will go to a Jaeger collector
 *
 * @param serviceName is the name of the microservice as it will appear in
 * the OpenTracing vendor interface.
 *
 * Callers should consider using the traceware middleware instead which will
 * call initTracer.
 */
export const initTracer = (serviceName: string) => {
    switch ((process.env.TRACER || '').toLowerCase()) {
        case 'jaeger' || '': // default to jaeger
            return initJaegerTracer(serviceName);
        case 'datadog':
            return initDatadogTracer(serviceName);
        default:
            Logger.warn('initTracer() called without environment setup for tracing');
            return null;
    }
};

/**
 * traceware
 *
 * This function will return a NestJS HTTP middleware which will dynamically
 * create spans for every request that passes through it, and attach relevant
 * HTTP details such as path, User-Agent, etc.
 *
 * It will not report spans for the healthcheck endpoint /healthz as this would
 * be excessive.
 *
 * It will also set all OpenTracing spans to go to the tracer configured by the
 * TRACER environment variable.
 *
 * TRACER=jaeger  # traces will go to a Jaeger collector
 * TRACER=datadog # traces will go to a Jaeger collector
 *
 * @param serviceName is the name of the microservice as it will appear in
 * the OpenTracing vendor interface.
 */
export const traceware = (serviceName: string) => {

    /** The healthz path */
    const HEALTHZ_PATH = '/healthz';

    const tracer = initTracer(serviceName);

    return (req, res, next) => {
        // exclude readiness/liveness checks on '/healthz'
        if (req.path === HEALTHZ_PATH) {
          return next();
        }
        // trace calls
        middleware({tracer})(req, res, next);
      };
};
