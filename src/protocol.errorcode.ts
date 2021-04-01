/**
 * Different error codes for protocol related exceptions.
 */
export enum ProtocolErrorCode {

    // Common error codes
    COMMON_ERROR = 'CommonError',
    MISSING_DEVICE_DETAILS = 'MissingDeviceDetails',
    INTERNAL_SERVER_ERROR = 'InternalServerError',
    INVALID_NODE_ENVIRONMENT = 'InvalidNodeEnvironment',
    REGISTRY_CONNECTION_ERROR = 'RegistryConnectionError',
    MISSING_REQUEST_ID = 'MissingRequestId',
    VALIDATION_EXCEPTION = 'ValidationException',
    DUPLICATE_ENTRY = 'DuplicateEntry',
    NO_CITIZEN_FOUND = 'NoCitizenFound',
    NOT_FOUND = 'NotFound',
    TOO_MANY_FOUND = 'TooManyFound',
    INVALID_TOKEN = 'InvalidToken',
    MISSING_AGENT_ID = 'MissingAgentId',
    MISSING_CONFIGURATION = 'MissingConfiguration',
    MISSING_SPAN = 'MissingSpan',

    // Bio Auth error codes
    BIOANALYZER_SERVER_ERROR = 'BioanalyzerServerError',
    FINGERPRINT_NO_MATCH = 'FingerprintNoMatch',
    FINGERPRINT_LOW_QUALITY = 'FingerprintLowQuality',
    FINGERPRINT_MISSING_NOT_CAPTURED = 'FingerprintMissingNotCaptured',
    FINGERPRINT_MISSING_AMPUTATION = 'FingerprintMissingAmputation',
    FINGERPRINT_MISSING_UNABLE_TO_PRINT = 'FingerprintMissingUnableToPrint',
    INVALID_FILTERS = 'InvalidFilters',
    INVALID_PARAMS = 'InvalidParams',
    INVALID_IMAGE_ENCODING = 'InvalidImageEncoding',
    INVALID_IMAGE_FORMAT = 'InvalidImageFormat',
    INVALID_POSITION = 'InvalidPosition',
    INVALID_DATA_TYPE = 'InvalidDataType',
    INVALID_TEMPLATE_VERSION = 'InvalidTemplateVersion',
    INVALID_BACKEND_NAME = 'InvalidBackendName',
    INVALID_BACKEND_OPERATION = 'InvalidBackendOperation',

    // SMS error codes
    NO_PHONE_NUMBER = 'NoPhoneNumber',
    PHONE_NUMBER_NO_MATCH = 'PhoneNumberNoMatch',
    SMS_SEND_FAILED = 'SmsSendFailed',
    OTP_NO_MATCH = 'OtpNoMatch',
    OTP_EXPIRED = 'OtpExpired',
    TOO_MANY_ATTEMPTS = 'TooManyAttempts'
}
