import { isIntegerBuilder } from '../common/builders/is.integer.builder';
import { throwValidationException } from '../common/utility/error.utility';

/**
 * Validate that the provided param is indeed an integer. If validation fails, then it will return an array of a single validation error.
 */
export const isInteger = (param: any) => isIntegerBuilder()(param);

/**
 * Validate that the provided param is indeed an integer. If validation fails, then it will throw an exception.
 */
export const isIntegerOrFail = (param: any) => {
    const errors: any[] = isInteger(param);
    if (errors.length > 0) {
        throwValidationException(errors);
    }
};
