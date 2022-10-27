import { StorageStrategy } from '@/types/base/storage';
import { FormItemRenderOptions, VxeFormItemPropTypes, VxeGridConstructor, VxeGridPropTypes, VxeTableDefines, VxeTableProps } from 'vxe-table';
// 对齐方式
export type Align = 'left' | 'center' | 'right' | null
// 页脚的布局方式
export type Layouts = Array<'PrevJump' | 'PrevPage' | 'Number' | 'JumpNumber' | 'NextPage' | 'NextJump' | 'Sizes' | 'Jump' | 'FullJump' | 'PageCount' | 'Total'>
export type PageSizeItemType = number | {
    label?: number | string
    value?: number | string
}
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
     * @description 是否关闭所有功能栏，默认值是true,如果改为FALSE，就是关闭所有工具栏
     */
    enabled?: boolean
}
/**
 * 
 */
export interface FitsToolsBarConfig {
    /**
     * @description 左侧按钮组列表
     */
    buttons?: FitsToolsBtnConfig[],
    tools?: FitstoolsOption
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
    formConfig?: FitsTableProFormConfig | VxeGridPropTypes.FormConfig
    columns?: VxeGridPropTypes.Columns
    pagerConfig?: FitsTableProPagerConfig | VxeGridPropTypes.PagerConfig
    proxyConfig?: FitsTableProProxyConfig | VxeGridPropTypes.ProxyConfig
    storage?: StorageStrategy
}


/**
 * 表格的主要配置
 */
export interface FitsTableProFormConfig<D = any> {
    data?: D,
    items?: fitsTableFormItemProps[]
}

/**
 * 表格的分页参数
 */
export interface FitsTableProPagerConfig {
    /**
     * 自定义布局
     */
    layouts?: Layouts,
    /**
     * 当前页
     * @default {1} 
     */
    currentPage?: number
    /**
     * 每页大小
     * @default {10} 
     */
    pageSize?: number
    /**
     * 总条数
     * @default {0} 
     */
    total?: number
    /**
     * 显示页码按钮的数量
     *  @default {7} 
     */
    pagerCount?: number
    /**
     * 每页大小选项列表
     * @default {[10,15,20,50,100]} 
     */
    pageSizes?: PageSizeItemType[],
    /**
     * 列对其方式
     * @default {right} 
     */
    align?: 'right' | 'center' | 'left'
    /**
     * 带背景颜色
     * @default {true} 
     */
    background?: boolean
    /**
     * 当只有一页时隐藏
     * @default {false}
     */
    autoHidden?: boolean
}


/**
 * 数据代理，请求接口的配置项
 */
export interface FitsTableProProxyConfig {
    /**
     * 开启数据代理模式
     */
    enabled?: boolean
    /**
     * 是否自动加载查询数据，true就是一进来就请求接口，false就是要调用api触发请求接口
     */
    autoLoad?: boolean
    seq?: boolean
    sort?: boolean
    filter?: boolean
    form?: boolean
    props?: {
        list?: string | null
        result?: string
        total?: string
        message?: string
    }
    ajax?: {
        query?(params: ProxyAjaxQueryParams, ...args: any[]): Promise<ProxyAjaxQueryParams | any>
    }
    [key: string]: any
}

export interface ProxyAjaxQueryParams<T = any> {
    $grid: VxeGridConstructor
    page: {
        total: number
        pageSize: number
        currentPage: number
    }
    sort: ProxyAjaxQuerySortCheckedParams
    sorts: ProxyAjaxQuerySortCheckedParams[]
    filters: VxeTableDefines.FilterCheckedParams[]
    form: T
}

export interface ProxyAjaxQuerySortCheckedParams {
    column: VxeTableDefines.ColumnInfo
    order: string
    sortBy: string
    field: string
    property: string
}

/**
 * 表格的每一项
 */
export interface fitsTableFormItemProps {
    /**
    * 标题
    */
    title?: string
    /**
     * 字段名
     */
    field?: string
    /**
     * 内容对齐方式
     */
    align?: Align,
    /**
    * 标题对齐方式
    * @default {right} 
    */
    titleAlign?: Align
    /**
     * 标题宽度
     * @default {100px} 
     */
    titleWidth?: string | number
    /**
    * 给表单项附加 className
    */
    className?: string
    /**
     * 前缀配置项
     */
    titlePrefix?: VxeFormItemPropTypes.TitlePrefix
    /**
     * 后缀配置项
     */
    titleSuffix?: VxeFormItemPropTypes.TitleSuffix
    /**
     * 文字的省略号
     * @default {true} 
     */
    titleOverflow?: boolean
    /**
    * 项渲染配置项
    */
    itemRender?: FormItemRenderOptions
    slots?: VxeFormItemPropTypes.Slots
}
