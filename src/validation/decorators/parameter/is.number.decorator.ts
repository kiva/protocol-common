import { buildParamValidationDecorator } from '../../common/utility/decorator.utility';
import { isNumberBuilder } from '../../common/builders/is.number.builder';

/**
 * Parameter decorators. Register this validations as needing to be validated as being a number when the method is called.
 *
 * Example:
 * class MyService {
 *
 *     @ValidateParams
 *     public sampleFun(@IsNumber n: number) {
 *         ...
 *     }
 * }
 */
export const IsNumber: ParameterDecorator = buildParamValidationDecorator(isNumberBuilder());
