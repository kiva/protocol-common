import { ParamValidation } from '../param.validation';
import { buildParamValidation } from '../utility/builder.utility';
import { isNumber } from 'class-validator';

const errorMessageFun = (param: any) => `${param} was not a number`;
const validationFun = (param: any) => isNumber(param, {allowNaN: true, allowInfinity: true});

/**
 * Validate that the provided param is indeed a number. Uses the function provided by class-validator to determine if it is or is not a number.
 */
export const isNumberBuilder: () => ParamValidation = () => buildParamValidation('isNumber', errorMessageFun, validationFun);
