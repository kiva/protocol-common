import { buildParamValidationDecorator } from '../../common/utility/decorator.utility';
import { isValidInstanceBuilder } from '../../common/builders/is.valid.instance.builder';

/**
 * Parameter decorators. Register this validations as needing to be validated against its specified type when the method is called.
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
export const IsValidInstance: ParameterDecorator = buildParamValidationDecorator(isValidInstanceBuilder());
