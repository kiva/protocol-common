import { isStringBuilder } from '../common/builders/is.string.builder.js';
import { throwValidationException } from '../common/utility/error.utility.js';

/**
 * Validate that the provided param is indeed a string. If validation fails, then it will return an array of a single validation error.
 */
export const isString = (param: any) => isStringBuilder()(param);

/**
 * Validate that the provided param is indeed a string. If validation fails, then it will throw an exception.
 */
export const isStringOrFail = (param: any) => {
    const errors: any[] = isString(param);
    if (errors.length > 0) {
        throwValidationException(errors);
    }
};
