import { isTypedValidation, ParamValidation, ParamValidationWithType } from '../../param.validation';
import { paramValidationMetadataKey, throwValidationException } from '../../internal/param.validation.utility';
import { ParamValidationError } from '../../param.validation.error';

/**
 * Method decorator that wraps the original method with a validation of each parameter that has been registered for validation. If validation passes,
 * execute the original method.
 */
export const ValidateParams: MethodDecorator = (targetPrototype: any, methodName: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    // In order to wrap the underlying function, we unfortunately have to use an actual function and cannot use an arrow function
    // tslint:disable-next-line:only-arrow-functions
    descriptor.value = function (...params: any[]) {
        const paramTypes = Reflect.getMetadata('design:paramtypes', targetPrototype, methodName);
        const errors: any[] = [];

        // Collect all validation failures before throwing a ValidationException
        for (const [paramIndex, value] of params.entries()) {

            // ParameterValidations are stored as prototype metadata. At the type this decorator is called, we need to retrieve those validations.
            const validations: (ParamValidation | ParamValidationWithType)[] = Reflect.getMetadata(
                paramIndex,
                targetPrototype,
                paramValidationMetadataKey(methodName)
            ) || [];

            // Validations can be either typed (expecting to be provided with the parameter and its type), or untyped (expecting to be provided with
            // just the parameter)
            validations.forEach((validation: ParamValidation | ParamValidationWithType) => {
                if (isTypedValidation(validation)) {
                    if (paramTypes[paramIndex]?.prototype?.constructor) {
                        errors.push(...validation(value, paramTypes[paramIndex].prototype.constructor));
                    } else {
                        errors.push(new ParamValidationError('HasConstructor', 'Parameter type has no constructor', value));
                    }
                } else if (validation) {
                    errors.push(...(validation as ParamValidation)(value));
                }
            });
        }
        if (errors.length > 0) {
            throwValidationException(errors);
        }

        // If we made it this far, execute the original function
        return originalMethod.apply(this, params);
    };
};
