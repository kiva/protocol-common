/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { ValidationError } from 'class-validator';
import { formatErrors, throwValidationException } from '../../../../dist/validation/common/utility/error.utility.js';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode.js';

describe('Error utility tests', () => {

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
});
