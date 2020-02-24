import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ProtocolException } from './protocol.exception';
import { ProtocolErrorCode } from './protocol.errorcode';

/**
 * For all protocol validations we don't want to show the target
 */
export class ProtocolValidationPipe extends ValidationPipe {

    /**
     * Default to no target but allow caller to define their own options if they want
     */
    constructor(options?: ValidationPipeOptions) {
        options = options || {
            validationError: { target: false },
            exceptionFactory: (errors: ValidationError[]) => {
                const formattedErrors = [];
                for (const error of errors) {
                    formattedErrors.push(this.convertErrorResult(error));
                }
                throw new ProtocolException(ProtocolErrorCode.VALIDATION_EXCEPTION, 'Errors on input validation', formattedErrors);
            },
        };
        super(options);
    }

    /**
     * There's a bit of overlap here with RowError, but this is more universal
     */
    private convertErrorResult(result: ValidationError|any): any {
        const keys = Object.keys(result.constraints);
        result.code = keys[0] + 'Error';
        result.message = result.constraints[keys[0]];
        result.level = 'error';
        return result;
    }
}