import { buildParamValidationDecorator } from '../../common/utility/decorator.utility.js';
import { isNumberBuilder } from '../../common/builders/is.number.builder.js';

/**
 * Parameter decorators. Register this validation as needing to be validated as being a number when the method is called.
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
