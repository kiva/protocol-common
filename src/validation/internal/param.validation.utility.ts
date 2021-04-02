import { ValidationError } from 'class-validator';
import { ProtocolException } from '../../protocol.exception';
import { ProtocolErrorCode } from '../../protocol.errorcode';
import { ParamValidation, ParamValidationWithType } from '../param.validation';
import { ParamValidationError } from '../param.validation.error';

/**
 * There's a bit of overlap here with RowError, but this is more universal
 * For the top level code it only uses the first constraint or the first child
 */
function convertErrorResult(result: ValidationError | ParamValidationError | any): any {
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
}

/**
 * Given an array of ValidationErrors, format the error results and return them.
 */
export function formatErrors(errors: ValidationError[]): any[] {
    const formattedErrors = [];
    for (const error of errors) {
        const formattedError = convertErrorResult(error);
        formattedErrors.push(formattedError);
    }
    return formattedErrors;
}

/**
 * Throw a ValidationException with a body containing the provided errors.
 */
export function throwValidationException(errors: any[]): void {
    throw new ProtocolException(ProtocolErrorCode.VALIDATION_EXCEPTION, 'Errors on input validation', errors);
}

/**
 * Given a boolean validation function, build a ParamValidation that will return an error object if the function fails.
 *
 * @param validationId ID of the ParamValidation to be run.
 * @param errorMessage Either a simple string or a function that takes a provided parameter and returns an error message.
 * @param validationFun Function that takes a provided parameter and returns a true/false result to validate the parameter.
 */
export function buildParamValidation(
    validationId: string,
    errorMessage: string | ((param: any) => string),
    validationFun: (param: any) => boolean
): ParamValidation {
    return (param: any): ParamValidationError[] => {
        const success = validationFun(param);
        const errors: any[] = [];
        if (!success) {
            if (typeof errorMessage === 'string') {
                errors.push(new ParamValidationError(validationId, errorMessage, param));
            } else {
                errors.push(new ParamValidationError(validationId, errorMessage(param), param));
            }
        }
        return errors;
    };
}

/**
 * Given a base name (probably the name of a function), generate a string that can be used to look up validations on that key.
 */
export function paramValidationMetadataKey(baseKey: string): string {
    return `${baseKey}:paramvalidation`;
}

/**
 * Record a specified ParamValidation on the provided class prototype, method, and parameter. In addition to any previously recorded validations,
 * this newly recorded validation will be run if that method is annotated with @ValidateParams.
 */
export function buildParamValidationDecorator(validation: ParamValidation | ParamValidationWithType): ParameterDecorator {
    return (targetPrototype: any, methodName: string, paramIndex: number) => {
        const key = paramValidationMetadataKey(methodName);
        const validations: (ParamValidation | ParamValidationWithType)[] = Reflect.getMetadata(paramIndex, targetPrototype, key) || [];
        validations.push(validation);
        Reflect.defineMetadata(paramIndex, validations, targetPrototype, key);
    };
}
