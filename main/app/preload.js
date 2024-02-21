"use strict";
const require$$1 = require("electron");
window.addEventListener("DOMContentLoaded", () => {
  require$$1.contextBridge.exposeInMainWorld("ipcRenderer", {
    send: (channel, data) => require$$1.ipcRenderer.send(channel, data),
    on: (channel, callback) => {
      const newCallback = (_, data) => callback(data);
      require$$1.ipcRenderer.on(channel, newCallback);
    }
  });
  getDomWindowSize();
});
function getDomWindowSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const windowPixelRatio = window.devicePixelRatio;
  require$$1.ipcRenderer.send("firstWidowResize", { width, height, windowPixelRatio });
  require$$1.ipcRenderer.on("setZoomFactor", (e, zoom) => {
    console.log("setZoomFactor", zoom, typeof zoom);
    require$$1.webFrame.setZoomFactor(Number(zoom));
  });
}
