import cryptoRandomString from 'crypto-random-string';

export const LOWER_CASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
export const UPPER_CASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ALL_LETTERS = LOWER_CASE_LETTERS + UPPER_CASE_LETTERS;
export const NUMBERS = '0123456789';
export const ALPHANUMERIC = ALL_LETTERS + NUMBERS;
export const URL_SAFE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~';
export const ASCII = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~';

/**
 * Generate a string of random characters. You can optionally specify the length of the generated string and the character set to select from.
 *
 * @param length Desired length of the generated string. Defaults to 10.
 * @param charset Desired character set to select characters from at random. Default to Alphanumeric (a-zA-Z0-9).
 */
export const randomString = (length = 10, charset: string = ALPHANUMERIC) => {
    return cryptoRandomString({ length, characters: charset });
};

/**
 * Generate a random hexadecimal string. You can optionally specify the length of the generated string.
 *
 * @param length Desired length of the generated string. Defaults to 10.
 */
export const randomHexString = (length = 10) => {
    return cryptoRandomString( { length, type: 'hex' });
};

/**
 * Generate a random base64 string. You can optionally specify the length of the generated string.
 *
 * @param length Desired length of the generated string. Defaults to 10.
 */
export const randomBase64String = (length = 10) => {
    return cryptoRandomString( { length, type: 'base64' });
};
