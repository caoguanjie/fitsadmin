/**
 * 给环境配置的属性加上默认的实体类
 */
export class FitsDefaultSetting implements FitsSetting {
    project: FitsProjectSetting;
    system: FitsSystemSetting;
    login: LoginSetting;
    constructor({ project, system, login }: any = {}) {
        this.project = Object.assign({}, this.InitProjectData(), project);
        this.system = Object.assign({}, this.InitSystemData(), system);
        this.login = Object.assign({}, this.InitLoginData(), login);
    }

    InitProjectData(): FitsProjectSetting {
        return {
            title: '',
            subTitle: '',
            company: '',
            version: '1.0.0',
            api_address: '',
            http_timeout: 15000
        }
    }

    InitSystemData(): FitsSystemSetting {
        return {
            tagsView: true,
            fixedHeader: true,
            sidebarLogo: true,
            isInsensitivity: true,
            showSettings: true,
            errorLog: true,
            coutDownTime: 30,
            showFooterBreadcrumb: true,
            formType: 'dialog'
        }
    }

    InitLoginData(): LoginSetting {
        return {
            appScanCode: true,
            smsLogin: true,
            accountLogin: true,
            appDownload: true
        }
    }
}