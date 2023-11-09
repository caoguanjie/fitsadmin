"use strict";
const electron = require("electron");
window.addEventListener("DOMContentLoaded", () => {
  electron.contextBridge.exposeInMainWorld("ipcRenderer", {
    send: (channel, data) => electron.ipcRenderer.send(channel, data),
    on: (channel, callback) => {
      const newCallback = (_, data) => callback(data);
      electron.ipcRenderer.on(channel, newCallback);
    }
  });
  getDomWindowSize();
});
function getDomWindowSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const windowPixelRatio = window.devicePixelRatio;
  electron.ipcRenderer.send("firstWidowResize", { width, height, windowPixelRatio });
  electron.ipcRenderer.on("setZoomFactor", (e, zoom) => {
    console.log("setZoomFactor", zoom, typeof zoom);
    electron.webFrame.setZoomFactor(Number(zoom));
  });
}
