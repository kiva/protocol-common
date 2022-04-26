import { buildParamValidationDecorator } from '../../common/utility/decorator.utility.js';
import { lessThanBuilder } from '../../common/builders/less.than.builder.js';

/**
 * Parameter decorators factory. Register this validations as needing to be validated as less than the provided limit when the method is called.
 *
 * Example:
 * class MyService {
 *
 *     @ValidateParams
 *     public sampleFun(@LessThan(10) n: number) {
 *         ...
 *     }
 * }
 */
export const LessThan: (limit: number) => ParameterDecorator = (limit: number) => {
    const validation = lessThanBuilder(limit);
    return buildParamValidationDecorator(validation);
};
