
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
        Given two dates, return difference in MS.
        Assumes first input is newest, and oldest input is second resulting
        in a positive return value.
        eg:
        ```
                const startOf = new Date();
                const deltaMS = timeDelta(new Date(), startOf));
        ```
     */
    public static timeDelta(newest: Date, oldest: Date): number {
        let result = newest.getTime() - oldest.getTime();
        if (result <= 0) {
            result = (result + 1000) % 1000;
        }

        return result;
    }
}
