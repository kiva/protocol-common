import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProtocolHttpService } from './protocol.http.service.js';

@Module({
    imports: [HttpModule],
    providers: [ProtocolHttpService],
    exports: [ProtocolHttpService]
})
export class ProtocolHttpModule {}
