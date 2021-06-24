import { ValidateParams } from '../../../../src/validation/decorators/function/validate.params.decorator';
import { IsNumber } from '../../../../src/validation/decorators/parameter/is.number.decorator';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode';

class TestFixture {
    @ValidateParams
    testFn(@IsNumber n: number) {
        return true;
    }
}
describe('@IsNumber tests', () => {
    const fixture = new TestFixture();

    it('should succeed given a valid value', () => {
        expect(fixture.testFn(1)).toBe(true);
        expect(fixture.testFn(0)).toBe(true);
        expect(fixture.testFn(-1)).toBe(true);
        expect(fixture.testFn(Number.MAX_SAFE_INTEGER)).toBe(true);
        expect(fixture.testFn(Number.MIN_SAFE_INTEGER)).toBe(true);
        expect(fixture.testFn(1.1)).toBe(true);
        expect(fixture.testFn(NaN)).toBe(true);
        expect(fixture.testFn(Infinity)).toBe(true);
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
