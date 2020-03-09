import * as winston from 'winston';
import { inspect } from 'util';
import { Constants } from './constants';

export class DatadogLogger {
    static getLogger() {
        const transports = [];

        // keep formatting the same for local
        if ([Constants.LOCAL].some((env) => env === process.env.NODE_ENV)) {
            const consoleFormat = winston.format.combine(
                winston.format.colorize({all: true}),
                winston.format.timestamp({format: 'MM-DD HH:mm:ss.SSS'}),
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
        }

        // Use Json for DataDog in non local environments
        if ([Constants.DEV, Constants.SAND, Constants.PROD].some((env) => env === process.env.NODE_ENV)) {
            const jsonFormat = winston.format.combine(
                winston.format.colorize({all: true}),
                winston.format.timestamp({format: 'MM-DD HH:mm:ss.SSS'}),
                winston.format.align(),
                winston.format.printf((info) => {
                    let logMessage = info.message;
                    if (info.metadata) {
                        logMessage = info.message + ' - ' + inspect(info.metadata);
                    }
                    const asObject = { level: info.level, PID: process.pid, timeStamp: info.timestamp, message: logMessage};
                    return `${JSON.stringify(asObject)}`;
                }),
            );
            const logConsole = new winston.transports.Console ({
                level: 'debug',
                handleExceptions: true,
                format: jsonFormat,
            });
            transports.push(logConsole);
        }
        return winston.createLogger({transports});
    }
}
