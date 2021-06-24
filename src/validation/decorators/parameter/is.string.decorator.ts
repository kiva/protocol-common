import { buildParamValidationDecorator } from '../../common/utility/decorator.utility';
import { isStringBuilder } from '../../common/builders/is.string.builder';

/**
 * Parameter decorators. Register this validations as needing to be validated as being a string when the method is called.
 *
 * Example:
 * class MyService {
 *     @ValidateParams
 *     public sampleFun(@IsString n: string) {
 *         ...
 *     }
 * }
 */
export const IsString: ParameterDecorator = buildParamValidationDecorator(isStringBuilder());
