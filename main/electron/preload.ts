import { contextBridge, ipcRenderer, webFrame } from 'electron'
import edge from 'electron-edge-js'
import { join } from 'path';
window.addEventListener('DOMContentLoaded', () => {
    contextBridge.exposeInMainWorld('ipcRenderer', {
        send: ipcRenderer.send
    })
    getDomWindowSize();

    if (process.platform === 'win32') {

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const edge = require('electron-edge-js')
        const invoke = edge.func({
            assemblyFile: join(__dirname, '../electron/resources/dll/FitsTest.dll'),
            typeName: ' FitsTest.FrmHlyy',
            methodName: 'Hello'
        })
        contextBridge.exposeInMainWorld('invoke', {
            send: invoke
        })
    }

})
/**
 * 获取当前dom的宽高并且告诉主线程，进行调整窗口的缩放比例
 * 同时监听窗口的变化，通过算法改变dom的缩放比例
 */
function getDomWindowSize() {
    const width = window.innerWidth
    const height = window.innerHeight
    const windowPixelRatio = window.devicePixelRatio
    ipcRenderer.send("firstWidowResize", { width, height, windowPixelRatio });
    ipcRenderer.on('setZoomFactor', (e, zoom) => {
        console.log('setZoomFactor', zoom, typeof zoom)
        webFrame.setZoomFactor(Number(zoom))
    })
}


