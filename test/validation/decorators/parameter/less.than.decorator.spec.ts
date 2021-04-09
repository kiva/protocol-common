import { ValidateParams } from '../../../../src/validation/decorators/function/validate.params.decorator';
import { LessThan } from '../../../../src/validation/decorators/parameter/less.than.decorator';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode';

class TestFixture {

    @ValidateParams
    testFn1(@LessThan(10) n: number) {
        return true;
    }

    @ValidateParams
    testFn2(@LessThan(10.1) n: number) {
        return true;
    }
}

describe('@LessThan decorators tests', () => {

    const fixture = new TestFixture();

    describe('@LessThan an integer tests', () => {

        it('should succeed given a valid value', () => {
            expect(fixture.testFn1(1)).toBe(true); // simple
            expect(fixture.testFn1(0)).toBe(true); // zero
            expect(fixture.testFn1(-1000)).toBe(true); // negative
            expect(fixture.testFn1(1.1)).toBe(true); // non-integer
            expect(fixture.testFn1(Number.MIN_SAFE_INTEGER)).toBe(true); // min value
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
            expect(fixture.testFn2(1)).toBe(true); // simple
            expect(fixture.testFn2(10)).toBe(true); // nearest integer
            expect(fixture.testFn2(0)).toBe(true); // zero
            expect(fixture.testFn2(-1000)).toBe(true); // negative
            expect(fixture.testFn2(1.1)).toBe(true); // non-integer
            expect(fixture.testFn2(Number.MIN_SAFE_INTEGER)).toBe(true); // min value
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
