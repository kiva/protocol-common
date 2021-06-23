
export class DateConversion {

    public static convertDateToInt(year: number, month: number, day: number) {
        // TODO error handling
        return year * 10000 + month * 100 + day;
    }

    public static convertIntToDate(intDate: number) {
        // TODO error handling
        const day = intDate % 100;
        const month = Math.floor((intDate % 10000) / 100);
        const year = Math.floor(intDate / 10000);
        return [year, month, day];
    }
}