import { ProtocolErrorCode } from './protocol.errorcode.js';
import { ProtocolException } from './protocol.exception.js';

/**
 * Convenience functions for converting back and forth between various date formats and an int32 date of the form YYYYMMDD
 */
export class DateConversion {

    /**
     * Takes the components of a date (year, month, day) and converts it to int format
     */
    public static convertDateComponentsToInt(year: number, month: number, day: number): number {
        if (isNaN(year)) {
            throw new ProtocolException(ProtocolErrorCode.INVALID_DATE, `Unsupported year ${year}`);
        }
        if (isNaN(month) || month < 1 || month > 12) {
            throw new ProtocolException(ProtocolErrorCode.INVALID_DATE, `Unsupported month ${month}`);
        }
        if (isNaN(day) || day < 1 || day > 31) {
            throw new ProtocolException(ProtocolErrorCode.INVALID_DATE, `Unsupported day ${day}`);
        }
        return (year * 10000) + (month * 100) + day;
    }

    /**
     * Takes a string in the form YYYY-MM-DD and converts it to int format
     */
    public static convertDateStringToInt(dateString: string): number {
        const components = dateString.split('-');
        const year = parseInt(components[0], 10);
        const month = parseInt(components[1], 10);
        const day = parseInt(components[2], 10);
        return this.convertDateComponentsToInt(year, month, day);
    }

    /**
     * Takes a Date object and converts it to int format - note use UTC to avoid any timezone issues
     */
    public static convertUTCDateToInt(date: Date): number {
        const month = date.getUTCMonth() + 1; // UTC months start at 0, shift to start at 1
        return this.convertDateComponentsToInt(date.getUTCFullYear(), month, date.getUTCDate());
    }

    /**
     * Starting with a date represented as an int32 in the form YYYYMMDD converts to the date components: year, month, day
     */
    public static convertIntToDateComponents(intDate: number): Array<number> {
        const day = intDate % 100;
        if (day < 1 || day > 31) {
            throw new ProtocolException(ProtocolErrorCode.INVALID_DATE, `Unsupported day ${day}`);
        }
        const month = Math.floor((intDate % 10000) / 100);
        if (month < 1 || month > 12) {
            throw new ProtocolException(ProtocolErrorCode.INVALID_DATE, `Unsupported month ${month}`);
        }
        const year = Math.floor(intDate / 10000);
        return [year, month, day];
    }

    /**
     * Starting with an int date converts to a Date object (note using UTC)
     */
    public static convertIntToUTCDate(intDate: number): Date {
        const [year, month, day] = this.convertIntToDateComponents(intDate);
        const date = new Date(Date.UTC(year, month - 1, day)); // UTC months start at 0, shift by 1
        return date;
    }

    /**
     * Starting with an int date converts to a string formatted YYYY-MM-DD
     */
    public static convertIntToDateString(intDate: number): string {
        const [year, month, day] = this.convertIntToDateComponents(intDate);
        return `${year}-${this.pad(month)}-${this.pad(day)}`;
    }

    /**
     * Pads numbers with an extra 0 for string representation
     */
    private static pad(int: number): string {
        if (int > 0 && int < 10) {
            return `0${int}`;
        } else if (int < 100) {
            return `${int}`;
        } else {
            throw new ProtocolException(ProtocolErrorCode.INVALID_DATE, `Unsupported int to pad ${int}`);
        }
    }
}
