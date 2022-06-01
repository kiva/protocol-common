import { Logger as BaseLogger, Params, PARAMS_PROVIDER_TOKEN, PinoLogger } from 'nestjs-pino';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ProtocolLogger extends BaseLogger {

    private readonly maxLogLength: number;

    constructor(
        protected readonly logger: PinoLogger,
        @Inject(PARAMS_PROVIDER_TOKEN) params: Params
    ) {
        super(logger, params);
        this.maxLogLength = parseInt(process.env.MAX_LOG_LENGTH, 10);
    }

    debug(message: any, ...optionalParams: any[]) {
        const newMessage = this.truncateMessage(message);
        super.debug(newMessage, ...optionalParams);
    }

    log(message: any, ...optionalParams: any[]) {
        const newMessage = this.truncateMessage(message);
        super.log(newMessage, ...optionalParams);
    }

    info(message: any, ...optionalParams: any[]) {
        this.log(message, ...optionalParams);
    }

    warn(message: any, ...optionalParams: any[]) {
        const newMessage = this.truncateMessage(message);
        super.warn(newMessage, ...optionalParams);
    }

    error(message: any, ...optionalParams: any[]) {
        const newMessage = this.truncateMessage(message);
        super.error(newMessage, ...optionalParams);
    }

    /**
     * This function ensures that we do not blow up our logs with enormously long messages.
     *
     * @param message the message that is to be concatenated (if it's too long)
     */
    private truncateMessage(message: any): string {
        const messageAsString = typeof message === 'object' ? JSON.stringify(message) : message as string;
        if (messageAsString.length > this.maxLogLength) {
            const truncatedMessage = messageAsString.substring(0, this.maxLogLength);
            return `${truncatedMessage}...truncated`;
        } else {
            return messageAsString;
        }
    }
}
