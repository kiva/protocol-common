import { buildParamValidationDecorator } from '../../common/utility/decorator.utility';
import { isIntegerBuilder } from '../../common/builders/is.integer.builder';

/**
 * Parameter decorators. Register this validations as needing to be validated as being an integer when the method is called.
 *
 * Example:
 * class MyService {
 *     @ValidateParams
 *     public sampleFun(@IsInteger n: number) {
 *         ...
 *     }
 * }
 */
export const IsInteger: ParameterDecorator = buildParamValidationDecorator(isIntegerBuilder());
