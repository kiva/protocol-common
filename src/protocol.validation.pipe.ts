import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ProtocolException } from './protocol.exception';
import { ProtocolErrorCode } from './errorcode/protocol.errorcode';

/**
 * For all protocol validations we don't want to show the target
 */
export class ProtocolValidationPipe extends ValidationPipe {

    /**
     * Default to no target but allow caller to define their own options if they want
     */
    public constructor(options?: ValidationPipeOptions) {
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
     * For the top level code it only uses the first constraint or the first child
     */
    private convertErrorResult(result: ValidationError|any): any {
        if (result.constraints) {
            const keys = Object.keys(result.constraints);
            result.code = keys[0] + 'Error';
            result.message = result.constraints[keys[0]];
        } else if (result.children) {
            const child = result.children[0];
            const keys = Object.keys(child.constraints);
            result.code = keys[0] + 'Error';
            result.message = child.constraints[keys[0]];
        }
        result.level = 'error';
        return result;
    }
}
