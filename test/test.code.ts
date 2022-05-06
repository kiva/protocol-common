/* eslint-disable import/extensions */
/**
 * Disabling import/extensions because this runs against typescript
 */
import { Controller, Get, Injectable, Logger, Post } from '@nestjs/common';
import { Trace } from '../dist/trace.decorator.js';

export class TestCode {
    @Trace
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
    @Trace
    public async noNestedGetCall() : Promise<any> {
        return 'completed';
    }

    @Get('/nestedCall')
    @Trace
    public async nestedGetCall() : Promise<any> {
        await new TestCode().subSpanTest();
        return 'completed';
    }

    @Post('/noNestedCall')
    @Trace
    public async noNestedPostCall() : Promise<any> {
        return 'completed';
    }

    @Post('/nestedCall')
    @Trace
    public async nestedPostCall() : Promise<any> {
        return 'completed';
    }
}
