import { Logger } from '../src/logger';
import { PeformanceTracker } from '../src/performance.tracker.decorator';
import {Controller, Get, Injectable, Post, Req, Request} from '@nestjs/common';

export class TestCode {
    @PeformanceTracker
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
    @PeformanceTracker
    public async noNestedGetCall() : Promise<any> {
        return 'completed';
    }

    @Post('/noNestedCall')
    @PeformanceTracker
    public async noNestedPostCall(@Req() req: Request) : Promise<any> {
        return 'completed';
    }
}
