import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Logger } from '../src/logger';
import { DatadogLogger } from '../src/datadog.logger';
import { INestApplication } from '@nestjs/common';
import { TestController, TestService } from './test.code';
import { RequestContextModule } from '../src/http-context/request.context.module';
import { traceware } from '../src/tracer';
import { ProtocolUtility } from '../src/protocol.utility';

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

    beforeAll(async () => {
       const moduleRef = await Test.createTestingModule({
           imports: [RequestContextModule],
           controllers: [TestController],
           providers: [TestService],
       }).compile();

       app = moduleRef.createNestApplication();
       const logger = new Logger(DatadogLogger.getLogger());
       app.useLogger(logger);
       app.use(traceware('test'));
       await app.init();
    });

    it('GET - No nested spans', () => {
       return request(app.getHttpServer())
           .get('/testservice/noNestedCall')
           .expect(200);
    });

    it('GET - with nested spans', () => {
        return request(app.getHttpServer())
            .get('/testservice/nestedCall')
            .expect(200);
    });

    it('POST - No nested spans', () => {
       return request(app.getHttpServer())
           .post('/testservice/noNestedCall')
           .expect(201);
    });

    it('POST - nested spans', () => {
        return request(app.getHttpServer())
            .post('/testservice/nestedCall')
            .expect(201);
    });

    afterAll(async () => {
        await app.close();
    });
});

describe('Retry logic tests', () => {
    it('retry throws exception on timeout', async () => {
        // @ts-ignore
        const retryFunction = undefined;

        let exceptionFound = false;

        try {
            await ProtocolUtility.retryForDuration(2000, 500, retryFunction);
        } catch (e) {
            exceptionFound = true;
        }

        expect(exceptionFound).toBe(true);
        return;
    });

    it('retry exits result', async () => {
        const testResult = 'hello';
        const retryFunction = async (): Promise<any> => {
           return testResult;
        };

        const result = await ProtocolUtility.retryForDuration(5000, 500, retryFunction);
        expect(result).toBe(testResult);
        return;
    });

    it('retry throws exception on timeout', async () => {
        const retryFunction = async () => {
           return undefined;
        };

        let exceptionFound = false;

        try {
           await ProtocolUtility.retryForDuration(2000, 500, retryFunction);
        } catch (e) {
           exceptionFound = true;
        }

        expect(exceptionFound).toBe(true);
        return;
    }, 2100);
});

