import mitt, { EventType } from "mitt";
import { onUnmounted } from "vue";


const emitter = mitt();

const eventBus = {
  on(eventName: EventType, callback: any) {
    // 这里要判断绑定的事件是否存在，避免重复调用vue的生命周期的钩子，
    // 导致页面有警告`onUnmounted is called when there is no active component instance to be associated with.`
    if (!emitter.all.has(eventName)) {
      onUnmounted(() => {
        emitter.off(eventName, callback);
      });
    }
    emitter.on(eventName, callback);

  },
  emit(eventName: string, params?: any) {
    emitter.emit(eventName, params);
  },
  off(eventName: string, callback?: any) {
    emitter.off(eventName, callback);
  },
};
export default eventBus;
