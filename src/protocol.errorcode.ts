
/**
 * author: esmaeila
 * Different error code submitted to protocol related exceptions.
 */

export enum ProtocolErrorCode {
    FINGERPRINT_NOMATCH = 'FingerprintNoMatch',
    MISSING_DEVICE_DETAILS = 'MissingDeviceDetails',
    INTERNAL_SERVER_ERROR = 'InternalServerError',
    INVALID_NODE_ENVIRONMENT = 'InvalidNodeEnvironment',
    REGISTRY_CONNECTION_ERROR = 'RegistryConnectionError',
    MISSING_REQUEST_ID = 'MissingRequestId',
    VALIDATION_EXCEPTION = 'ValidationException',
}
