import { ParamValidation } from '../param.validation';
import { ParamValidationWithTypeMetadata } from '../param.validation.with.type.metadata';

/**
 * Given a base name (probably the name of a function), generate a string that can be used to look up validations on that key.
 */
export function paramValidationMetadataKey(baseKey: string): string {
    return `${baseKey}:paramvalidation`;
}

/**
 * Record a specified ParamValidation on the provided class prototype, method, and validations. In addition to any previously recorded validations,
 * this newly recorded validation will be run if that method is annotated with @ValidateParams.
 */
export function buildParamValidationDecorator(validation: ParamValidation | ParamValidationWithTypeMetadata): ParameterDecorator {
    return (targetPrototype: any, methodName: string, paramIndex: number) => {
        const key = paramValidationMetadataKey(methodName);
        const validations: (ParamValidation | ParamValidationWithTypeMetadata)[] = Reflect.getMetadata(paramIndex, targetPrototype, key) || [];
        validations.push(validation);
        Reflect.defineMetadata(paramIndex, validations, targetPrototype, key);
    };
}
