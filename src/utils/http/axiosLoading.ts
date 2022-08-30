/**
 * 代码说明：
 * 1. 基本原理是通过 axios 提供的请求拦截和响应拦截的接口，控制 loading 的显示或者隐藏。同时在请求失败时还会自动弹出消息提示框显示错误信息。
 * 2. loding 效果这里采用的是 ionic 中提供的 loadingController 组件来实现
 * 3. 内部有个计数器，确保同一时刻如果有多个请求的话，不会同时出现多个 loading，而是只有 1 个。并且在所有请求结束后才会隐藏 loading。
 * 4、使用了 lodash 的 debounce 防抖。因为有时会碰到在一次请求完毕后又立刻又发起一个新的请求的情况（比如删除一个表格条目后立刻进行刷新）。这种情况会造成连续 loading 两次，并且中间有一次极短的闪烁。通过防抖可以让 300ms 间隔内的 loading 便合并为一次，避免闪烁的情况。
 * 5、默认所有请求都会自动有 loading 效果。如果某个请求不需要 loading 效果，可以在请求参数AxiosRequestConfig中设置isLoading设置为false
 */
import _ from 'lodash';
import { loading } from '@/utils/message/loading';

// 保存loading对象
let loadObject: any;

// 保存定时器，以便方便取消
let timer: any;
// 当前正在请求的数量
let currentLoadingRequestCount = 0;

/**
 * @description 显示loading界面
 */
export const showLoading = () => {
    if (!timer) {
        timer = setTimeout(() => {
            // loadObject = new LoadingService();
            loadObject = loading(2)
        }, 300)
    }
    currentLoadingRequestCount++;
}

/**
 * @description 隐藏loading的界面
 */
export const hideLoading = () => {
    currentLoadingRequestCount--;
    // 防止出现负数，最低是0；
    currentLoadingRequestCount = Math.max(currentLoadingRequestCount, 0);
    if (currentLoadingRequestCount === 0) {
        // 不管300ms是否达到，取消抖动的定时器。
        timer && clearTimeout(timer);
        timer = null;
        // 关闭弹窗，防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
        _.debounce(() => {
            loadObject && loadObject.close();
            // loadObject = null;
        }, 300)();
    }
}
