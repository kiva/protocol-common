import { isInt } from 'class-validator';
import { ParamValidation } from '../param.validation';
import { buildParamValidation } from '../utility/builder.utility';

const errorMessageFun = (param: any) => `${param as string} was not an Integer`;
const validationFun = (param: any) => isInt(param);

/**
 * Validate that the provided param is indeed an integer. Uses the function provided by class-validator to determine if it is or is not an integer.
 */
export const isIntegerBuilder: () => ParamValidation = () => buildParamValidation('isInteger', errorMessageFun, validationFun);
