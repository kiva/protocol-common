import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { Logger } from '../src/logger';

describe('Sanity Tests', () => {
    beforeAll(() => {
    });
    it('blank test', () => {
        Logger.log('test complete');
    });
});
