import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Logger } from '../src/logger';
import { DatadogLogger} from '../src/datadog.logger';
import { INestApplication } from '@nestjs/common';
import { SpanInterceptor } from '../src/span.interceptor';
import {TestCode, TestController, TestService} from './test.code';

describe('Sanity Tests', () => {
    let app: INestApplication;
    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({}).compile();

        app = moduleFixture.createNestApplication();
        const logger = new Logger(DatadogLogger.getLogger());
        app.useLogger(logger);
    });
    it('a sanity test using the logger', () => {
        Logger.log('test complete');
    });
    it('logging with metadata', () => {
        Logger.log('test complete', { element1: 'bob', element2: 'sam'});
    });
});

describe('Span Tests', () => {
    let app: INestApplication;
    let controller: TestController;
    let service: TestService;

   beforeAll(async () => {
       const moduleRef = await Test.createTestingModule({
           controllers: [TestController],
           providers: [TestService],
       }).compile();

       service = moduleRef.get<TestService>(TestService);
       controller = moduleRef.get<TestController>(TestController);
       app = moduleRef.createNestApplication();
       const logger = new Logger(DatadogLogger.getLogger());
       app.useLogger(logger);
       app.useGlobalInterceptors(new SpanInterceptor());
       await app.init();
   });

   beforeEach(async () => {

   });

   it('No nested spans', () => {
       return request(app.getHttpServer())
           .get('/testservice/noNestedCalls')
           .expect(200);
   });

    afterAll(async () => {
        await app.close();
    });
});


