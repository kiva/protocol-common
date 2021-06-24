import { ValidateParams } from '../../../../dist/validation/decorators/function/validate.params.decorator';
import { IsString } from '../../../../src/validation/decorators/parameter/is.string.decorator';
import { ProtocolErrorCode } from '../../../../src/protocol.errorcode';

class TestFixture {
    @ValidateParams
    testFn(@IsString s: string) {
        return true;
    }
}

describe('@IsString tests', () => {
    const fixture = new TestFixture();

    it('should succeed given a valid value', () => {
        expect(fixture.testFn('foo')).toBe(true);
        expect(fixture.testFn('')).toBe(true);
    });

    it('should fail given a number input', () => {
        try {
            const input: any = 1;
            fixture.testFn(input);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });

    it('should fail given a null input', () => {
        try {
            const input: any = null;
            fixture.testFn(input);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });

    it('should fail given a object input', () => {
        try {
            const input: any = {};
            fixture.testFn(input);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });
});
