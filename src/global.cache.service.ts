import { CACHE_MANAGER, CacheStore, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CacheService implements CacheStore {
    private cache!: CacheStore;
    private prefix: string;

    constructor(@Inject(CACHE_MANAGER) cache: CacheStore) {
        this.cache = cache;
        this.prefix = `${process.env.NODE_ENV}-${process.env.SERVICE_NAME}-`;
    }

    public async get(key: string): Promise<any> {
        return this.cache.get(this.prefix + key);
    }

    public async set(key: string, value: any, options?: { ttl: number }): Promise<void> {
        this.cache.set(this.prefix + key, value, options);
    }

    public async del(key: string): Promise<void> {
        this.cache.del(this.prefix + key);
    }
}