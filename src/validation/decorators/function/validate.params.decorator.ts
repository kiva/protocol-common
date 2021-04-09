import { ParamValidation } from '../../common/param.validation';
import { paramValidationMetadataKey } from '../../common/utility/decorator.utility';
import { ClassConstructor } from 'class-transformer';
import { ParamValidationWithType } from '../../common/param.validation.with.type';
import { ParamValidationError } from '../../common/param.validation.error';
import { throwValidationException } from '../../common/utility/error.utility';
import { isTypedValidation } from '../../common/utility/common.utility';


/**
 * This function will attempt to validate a validations using the provided validations. If any validations fail, it will return an array containing
 * all the errors.
 */
const validateParam = (param: any, validations: (ParamValidation | ParamValidationWithType)[], paramType: ClassConstructor<any>): any[] => {
    return validations.flatMap((validation: ParamValidation | ParamValidationWithType) => {
        if (isTypedValidation(validation)) {
            if (paramType) {
                return validation(param, paramType);
            } else {
                return [new ParamValidationError('HasConstructor', 'Parameter type has no constructor', param)];
            }
        } else if (validation) {
            return (validation as ParamValidation)(param);
        }
    });
};

/**
 * Method decorators that wraps the original method with a validation of each validations that has been registered for validation using Parameter
 * Decorators. If validation passes, execute the original method.
 */
export const ValidateParams: MethodDecorator = (targetPrototype: any, methodName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // In order to wrap the underlying function, we unfortunately have to use an actual function and cannot use an arrow function
    // tslint:disable-next-line:only-arrow-common
    descriptor.value = function (...params: any[]) {
        const paramTypes: ClassConstructor<any> = Reflect.getMetadata('design:paramtypes', targetPrototype, methodName);
        const errors: any[] = params.flatMap((param: any, paramIndex: number) => {
            const validations: (ParamValidation | ParamValidationWithType)[] = Reflect.getMetadata(
                paramIndex,
                targetPrototype,
                paramValidationMetadataKey(methodName)
            ) || [];
            return validateParam(param, validations, paramTypes[paramIndex]?.prototype?.constructor);
        });
        if (errors.length > 0) {
            throwValidationException(errors);
        }

        return originalMethod.apply(this, params);
    };
};