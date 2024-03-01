"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const require$$1 = require("electron");
const require$$1$1 = require("path");
let printWindow = null;
function usePrintHandler() {
  require$$1.ipcMain.handle("getPrinters", async (event) => {
    return await event.sender.getPrintersAsync();
  });
  require$$1.ipcMain.handle("RequestPrint", async (event, printOptions) => {
    return new Promise((resolve) => {
      event.sender.print(printOptions, (success, failureReason) => {
        success && console.log("打印成功");
        if (printWindow) {
          printWindow.destroy();
          printWindow = null;
        }
        resolve({ success, failureReason });
      });
    });
  });
  require$$1.ipcMain.handle("openPrintWindow", async (event, pdfurl, silent) => {
    openPrintWindow(pdfurl, silent);
  });
  require$$1.ipcMain.handle("destroyPrintWindow", () => {
    if (printWindow) {
      printWindow.destroy();
      printWindow = null;
    }
    console.log("打印窗口已销毁");
  });
}
function openPrintWindow(pdfurl, silent = true) {
  if (printWindow) {
    printWindow.hide();
    printWindow.destroy();
    printWindow = null;
    return;
  }
  const width = 593;
  const height = 833;
  printWindow = new require$$1.BrowserWindow({
    show: false,
    width,
    height,
    autoHideMenuBar: true,
    useContentSize: true,
    frame: false,
    // 这个一定要加上，去除标题
    titleBarStyle: "hidden",
    backgroundColor: "#fff",
    transparent: true,
    // 透明
    // ========关闭安全策略===========
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      preload: require$$1$1.join(__dirname, "./preload.js")
    }
  });
  console.log(`${process.env.VITE_DEV_SERVER_URL}/static/web/viewer.html?file=${pdfurl}`);
  if (process.env.NODE_ENV === "development") {
    printWindow.webContents.openDevTools();
    printWindow.loadURL(`${process.env.VITE_DEV_SERVER_URL}/static/web/viewer.html?file=${pdfurl}`);
  } else {
    printWindow.loadFile(require$$1$1.join(__dirname, `/static/web/viewer.html?file=${pdfurl}`));
  }
  if (!silent) {
    printWindow.once("ready-to-show", () => {
      printWindow == null ? void 0 : printWindow.show();
    });
    printWindow.on("closed", () => {
      printWindow = null;
    });
  }
}
exports.openPrintWindow = openPrintWindow;
exports.usePrintHandler = usePrintHandler;
