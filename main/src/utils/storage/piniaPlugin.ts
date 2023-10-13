/*
 * @Author: caoguanjie 
 * @Date: 2023-10-11 16:35:54 
 * @Last Modified by: caogj
 * @Last Modified time: 2023-10-11 19:33:54
 */

import { PiniaPluginContext, StateTree, Store, SubscriptionCallbackMutation } from 'pinia'
import { isPlainObject, isBoolean, isUndefined, isArray } from './utils';
import { IExtendPersist, IPluginOption, IStorageOption, PartialState, PersistOptions, TPersist } from './types';
import { fitslog } from './logger'
import { CreateLocalForage } from './localForage';
import { CreateStorage } from './storages';
import { CreateCookies } from './cookies';
const validate = (persist: TPersist) => {
    if (isPlainObject(persist) || isBoolean(persist) || isArray(persist) || isUndefined(persist)) {
        return Boolean(persist);
    }
    fitslog.danger('persist error');
    return false;
};

/**
 * 根据类型生成不同的存储对象
 */
function getStorageObj(type: string, persist: IStorageOption) {
    let _store: any;
    switch (type) {
        case 'indexedDB': {
            _store = new CreateLocalForage(persist);
            break;
        }
        case 'storage': {
            _store = new CreateStorage(persist);
            break;
        }
        case 'cookies': {
            _store = new CreateCookies(persist);
            break;
        }
    }
    return _store
}

function pick(state: StateTree, paths: string[]) {
    const partialState = paths.reduce((finalObj, key) => {
        finalObj[key] = state[key]
        return finalObj
    }, {} as PartialState)
    return partialState
}

/**
 * 更新本地存储的数据
 * @param state 
 * @param persist 
 */
export const updateStorage = (state: StateTree, persist: IExtendPersist) => {
    const { storages, key, paths, debug, day, isOpenExpires } = persist;
    try {
        const data = isArray(paths) ? pick(state, paths) : state;
        storages!.setItem(key!, data as any, day, isOpenExpires)
    } catch (e) {
        if (debug) {
            fitslog.danger(e as string);
        }
    }
}

const hydrateStore = async (store: Store, persist: IExtendPersist) => {
    const { storages, key, debug } = persist;
    try {
        const data: any = await storages!.getItem(key!);
        // fitslog.warning(data, `获取本地存储数据${key}:`)
        if (data) {
            store.$patch(isPlainObject(data) ? data : JSON.parse(data));
        }
    } catch (e) {
        if (debug) {
            fitslog.danger(e as string);
        }
    }
};

/**
 * 如果入参是对象的话，将对象转成数组
 * @param persist 
 * @returns 
 */
const getConfig = (persist: PersistOptions | PersistOptions[], store: Store, option: IPluginOption): IExtendPersist[] => {
    if (isPlainObject(persist)) {
        return new Array({
            type: persist.type ?? 'indexedDB',
            name: persist.name,
            storage: persist.storage ?? undefined,
            storeName: persist.name,
            storages: getStorageObj(persist.type ?? 'indexedDB', { ...option, ...persist }),
            key: persist.key ?? store.$id,
            paths: persist.paths ?? undefined,
            debug: persist.debug ?? false,
            encryption: persist.encryption ?? false,
            beforeRestore: persist.beforeRestore ?? undefined,
            afterRestore: persist.afterRestore ?? undefined,
        })
    }
    return persist.map((item) => {
        return {
            type: item.type ?? 'indexedDB',
            name: item.name,
            storage: item.storage,
            storeName: item.name,
            storages: getStorageObj(item.type ?? 'indexedDB', { ...option, ...item }),
            key: item.key ?? store.$id,
            paths: item.paths ?? undefined,
            debug: item.debug ?? false,
            encryption: item.encryption ?? false,
            beforeRestore: item.beforeRestore ?? undefined,
            afterRestore: item.afterRestore ?? undefined,
        }
    })
}

const init = (context: PiniaPluginContext, persist: TPersist, options: IPluginOption) => {
    const { store } = context;
    const { prefix = '', suffix = '', debug = false, name = "Vue3PersistStorage", storeName = 'DataSheet', encryption = false } = options;

    const strategies: IExtendPersist[] = !isBoolean(persist) ? getConfig(persist, store, { prefix, suffix, debug, name, storeName, encryption }) : [{
        type: 'indexedDB',
        name: name,
        storeName: storeName,
        storages: getStorageObj('indexedDB', { prefix, suffix, debug, name, storeName, encryption }), // 只有等于boolean，执行的默认值
        key: store.$id,
        paths: undefined,
        debug: debug ?? false,
        encryption: encryption ?? false,
        beforeRestore: undefined,
        afterRestore: undefined,
    }];

    strategies.forEach((strategy: IExtendPersist) => {
        const { beforeRestore, afterRestore } = strategy;

        const hydrate = () => {
            beforeRestore?.(context);

            hydrateStore(store, strategy);

            afterRestore?.(context);
        };
        hydrate();

    })

    store.$subscribe(
        (_mutation: SubscriptionCallbackMutation<StateTree>, state: StateTree) => {

            strategies.forEach((strategy: IExtendPersist) => {
                updateStorage(state, strategy);
            })
        },
        {
            detached: true,
        },
    );


};

export const plugin = (context: PiniaPluginContext, _options: IPluginOption = {}) => {
    const { options } = context;

    const { persist } = options as unknown as { persist: TPersist };

    if (!validate(persist)) return;
    // fitslog.primary(persist)
    init(context, persist, _options);
};
export const createPlugin = (options: IPluginOption) => {
    return (context: PiniaPluginContext) => plugin(context, options);
};

export default plugin;