import { IsInt, Length } from 'class-validator';
import { isValidInstance, isValidInstanceOrFail } from '../../../src/validation/validations/is.valid.instance';
import { ProtocolErrorCode } from '../../../dist/protocol.errorcode';

class TestClass1 {
    @IsInt() id: number;
    @Length(1) name: string;
}

describe('isValidInstance & isValidInstanceOrFail tests', () => {

    it('should succeed given valid fields of an `any` tpyed object', () => {
        const obj: any = {
            id: 1,
            name: 'foobar'
        };

        // isValidInstance
        expect(isValidInstance(obj, TestClass1)).toHaveLength(0);

        // isValidInstanceOrFail
        isValidInstanceOrFail(obj, TestClass1);
    });

    it('should succeed given valid fields of a properly typed object', () => {
        const obj = new TestClass1();
        obj.id = 1;
        obj.name = 'foobar';

        // isValidInstance
        expect(isValidInstance(obj, TestClass1)).toHaveLength(0);

        // isValidInstanceOrFail
        isValidInstanceOrFail(obj, TestClass1);
    });

    it('should fail if provided an instance with one invalid field', () => {
        const obj: any = {
            id: 'foobar',
            name: 'foobar'
        };

        // isValidInstance
        expect(isValidInstance(obj, TestClass1)).toHaveLength(1);

        // isValidInstanceOrFail
        try {
            isValidInstanceOrFail(obj, TestClass1);
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

        // isValidInstance
        expect(isValidInstance(obj, TestClass1)).toHaveLength(2);

        // isValidInstanceOrFail
        try {
            isValidInstanceOrFail(obj, TestClass1);
            fail('Expected a ValidationException error to be thrown');
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
            expect(e.details).toHaveLength(2);
        }
    });
});
