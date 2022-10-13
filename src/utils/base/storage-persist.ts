
import { Drivers, Storage as IonicStorage } from '@ionic/storage';
import XEUtils from 'xe-utils';
import AwaitToTask from './awaitToTask';
export interface StorageStrategy {
    /**
     * @description 是否开启数据缓存
     */
    enabled?: boolean;
    /**
     * @description 数据库名字， 命名规范：首字母大写
     * 优先考虑用用户id作为数据库的名字
     */
    dataBase?: string,
    /**
     * @description 数据表 命名规范：首字母大写
     * 优先考虑用组件名字作为数据表的名字
     */
    dataSheet?: string,
    /**
     * @description 键值对的键值
     */
    key: string,
    /**
     * @description 需要缓存的变量名
     */
    store?: any;
}

export const useUserHabits = (params: StorageStrategy) => {
    const store = reactive(params.store)
    if (params.enabled) {
        const storage = new IonicStorage({
            name: params.dataBase ?? 'FitsAdmin',
            storeName: params.dataSheet ?? 'UserHabits',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        });
        const getResult = async () => {
            await storage.create();
            const [err, data] = await AwaitToTask(storage.get(params.key))
            if (err) throw new Error(`获取数据失败, 失败原因：${err}`)
            const storageResult = XEUtils.toStringJSON(data) ?? null;
            storageResult !== null && XEUtils.merge(store, storageResult)
        }
        // 获取恢复本地数据
        getResult()
        // 监听变量的改变状态，当有值更新了，就直接保存下来
        watch(() => store, async (newValue) => {
            const [err] = await AwaitToTask(storage.set(params.key, XEUtils.toJSONString(newValue)))
            if (err) throw new Error(`保存数据失败, 失败原因：${err}`)
        }, { deep: true })
    }


    return { store }


}