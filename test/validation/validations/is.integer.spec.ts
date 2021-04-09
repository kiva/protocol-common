import { isInteger, isIntegerOrFail } from '../../../src/validation/validations/is.integer';
import { ProtocolErrorCode } from '../../../dist/protocol.errorcode';

describe('isInteger & isIntegerOrFail tests', () => {

    it('should succeed given a valid value', () => {
        // isInteger
        expect(isInteger(1)).toHaveLength(0); // simple
        expect(isInteger(0)).toHaveLength(0); // zero
        expect(isInteger(-1)).toHaveLength(0); // negative
        expect(isInteger(Number.MAX_SAFE_INTEGER)).toHaveLength(0); // max value
        expect(isInteger(Number.MIN_SAFE_INTEGER)).toHaveLength(0); // min value

        // isIntegerOrFail
        isIntegerOrFail(1); // simple
        isIntegerOrFail(0); // zero
        isIntegerOrFail(-1); // negative
        isIntegerOrFail(Number.MAX_SAFE_INTEGER); // max value
        isIntegerOrFail(Number.MIN_SAFE_INTEGER); // min value
    });

    it('should fail given a float', () => {
        // isInteger
        expect(isInteger(1.1)).toHaveLength(1);

        // isIntegerOrFail
        try {
            isIntegerOrFail(1.1);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });

    it('should fail given a non-number input', () => {
        // isInteger
        expect(isInteger('foo')).toHaveLength(1);

        // isIntegerOrFail
        try {
            isIntegerOrFail('foo');
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }});
});
