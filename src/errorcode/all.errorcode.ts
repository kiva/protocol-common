import { ProtocolErrorCode } from './protocol.errorcode';
import { BioAuthErrorCode } from './bioauth.errorcode';
import { SmsErrorCode } from './sms.errorcode';

export type AllErrorCode = ProtocolErrorCode | BioAuthErrorCode | SmsErrorCode;
