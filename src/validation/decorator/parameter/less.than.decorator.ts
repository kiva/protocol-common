import { ParamValidation } from '../../param.validation';
import { buildParamValidation, buildParamValidationDecorator } from '../../internal/param.validation.utility';

/**
 * Given a limit, returns a function that can be used to validate that the provided param is less than the provided limit.
 */
export const lessThan: (limit: number) => ParamValidation = (limit: number) => {
    const errorMessageFun = (param: any) => `${param} was not less than ${limit}`;
    const validationFun = (param: any) => typeof param === 'number' && param < limit;
    return buildParamValidation('lessThan', errorMessageFun, validationFun);
};

/**
 * Parameter decorator factory. Register this parameter as needing to be validated as less than the provided limit when the method is called.
 *
 * Example:
 * class MyService {
 *     @ValidateParams
 *     public sampleFun(@LessThan(10) n: number) {
 *         ...
 *     }
 * }
 */
export const LessThan: (limit: number) => ParameterDecorator = (limit: number) => {
    const validation = lessThan(limit);
    return buildParamValidationDecorator(validation);
};
