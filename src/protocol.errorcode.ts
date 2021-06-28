/**
 * Different error codes for protocol related exceptions.
 */
export enum ProtocolErrorCode {

    // Generic error codes
    COMMON_ERROR = 'CommonError',
    DUPLICATE_ENTRY = 'DuplicateEntry',
    FORBIDDEN_EXCEPTION = 'ForbiddenException',
    INTERNAL_SERVER_ERROR = 'InternalServerError',
    INVALID_NODE_ENVIRONMENT = 'InvalidNodeEnvironment',
    INVALID_TOKEN = 'InvalidToken',
    MISSING_CONFIGURATION = 'MissingConfiguration',
    MISSING_REQUEST_ID = 'MissingRequestId',
    NOT_FOUND = 'NotFound',
    NOT_IMPLEMENTED = 'NotImplemented',
    PLUGIN_ERROR = 'PluginError',
    TOO_MANY_FOUND = 'TooManyFound',
    VALIDATION_EXCEPTION = 'ValidationException',
    
    // Domain-specific error codes
    MISSING_AGENT_ID = 'MissingAgentId',
    MISSING_DEVICE_DETAILS = 'MissingDeviceDetails',
    MISSING_SPAN = 'MissingSpan',
    NO_CITIZEN_FOUND = 'NoCitizenFound',
    NOT_REGISTERED = 'NotRegistered',
    RATE_LIMIT_CONFIGURATION = 'RateLimitConfiguration',
    REGISTRY_CONNECTION_ERROR = 'RegistryConnectionError',

    // Bio Auth error codes
    BIOANALYZER_SERVER_ERROR = 'BioanalyzerServerError',
    FINGERPRINT_LOW_QUALITY = 'FingerprintLowQuality',
    FINGERPRINT_MISSING_AMPUTATION = 'FingerprintMissingAmputation',
    FINGERPRINT_MISSING_NOT_CAPTURED = 'FingerprintMissingNotCaptured',
    FINGERPRINT_MISSING_UNABLE_TO_PRINT = 'FingerprintMissingUnableToPrint',
    FINGERPRINT_NO_MATCH = 'FingerprintNoMatch',
    INVALID_BACKEND_NAME = 'InvalidBackendName',
    INVALID_BACKEND_OPERATION = 'InvalidBackendOperation',
    INVALID_DATA_TYPE = 'InvalidDataType',
    INVALID_FILTERS = 'InvalidFilters',
    INVALID_IMAGE_ENCODING = 'InvalidImageEncoding',
    INVALID_IMAGE_FORMAT = 'InvalidImageFormat',
    INVALID_PARAMS = 'InvalidParams',
    INVALID_POSITION = 'InvalidPosition',
    INVALID_TEMPLATE_VERSION = 'InvalidTemplateVersion',
    
    // SMS error codes
    NO_PHONE_NUMBER = 'NoPhoneNumber',
    OTP_EXPIRED = 'OtpExpired',
    OTP_NO_MATCH = 'OtpNoMatch',
    PHONE_NUMBER_NO_MATCH = 'PhoneNumberNoMatch',
    SMS_SEND_FAILED = 'SmsSendFailed',
    TOO_MANY_ATTEMPTS = 'TooManyAttempts',

    // Aries related error codes
    AGENCY_GOVERNANCE = 'AgencyGovernance',
    AGENT = 'AGENT',
    AGENT_CALL_FAILED = 'AgentCallFailed',
    CONNECTION_NOT_READY = 'ConnectionNotReady',
    ISSUE_FAILED = 'IssueFailed',
    NO_CRED_DEF = 'NoCredDef',
    NO_CREDENTIAL_TO_REVOKE = 'NoCredentialToRevoke',
    PROOF_FAILED_NO_RESPONSE = 'ProofFailedNoResponse',
    PROOF_FAILED_UNFULFILLED = 'ProofFailedUnfulfilled',
    PROOF_FAILED_VERIFICATION = 'ProofFailedVerification',
    PROBLEM_REPORT = 'ProblemReport',
}
