import * as winston from 'winston';
import { inspect } from 'util';
import { Constants } from './constants';

export class DatadogLogger {
    static getLogger() {
        const transports = [];
        // different environments format the output to stdout, stderr differently
        let formatter;
        switch (process.env.NODE_ENV) {
            case Constants.DEV:
            case Constants.PROD:
            case Constants.SAND:
                formatter = winston.format.json();
                break;
            case Constants.LOCAL:
            default:
                // format console
                formatter = winston.format.combine(
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
                break;
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
}
