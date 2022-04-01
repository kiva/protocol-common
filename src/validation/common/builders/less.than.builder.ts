import { ParamValidation } from '../param.validation';
import { buildParamValidation } from '../utility/builder.utility';

/**
 * Given a limit, returns a function that can be used to validate that the provided param is less than the provided limit.
 */
export const lessThanBuilder: (limit: number) => ParamValidation = (limit: number) => {
    const errorMessageFun = (param: any) => `${param as string} was not less than ${limit}`;
    const validationFun = (param: any) => typeof param === 'number' && param < limit;
    return buildParamValidation('lessThan', errorMessageFun, validationFun);
};
