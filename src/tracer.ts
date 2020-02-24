import { globalTracer, initGlobalTracer } from 'opentracing';
import middleware from 'express-opentracing';
import { initTracerFromEnv } from 'jaeger-client';
import { tracer as ddtracer } from 'dd-trace';
import { Logger } from '../common/logger';

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
export function initJaegerTracer(serviceName: string) {
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
        info(msg) {
          Logger.log(msg);
        },
        error(msg) {
          Logger.error(msg);
        },
      },
    };
    const tracer = initTracerFromEnv(config, options);
    initGlobalTracer(tracer);
    return tracer;
}

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
export function initDatadogTracer(serviceName: string) {
    const tracer = ddtracer.init({
        service: serviceName,
        logger: {
            debug: message => Logger.log(message),
            error: err => Logger.error(err.toString()),
        },
    });
    initGlobalTracer(tracer);
    return tracer;
}

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
export function initTracer(serviceName: string) {
    switch ((process.env.TRACER || '').toLowerCase()) {
        case 'jaeger' || '': // default to jaeger
            return initJaegerTracer(serviceName);
        case 'datadog':
            return initDatadogTracer(serviceName);
        default:
            return null;
    }
}

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
export function traceware(serviceName: string) {

    /** The healthz path */
    const HEALTHZ_PATH = '/healthz';

    const tracer = this.initTracer(serviceName);

    return (req, res, next) => {
        // exclude readiness/liveness checks on '/healthz'
        if (req.path === HEALTHZ_PATH) {
          return next();
        }
        // trace calls
        middleware({tracer})(req, res, next);
      };
}

export function context(req: any) {
  let sp = req.span;
  if (sp == null) {
    sp = globalTracer().startSpan('null-span');
  }
  return { span: sp };
}

export function startChild(ctx: any, name: string) {
  if (ctx.hasOwnProperty('span')) {
    return { span: globalTracer().startSpan(name, { childOf: ctx.span }) };
  }
  return { span: globalTracer().startSpan(name) };
}