import { IsDate, IsInt, Length, Min } from 'class-validator';
import { ProtocolErrorCode } from '../../../dist/protocol.errorcode';
import { isValidInstanceOf, isValidInstanceOfOrFail } from '../../../src/validation/validations/is.valid.instance.of';

class TestClass1 {
    @IsInt() id: number;
    @Length(1) name: string;
}

class TestClass2 {
    @IsDate() date: Date;
    @Min(10) n: number;
}

describe('isValidInstanceOf & isValidInstanceOfOrFail tests', () => {

    describe('test validation against a single class', () => {

        it('should succeed given valid fields of an `any` typed object', () => {
            const obj: any = {
                id: 1,
                name: 'foobar'
            };

            // isValidInstanceOf
            expect(isValidInstanceOf(obj, TestClass1)).toHaveLength(0);

            // isValidInstanceOfOrFail
            isValidInstanceOfOrFail(obj, TestClass1);
        });

        it('should succeed given valid fields of a properly typed object', () => {
            const obj = new TestClass1();
            obj.id = 1;
            obj.name = 'foobar';

            // isValidInstanceOf
            expect(isValidInstanceOf(obj, TestClass1)).toHaveLength(0);

            // isValidInstanceOfOrFail
            isValidInstanceOfOrFail(obj, TestClass1);
        });

        it('should fail if provided an instance with one invalid field', () => {
            const obj: any = {
                id: 'foobar',
                name: 'foobar'
            };

            // isValidInstanceOf
            const errors = isValidInstanceOf(obj, TestClass1);
            expect(errors).toHaveLength(1);
            let classErrors = errors.find((error) => Object.keys(error)[0] === TestClass1.name).TestClass1;
            expect(classErrors).toHaveLength(1);

            // isValidInstanceOfOrFail
            try {
                isValidInstanceOfOrFail(obj, TestClass1);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
                classErrors = e.details.find((error) => Object.keys(error)[0] === TestClass1.name).TestClass1;
                expect(classErrors).toHaveLength(1);
            }
        });

        it('should fail if provided an instance with multiple invalid fields', () => {
            const obj: any = {
                id: 11.1,
                name: ''
            };

            // isValidInstanceOf
            const errors = isValidInstanceOf(obj, TestClass1);
            expect(errors).toHaveLength(1);
            let classErrors = errors.find((error) => Object.keys(error)[0] === TestClass1.name).TestClass1;
            expect(classErrors).toHaveLength(2);

            // isValidInstanceOfOrFail
            try {
                isValidInstanceOfOrFail(obj, TestClass1);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
                classErrors = e.details.find((error) => Object.keys(error)[0] === TestClass1.name).TestClass1;
                expect(classErrors).toHaveLength(2);
            }
        });
    });

    describe('test validation against multiple classes', () => {

        it('should succeed given valid fields of a properly typed object of any of multiple classes', () => {
            const obj1 = new TestClass1();
            obj1.id = 1;
            obj1.name = 'foobar';
            const obj2 = new TestClass2();
            obj2.date = new Date(Date.now());
            obj2.n = 11;


            // isValidInstanceOf
            expect(isValidInstanceOf(obj1, TestClass1, TestClass2)).toHaveLength(0);
            expect(isValidInstanceOf(obj2, TestClass1, TestClass2)).toHaveLength(0);

            // isValidInstanceOfOrFail
            isValidInstanceOfOrFail(obj1, TestClass1, TestClass2);
            expect(isValidInstanceOf(obj2, TestClass1, TestClass2)).toHaveLength(0);
        });

        it('should fail if provided an instance that is not valid for any of multiple classes', () => {
            const obj: any = {
                id: 'foobar',
                name: 'foobar'
            };

            // isValidInstanceOf
            const errors = isValidInstanceOf(obj, TestClass1, TestClass2);
            expect(errors).toHaveLength(2);
            let class1Errors = errors.find((error) => Object.keys(error)[0] === TestClass1.name).TestClass1;
            expect(class1Errors).toHaveLength(1);
            let class2Errors = errors.find((error) => Object.keys(error)[0] === TestClass2.name).TestClass2;
            expect(class2Errors).toHaveLength(2);

            // isValidInstanceOfOrFail
            try {
                isValidInstanceOfOrFail(obj, TestClass1, TestClass2);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(2);
                class1Errors = e.details.find((error) => Object.keys(error)[0] === TestClass1.name).TestClass1;
                expect(class1Errors).toHaveLength(1);
                class2Errors = e.details.find((error) => Object.keys(error)[0] === TestClass2.name).TestClass2;
                expect(class2Errors).toHaveLength(2);
            }
        });
    });
});
