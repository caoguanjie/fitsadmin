"use strict";
const require$$1 = require("electron");
const require$$1$1 = require("path");
const process$1 = require("process");
const autoUpdate = require("./autoUpdate.js");
const print = require("./print.js");
require("events");
require("crypto");
require("tty");
require("util");
require("os");
require("fs");
require("stream");
require("url");
require("string_decoder");
require("constants");
require("assert");
require("child_process");
require("zlib");
require("http");
global.shareObject = {
  // isLogin: false
};
let mainWindow, loginWindow, isLogin = false;
const createLoginWindow = () => {
  if (loginWindow) {
    return;
  }
  const defaultConfig = {
    show: false,
    // 显示窗口将没有视觉闪烁（配合下面的ready-to-show事件）
    hasShadow: true,
    //窗口是否有阴影
    useContentSize: false,
    resizable: true,
    //用户不可以调整窗口
    center: true,
    // 窗口居中
    maximizable: false,
    // 登录界面不可以最大化
    backgroundColor: "#fff",
    // alwaysOnTop: true,//窗口一直保持在其他窗口前面
    webPreferences: {
      //========关闭安全策略===========
      webSecurity: false,
      // 是否完整支持node.
      nodeIntegration: true,
      preload: require$$1$1.join(__dirname, "./preload.js")
      // contextIsolation: false
    }
  };
  const windowConfig = {
    // window窗口是32px顶部栏
    height: 545,
    width: 470,
    autoHideMenuBar: true
    // 隐藏菜单栏，仅仅window系统有效
  };
  const macConfig = {
    height: 550,
    width: 450,
    frame: false,
    // 无边框
    transparent: true,
    // 透明
    titleBarStyle: "hidden"
  };
  const config = process$1.platform === "darwin" ? { ...defaultConfig, ...macConfig } : { ...defaultConfig, ...windowConfig };
  loginWindow = new require$$1.BrowserWindow(config);
  if (process.env.NODE_ENV === "development") {
    loginWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}#/login`);
  } else {
    loginWindow.loadFile(require$$1$1.join(__dirname, "FitsAdmin/index.html"), {
      hash: "login"
    });
  }
  loginWindow.once("ready-to-show", () => {
    loginWindow.show();
  });
  loginWindow.on("closed", () => {
    loginWindow = null;
  });
};
const createMainWindow = () => {
  if (mainWindow) {
    return;
  }
  mainWindow = new require$$1.BrowserWindow({
    show: false,
    // 窗口图标
    icon: require$$1$1.join(__dirname, "./resources/icons/icon.ico"),
    width: 1366,
    height: 768,
    minWidth: 900,
    minHeight: 600,
    autoHideMenuBar: true,
    useContentSize: true,
    webPreferences: {
      //========关闭安全策略===========
      webSecurity: false,
      nodeIntegration: true,
      preload: require$$1$1.join(__dirname, "./preload.js")
      // contextIsolation: false
    }
  });
  mainWindow.webContents.openDevTools();
  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL(`${process$1.env.VITE_DEV_SERVER_URL}#/home`);
  } else {
    mainWindow.loadFile(require$$1$1.join(__dirname, "FitsAdmin/index.html"), {
      hash: "Home"
    });
  }
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.on("will-resize", (event, newBounds) => {
    changeWindowZoom({ width: newBounds.width }, mainWindow.webContents);
  });
  isLogin && autoUpdate.autoUpdate(mainWindow);
};
const gotTheLock = require$$1.app.requestSingleInstanceLock();
console.log("当前有个多少个实例", gotTheLock);
if (!gotTheLock) {
  require$$1.app.quit();
} else {
  require$$1.app.on("second-instance", (event, commandLine, workingDirectory) => {
    console.log("第二个实例");
    const win = mainWindow || loginWindow;
    win && win.focus;
  });
}
require$$1.app.whenReady().then(() => {
  console.log("我执行了没");
  createLoginWindow();
  createMenu();
  print.usePrintHandler();
});
function createMenu() {
  if (process.platform === "darwin") {
    const template = [
      {
        label: "我的应用",
        submenu: [
          { label: "关于", accelerator: "CmdOrCtrl+I", role: "about" },
          { type: "separator" },
          { label: "隐藏", role: "hide" },
          { label: "隐藏其他", role: "hideOthers" },
          { type: "separator" },
          { label: "服务", role: "services" },
          { label: "退出", accelerator: "Command+Q", role: "quit" }
        ]
      },
      {
        label: "编辑",
        submenu: [
          { label: "复制", accelerator: "CmdOrCtrl+C", role: "copy" },
          { label: "粘贴", accelerator: "CmdOrCtrl+V", role: "paste" },
          { label: "剪切", accelerator: "CmdOrCtrl+X", role: "cut" },
          { label: "撤销", accelerator: "CmdOrCtrl+Z", role: "undo" },
          { label: "重做", accelerator: "Shift+CmdOrCtrl+Z", role: "redo" },
          { label: "全选", accelerator: "CmdOrCtrl+A", role: "selectAll" }
        ]
      }
    ];
    const menu = require$$1.Menu.buildFromTemplate(template);
    require$$1.Menu.setApplicationMenu(menu);
  } else {
    require$$1.Menu.setApplicationMenu(null);
  }
}
require$$1.app.on("activate", () => {
  if (require$$1.BrowserWindow.getAllWindows().length === 0) {
    isLogin ? createMainWindow() : createLoginWindow();
  }
});
require$$1.app.on("window-all-closed", () => {
  console.log("window-all-closed");
  if (process.platform !== "darwin")
    require$$1.app.quit();
});
require$$1.ipcMain.on("openMainWindow", () => {
  isLogin = true;
  createMainWindow();
  console.log("openMainWindow");
  loginWindow.destroy();
  loginWindow = null;
});
require$$1.ipcMain.on("openLoginWindow", () => {
  isLogin = false;
  createLoginWindow();
  mainWindow.destroy();
  mainWindow = null;
});
require$$1.ipcMain.on("firstWidowResize", (e, { width }) => {
  changeWindowZoom({ width }, e.sender);
});
function changeWindowZoom({ width }, sender) {
  if (!isLogin)
    return;
  const designWidth = 1920;
  const deviceScaleFactor = require$$1.screen.getPrimaryDisplay().scaleFactor;
  const zoom = Math.min(Math.max(Number(width / designWidth * deviceScaleFactor), 0.9), 1.2).toFixed(3);
  sender.send("setZoomFactor", zoom);
}
require$$1.ipcMain.on("openWinFormWindow", (evt, { methodName, params }) => {
  if (process.platform === "win32") {
    const edge = require("electron-edge-js");
    const invoke = edge.func({
      // 这里的文件地址，允许可以是http协议的服务器地址，不一定要把dll放在exe里面
      assemblyFile: require$$1$1.join(__dirname, "../resources/dll/FitsTest.dll"),
      typeName: "FitsTest.Test",
      methodName
    });
    invoke(params, (error, value) => {
      evt.sender.send("handleWinFormWindow", { error, value });
    });
  } else {
    require$$1.dialog.showMessageBox({
      title: "温馨提示",
      message: "打开dll文件只能在window环境才会生效",
      type: "error",
      buttons: ["确定"]
    });
  }
});
require$$1.ipcMain.on("setCookies", (evt, { url, name, value }) => {
  require$$1.session.defaultSession.cookies.set({ url, name, value });
});
require$$1.ipcMain.on("getCookies", (evt, { url, name }) => {
  require$$1.session.defaultSession.cookies.get({ url, name });
});
