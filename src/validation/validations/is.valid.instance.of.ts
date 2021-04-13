import { ClassConstructor } from 'class-transformer';
import { throwValidationException } from '../common/utility/error.utility';
import { NonEmptyArray } from '../../non.empty.array';
import { isValidInstanceOfBuilder } from '../common/builders/is.valid.instance.of.builder';

/**
 * Verify that the provided parameter is a valid instance of the provided type. It will also check any class-validation property validations that are
 * on the class. If validation fails, then it will return an array of all validation errors, each one of which is a map where the id is the name of
 * the paramType whose validations failed. If only one type is specified, it is recommended to use isValidInstance() instead, because there is no need
 * to key validation errors on the name of the paramType.
 */
export const isValidInstanceOf = (param: any, ...paramTypes: NonEmptyArray<ClassConstructor<any>>) => {
    return isValidInstanceOfBuilder(...paramTypes)(param);
};

/**
 * Verify that the provided parameter is a valid instance of the provided type. It will also check any class-validation property validations that are
 * on the class. If validation fails, then it will throw an exception. If only one type is specified, it is recommended to use isValidInstance()
 * instead, because there is no need to key validation errors on the name of the paramType.
 */
export const isValidInstanceOfOrFail = (param: any, ...paramTypes: NonEmptyArray<ClassConstructor<any>>) => {
    const errors: any[] = isValidInstanceOf(param, ...paramTypes);
    if (errors.length > 0) {
        throwValidationException(errors);
    }
};
