import { ClassConstructor, plainToClass } from 'class-transformer';
import { ParamValidation } from '../param.validation';
import { ParamValidationError } from '../param.validation.error';
import { validateSync } from 'class-validator';
import { formatErrors } from '../utility/error.utility';
import { NonEmptyArray } from '../../../non.empty.array';

/**
 * Returns a function that can be used to validate that the provided param is a valid instance of one of the provided paramType. If you know there
 * will only be 1 paramType to validated against, it is recommended to use isValidInstanceBuilder, because there is no need to key validation errors
 * on the name of the paramType.
 */
export const isValidInstanceOfBuilder: (...paramTypes: NonEmptyArray<ClassConstructor<any>>) => ParamValidation =
    (...paramTypes: ClassConstructor<any>[]) => (param: any) => {

    // Validate it is an object
    if (param === null || param === undefined) {
        return [new ParamValidationError('IsObject', `Value is null or undefined`, param)];
    } else if (Array.isArray(param)) {
        return [new ParamValidationError('IsObject', `Value must be an object but was an array.`, param)];
    } else if (typeof param !== 'object') {
        return [new ParamValidationError('IsObject', `Value must be an object but was ${typeof param}.`, param)];
    }

    // Check errors on all possible paramTypes and return errors keyed on the class name.
    const allErrors: {[name: string]: any[]}[] = paramTypes.map((paramType: ClassConstructor<object>) => {
        const name: string = paramType.name;
        const paramAsClass = plainToClass(paramType, param);
        const errors = validateSync(paramAsClass);
        return { [name]: formatErrors(errors) };
    });

    // We want to return no errors if any object's validation passed; this is an OR operation, not an AND.
    const someClassPassedValidation = allErrors.some((entry: {[name: string]: any[]}) => Object.values(entry).flat().length === 0);
    return someClassPassedValidation ? [] : allErrors;
};
