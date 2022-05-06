/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { greaterThan, greaterThanOrFail } from '../../../dist/validation/validations/greater.than.js';
import { ProtocolErrorCode } from '../../../dist/protocol.errorcode.js';

describe('greaterThan & greaterThanOrFail tests', () => {

    describe('greaterThan & greaterThanOrFail an integer tests', () => {

        const limit = 10;

        it('should succeed given a valid value', () => {
            // greaterThan
            expect(greaterThan(11, limit)).toHaveLength(0); // simple
            expect(greaterThan(10.1, limit)).toHaveLength(0); // non-integer
            expect(greaterThan(Number.MAX_SAFE_INTEGER, limit)).toHaveLength(0); // max value

            // greaterThanOrFail
            greaterThanOrFail(11, limit); // simple
            greaterThanOrFail(10.1, limit); // non-integer
            greaterThanOrFail(Number.MAX_SAFE_INTEGER, limit); // max value
        });

        it('should fail given a number less than the target', () => {
            // greaterThan
            const errors: any[] = greaterThan(1, limit);
            expect(errors).toHaveLength(1);

            // greaterThanOrFail
            try {
                greaterThanOrFail(1, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a float slightly less than the target', () => {
            // greaterThan
            const errors: any[] = greaterThan(9.9, limit);
            expect(errors).toHaveLength(1);

            // greaterThanOrFail
            try {
                greaterThanOrFail(9.9, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a number equal to the target', () => {
            // greaterThan
            const errors: any[] = greaterThan(10, limit);
            expect(errors).toHaveLength(1);

            // greaterThanOrFail
            try {
                greaterThanOrFail(10, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });
    });

    describe('greaterThan & greaterThanOrFail a float tests', () => {

        const limit = 10.1;

        it('should succeed given a valid value', () => {
            // greaterThan
            expect(greaterThan(11, limit)).toHaveLength(0); // simple
            expect(greaterThan(10.2, limit)).toHaveLength(0); // non-integer
            expect(greaterThan(Number.MAX_SAFE_INTEGER, limit)).toHaveLength(0); // max value

            // greaterThanOrFail
            greaterThanOrFail(11, limit); // simple
            greaterThanOrFail(10.2, limit); // non-integer
            greaterThanOrFail(Number.MAX_SAFE_INTEGER, limit); // max value
        });

        it('should fail given an integer less than the target', () => {
            // greaterThan
            const errors: any[] = greaterThan(1, limit);
            expect(errors).toHaveLength(1);

            // greaterThanOrFail
            try {
                greaterThanOrFail(1, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a float slightly less than the target', () => {
            // greaterThan
            const errors: any[] = greaterThan(10.01, limit);
            expect(errors).toHaveLength(1);

            // greaterThanOrFail
            try {
                greaterThanOrFail(10.01, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a number equal to the target', () => {
            // greaterThan
            const errors: any[] = greaterThan(10.1, limit);
            expect(errors).toHaveLength(1);

            // greaterThanOrFail
            try {
                greaterThanOrFail(10.1, limit);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });
    });
});
