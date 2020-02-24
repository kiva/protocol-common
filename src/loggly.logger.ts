import * as winston from 'winston';
import { Loggly } from 'winston-loggly-bulk';
import { inspect } from 'util';
import { Constants } from './constants';

export class LogglyLogger {

    static getLogger() {
        const transports = [];

        const consoleFormat = winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.timestamp({ format: 'MM-DD HH:mm:ss.SSS' }),
            winston.format.align(),
            winston.format.printf((info) => {
                let logMessage = info.message;
                if (info.metadata) {
                    logMessage = info.message + ' - ' + inspect(info.metadata);
                }
                return `[${info.level}] ${process.pid}   - ${info.timestamp} : ${logMessage}`;
            }),
        );
        const logConsole = new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            format: consoleFormat,
        });
        transports.push(logConsole);

        // Use Loggly in non local environments
        if ([Constants.DEV, Constants.SAND, Constants.PROD].some((env) => env === process.env.NODE_ENV)) {
            if (process.env.LOGGLY_SUBDOMAIN && process.env.LOGGLY_TOKEN) {
                const loggly = new Loggly({
                    subdomain: process.env.LOGGLY_SUBDOMAIN,
                    token: process.env.LOGGLY_TOKEN,
                    tags: [process.env.SERVICE_NAME, process.env.NODE_ENV],
                    level: process.env.LOGGLY_LEVEL || 'info',
                    json: true,
                });
                transports.push(loggly);
            }
        }
        return winston.createLogger({transports});
    }
}