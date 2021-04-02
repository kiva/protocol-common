import { ClassConstructor } from 'class-transformer';

export type ParamValidation = (param: any) => any[];

export type ParamValidationWithType = (param: any, paramType: ClassConstructor<any>) => any[];

export const isTypedValidation = (validation: ParamValidation | ParamValidationWithType): validation is ParamValidationWithType => {
    return validation.length === 2;
};
