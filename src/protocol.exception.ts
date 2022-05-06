import { ProtocolError } from './protocol.error.interface.js';
import { HttpStatus } from '@nestjs/common';

export class ProtocolException implements ProtocolError {
    constructor(public code: string, public message: string, public details?: any, public httpStatus = HttpStatus.BAD_REQUEST) {}
}
