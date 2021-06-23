import { DateConversion } from '../src/date.conversion';

describe('Date conversion tests', () => {

    it('should convert date to int', () => {
        const int = DateConversion.convertDateToInt(2020, 6, 15);
        expect(int).toBe(20200615);
    });

    it('should convert int to date', () => {
        const [year, month, day] = DateConversion.convertIntToDate(20200615);
        expect(year).toBe(2020);
        expect(month).toBe(6);
        expect(day).toBe(15);
    });
});