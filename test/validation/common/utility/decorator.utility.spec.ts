/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { buildParamValidationDecorator } from '../../../../dist/validation/common/utility/decorator.utility.js';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode.js';
import { ValidateParams } from '../../../../dist/validation/decorators/function/validate.params.decorator.js';
import { buildParamValidation } from '../../../../dist/validation/common/utility/builder.utility.js';

describe('Decorator utility tests', () => {

    describe('buildParamValidationDecorator() tests', () => {

        const successInput = 'foo';
        const failureInput = 'bar';
        const paramValidation = buildParamValidation('MyValidation', 'Err!', (param: any) => param === successInput);
        const MyDecorator = buildParamValidationDecorator(paramValidation);

        class MyClass {
            @ValidateParams
            myFunction(@MyDecorator param: string) {
                return param;
            }
        }

        it('should build a decorators that can be used to mark a validations for validation', () => {
            const instance = new MyClass();
            expect(instance.myFunction(successInput)).toBe(successInput);
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
