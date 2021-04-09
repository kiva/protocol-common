import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ParamValidationWithType } from '../param.validation.with.type';
import { formatErrors } from '../utility/error.utility';

/**
 * Returns a function that can be used to validate that the provided param is a valid instance of the provided paramType.
 * TODO: Add support for union types
 */
export const isValidInstanceBuilder: () => ParamValidationWithType = () => <T extends object>(param: T, paramType: ClassConstructor<T>) => {
    const paramAsClass = plainToClass<T, T>(paramType, param);
    const errors = validateSync(paramAsClass);
    if (errors.length > 0) {
        return formatErrors(errors);
    }
    return [];
};
