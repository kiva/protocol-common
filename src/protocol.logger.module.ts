import { LoggerModule } from 'nestjs-pino';
import { Module } from '@nestjs/common';
import { Constants } from './constants.js';
import { ProtocolLogger } from './protocol.logger.js';

const getTransport = () => {
    if (process.env.NODE_ENV === Constants.LOCAL) {
        return {
            target: 'pino-pretty',
            options: {
                colorize: true,
                translateTime: 'dd/mm/yyyy HH:MM:ss.l',
                hideObject: true,
                levelFirst: true
            }
        };
    } else {
        return undefined;
    }
};

@Module({
    imports: [LoggerModule.forRoot({
       pinoHttp: {
           autoLogging: false,
           transport: getTransport()
       }
    })],
    providers: [ProtocolLogger],
    exports: [ProtocolLogger]
})
export class ProtocolLoggerModule {}
