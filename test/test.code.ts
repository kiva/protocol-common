import { Logger } from '../src/logger';
import { SubSpan } from '../src/sub.span.decorator';
import {Controller, Get, Injectable, Post, Req, Request} from '@nestjs/common';

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
    @Get('/noNestedCall')
    @SubSpan
    public async noNestedGetCall() : Promise<any> {
        return 'completed';
    }

    @Post('/noNestedCall')
    @SubSpan
    public async noNestedPostCall(@Req() req: Request) : Promise<any> {
        return 'completed';
    }
}
