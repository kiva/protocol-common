import { ParamValidationError } from '../../../../src/validation/common/param.validation.error';
import { buildParamValidation } from '../../../../src/validation/common/utility/builder.utility';

describe('Builder utility tests', () => {

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
});
