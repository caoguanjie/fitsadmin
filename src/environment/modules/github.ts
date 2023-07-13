
const ENV: FitsSetting = {
    project: {
        title: 'FitsAdmin后台管理系统',
        subTitle: 'FITS ADMIN',
        company: '广东丰德科技有限公司',
        version: "1.0.0",
        api_address: 'https://mock.apifox.cn/m1/3008819-0-default',
        http_timeout: 15000
    },
    system: {
        showSettings: true,
        tagsView: true,
        fixedHeader: false,
        sidebarLogo: true,
        isInsensitivity: false,
        coutDownTime: 30,
        errorLog: true
    },
    login: {
        appScanCode: true,
        smsLogin: true,
        accountLogin: true,
        appDownload: true
    }

}


export default ENV