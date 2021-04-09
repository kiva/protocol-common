import { IsInt, Length } from 'class-validator';
import { ValidateParams } from '../../../../src/validation/decorators/function/validate.params.decorator';
import { IsValidInstance } from '../../../../src/validation/decorators/parameter/is.valid.instance.decorator';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode';

class TestClass1 {
    @IsInt() id: number;
    @Length(1) name: string;
}

class TestFixture {
    @ValidateParams
    testFn1(@IsValidInstance obj: TestClass1) {
        return true;
    }
}

describe('@IsValidInstance decorators tests', () => {

    const fixture = new TestFixture();

    it('should succeed given valid fields of an `any` typed object', () => {
        const obj: any = {
            id: 1,
            name: 'foobar'
        };
        const result = fixture.testFn1(obj);
        expect(result).toBe(true);
    });

    it('should succeed given valid fields of a properly typed object', () => {
        const obj = new TestClass1();
        obj.id = 1;
        obj.name = 'foobar';
        const result = fixture.testFn1(obj);
        expect(result).toBe(true);
    });

    it('should fail if provided an instance with one invalid field',  () => {
        const obj: any = {
            id: 'foobar',
            name: 'foobar'
        };
        try {
            fixture.testFn1(obj);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(1);
        }
    });

    it('should fail if provided an instance with multiple invalid fields', () => {
        const obj: any = {
            id: 11.1,
            name: ''
        };
        try {
            fixture.testFn1(obj);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(2);
        }
    });
});
