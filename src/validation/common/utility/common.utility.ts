import { ParamValidation } from '../param.validation';
import { ParamValidationWithType } from '../param.validation.with.type';

/**
 * Custom type guard to differentiate between ParamValidation and ParamValidationWithType.
 */
export const isTypedValidation = (validation: ParamValidation | ParamValidationWithType): validation is ParamValidationWithType => {
    return validation.length === 2;
};
