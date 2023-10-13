import { defineStore } from 'pinia';

import ENV from '@/environment/index';
const { system: { showSettings, tagsView,
  // fixedHeader, 
  sidebarLogo, isInsensitivity, showFooterBreadcrumb, breadcrumbPosition, formType } } = ENV;
const el = document.documentElement;

export const useSettingStore = defineStore({
  id: 'setting',
  state: (): SettingState => ({
    theme: 'white', // 主题配色样式
    showSettings: showSettings,
    tagsView: tagsView,
    // fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo,
    isShowSetting: false, // 是否打开右边的设置界面
    isInsensitivity: isInsensitivity,
    showFooterBreadcrumb: showFooterBreadcrumb,
    breadcrumbPosition: breadcrumbPosition,
    formType: formType
  }),
  actions: {
    /**
     * 切换是否显示设置界面
     */
    toggleSetting(isShowSetting?: boolean) {
      this.isShowSetting = isShowSetting ?? !this.isShowSetting;
    },
    async changeSetting(payload: { key: string; value: any }) {
      const { key, value } = payload;
      switch (key) {
        case 'theme':
          this.theme = value;
          break;
        case 'showSettings':
          this.showSettings = value;
          break;
        case 'tagsView':
          this.tagsView = value;
          break;
        case 'sidebarLogo':
          this.sidebarLogo = value;
          break;
        case 'showFooterBreadcrumb':
          this.showFooterBreadcrumb = value;
          break;
        case 'breadcrumbPosition':
          this.breadcrumbPosition = value;
          break;
        case 'formType':
          this.formType = value;
          break;
        default:
          break;
      }
    },
  },
  persist: {
    type: 'storage',
    paths: ['theme', 'sidebarLogo', "tagsView", "formType", "breadcrumbPosition"]
  }
});

export default useSettingStore;
