import { ElLoading } from 'element-plus'
/* 全局加载层 */
export const loading = (index?: number, text?: string) => {
  let _loading
  if (!index) {
    _loading = ElLoading.service({
      lock: true,
      text: text || '正在加载中...',
      background: 'hsla(0,0%,100%,.8)'
    })
  } else {
    _loading = ElLoading.service({
      lock: true,
      text: text || '正在加载中...',
      spinner: 'vab-loading-type' + index,
      background: 'hsla(0,0%,100%,.8)'
    })
  }
  return _loading
}
