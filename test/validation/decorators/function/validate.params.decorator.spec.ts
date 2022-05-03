/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { IsInt, IsNumber } from 'class-validator';
import { ValidateParams } from '../../../../dist/validation/decorators/function/validate.params.decorator.js';
import { IsValidInstance } from '../../../../dist/validation/decorators/parameter/is.valid.instance.decorator.js';
import { ProtocolErrorCode } from '../../../../dist/protocol.errorcode.js';
import { GreaterThan } from '../../../../dist/validation/decorators/parameter/greater.than.decorator.js';
import { LessThan } from '../../../../dist/validation/decorators/parameter/less.than.decorator.js';
import { IsInteger } from '../../../../dist/validation/decorators/parameter/is.integer.decorator.js';

class TestClass1 {
    @IsInt() id: number;
}

class TestClass2 {
    @IsNumber() price: number;
}

class TestFixture {

    @ValidateParams
    testFn1(@IsValidInstance obj: TestClass1) {
        return true;
    }

    @ValidateParams
    testFn2(n: number, @IsValidInstance obj: TestClass1) {
        return true;
    }

    @ValidateParams
    testFn3(
        @GreaterThan(0) n: number,
        @IsValidInstance obj2: TestClass2
    ) {
        return true;
    }

    @ValidateParams
    testFn4(
        @IsInteger @GreaterThan(0) @LessThan(100) n: number
    ) {
        return true;
    }
}

describe('@ValidateParams tests', () => {

    const fixture = new TestFixture();

    describe('A function that accepts a single validations with the @IsValidInstance decorators', () => {

        it('should succeed given valid params', () => {
            const obj: any = {
                id: 1
            };
            const result = fixture.testFn1(obj);
            expect(result).toBe(true);
        });

        it('should fail if provided invalid params',  () => {
            const obj: any = {
                id: 'foobar'
            };
            try {
                fixture.testFn1(obj);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });
    });

    describe('A function with multiple parameters, one of which expects validation', () => {

        it('should succeed given valid param that needs validation', () => {
            const obj: any = {
                id: 1
            };
            const result = fixture.testFn2(1, obj);
            expect(result).toBe(true);
        });

        it('should fail if provided an invalid param that needs validation', () => {
            const obj: any = {
                id: 'foobar'
            };
            try {
                fixture.testFn2(1, obj);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });
    });

    describe('A function with multiple parameters that expect validation', () => {

        it('should succeed given valid params', () => {
            const obj2: any = {
                price: 10.1
            };
            const result = fixture.testFn3(2, obj2);
            expect(result).toBe(true);
        });

        it('should fail if just one param is invalid', () => {
            const obj2: any = {
                price: 'foobar'
            };
            try {
                fixture.testFn3(2, obj2);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should collect multiple failures if multiple params are invalid', () => {
            const obj2: any = {
                price: 'foobar'
            };
            try {
                fixture.testFn3(0, obj2);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(2);
            }
        });
    });

    describe('A function with a validations that expects multiple validations', () => {

        it('should succeed given a valid param', () => {
            const result = fixture.testFn4(50);
            expect(result).toBe(true);
        });

        it('should fail if a param that fails one validation', () => {
            try {
                fixture.testFn4(-5);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(1);
            }
        });

        it('should return multiple failures if a param fails multiple validations', () => {
            try {
                fixture.testFn4(101.1);
                fail('Expected a ValidationException error to be thrown');
            } catch (e) {
                expect(e.code).toBe(ProtocolErrorCode.VALIDATION_EXCEPTION);
                expect(e.details).toHaveLength(2);
            }
        });
    });
});
