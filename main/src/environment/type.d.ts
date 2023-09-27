
interface FitsSetting {
    /**
     * @description 项目配置, 必填
     */
    project: FitsProjectSetting
    /**
     * @description 系统配置, 非必填，可以取默认值
     */
    system?: FitsSystemSetting | ExpandMethod,
    /**
     * @description 登录配置, 非必填，可以取默认值
     */
    login?: LoginSetting | ExpandMethod
}

/**
 * 项目配置
 */
interface FitsProjectSetting {
    /**
     * @description 网站标题，项目名称
     */
    title: string,
    /**
     * @description 网站副标题, 英文标题
     */
    subTitle: string
    /**
     * @description 公司名字
     */
    company: string;
    /**
     * @description 版本号
     * @default {1.0.0}
     */
    version: string;
    /**
     * @description 项目的接口地址
     * @example  http://192.168.32.60:3005/mock/78/api,
     */
    api_address: string;
    /**
     * @description 项目的接口超时时间，也就是接口请求超过多少秒之后，会返回超时状态
     * @default {15000} 单位：毫秒
     */
    http_timeout: number;
}

/**
 * 系统配置
 */
interface FitsSystemSetting {
    /**
     * @description 是否要需要多页签
     * @default {true}
     */
    tagsView: boolean
    // /**
    //  * @desrciption 是否要固定网页的头部
    //  * @default {true}
    //  */
    // fixedHeader: boolean
    /**
     * @desrciption 是否显示菜单栏的logo
     *  @default {true}
     */
    sidebarLogo: boolean
    /**
     * @desrciption token失效时是否进行无感操作
     * @default {true} true会默默请求接口换取最新的token， FALSE会弹出一个账号密码框，重新登录，登录成功后直接请求接口。
     */
    isInsensitivity: boolean
    /**
     * @desrciption 是否配置默认设置
     * @default {true}
     */
    showSettings: boolean
    /**
     * @desrciption 是否显示错误日志
     * @default {true}
     */
    errorLog: boolean
    /**
     * @desrciption 倒计时的时间
     * @default {30} 单位是秒
     */
    coutDownTime: number
    /**
     * @desrciption 是否展示底部的面包屑功能
     * @default {true} 
     */
    showFooterBreadcrumb: boolean
    /**
     * @desrciption 面包屑的展示位置
     * @default {bottom} 
     */
    breadcrumbPosition: 'top' | 'bottom'
    /**
     * @desrciption 表单的展示形式
     * @default {true} 
     */
    formType: 'dialog' | 'drawer'
    /**
     * @desrciption 是否开启所有页面缓存
     * @default {true} 
     */
    keepalive: boolean
    /**
     * @desrciption 最大缓存页面的数量
     * @default {20} 
     */
    keepaliveMax: number
}

/**
 * 登录设置
 */
interface LoginSetting {
    /**
     * @description app扫码登录
     * @default {true} 
     */
    appScanCode?: boolean;
    /**
    * @description 短信登录
    * @default {true} 
    */
    smsLogin?: boolean;
    /**
    * @description 账号登录
    * @default {true} 
    */
    accountLogin?: boolean;
    /**
    * @description app下载功能，二维码展示
    * @default {true} 
    */
    appDownload?: boolean;
}

// 拓展属性，为了解决dev.ts中部分属性没有写，就出现类型报错的问题
interface ExpandMethod {
    [k: string]: any
}
