import { lessThanBuilder } from '../common/builders/less.than.builder';
import { throwValidationException } from '../common/utility/error.utility';

/**
 * Verify that the provided param is less than the provided limit. If validation fails, then it will return an array of a single validation error.
 */
export const lessThan = (param: number, limit: number) => {
    return lessThanBuilder(limit)(param);
};

/**
 * Verify that the provided param is less than the provided limit. If validation fails, then it will throw an exception.
 */
export const lessThanOrFail = (param: number, limit: number) => {
    const errors: any[] = lessThan(param, limit);
    if (errors.length > 0) {
        throwValidationException(errors);
    }
};
