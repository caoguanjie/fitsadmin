import { BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
/**
 * 基本实现思路：
 * 1. 渲染进程（web）发送打印请求，主进程(electron nodejs)创建一个隐藏窗口，渲染打印内容,可以利用新窗口展示hash路径和打印页面的路由相匹配实现指定的打印内容
 * 2. 调用print方法打印内容，设置静默打印，去除边距，打印完成自动关闭和销毁窗口
 */
let printWindow: BrowserWindow | null = null;


export function usePrintHandler() {
    /**
     * 监听渲染线程发送的获取电脑默认打印机列表
     */
    ipcMain.handle('getPrinters', async (event) => {
        return await event.sender.getPrintersAsync()
    })
    /**
     * 监听渲染线程发送的打印请求，调用打印机打印
     * printOptions 打印选项
     * 
     */
    ipcMain.handle('RequestPrint', async (event, printOptions) => {
        return new Promise((resolve) => {
            event.sender.print(printOptions, (success: boolean, failureReason: string) => {
                success && console.log('打印成功');
                resolve({ success, failureReason })
            })

        })
    })

    /**
     * 打开打印窗口
     * hash是路由的hash路径，可以利用hash路径和路由相匹配实现指定的打印内容
     */
    ipcMain.handle('openPrintWindow', async (event, hash, silent) => {
        openPrintWindow(hash, silent);
    })

    // 销毁打印窗口
    ipcMain.handle('destroyPrintWindow', () => {
        if (printWindow) {
            printWindow.destroy();
            printWindow = null;
        }
        console.log('打印窗口已销毁')
    })
}


/**
 * 打开新的打印窗口，默认是不显示的
 * @param hash 传入vue的一个独立界面
 * @param silent 是否静默打印
 * @returns 
 */
export function openPrintWindow(hash: string, silent = true) {
    if (printWindow) {
        printWindow.hide();
        printWindow.destroy();
        printWindow = null;
        return
    }
    // 设置A5纸张的宽度和高度（以像素为单位）
    const width = 593; // 近似值
    const height = 833; // 近似值
    printWindow = new BrowserWindow({
        show: false,
        width: width,
        height: height,
        autoHideMenuBar: true,
        useContentSize: true,
        frame: false,
        // 这个一定要加上，去除标题
        titleBarStyle: 'hidden',
        backgroundColor: '#fff',
        transparent: true, // 透明
        // ========关闭安全策略===========
        webPreferences: {
            webSecurity: false,
            nodeIntegration: true,
            preload: join(__dirname, './preload.js')
        }

    })
    console.log(`${process.env.VITE_DEV_SERVER_URL}#/${hash ?? 'print'}`)
    if (process.env.NODE_ENV === "development") {
        printWindow.webContents.openDevTools()
        printWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#/${hash ?? 'print'}`)
    } else {
        printWindow.loadFile(join(__dirname, 'FitsAdmin/index.html'), {
            hash: hash ?? 'print'
        });
    }
    //  不是静默打印就 显示窗口
    if (!silent) {
        printWindow.once('ready-to-show', () => {
            printWindow?.show()
        })

        printWindow.on('closed', () => {
            // 窗口关闭后，loginWindow对象会被自动回收掉
            printWindow = null
        })
    }


}