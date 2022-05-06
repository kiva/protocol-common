import { ClassConstructor } from 'class-transformer';
import { isValidInstanceBuilder } from '../common/builders/is.valid.instance.builder.js';
import { throwValidationException } from '../common/utility/error.utility.js';

/**
 * Verify that the provided parameter is a valid instance of the provided type. It will also check any class-validation property validations that are
 * on the class. If validation fails, then it will return an array of all validation errors. To validate a parameter whose type is a union of
 * multiple classes, use isValidInstanceOf().
 */
export const isValidInstance = (param: any, paramType: ClassConstructor<any>) => {
    return isValidInstanceBuilder()(param, paramType);
};

/**
 * Verify that the provided parameter is a valid instance of the provided type. It will also check any class-validation property validations that are
 * on the class. If validation fails, then it will throw an exception. To validate a parameter whose type is a union of multiple classes, use
 * isValidInstanceOfOrFail().
 */
export const isValidInstanceOrFail = (param: any, paramType: ClassConstructor<any>) => {
    const errors: any[] = isValidInstance(param, paramType);
    if (errors.length > 0) {
        throwValidationException(errors);
    }
};
