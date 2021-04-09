import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { formatErrors, throwValidationException } from './common/utility/error.utility';

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
                const formattedErrors = formatErrors(errors);
                throwValidationException(formattedErrors);
            }
        };
        super(options);
    }
}
