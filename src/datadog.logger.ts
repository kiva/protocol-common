import winston from 'winston';
import logform from 'logform';
import { inspect } from 'util';
import { Constants } from './constants.js';

const { format } = logform;
const { json } = format;

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
                formatter = json();
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
        return format.combine(
            format.colorize({all: true}),
            format.timestamp({format: 'MM-DD HH:mm:ss.SSS'}),
            format.align(),
            format.printf((info) => {
                let logMessage = info.message;
                if (info.metadata) {
                    logMessage = info.message + ' - ' + inspect(info.metadata, false, 10);
                }
                return `[${info.level}] ${process.pid}   - ${info.timestamp as string} : ${logMessage}`;
            }),
        );
    }
}
