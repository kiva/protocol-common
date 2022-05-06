import { buildParamValidationDecorator } from '../../common/utility/decorator.utility.js';
import { greaterThanBuilder } from '../../common/builders/greater.than.builder.js';

/**
 * Parameter decorators factory. Register this validation as needing to be validated as greater than the provided limit when the method is called.
 *
 * Example:
 * class MyService {
 *
 *     @ValidateParams
 *     public sampleFun(@GreaterThan(10) n: number) {
 *         ...
 *     }
 * }
 */
export const GreaterThan: (limit: number) => ParameterDecorator = (limit: number) => {
    const validation = greaterThanBuilder(limit);
    return buildParamValidationDecorator(validation);
};
