import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ParamValidationWithType } from '../../param.validation';
import { formatErrors, buildParamValidationDecorator } from '../../internal/param.validation.utility';

/**
 * Returns a function that can be used to validate that the provided param is a valid instance of the provided paramType.
 */
export const isValidInstance: ParamValidationWithType = <T extends object>(param: T, paramType: ClassConstructor<T>) => {
    const paramAsClass = plainToClass<T, T>(paramType, param);
    const errors = validateSync(paramAsClass);
    if (errors.length > 0) {
        return formatErrors(errors);
    }
    return [];
};

/**
 * Parameter decorator. Register this parameter as needing to be validated against its specified type when the method is called.
 *
 * Example:
 *
 * class MyDto {
 *     @IsInt() id: number
 * }
 * class MyService {
 *     @ValidateParams
 *     public sampleFun(@IsValidInstance dto: MyDto) {
 *         ...
 *     }
 * }
 */
export const IsValidInstance: ParameterDecorator = buildParamValidationDecorator(isValidInstance);
