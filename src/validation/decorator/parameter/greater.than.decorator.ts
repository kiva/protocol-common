import { ParamValidation } from '../../param.validation';
import { buildParamValidation, buildParamValidationDecorator } from '../../internal/param.validation.utility';

/**
 * Given a limit, returns a function that can be used to validate that the provided param is greater than the provided limit.
 */
export const greaterThan: (limit: number) => ParamValidation = (limit: number) => {
    const errorMessageFun = (param: any) => `${param} was not greater than ${limit}`;
    const validationFun = (param: any) => typeof param === 'number' && param > limit;
    return buildParamValidation('greaterThan', errorMessageFun, validationFun);
};

/**
 * Parameter decorator factory. Register this parameter as needing to be validated as greater than the provided limit when the method is called.
 *
 * Example:
 * class MyService {
 *     @ValidateParams
 *     public sampleFun(@GreaterThan(10) n: number) {
 *         ...
 *     }
 * }
 */
export const GreaterThan: (limit: number) => ParameterDecorator = (limit: number) => {
    const validation = greaterThan(limit);
    return buildParamValidationDecorator(validation);
};
