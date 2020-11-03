import { Logger } from '../src/logger';
import { Controller, Get, Injectable, Post, Req, Request } from '@nestjs/common';
import { Trace } from '../src/trace.decorator';

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
    public async noNestedPostCall(@Req() req: Request) : Promise<any> {
        return 'completed';
    }

    @Post('/nestedCall')
    @Trace
    public async nestedPostCall(@Req() req: Request) : Promise<any> {
        return 'completed';
    }
}
