import mitt, { EventType } from "mitt";
import { onUnmounted } from "vue";

/**
 * on 绑定的事件是一个数组，也就是说相同的名字可以绑定多个callback
 * off 是解绑callback，但是emit有个漏洞，是如果绑定的事件是多个相同的callback的话，只会解绑第一个。
 * off 函数还有一个坑，就是取消绑定之后，没有删除绑定的关键词`eventName`属性。
 */
const emitter = mitt();

const eventBus = {
  on(eventName: EventType, callback: any) {
    const handlers = emitter.all!.get(eventName);
    // 是否存在相同的函数
    let hasSameFunction = false;

    handlers && handlers.map((handler) => {
      // 判断绑定的事件中是否有相同的函数
      if (Function.prototype.toString.call(callback) !== Function.prototype.toString.call(handler)) {
        hasSameFunction = true
      }
    });
    if (!handlers || hasSameFunction) {
      // 如果没有绑定过值，直接绑定
      emitter.on(eventName, callback);
      onUnmounted(() => {
        eventBus.off(eventName, callback);
      });
    }
  },
  emit(eventName: EventType, params?: any) {
    emitter.emit(eventName, params);
  },
  off(eventName: EventType, callback?: any) {
    emitter.off(eventName, callback);
    const handlers = emitter.all!.get(eventName);
    handlers?.length === 0 && emitter.all.delete(eventName);
  },
};
export default eventBus;
