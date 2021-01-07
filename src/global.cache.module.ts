import { Global, Module, CacheModule } from '@nestjs/common';
import * as fsStore from 'cache-manager-fs-hash';
import * as redisStore from 'cache-manager-redis-store';
import * as dynamoStore from 'dynamodb-cache-manager';
import { Logger } from './logger';

/**
 * Supports redis or dynamodb in our deployed environments, and a file system cache for local testing
 */
@Global()
@Module({
    imports: [CacheModule.registerAsync({
        useFactory: () => {
            if (process.env.CACHE_DATASTORE === 'REDIS') {
                Logger.log('Using redis cache');
                return {
                    store: redisStore,
                    host: process.env.REDIS_HOST,
                    auth_pass: process.env.REDIS_PASS,
                    port: 6379,
                    ttl: 0,
                    max: Number.MAX_SAFE_INTEGER
                };
            } else if (process.env.CACHE_DATASTORE === 'DYNAMO') {
                Logger.log('Using dynamodb cache');
                return {
                    store: dynamoStore,
                    tableName: process.env.DYNAMO_TABLE_NAME,
                    keyField: process.env.DYNAMO_KEY_FIELD,
                    valField: process.env.DYNAMO_VAL_FIELD,
                    connection: {
                        region: process.env.DYNAMO_REGION
                    },
                    ttl: 0,
                    max: Number.MAX_SAFE_INTEGER
                };
            } else {
                Logger.log('Using file system cache');
                return {
                    store: fsStore,
                    path:'/tmp/diskcache',
                    ttl: parseInt(process.env.DEFAULT_CACHE_TTL, 10),
                    max: 1000
                };
            }
        }
    })],
    exports: [CacheModule]
})
export class GlobalCacheModule {}