/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";


interface downData  {
    data: any, // 放blob对象
    type: string, // 文件类型
    fileName: string // 文件名
}
/**
 * 下载pdf文件
 * @param {*} data
 */
const onDwonloadPdf = (data:downData) =>{
        let type = "";
        let type2:any;
        if (data.type === "doc") {
            type = "application/msword";
            type2 = [".doc", ".docx"];
        } else if (data.type === "pdf") {
            type = "application/pdf";
            type2 = [".pdf"];
        } else if (data.type === "xls" || data.type === "xlsx") {
            type = "application/vnd.ms-excel";
            type2 = [".xls", ".xlsx"];
        }
        const link = document.createElement("a");
        const blob = new Blob([data.data], { type });
        link.style.display = "none";
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", data.fileName);
        link.setAttribute("type", type2[0]);
        link.download = data.fileName; // 自定义文件名
        document.body.appendChild(link); // 下载创建a
        link.click();
        document.body.removeChild(link); // 下载完删除a
}
export default onDwonloadPdf