/**
 * Different error codes for protocol related exceptions.
 */
export enum ProtocolErrorCode {

    // Generic error codes
    COMMON_ERROR = 'CommonError',
    NOT_FOUND = 'NotFound',
    TOO_MANY_FOUND = 'TooManyFound',
    NOT_IMPLEMENTED = 'NotImplemented',
    INTERNAL_SERVER_ERROR = 'InternalServerError',
    INVALID_NODE_ENVIRONMENT = 'InvalidNodeEnvironment',
    DUPLICATE_ENTRY = 'DuplicateEntry',
    MISSING_REQUEST_ID = 'MissingRequestId',
    VALIDATION_EXCEPTION = 'ValidationException',
    INVALID_TOKEN = 'InvalidToken',
    MISSING_CONFIGURATION = 'MissingConfiguration',
    PLUGIN_ERROR = 'PluginError',
    
    // Domain-specific error codes
    REGISTRY_CONNECTION_ERROR = 'RegistryConnectionError',
    MISSING_DEVICE_DETAILS = 'MissingDeviceDetails',
    NO_CITIZEN_FOUND = 'NoCitizenFound',
    MISSING_AGENT_ID = 'MissingAgentId',
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
    TOO_MANY_ATTEMPTS = 'TooManyAttempts',

    // Aries related error codes
    NO_CREDENTIAL_TO_REVOKE = 'NoCredentialToRevoke',
    NO_CRED_DEF = 'NoCredDef',
    PROOF_FAILED_NO_RESPONSE = 'ProofFailedNoResponse',
    PROOF_FAILED_UNFULFILLED = 'ProofFailedUnfulfilled',
    PROOF_FAILED_VERIFICATION = 'ProofFailedVerification',
    CONNECTION_NOT_READY = 'ConnectionNotReady',
}
