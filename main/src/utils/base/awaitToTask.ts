/*
 * @desc: 无需 try-catch 即可轻松处理错误的异步等待包装器。
 * @Author: caogj 
 * @Date: 2022-02-21 10:55:06 
 * @Last Modified by: caogj
 * @Last Modified time: 2022-07-12 15:57:32
 */

/**
 * 1. 无论成功还是失败都返回一个数组,数组的第一项是和错误相关的,数组的第二项是和响结果相关的
 * 2. 成功的话数组第一项也就是错误信息为null,数组第二项也就是响应结果正常返回
 * 3. 失败的话数组第一项也就是错误信息为错误信息,数组第二项也就是响应结果返回undefined
 * @param promise 传入要执行的异步函数
 * @param errorExt 自定义的错误信息的文本
 * @returns 
 */
export function AwaitToTask<T, U = Error>(
    promise: Promise<T>,
    errorExt?: object
): Promise<[U, undefined] | [null, T]> {
    return promise
        .then<[null, T]>((data: T) => [null, data])
        .catch<[U, undefined]>((err: U) => {
            if (errorExt) {
                const parsedError = Object.assign({}, err, errorExt);
                return [parsedError, undefined];
            }

            return [err, undefined];
        });
}

export default AwaitToTask;