import { greaterThanBuilder } from '../common/builders/greater.than.builder';
import { throwValidationException } from '../common/utility/error.utility';

/**
 * Verify that the provided param is greater than the provided limit. If validation fails, then it will return an array of a single validation error.
 */
export const greaterThan = (param: number, limit: number) => {
    return greaterThanBuilder(limit)(param);
};

/**
 * Verify that the provided param is greater than the provided limit. If validation fails, then it will throw an exception.
 */
export const greaterThanOrFail = (param: number, limit: number) => {
    const errors: any[] = greaterThan(param, limit);
    if (errors.length > 0) {
        throwValidationException(errors);
    }
};
