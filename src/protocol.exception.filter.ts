import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { Response, Request } from 'express';
import { ProtocolException } from './protocol.exception';
import { Logger } from './logger';
import { ProtocolErrorCode } from './protocol.errorcode';
import { HttpConstants } from './http-context/http.constants';

/**
 * Standardizes error responses from the API
 */
@Catch()
export class ProtocolExceptionFilter implements ExceptionFilter {

    private errorMessage = 'A service error has occurred. Please try again. If the problem persists, please contact your IT team.';

    /**
     * Catches all errors that bubble up and formats them in a standard way
     */
    catch(exception: any, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const url = request.method + ' ' + request.url;
        let status: number;
        const logObject: any = {
            reqid: request.headers[HttpConstants.REQUEST_ID_HEADER],
            service: process.env.SERVICE_NAME,
            url,
            exception,
        };

        let protocolException: ProtocolException;
        if (exception.constructor.name === ProtocolException.name && exception.code !== ProtocolErrorCode.INTERNAL_SERVER_ERROR) {
            status = exception.httpStatus;
            protocolException = exception;
            Logger.warn(protocolException.message, logObject);
        } else if (exception instanceof HttpException && !(exception instanceof InternalServerErrorException)) {
            status = exception.getStatus();
            protocolException = new ProtocolException(exception.constructor.name, exception.message, null, status);
            Logger.warn(protocolException.message, logObject);
        } else {
            // The internal server errors are special, we want to ensure we log all the details, but the response is generic
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            protocolException = new ProtocolException(ProtocolErrorCode.INTERNAL_SERVER_ERROR, this.errorMessage, null, status);
            Logger.error(exception.message, logObject);
        }
        response.status(status).json(protocolException);
    }
}
