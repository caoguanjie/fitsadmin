import { ref } from "vue";
import { useIntervalFn } from '@vueuse/core'

/**
 * 登录页的倒计时方法
 */
export const useCountdown = () => {
  const time = ref(0);
  // immediate 是否立即启动定时器
  // pause：暂停 resume：开启
  const { pause, resume } = useIntervalFn(() => {
    // 每隔多长时间做什么 回调
    time.value--
    if (time.value <= 0) {
      pause()
    }
    console.log('正在使用函数：useIntervalFn', Date.now())
  }, 1000, { immediate: false })
  const start = (num: number) => {
    time.value = num
    resume()
  }

  return { start, time }
}