import { throwValidationException } from '../common/utility/error.utility';
import { isNumberBuilder } from '../common/builders/is.number.builder';

/**
 * Validate that the provided param is indeed a number. If validation fails, then it will return an array of a single validation error.
 */
export const isNumber = (param: any) => isNumberBuilder()(param);

/**
 * Validate that the provided param is indeed a number. If validation fails, then it will throw an exception.
 */
export const isNumberOrFail = (param: any) => {
    const errors: any[] = isNumber(param);
    if (errors.length > 0) {
        throwValidationException(errors);
    }
};
