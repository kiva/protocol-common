import { buildParamValidationDecorator } from '../../common/utility/decorator.utility';
import { ClassConstructor } from 'class-transformer';
import { isValidInstanceOfBuilder } from '../../common/builders/is.valid.instance.of.builder';
import { NonEmptyArray } from '../../../non.empty.array';

/**
 * Parameter decorator. Register this validations as needing to be validated against one of several specified types when the method is called. It will
 * make sure the parameter is indeed an instance of one of the specified type. Additionally, it will validate any property validations applied via
 * class-validator.
 *
 * Note: If only one type is specified, it is recommended to use @IsValidInstance instead, because there is no need to key validation errors on the
 * name of the paramType.
 *
 * Example:
 *
 * class MyDto1 {
 *
 *     @IsInt() id: number
 * }
 * class MyDto2 {
 *     @Min(1) positiveNumber: number
 * }
 * class MyService {
 *     @ValidateParams
 *     public sampleFun(@IsValidInstanceOf(MyDto1, MyDto2) dto: MyDto1 | MyDto2) {
 *         ...
 *     }
 * }
 */
export const IsValidInstanceOf: (...paramTypes: NonEmptyArray<ClassConstructor<any>>) => ParameterDecorator =
    (...paramTypes: NonEmptyArray<ClassConstructor<any>>) => {
        return buildParamValidationDecorator(isValidInstanceOfBuilder(...paramTypes));
};
