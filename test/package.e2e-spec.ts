import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Logger } from '../src/logger';
import { DatadogLogger} from '../src/datadog.logger';
import { INestApplication } from '@nestjs/common';
import { TestController, TestService} from './test.code';
import { RequestContextModule } from '../src/http-context/request.context.module';

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
           imports: [RequestContextModule],
           controllers: [TestController],
           providers: [TestService],
       }).compile();

       service = moduleRef.get<TestService>(TestService);
       controller = moduleRef.get<TestController>(TestController);
       app = moduleRef.createNestApplication();
       const logger = new Logger(DatadogLogger.getLogger());
       app.useLogger(logger);
       await app.init();
   });

   beforeEach(async () => {

   });

   it('GET - No nested spans', () => {
       return request(app.getHttpServer())
           .get('/testservice/noNestedCall')
           .expect(200);
   });

   it('POST - No nested spans', () => {
       return request(app.getHttpServer())
           .post('/testservice/noNestedCall')
           .expect(200);
   });

    afterAll(async () => {
        await app.close();
    });
});


