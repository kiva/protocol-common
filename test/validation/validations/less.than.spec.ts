/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { ProtocolErrorCode } from '../../../dist/protocol.errorcode.js';
import { lessThan, lessThanOrFail } from '../../../dist/validation/validations/less.than.js';

describe('lessThan & lessThanOrFail tests', () => {

    describe('lessThan & lessThanOrFail an integer tests', () => {

        const limit = 10;

        it('should succeed given a valid value', () => {
            // lessThan
            expect(lessThan(1, limit)).toHaveLength(0); // simple
            expect(lessThan(0, limit)).toHaveLength(0); // zero
            expect(lessThan(-1000, limit)).toHaveLength(0); // negative
            expect(lessThan(1.1, limit)).toHaveLength(0); // non-integer
            expect(lessThan(Number.MIN_SAFE_INTEGER, limit)).toHaveLength(0); // max value

            // lessThanOrFail
            lessThanOrFail(1, limit); // simple
            lessThanOrFail(0, limit); // non-integer
            lessThanOrFail(-1000, limit); // simple
            lessThanOrFail(1.1, limit); // non-integer
            lessThanOrFail(Number.MIN_SAFE_INTEGER, limit); // max value
        });

        it('should fail given a number greater than the target', () => {
            // lessThan
            const errors: any[] = lessThan(1000, limit);
            expect(errors).toHaveLength(1);

            // lessThanOrFail
            try {
                lessThanOrFail(1000, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a float slightly greater than the target', () => {
            // lessThan
            const errors: any[] = lessThan(10.1, limit);
            expect(errors).toHaveLength(1);

            // lessThanOrFail
            try {
                lessThanOrFail(10.1, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a number equal to the target', () => {
            // lessThan
            const errors: any[] = lessThan(10, limit);
            expect(errors).toHaveLength(1);

            // lessThanOrFail
            try {
                lessThanOrFail(10, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });
    });

    describe('lessThan & lessThanOrFail a float tests', () => {

        const limit = 10.1;

        it('should succeed given a valid value', () => {
            // lessThan
            expect(lessThan(1, limit)).toHaveLength(0); // simple
            expect(lessThan(10, limit)).toHaveLength(0); // nearest integer
            expect(lessThan(0, limit)).toHaveLength(0); // zero
            expect(lessThan(-1000, limit)).toHaveLength(0); // negative
            expect(lessThan(1.1, limit)).toHaveLength(0); // non-integer
            expect(lessThan(Number.MIN_SAFE_INTEGER, limit)).toHaveLength(0); // min value

            // lessThanOrFail
            lessThanOrFail(1, limit); // simple
            lessThanOrFail(10, limit); // nearest integer
            lessThanOrFail(0, limit); // zero
            lessThanOrFail(-1000, limit); // negative
            lessThanOrFail(1.1, limit); // non-integer
            lessThanOrFail(Number.MIN_SAFE_INTEGER, limit); // min value
        });

        it('should fail given an integer greater than the target', () => {
            // greaterThan
            const errors: any[] = lessThan(1000, limit);
            expect(errors).toHaveLength(1);

            // greaterThanOrFail
            try {
                lessThanOrFail(1000, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a float slightly greater than the target', () => {
            // greaterThan
            const errors: any[] = lessThan(10.2, limit);
            expect(errors).toHaveLength(1);

            // greaterThanOrFail
            try {
                lessThanOrFail(10.2, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a number equal to the target', () => {
            // lessThan
            const errors: any[] = lessThan(10.1, limit);
            expect(errors).toHaveLength(1);

            // lessThanOrFail
            try {
                lessThanOrFail(10.1, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });
    });
});
