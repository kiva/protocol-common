import { DateConversion } from '../src/date.conversion';
import { ProtocolErrorCode } from '../src/protocol.errorcode';

describe('Date conversion tests', () => {

    it('should convert date components to int', () => {
        let int = DateConversion.convertDateComponentsToInt(2020, 6, 1);
        expect(int).toBe(20200601);
        int = DateConversion.convertDateComponentsToInt(100, 12, 31);
        expect(int).toBe(1001231);
    });

    it('should convert UTC Date to int', () => {
        let date = new Date(Date.UTC(2020, 5, 1)); // UTC months start at 0
        let int = DateConversion.convertUTCDateToInt(date);
        expect(int).toBe(20200601);
        date = new Date(Date.UTC(100, 11, 31));
        int = DateConversion.convertUTCDateToInt(date);
        expect(int).toBe(1001231);
    });

    it('should convert date string to int', () => {
        let date = '2020-06-01'
        let int = DateConversion.convertDateStringToInt(date);
        expect(int).toBe(20200601);
        date = '100-12-31'
        int = DateConversion.convertDateStringToInt(date);
        expect(int).toBe(1001231);
    });

    it('should convert int to date components', () => {
        let [year, month, day] = DateConversion.convertIntToDateComponents(20200601);
        expect(year).toBe(2020);
        expect(month).toBe(6);
        expect(day).toBe(1);
        [year, month, day] = DateConversion.convertIntToDateComponents(1001231);
        expect(year).toBe(100);
        expect(month).toBe(12);
        expect(day).toBe(31);
    });

    it('should convert int to UTC Date', () => {
        let date = DateConversion.convertIntToUTCDate(20200601);
        expect(date).toStrictEqual(new Date(Date.UTC(2020, 5, 1)));
        date = DateConversion.convertIntToUTCDate(1001231);
        expect(date).toStrictEqual(new Date(Date.UTC(100, 11, 31)));
    });

    it('should convert int to date string', () => {
        let dateString = DateConversion.convertIntToDateString(20200601);
        expect(dateString).toBe('2020-06-01');
        dateString = DateConversion.convertIntToDateString(1001231);
        expect(dateString).toBe('100-12-31');
    });

    it('should throw month error on conversion to int', () => {
        expect.assertions(1);
        try {
            DateConversion.convertDateComponentsToInt(2020, 13, 1);
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.INVALID_DATE);
        }
    });

    it('should throw day error on conversion to int', () => {
        expect.assertions(1);
        try {
            DateConversion.convertDateComponentsToInt(2020, 11, -1);
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.INVALID_DATE);
        }
    });

    it('should throw month error on conversion from int', () => {
        expect.assertions(1);
        try {
            DateConversion.convertIntToDateComponents(20201301);
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.INVALID_DATE);
        }
    });

    it('should throw day error on conversion from int', () => {
        expect.assertions(1);
        try {
            DateConversion.convertIntToDateComponents(20201132);
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.INVALID_DATE);
        }
    });

    it('should throw string conversion error', () => {
        expect.assertions(1);
        try {
            DateConversion.convertDateStringToInt('2020/12/31'); // needs to be 2020-12-31
        } catch (e) {
            expect(e.code).toBe(ProtocolErrorCode.INVALID_DATE);
        }
    });
});
