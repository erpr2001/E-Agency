import { Storage } from '@ionic/storage';

async function createStorage(): Promise<Storage> {
    const store = new Storage();
    await store.create();
    return store;
}

export const storage = createStorage();