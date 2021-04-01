import { ValidationError } from 'class-validator';
import {
    buildParamValidation,
    buildParamValidationDecorator,
    formatErrors,
    throwValidationException
} from '../../src/validation/internal/param.validation.utility';
import { ProtocolErrorCode } from '../../dist/protocol.errorcode';
import { ParamValidationError } from '../../src/validation/param.validation.error';
import { ValidateParams } from '../../src/validation/decorator/function/validate.params.decorator';

describe('ParamValidationUtility tests', () => {

    describe('formatErrors() tests', () => {

        const propertyName = 'myProp';
        const validationId = 'isNotValid';
        const validationMessage = 'Some Validation Failed';

        it('should do nothing if provided no errors to format', () => {
            expect(formatErrors([])).toHaveLength(0);
        });

        it('should be able to format a ValidationError with no constraint and no children', () => {
            const err: ValidationError = {
                property: propertyName,
                children: []
            };
            const formattedErrors = formatErrors([err]);
            expect(formattedErrors).toHaveLength(1);
            const error = formattedErrors[0];
            expect(error.level).toBeDefined();
            expect(error.level).toBe('error');
            expect(error.property).toBeDefined();
            expect(error.property).toBe(propertyName);
        });

        it('should be able to format a ValidationError with a constraint and no children', () => {
            const err: ValidationError = {
                property: propertyName,
                children: [],
                constraints: {
                    [validationId]: validationMessage
                }
            };
            const formattedErrors = formatErrors([err]);
            expect(formattedErrors).toHaveLength(1);
            const error = formattedErrors[0];
            expect(error.level).toBeDefined();
            expect(error.level).toBe('error');
            expect(error.property).toBeDefined();
            expect(error.property).toBe(propertyName);
            expect(error.code).toBeDefined();
            expect(error.code).toBe(`${validationId}Error`);
            expect(error.message).toBeDefined();
            expect(error.message).toBe(validationMessage);
        });

        it('should be able to format a ValidationError with no constraint, but with a child with constraints', () => {
            const err: ValidationError = {
                property: propertyName,
                children: [{
                    property: 'childProp',
                    children: [],
                    constraints: {
                        [validationId]: validationMessage
                    }
                }]
            };
            const formattedErrors = formatErrors([err]);
            expect(formattedErrors).toHaveLength(1);
            const error = formattedErrors[0];
            expect(error.level).toBeDefined();
            expect(error.level).toBe('error');
            expect(error.property).toBeDefined();
            expect(error.property).toBe(propertyName);
            expect(error.code).toBeDefined();
            expect(error.code).toBe(`${validationId}Error`);
            expect(error.message).toBeDefined();
            expect(error.message).toBe(validationMessage);
        });

        it('should prefer the top-level constraint if a ValidationError has both a constraint and a child with constraints', () => {
            const err: ValidationError = {
                property: propertyName,
                children: [{
                    property: 'childProp',
                    children: [],
                    constraints: {
                        otherValidation: 'Some other validation message'
                    }
                }],
                constraints: {
                    [validationId]: validationMessage
                }
            };
            const formattedErrors = formatErrors([err]);
            expect(formattedErrors).toHaveLength(1);
            const error = formattedErrors[0];
            expect(error.level).toBeDefined();
            expect(error.level).toBe('error');
            expect(error.property).toBeDefined();
            expect(error.property).toBe(propertyName);
            expect(error.code).toBeDefined();
            expect(error.code).toBe(`${validationId}Error`);
            expect(error.message).toBeDefined();
            expect(error.message).toBe(validationMessage);
        });
    });

    describe('throwValidationException() tests', () => {

        it('should throw a ProtocolException when called with errors', () => {
            const errors = [{foo: 'bar'}];
            try {
                throwValidationException(errors);
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toBe(errors);
            }
        });

        it('should throw a ProtocolException when called with an empty array', () => {
            const errors = [];
            try {
                throwValidationException(errors);
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toBe(errors);
            }
        });
    });

    describe('buildParamValidation() tests', () => {

        it('should build a ParamValidation function that uses a simple string as an error message', () => {
            const successInput = 'foo';
            const failureInput = 'bar';
            const validationId = 'MyValidation';
            const errorMessage = 'Simple error message';
            const validationFun = (param: any) => param === successInput;
            const paramValidation = buildParamValidation(validationId, errorMessage, validationFun);

            const successResult = paramValidation(successInput);
            expect(successResult).toHaveLength(0);

            const expectedError = new ParamValidationError(validationId, errorMessage, failureInput);
            const errorResult = paramValidation(failureInput);
            expect(errorResult).toHaveLength(1);
            expect(errorResult[0]).toEqual(expectedError);
        });

        it('should build a ParamValidation function that uses a simple string as an error message', () => {
            const successInput = 'foo';
            const failureInput = 'bar';
            const validationId = 'MyValidation';
            const errorMessage = (param: any) => `${param}-induced error message`;
            const validationFun = (param: any) => param === successInput;
            const paramValidation = buildParamValidation(validationId, errorMessage, validationFun);

            const successResult = paramValidation(successInput);
            expect(successResult).toHaveLength(0);

            const expectedError = new ParamValidationError(validationId, errorMessage(failureInput), failureInput);
            const errorResult = paramValidation(failureInput);
            expect(errorResult).toHaveLength(1);
            expect(errorResult[0]).toEqual(expectedError);
        });
    });

    describe('buildParamValidationDecorator() tests', () => {

        const successInput = 'foo';
        const failureInput = 'bar';
        const paramValidation = buildParamValidation('MyValidation', 'Err!', (param: any) => param === successInput);
        const MyDecorator = buildParamValidationDecorator(paramValidation);

        class MyClass {
            @ValidateParams
            myFunction(@MyDecorator param: string) {
                return true;
            }
        }

        it('should build a decorator that can be used to mark a parameter for validation', () => {
            const instance = new MyClass();
            expect(instance.myFunction(successInput)).toBe(true);
            try {
                instance.myFunction(failureInput);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });
    });
});
