import { ClassConstructor } from 'class-transformer';

export type ParamValidationWithTypeMetadata = (param: any, ...paramTypes: ClassConstructor<any>[]) => any[];
