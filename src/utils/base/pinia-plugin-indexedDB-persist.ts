import { PiniaPluginContext } from 'pinia'
import { Drivers, Storage as IonicStorage } from '@ionic/storage';
export interface PersistStrategy {
    /**
     * @description 数据库名字， 命名规范：首字母大写
     */
    dataBase?: string,
    /**
     * @description 数据表 命名规范：首字母大写
     */
    dataSheet?: string,

    key?: string;
    storage?: Storage;
    /**
     * @description 需要缓存的变量名
     */
    paths?: string[];
}

export interface PersistOptions {
    enabled: true;
    strategies?: PersistStrategy[];
}

type Store = PiniaPluginContext['store'];
type PartialState = Partial<Store['$state']>;

declare module 'pinia' {
    export interface DefineStoreOptionsBase<S, Store> {
        indexedBD?: PersistOptions;
    }
}

export const updateStorage = (strategy: PersistStrategy, store: Store) => {
    const storage = strategy.storage || sessionStorage
    const storeKey = strategy.key || store.$id

    if (strategy.paths) {
        const partialState = strategy.paths.reduce((finalObj, key) => {
            finalObj[key] = store.$state[key]
            return finalObj
        }, {} as PartialState)

        storage.setItem(storeKey, JSON.stringify(partialState))
    } else {
        storage.setItem(storeKey, JSON.stringify(store.$state))
    }
}

export default ({ options, store }: PiniaPluginContext): void => {
    if (options.indexedBD?.enabled) {

        const defaultStrat: PersistStrategy[] = [{
            dataBase: 'FitsAdmin',
            dataSheet: store.$id,
            key: store.$id,
            storage: sessionStorage,
        }]

        const strategies = options.persist?.strategies?.length ? options.persist?.strategies : defaultStrat

        strategies.forEach(async (strategy: PersistStrategy) => {
            const storage = new IonicStorage({
                name: strategy.dataBase,
                storeName: strategy.dataSheet,
                driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
            });
            await storage.create()
            const storeSheet = strategy.key || store.$id
            const storageResult = storage.get(storeSheet)

            // if (storageResult) {
            //     store.$patch(JSON.parse(storageResult))
            //     updateStorage(strategy, store)
            // }
        })

        store.$subscribe(() => {
            strategies.forEach((strategy) => {
                updateStorage(strategy, store)
            })
        })
    }
}