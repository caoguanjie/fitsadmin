import { app, BrowserWindow } from 'electron';
import { join } from 'path';


const createWindow = () => {
    const win = new BrowserWindow({
        // 窗口图标
        icon: join(__dirname, '../electron/resources/icons/icon.ico'),
        width: 800,
        height: 600,

        webPreferences: {
            //========关闭安全策略===========
            webSecurity: false,
            nodeIntegration: true,
        }

    })
    // development模式
    if (process.env.NODE_ENV === 'development') {

        win.loadURL('http://localhost:3000')
        // 开启调试台
        win.webContents.openDevTools()
    } else {
        win.webContents.openDevTools()
        // 这里打包好的文件需要FitsAdmin需要跟electron-builder.json文件处于同级，不然无法正常打包到桌面端里面
        win.loadFile(join(__dirname, '../FitsAdmin/index.html'))

    }
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        // 解决在macos上，dock图标点击后，没有任何窗口弹出
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})