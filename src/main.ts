// entry point for the npm package

export function version(): string {
    return '1.0';
}

/*
    Protocol-common version of a sleep function
    input is milliseconds
*/
export async function delay(ms: number): Promise<any> {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
