import jaeger from 'jaeger-client';
import ddTrace from 'dd-trace';
import { Logger } from '@nestjs/common';
import * as opentracing from 'opentracing';

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
    const tracer = jaeger.initTracerFromEnv(config, options);
    opentracing.initGlobalTracer(tracer);
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
    const tracer = ddTrace.init({
        service: serviceName,
        logger: {
            debug: message => Logger.debug(message),
            info: message => Logger.log(message),
            warn: message => Logger.warn(message),
            error: err => Logger.error(err.toString()),
        },
    });
    opentracing.initGlobalTracer(tracer);
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

/**
 * Taken from 'express-opentracing' which appears to no longer be maintained and has incorrectly updated itself for ESM libraries.
 */
const middleware = (options: any = {}) => {
    const tracer = options.tracer || opentracing.globalTracer();

    return (req, res, next) => {
        const wireCtx = tracer.extract(opentracing.FORMAT_HTTP_HEADERS, req.headers);
        const url = new URL(req.url, `http://${req.headers.host as string}`);
        const pathname = url.pathname;
        const span = tracer.startSpan(req.url, {childOf: wireCtx});
        span.logEvent('request_received');

        // include some useful tags on the trace
        span.setTag('http.method', req.method);
        span.setTag('span.kind', 'server');
        span.setTag('http.url', req.url);

        // include trace ID in headers so that we can debug slow requests we see in
        // the browser by looking up the trace ID found in response headers
        const responseHeaders = {};
        tracer.inject(span, opentracing.FORMAT_TEXT_MAP, responseHeaders);
        Object.keys(responseHeaders).forEach(key => res.setHeader(key, responseHeaders[key]));

        // add the span to the request object for handlers to use
        Object.assign(req, {span});

        // finalize the span when the response is completed
        const finishSpan = () => {
            span.logEvent('request_finished');
            // Route matching often happens after the middleware is run. Try changing the operation name
            // to the route matcher.
            const opName = (req.route && req.route.path) || pathname;
            span.setOperationName(opName);
            span.setTag('http.status_code', res.statusCode);
            if (res.statusCode >= 500) {
                span.setTag('error', true);
                span.setTag('sampling.priority', 1);
            }
            span.finish();
        };
        res.on('close', finishSpan);
        res.on('finish', finishSpan);

        next();
    };
};
