class LocalSavePurchases {
    constructor (private readonly cachestore: CacheStore) {}

    async save (): Promise<void> {
        this.cachestore.delete()
    }
}

interface CacheStore {
    delete: () => void
}

class CacheStoreSpy  implements CacheStore{
    deleteCallsCount = 0

    delete (): void {
        this.deleteCallsCount++
    }
}

describe('Local', () => {
    test('should not delete cache on sut.init', () => {
        const cachestore = new CacheStoreSpy()
        new LocalSavePurchases(cachestore)
        expect(cachestore.deleteCallsCount).toBe(0)
    })
    

    test('should delete old cache on sut.save', async () => {
        const cachestore = new CacheStoreSpy()
        const sut = new LocalSavePurchases(cachestore)
        await sut.save()
        expect(cachestore.deleteCallsCount).toBe(1)
    })
})