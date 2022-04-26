import { buildParamValidationDecorator } from '../../common/utility/decorator.utility.js';
import { isValidInstanceBuilder } from '../../common/builders/is.valid.instance.builder.js';

/**
 * Parameter decorator. Register this validations as needing to be validated against its specified type when the method is called. It will make sure
 * the parameter is indeed an instance of the specified type. Additionally, it will validate any property validations applied via class-validator.
 *
 * Note: This parameter decorator can only be used on a parameter whose type is a single class. To validate a parameter whose type is a union of
 * multiple classes, use @IsValidInstanceOf().
 *
 * Example:
 *
 * class MyDto {
 *
 *     @IsInt() id: number
 * }
 * class MyService {
 *     @ValidateParams
 *     public sampleFun(@IsValidInstance dto: MyDto) {
 *         ...
 *     }
 * }
 */
export const IsValidInstance: ParameterDecorator = buildParamValidationDecorator(isValidInstanceBuilder());
