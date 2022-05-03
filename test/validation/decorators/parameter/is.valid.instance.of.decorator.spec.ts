/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { IsDate, IsInt, Length, Min } from 'class-validator';
import { ValidateParams } from '../../../../dist/validation/decorators/function/validate.params.decorator.js';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode.js';
import { IsValidInstanceOf } from '../../../../dist/validation/decorators/parameter/is.valid.instance.of.decorator.js';

class TestClass1 {
    @IsInt() id: number;
    @Length(1) name: string;
}

class TestClass2 {
    @IsDate() date: Date;
    @Min(10) n: number;
}

class TestFixture {

    @ValidateParams
    testFn1(@IsValidInstanceOf(TestClass1) obj: TestClass1) {
        return true;
    }

    @ValidateParams
    testFn2(@IsValidInstanceOf(TestClass1, TestClass2) obj: TestClass1 | TestClass2) {
        return true;
    }
}

describe('@IsValidInstanceOf decorators tests', () => {

    const fixture = new TestFixture();

    describe('@IsValidInstanceOf a single class', () => {

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
                const classErrors = e.details.find((error) => Object.keys(error)[0] === TestClass1.name).TestClass1;
                expect(classErrors).toHaveLength(1);
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
                expect(e.details).toHaveLength(1);
                const classErrors = e.details.find((error) => Object.keys(error)[0] === TestClass1.name).TestClass1;
                expect(classErrors).toHaveLength(2);
            }
        });
    });

    describe('@IsValidInstanceOf multiple possible classes', () => {

        it('should succeed given valid fields of a properly typed object of any of multiple classes', () => {
            const obj1 = new TestClass1();
            obj1.id = 1;
            obj1.name = 'foobar';
            const obj2 = new TestClass2();
            obj2.date = new Date(Date.now());
            obj2.n = 11;

            const result1 = fixture.testFn2(obj1);
            expect(result1).toBe(true);
            const result2 = fixture.testFn2(obj2);
            expect(result2).toBe(true);
        });

        it('should fail if provided an instance that is not valid for any of multiple classes', () => {
            const obj: any = {
                id: 'foobar',
                name: 'foobar'
            };

            try {
                fixture.testFn2(obj);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(2);
                const class1Errors = e.details.find((error) => Object.keys(error)[0] === TestClass1.name).TestClass1;
                expect(class1Errors).toHaveLength(1);
                const class2Errors = e.details.find((error) => Object.keys(error)[0] === TestClass2.name).TestClass2;
                expect(class2Errors).toHaveLength(2);
            }
        });
    });
});
