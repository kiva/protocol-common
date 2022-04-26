/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { ValidateParams } from '../../../../dist/validation/decorators/function/validate.params.decorator';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode';
import { GreaterThan } from '../../../../dist/validation/decorators/parameter/greater.than.decorator';

class TestFixture {

    @ValidateParams
    testFn1(@GreaterThan(10) n: number) {
        return true;
    }

    @ValidateParams
    testFn2(@GreaterThan(10.1) n: number) {
        return true;
    }
}

describe('@GreaterThan decorators tests', () => {

    const fixture = new TestFixture();

    describe('@GreaterThan an integer tests', () => {

        it('should succeed given a valid value', () => {
            expect(fixture.testFn1(11)).toBe(true); // simple
            expect(fixture.testFn1(10.1)).toBe(true); // non-integer
            expect(fixture.testFn1(Number.MAX_SAFE_INTEGER)).toBe(true); // max value
        });

        it('should fail given a number less than the target', () => {
            try {
                fixture.testFn1(1);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a float slightly less than the target', () => {
            try {
                fixture.testFn1(9.9);
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

    describe('@GreaterThan a float tests', () => {

        it('should succeed given a valid value', () => {
            expect(fixture.testFn2(11)).toBe(true); // simple
            expect(fixture.testFn2(10.2)).toBe(true); // non-integer
            expect(fixture.testFn2(Number.MAX_SAFE_INTEGER)).toBe(true); // max value
        });

        it('should fail given an integer less than the target', () => {
            try {
                fixture.testFn2(1);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should fail given a float slightly less than the target', () => {
            try {
                fixture.testFn2(10.01);
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
