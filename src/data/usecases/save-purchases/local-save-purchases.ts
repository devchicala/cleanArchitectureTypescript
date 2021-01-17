import { CacheStore } from '@/data/protocols/cache'

export class LocalSavePurchases {
    constructor (private readonly cachestore: CacheStore) {}

    async save (): Promise<void> {
        this.cachestore.delete('purchases')
        this.cachestore.insert('purchases')
    }
}
