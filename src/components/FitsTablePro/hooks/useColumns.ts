import { CreateStorage } from '@/utils/storage/index';
import router from "@/router";
import { IFitsTableHeaders, IFitsStorageColsSort, IFitsStorageColsVisible } from '../type';

const storage = new CreateStorage("Fits_Table_Columns")

/**
 * @desc 获取列配置（列排序、列是否显示）
 * @params headers 表头列配置
 */
export function useColumns(headers: IFitsTableHeaders[]) {
    const routeName = router.currentRoute.value.name
    // 获取隐藏列
    const storageVisibleCols = storage.get(`${String(routeName)}_Visible`, []) as IFitsStorageColsVisible[]
    // 获取列排序
    const storageSortCols = storage.get(`${String(routeName)}_Sort`, []) as IFitsStorageColsSort[]
    const colsConfig = headers.map((item, index: number) => {
        const visible = storageVisibleCols.length > 0 ? storageVisibleCols.find(col => (col.field && col.field === item.field) || (col.type && col.type === item.type))?.visible : item.visible !== false
        const sort = storageSortCols.length > 0 ? storageSortCols.find((col) => (col.field && col.field === item.field) || (col.type && col.type === item.type))?.sort || -1 : index
        return { ...item, visible, sort }
    }).sort((before, after) => before.sort - after.sort)
    return JSON.parse(JSON.stringify(colsConfig))
}