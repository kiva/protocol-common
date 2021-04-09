import { ClassConstructor } from 'class-transformer';
import { isValidInstanceBuilder } from '../common/builders/is.valid.instance.builder';
import { throwValidationException } from '../common/utility/error.utility';

/**
 * Verify that the provided parameter is a valid instance of the provided type. It will also check any class-validation property validations that are
 * on the class. If validation fails, then it will return an array of all validation errors.
 */
export const isValidInstance = <T extends object>(param: T, paramType: ClassConstructor<T>) => {
    return isValidInstanceBuilder()(param, paramType);
};

/**
 * Verify that the provided parameter is a valid instance of the provided type. It will also check any class-validation property validations that are
 * on the class. If validation fails, then it will throw an exception.
 */
export const isValidInstanceOrFail = <T extends object>(param: T, paramType: ClassConstructor<T>) => {
    const errors: any[] = isValidInstance(param, paramType);
    if (errors.length > 0) {
        throwValidationException(errors);
    }
};
