/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { ValidateParams } from '../../../../dist/validation/decorators/function/validate.params.decorator.js';
import { IsInteger } from '../../../../dist/validation/decorators/parameter/is.integer.decorator.js';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode.js';

class TestFixture {
    @ValidateParams
    testFn(@IsInteger n: number) {
        return true;
    }
}

describe('@IsInteger tests', () => {

    const fixture = new TestFixture();

    it('should succeed given a valid value', () => {
        expect(fixture.testFn(1)).toBe(true); // simple
        expect(fixture.testFn(0)).toBe(true); // zero
        expect(fixture.testFn(-1)).toBe(true); // negative
        expect(fixture.testFn(Number.MAX_SAFE_INTEGER)).toBe(true); // max value
        expect(fixture.testFn(Number.MIN_SAFE_INTEGER)).toBe(true); // min value
    });

    it('should fail given a float', () => {
        try {
            fixture.testFn(1.1);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });

    it('should fail given a non-number input', () => {
        try {
            const input: any = 'foo';
            fixture.testFn(input);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });
});
