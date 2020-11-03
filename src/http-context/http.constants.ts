/**
 * Enum defines different http header names, etc.
 */
export enum HttpConstants {
    REQUEST_ID_HEADER = 'x-request-id',
    REQUEST_ID = 'reqid',
    JWT_AUTH_HEADER = 'x-jwt-auth',
    FSP_ID_HEADER = 'x-fsp-id',
    PING_RESPONSE = 'pong',
    HEALTHZ_RESPONSE = 'OK',
    JSON_LIMIT = '50mb',
}
