import { isString } from 'class-validator';
import { ParamValidation } from '../param.validation';
import { buildParamValidation } from '../utility/builder.utility';

const errorMessageFun = (param: any) => `${param as string} was not a string`;
const validationFun = (param: any) => isString(param);

/**
 * Validate that the provided param is indeed a string. Uses the function provided by class-validator to determine if it is or is not a number.
 */
export const isStringBuilder: () => ParamValidation = () => buildParamValidation('isString', errorMessageFun, validationFun);
