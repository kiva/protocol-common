/**
 * Different error codes for protocol related exceptions.
 */
export enum ProtocolErrorCode {
    COMMON_ERROR = 'CommonError',
    FINGERPRINT_NOMATCH = 'FingerprintNoMatch',
    MISSING_DEVICE_DETAILS = 'MissingDeviceDetails',
    INTERNAL_SERVER_ERROR = 'InternalServerError',
    INVALID_NODE_ENVIRONMENT = 'InvalidNodeEnvironment',
    REGISTRY_CONNECTION_ERROR = 'RegistryConnectionError',
    MISSING_REQUEST_ID = 'MissingRequestId',
    VALIDATION_EXCEPTION = 'ValidationException',
    DUPLICATE_ENTRY = 'DuplicateEntry',
    NO_CITIZEN_FOUND = 'NoCitizenFound',
    TOO_MANY_FOUND = 'TooManyFound',
    INVALID_TOKEN = 'InvalidToken',
    MISSING_AGENT_ID = 'MissingAgentId',
    MISSING_CONFIGURATION = 'MissingConfiguration',
    MISSING_SPAN = 'MissingSpan'
}
