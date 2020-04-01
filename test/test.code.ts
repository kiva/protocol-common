import { Logger } from '../src/logger';
import { SubSpan } from '../src/sub.span.decorator';
import {Controller, Get, Injectable} from '@nestjs/common';

export class TestCode {
    @SubSpan
    public async subSpanTest(): Promise<string> {
        Logger.log('subSpanTest subFunction called');
        return 'blah';
    }
}

@Injectable()
export class TestService {
}

@Controller('testservice')
export class TestController {
    @Get('/noNestedCalls')
    @SubSpan
    public async noNestedCalls() : Promise<any> {
        return;
    }
}
