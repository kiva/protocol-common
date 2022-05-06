/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { ValidateParams } from '../../../../dist/validation/decorators/function/validate.params.decorator.js';
import { IsNumber } from '../../../../dist/validation/decorators/parameter/is.number.decorator.js';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode.js';

class TestFixture {
    @ValidateParams
    testFn(@IsNumber n: number) {
        return n;
    }
}
describe('@IsNumber tests', () => {
    const fixture = new TestFixture();

    it('should succeed given a valid value', () => {
        expect(fixture.testFn(1)).toBe(1);
        expect(fixture.testFn(0)).toBe(0);
        expect(fixture.testFn(-1)).toBe(-1);
        expect(fixture.testFn(Number.MAX_SAFE_INTEGER)).toBe(Number.MAX_SAFE_INTEGER);
        expect(fixture.testFn(Number.MIN_SAFE_INTEGER)).toBe(Number.MIN_SAFE_INTEGER);
        expect(fixture.testFn(1.1)).toBe(1.1);
        expect(fixture.testFn(NaN)).toBe(NaN);
        expect(fixture.testFn(Infinity)).toBe(Infinity);
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
