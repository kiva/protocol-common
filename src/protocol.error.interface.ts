/**
 * Standard Error format for all the protocol microservices
 * TODO everything in the common dir can be made DRY between microservices: PRO-289
 */
export interface ProtocolError {
    /** A human readable but machine usable error code */
    code: string
    /** A detailed human readable message */
    message: string
    /** Optional field to add useful details */
    details?: any
}
