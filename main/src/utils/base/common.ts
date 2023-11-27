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

/**
 * 计算主要内容区域的主要高度
 * 会根据拉伸浏览器，及时调整可滑动的高度值
 * @param reduceNumber 入参是需要减去的数值，例如head的高度，tab的高度，footer的高度。
 * @returns {string} 单位px
 */
export const useComputedAutoHeight = (reduceNumber = 0) => {
  const bodyHeight = ref(document.body.clientHeight)
  const scrollerHeight = computed(() => {
    return (bodyHeight.value - reduceNumber) + 'px'
  })
  // 监听浏览器的变化，及时更新scorll组件的高度
  const resize = useResizeObserver(document.body, (entries) => {
    const entry = entries[0]
    const { height } = entry.contentRect
    bodyHeight.value = height
  })

  onUnmounted(() => {
    // dom节点销毁时，要及时销毁浏览器的监听事件，避免内存泄露
    resize.stop();
  })

  return { scrollerHeight }
}


