import * as winston from 'winston';
import { inspect } from 'util';
import { Constants } from './constants';

export class DatadogLogger {
    static getLogger() {
        const transports = [];
        // different environments format the output to stdout, stderr differently
        let formatter;
        switch (process.env.NODE_ENV) {
            case Constants.LOCAL:
                formatter = DatadogLogger.getConsoleFormatter();
                break;
            case Constants.DEV:
            case Constants.PROD:
            case Constants.SAND:
            case Constants.QA:
            default:
                formatter = winston.format.json();
        }

        // all output goes to stdout, so the same transport can be used
        const consoleTransport  = new winston.transports.Console ({
            level: 'debug',
            handleExceptions: true,
            format: formatter,
        });
        transports.push(consoleTransport);
        return winston.createLogger({transports});
    }

    /**
     * Format for local console
     */
    public static getConsoleFormatter() {
        return winston.format.combine(
            winston.format.colorize({all: true}),
            winston.format.timestamp({format: 'MM-DD HH:mm:ss.SSS'}),
            winston.format.align(),
            winston.format.printf((info) => {
                let logMessage = info.message;
                if (info.metadata) {
                    logMessage = info.message + ' - ' + inspect(info.metadata, false, 10);
                }
                return `[${info.level}] ${process.pid}   - ${info.timestamp as string} : ${logMessage}`;
            }),
        );
    }
}
