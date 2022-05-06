/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { isNumber, isNumberOrFail } from '../../../dist/validation/validations/is.number.js';
import { ProtocolErrorCode } from '../../../dist/protocol.errorcode.js';

describe('isNumber & isNumberOrFail tests', () => {
    it('should succeed given a valid value', () => {
        // isNumber
        expect(isNumber(1)).toHaveLength(0);
        expect(isNumber(0)).toHaveLength(0);
        expect(isNumber(-1)).toHaveLength(0);
        expect(isNumber(Number.MAX_SAFE_INTEGER)).toHaveLength(0);
        expect(isNumber(Number.MIN_SAFE_INTEGER)).toHaveLength(0);
        expect(isNumber(1.1)).toHaveLength(0);
        expect(isNumber(NaN)).toHaveLength(0);
        expect(isNumber(Infinity)).toHaveLength(0);

        // isNumberOrFail
        isNumberOrFail(1);
        isNumberOrFail(0);
        isNumberOrFail(-1);
        isNumberOrFail(Number.MAX_SAFE_INTEGER);
        isNumberOrFail(Number.MIN_SAFE_INTEGER);
        isNumberOrFail(1.1);
        isNumberOrFail(NaN);
        isNumberOrFail(Infinity);
    });

    it('should fail given a non-number input', () => {
        // isNumber
        expect(isNumber('foo')).toHaveLength(1);

        // isNumberOrFail
        try {
            isNumberOrFail('foo');
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });
});
