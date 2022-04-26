import { LoggerService, Logger as NestLogger } from '@nestjs/common';
import { inspect } from 'util';
import { HttpConstants } from './http-context/http.constants.js';
import { RequestContext } from './http-context/request.context.js';

/**
 * The default nestjs logger doesn't call the underlying logger transport properly when called statically, so this is my light-weight implementation
 */
let logger: any = NestLogger;
export class Logger implements LoggerService {

    constructor(instanceLogger?: any) {
        logger = instanceLogger || NestLogger;
    }

    public static debug(message: string, metadata?: any) {
        // only allow logging if the env variable is not undefined, null, empty string
        if (process.env.DEBUG_ENABLED == null || process.env.DEBUG_ENABLED === '')
            return;

        logger.log(Logger.formatMessage('debug', message, metadata));
    }

    public static log(message: string, metadata?: any) {
        logger.log(Logger.formatMessage('info', message, metadata));
    }

    public static error(message: string, metadata?: any) {
        logger.log(Logger.formatMessage('error', message, metadata));
    }

    public static warn(message: string, metadata?: any) {
        logger.log(Logger.formatMessage('warn', message, metadata));
    }

    public static info(message: string, metadata?: any) {
        logger.log(Logger.formatMessage('info', message, metadata));
    }

    log(message: string, context?: string): any {
        Logger.log(message, context);
    }

    error(message: string, trace?: string, context?: string): any {
        Logger.error(message, { trace, context });
    }

    warn(message: string, context?: string): any {
        Logger.warn(message, context);
    }

    public static formatMessage(level: string, message: string, metadata: any): any {
        // Ensure message is always a string
        message = message || '';
        if (typeof message === 'object') {
            message = inspect(message);
        }
        // Let's not blow up our logs with super long messages
        const maxLogLength = parseInt(process.env.MAX_LOG_LENGTH, 10);
        if (message.length > maxLogLength) {
            message = message.substr(0, maxLogLength) + '...truncated';
        }
        // Ensure metadata is always an object

        return {
            level,
            message,
            env: process.env.NODE_ENV,
            pid: process.pid,
            [HttpConstants.REQUEST_ID]: RequestContext.requestId(false),
            metadata,
        };
    }
}
