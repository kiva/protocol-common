
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
}
