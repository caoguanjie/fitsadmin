import { StorageStrategy } from '@/utils/base/storage-persist';
import { VxeGridProps, VxeGridPropTypes, VxeTableProps } from 'vxe-table';
/**
 * 工具栏的工具
 */
export interface ToolsConfig {
    /**
     * @description 按钮的唯一id编码
     */
    code?: string
    /**
     * @description 是否显示按钮
     */
    visible?: string
    /**
    * @description 按钮提示文本，解释这个按钮的作用
    */
    msg?: string

}

/**
 * 工具栏的按钮组
 */
export interface FitsToolsBtnConfig {
    /**
     * @description 按钮的唯一id编码,这个是跟绑定事件要执行有关必须要填
     */
    code?: string
    /**
     * @description 按钮的名字
     */
    name?: string
    /**
    * @description 按钮的状态
    * @default {undefined} 
    */
    status?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | undefined
    /**
    * @description 是否禁用
    * @default {false} 
    */
    disabled?: boolean
    /**
     * @description 按钮的绑定事件
     * @default {false} 
     */
    onClick?: () => void

}
// 工具栏的可选项
export interface FitstoolsOption {
    /**
     * @description 导出
     * @default {true} 
     */
    export?: boolean;
    /**
     * @description 放大缩小
     * @default {true} 
     */
    fullscreen?: boolean;
    /**
    * @description 刷新
    * @default {true} 
    */
    refresh?: boolean;
    /**
     * @description 自定义列
     * @default {true} 
     */
    custom?: boolean;
    /**
     * @description 是否显示搜索区域
     * @default {true} 
     */
    search?: boolean;
    /**
     * @description 常用查询
     * @default {true} 
     */
    query?: boolean;
    /**
     * @description 关闭所有功能栏
     */
    tools?: boolean
}
/**
 * 
 */
export interface FitsToolsBarConfig extends FitstoolsOption {
    /**
     * @description 左侧按钮组列表
     */
    buttons: FitsToolsBtnConfig[],
    /**
    * @description 左右侧都可以自定义插槽
    */
    slots?: {
        buttons?: string
        tools?: string
    }
}

/**
 * 表格的配置类型
 */
export type FitsTableProps<D = any> = VxeTableProps<D> & {

    toolbarConfig?: FitsToolsBarConfig | VxeGridPropTypes.ToolbarConfig
    formConfig?: VxeGridPropTypes.FormConfig
    columns?: VxeGridPropTypes.Columns
    pagerConfig?: VxeGridPropTypes.PagerConfig
    proxyConfig?: VxeGridPropTypes.ProxyConfig
    zoomConfig?: VxeGridPropTypes.ZoomConfig
    storage?: StorageStrategy
}

