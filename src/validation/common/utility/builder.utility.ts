import { ParamValidation } from '../param.validation';
import { ParamValidationError } from '../param.validation.error';

/**
 * Given a boolean validation function, build a ParamValidation that will return an error object if the function fails.
 *
 * @param validationId ID of the ParamValidation to be run.
 * @param errorMessage Either a simple string or a function that takes a provided validations and returns an error message.
 * @param validationFun Function that takes a provided validations and returns a true/false result to validate the validations.
 */
export const buildParamValidation = (
    validationId: string,
    errorMessage: string | ((param: any) => string),
    validationFun: (param: any) => boolean
): ParamValidation => {
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
};
