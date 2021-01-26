/**
 * Different error codes for bio-auth related exceptions.
 */
export enum BioAuthErrorCode {
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
    INVALID_BACKEND_OPERATION = 'InvalidBackendOperation'
}
