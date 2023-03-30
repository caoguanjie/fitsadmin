import useUserStore from './base/user';
import useAppStore from './base/app';
import usePermissionStore from './base/permission';
import useSettingStore from './base/settings';
import useTagsViewStore from './base/tagsView';
import useUserHabitsStorage from './base/storage';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist'
import { App } from 'vue';

const store = createPinia()
store.use(piniaPluginPersist)

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  setting: useSettingStore(),
  tagsView: useTagsViewStore(),
  userHabits: useUserHabitsStorage(),
});

export function setupStore(app: App) {
  app.use(store);
}

export default useStore;
