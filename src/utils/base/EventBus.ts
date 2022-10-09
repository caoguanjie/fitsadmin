import mitt from "mitt";
import { onUnmounted } from "vue";

const emitter = mitt();

const eventBus = {
  on(eventName: string, callback: any) {
    emitter.on(eventName, callback);
    onUnmounted(() => {
      emitter.off(eventName, callback);
    });
  },
  emit(eventName: string, params: any) {
    emitter.emit(eventName, params);
  },
  off(eventName: string, callback?: any) {
    emitter.off(eventName, callback);
  },
};
export default eventBus;
