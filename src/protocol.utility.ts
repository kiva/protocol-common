import { ProtocolException } from './protocol.exception';
import {ProtocolErrorCode} from './protocol.errorcode';

/**
 * Generic, commonly reused functions
 */
export class ProtocolUtility {

    /**
     * Protocol-common version of a sleep function
     * input is milliseconds
     */
    public static async delay(ms: number): Promise<any> {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

    /**
     *   Given two dates, return difference in MS.  Always returns a real number
     *   which makes its simpler for consumers as they dont have to worry about
     *   left or right.
     *   eg:
     *   ```
     *           const startOf = new Date();
     *           const deltaMS = timeDelta(new Date(), startOf));
     *           const deltaMS2 = timeDelta(startOf, new Date());
     *           // deltaMS === deltaMS2 === true
     *   ```
     */
    public static timeDelta(l: Date, r: Date): number {
        let result = l.getTime() - r.getTime();
        if (result <= 0) {
            result = (result + 1000) % 1000;
        }

        return result;
    }

    /**
     *   Consumers can call this method to retry logic until a duration has passed or the retry logic
     *   succeeds.  Success is the retryLogic returning a non nullish value.
     *
     *   durationMS:  how long the retry will occur before it throws an exception
     *   waitBetweenMD: delay between iterations
     *   retryFunction: async method containing retry logic.  retryFunction should return data if it is successful and the
     *                  control loop will exit.  The data returned by the retryFunction will be returned to the caller.
     *
     *                  any exception occurring in retryFunction will exit the loop without returning a result
     */
    public static async retryForDuration(durationMS: number, waitBetweenMS: number, retryFunction: any): Promise<any> {
        if (!retryFunction) {
            throw new ProtocolException(ProtocolErrorCode.COMMON_ERROR, 'retryFunction is required');
        }

        const startOf = new Date();
        while (durationMS > ProtocolUtility.timeDelta(new Date(), startOf)) {
            const result = await retryFunction();
            if (result) {
                return result;
            }

            await ProtocolUtility.delay(waitBetweenMS);
        }

        throw new ProtocolException(ProtocolErrorCode.COMMON_ERROR, 'duration was exceeded');
    }
}
