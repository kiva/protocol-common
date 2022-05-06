/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { ValidateParams } from '../../../../dist/validation/decorators/function/validate.params.decorator.js';
import { LessThan } from '../../../../dist/validation/decorators/parameter/less.than.decorator.js';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode.js';

class TestFixture {

    @ValidateParams
    testFn1(@LessThan(10) n: number) {
        return n;
    }

    @ValidateParams
    testFn2(@LessThan(10.1) n: number) {
        return n;
    }
}

describe('@LessThan decorators tests', () => {

    const fixture = new TestFixture();

    describe('@LessThan an integer tests', () => {

        it('should succeed given a valid value', () => {
            expect(fixture.testFn1(1)).toBe(1); // simple
            expect(fixture.testFn1(0)).toBe(0); // zero
            expect(fixture.testFn1(-1000)).toBe(-1000); // negative
            expect(fixture.testFn1(1.1)).toBe(1.1); // non-integer
            expect(fixture.testFn1(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER); // min value
        });

        it('should fail given a number greater than the target', () => {
            try {
                fixture.testFn1(1000);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a float slightly greater than the target', () => {
            try {
                fixture.testFn1(10.1);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a number equal to the target', () => {
            try {
                fixture.testFn1(10);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });
    });

    describe('@LessThan a float tests', () => {

        it('should succeed given a valid value', () => {
            expect(fixture.testFn2(1)).toBe(1); // simple
            expect(fixture.testFn2(10)).toBe(10); // nearest integer
            expect(fixture.testFn2(0)).toBe(0); // zero
            expect(fixture.testFn2(-1000)).toBe(-1000); // negative
            expect(fixture.testFn2(1.1)).toBe(1.1); // non-integer
            expect(fixture.testFn2(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER); // min value
        });

        it('should fail given an integer greater than the target', () => {
            try {
                fixture.testFn2(1000);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a float slightly greater than the target', () => {
            try {
                fixture.testFn2(10.2);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a number equal to the target', () => {
            try {
                fixture.testFn2(10.1);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });
    });
});
