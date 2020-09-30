
/*
    Generic, commonly reused functions
*/
import { ProtocolException } from './protocol.exception';

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

    /*
        Consumers can call this method to retry logic until a duration has passed or the retry logic
        returns true.

        durationMS:  how long the retry will occur before it throws an exception
        waitBetweenMD: delay between iterations
        retryFunction: async method containing retry logic.  On true, the retry loop exists.  On false it retries

         toThink(): should retryFunction return 3 possible values:
            -1 abort logic and throw exception (no current value for this)
             0 to continue retry (currently false)
             1 to exit retry and return true (currently true)
     */
    public static async retryForDuration(durationMS: number, waitBetweenMS: number, retryFunction: any): Promise<boolean> {
        if (!retryFunction) {
            throw new ProtocolException('Common Error', 'retryFunction is required');
        }

        const startOf = new Date();
        while (durationMS > ProtocolUtility.timeDelta(new Date(), startOf)) {
            try {
                if (true === await retryFunction()) {
                    return true;
                }
            } catch (e) {
                // Do nothing and try again
                // tothink() would it be benefical to have consumers provide input (aka call another closure) on how to proceed
            }

            await ProtocolUtility.delay(waitBetweenMS);
        }

        throw new ProtocolException('Common Error', 'duration was exceeded');
    }
}
