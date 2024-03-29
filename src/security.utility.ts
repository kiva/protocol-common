import cryptoJs from 'crypto-js';

/**
 * The utility class having common security operations.
 */
export class SecurityUtility {

    /**
     * To make our hashes smaller and indexes faster we only use 32 characters of our SHA256 hash
     */
    public static hash32(value: string): string {
        const hash = cryptoJs.SHA256(value).toString();
        return hash.substring(0, 32);
    }
}
