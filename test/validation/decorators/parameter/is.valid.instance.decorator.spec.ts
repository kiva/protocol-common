/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { IsInt, Length } from 'class-validator';
import { ValidateParams } from '../../../../dist/validation/decorators/function/validate.params.decorator.js';
import { IsValidInstance } from '../../../../dist/validation/decorators/parameter/is.valid.instance.decorator.js';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode.js';

class TestClass1 {
    @IsInt() id: number;
    @Length(1) name: string;
}

class TestFixture {
    @ValidateParams
    testFn1(@IsValidInstance obj: TestClass1) {
        return obj.id;
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
        expect(result).toBe(obj.id);
    });

    it('should succeed given valid fields of a properly typed object', () => {
        const obj = new TestClass1();
        obj.id = 1;
        obj.name = 'foobar';
        const result = fixture.testFn1(obj);
        expect(result).toBe(obj.id);
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
