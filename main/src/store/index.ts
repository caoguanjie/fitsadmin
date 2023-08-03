import useUserStore from './base/user';
import useAppStore from './base/app';
import usePermissionStore from './base/permission';
import useSettingStore from './base/settings';
import useTagsViewStore from './base/tagsView';
import useUserHabitsStorage from './base/storage';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist'
import { App } from 'vue';
import { useMicroFrontendsStore } from './base/micro-frontends';

const store = createPinia()
store.use(piniaPluginPersist)

const useStore = () => ({
  user: useUserStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  setting: useSettingStore(),
  tagsView: useTagsViewStore(),
  userHabits: useUserHabitsStorage(),
  microFrontends: useMicroFrontendsStore(),
});

export function setupStore(app: App) {
  app.use(store);
}

/**
 * 清理用户信息
 */
export function clearUserInfo() {
  const { user } = useStore();
  user.roles = []
}
/**
 * 修复element-plus中有使用Teleport组件带来的副作用
 */
export function fixElementPlusTeleportCrash() {
  const micro = useMicroFrontendsStore();
  return micro.fixElementPlusTeleportCrash();
}
export default useStore;
