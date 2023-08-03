
import { localStorage } from '@/utils/storage';
import { defineStore } from 'pinia';
export enum DeviceType {
  Mobile,
  Desktop,
}
const useAppStore = defineStore({
  id: import.meta.env.BASE_URL + 'app',
  state: (): AppState => ({
    device: 'desktop',
    sidebar: {
      opened: true,
      withoutAnimation: false,
    },
    language: 'zh-cn',
    size: localStorage.get('size') || 'default',

  }),
  actions: {
    /**
     * 切换侧边栏是否展开
     * @param withoutAnimation 
     */
    toggleSidebar() {
      this.sidebar.opened = !this.sidebar.opened;
      this.sidebar.withoutAnimation = false;
    },
    /**
     * 隐藏侧边栏
     * @param withoutAnimation 
     */
    closeSideBar(withoutAnimation: any) {
      this.sidebar.opened = false;
      this.sidebar.withoutAnimation = withoutAnimation;
    },
    /**
     * 切换设备
     * @param device 
     */
    toggleDevice(device: string) {
      this.device = device;
    },
    setSize(size: string) {
      this.size = size;
    },
    setLanguage(language: string) {
      this.language = language;
    },
  },
  /**
       *  开启数据缓存
       * 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
       */
  persist: {
    enabled: true,
    strategies: [
      {
        key: "keyValue",
        storage: window.localStorage,
        paths: ['sidebar']
      }
    ]
  }
});

export default useAppStore;
