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

type SutTypes = {
    sut: LocalSavePurchases
    cacheStore: CacheStore
}

const makeSut = (): SutTypes => {
    const cachestore = new CacheStoreSpy()
        new LocalSavePurchases(cachestore)
}

describe('LocalSavePurchases', () => {
    test('Should not delete cache on sut.init', () => {
        
        expect(cachestore.deleteCallsCount).toBe(0)
    })
    

    test('Should delete old cache on sut.save', async () => {
        const cachestore = new CacheStoreSpy()
        const sut = new LocalSavePurchases(cachestore)
        await sut.save()
        expect(cachestore.deleteCallsCount).toBe(1)
    })
})