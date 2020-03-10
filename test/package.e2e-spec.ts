import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Logger } from '../src/logger';
import { DatadogLogger} from '../src/datadog.logger';
import { INestApplication } from '@nestjs/common';

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
