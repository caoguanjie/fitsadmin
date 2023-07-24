
/**
 * 系统类型声明
 */
interface AppState {
    device: string;
    sidebar: {
        opened: boolean;
        withoutAnimation: boolean;
    };
    language: string;
    size: string;
}




interface UserState {
    token: string;
    nickname: string;
    avatar: string;
    roles: string[];
    perms: string[];
}

/**
* 设置状态类型声明
*/
interface SettingState {
    theme: string;
    tagsView: boolean;
    //fixedHeader: boolean;
    showSettings: boolean;
    sidebarLogo: boolean;
    isShowSetting: boolean;
    isInsensitivity: boolean
    showFooterBreadcrumb: boolean,
    //增加配置面包屑位置按钮
    breadcrumbPosition:'top' | 'bottom',
    formType: 'dialog' | 'drawer'
}

