import { ParamValidation } from '../param.validation';
import { ParamValidationWithTypeMetadata } from '../param.validation.with.type.metadata';

/**
 * Custom type guard to differentiate between ParamValidation and ParamValidationWithType.
 */
export const isTypedValidation = (validation: ParamValidation | ParamValidationWithTypeMetadata): validation is ParamValidationWithTypeMetadata => {
    return validation.length > 1;
};
