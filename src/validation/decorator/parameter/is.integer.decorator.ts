import { ParamValidation } from '../../param.validation';
import { isInt } from 'class-validator';
import { buildParamValidation, buildParamValidationDecorator } from '../../internal/param.validation.utility';


const errorMessageFun = (param: any) => `${param} was not an Integer`;
const validationFun = (param: any) => isInt(param);

/**
 * Validate that the provided param is indeed an integer. Uses the function provided by class-validator to determine if it is or is not an integer.
 */
export const isInteger: ParamValidation = buildParamValidation('isInteger', errorMessageFun, validationFun);

/**
 * Parameter decorator. Register this parameter as needing to be validated as being an integer when the method is called.
 *
 * Example:
 * class MyService {
 *     @ValidateParams
 *     public sampleFun(@IsInteger n: number) {
 *         ...
 *     }
 * }
 */
export const IsInteger: ParameterDecorator = buildParamValidationDecorator(isInteger);
