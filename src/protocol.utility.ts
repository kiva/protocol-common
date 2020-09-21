
/*
    Generic, commonly reused functions
*/
export class ProtocolUtility {
    /*
    Protocol-common version of a sleep function
    input is milliseconds
    */
    public static async delay(ms: number): Promise<any> {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    /*
        Given two dates, return difference in MS.  Always returns a real number
        which makes its simpler for consumers as they dont have to worry about
        left or right.
        eg:
        ```
                const startOf = new Date();
                const deltaMS = timeDelta(new Date(), startOf));
                const deltaMS2 = timeDelta(startOf, new Date());
                // deltaMS === deltaMS2 === true
        ```
     */
    public static timeDelta(l: Date, r: Date): number {
        let result = l.getTime() - r.getTime();
        if (result <= 0) {
            result = (result + 1000) % 1000;
        }

        return result;
    }
}
