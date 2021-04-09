import { ClassConstructor } from 'class-transformer';

export type ParamValidationWithType = (param: any, paramType: ClassConstructor<any>) => any[];
