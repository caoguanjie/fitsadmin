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
