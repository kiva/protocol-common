import { buildParamValidationDecorator } from '../../common/utility/decorator.utility.js';
import { isIntegerBuilder } from '../../common/builders/is.integer.builder.js';

/**
 * Parameter decorators. Register this validation as needing to be validated as being an integer when the method is called.
 *
 * Example:
 * class MyService {
 *
 *     @ValidateParams
 *     public sampleFun(@IsInteger n: number) {
 *         ...
 *     }
 * }
 */
export const IsInteger: ParameterDecorator = buildParamValidationDecorator(isIntegerBuilder());
