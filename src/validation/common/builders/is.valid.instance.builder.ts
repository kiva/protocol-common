import { ParamValidationWithTypeMetadata } from '../param.validation.with.type.metadata';
import { isValidInstanceOfBuilder } from './is.valid.instance.of.builder';
import { ClassConstructor } from 'class-transformer';

/**
 * Returns a function that can be used to validate that the provided param is a valid instance of the provided paramType. If you need to validate
 * that the provided param is a valid instance of one of several paramTypes, use isValidInstanceOfBuilder instead. In fact, this builder defers to
 * the isValidInstanceOfBuilder and is provided for convenience.
 */
export const isValidInstanceBuilder: () => ParamValidationWithTypeMetadata = () => (param: any, paramType: ClassConstructor<any>) => {
    const errors = isValidInstanceOfBuilder(paramType)(param);
    if (errors.length > 0) {
        return errors[0][paramType.name];
    }
    return [];
};
