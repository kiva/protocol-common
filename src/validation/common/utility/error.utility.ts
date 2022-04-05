/**
 * There's a bit of overlap here with RowError, but this is more universal
 * For the top level code it only uses the first constraint or the first child
 */
import { ValidationError } from 'class-validator';
import { ParamValidationError } from '../param.validation.error';
import { ProtocolException } from '../../../protocol.exception';
import { ProtocolErrorCode } from '../../../protocol.errorcode';


const convertErrorResult = (result: ValidationError | ParamValidationError | any): any => {
    if (result.constraints) {
        const keys = Object.keys(result.constraints);
        result.code = keys[0] + 'Error';
        result.message = result.constraints[keys[0]];
    } else if (result.children && result.children instanceof Array && result.children.length > 0) {
        const child = result.children[0];
        const keys = Object.keys(child.constraints);
        result.code = keys[0] + 'Error';
        result.message = child.constraints[keys[0]];
    }
    result.level = 'error';
    return result;
};

/**
 * Given an array of ValidationErrors, format the error results and return them.
 */
export const formatErrors = (errors: ValidationError[]): any[] => {
    const formattedErrors = [];
    for (const error of errors) {
        const formattedError = convertErrorResult(error);
        formattedErrors.push(formattedError);
    }
    return formattedErrors;
};

/**
 * Throw a ValidationException with a body containing the provided errors.
 */
export const throwValidationException = (errors: any[]): void => {
    throw new ProtocolException(ProtocolErrorCode.VALIDATION_EXCEPTION, 'Errors on input validation', errors);
};
