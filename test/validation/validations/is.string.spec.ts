/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { isString, isStringOrFail } from '../../../dist/validation/validations/is.string.js';
import { ProtocolErrorCode } from '../../../dist/protocol.errorcode.js';

describe('isString & isStringOrFai tests', () => {
    it('should succeed given a valid value', () => {
        // isString
        expect(isString('foo')).toHaveLength(0);
        expect(isString('')).toHaveLength(0);

        // isStringOrFail
        isStringOrFail('foo');
        isStringOrFail('');
    });

    it('should fail given a number input', () => {
        // isNumber
        expect(isString(1)).toHaveLength(1);

        // isNumberOrFail
        try {
            isStringOrFail(1);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });

    it('should fail given a null input', () => {
        // isNumber
        expect(isString(null)).toHaveLength(1);

        // isNumberOrFail
        try {
            isStringOrFail(null);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });

    it('should fail given an object input', () => {
        // isNumber
        expect(isString({})).toHaveLength(1);

        // isNumberOrFail
        try {
            isStringOrFail({});
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });
});
