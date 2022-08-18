/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
/*
 * @desc: nodejs fs文件操作方法， 详情请看文档：http://nodejs.cn/api/fs.html
 * @Author: caogj 
 * @Date: 2022-02-14 16:04:23 
 * @Last Modified by: caogj
 * @Last Modified time: 2022-07-28 13:50:23
 */

const fs = require("fs");
const FSUtils = (function() {
    const api = {};
    /**
     * 检查文件路径是否存在
     * @param {*} path 传入文件路径
     * @returns {boolean} 
     */
    api.exists = function(path) {
            try {
                return fs.existsSync(path);
            } catch (err) {
                /*异常报错*/
                return false
            }
        }
        /**
         * 复制文件
         * @param {*} src 要复制的源文件名
         * @param {*} dest 复制操作的目标文件名
         * @description 异步地将 src 复制到 dest。 默认情况下，如果 dest 已经存在，则会被覆盖。 
         */
    api.copyFile = function(src, dest) {
        fs.copyFileSync(src, dest);
    };
    /**
     * 异步地读取文件的全部内容
     * @param {*} path  文件名或文件描述符
     * @param {*} encoding 文件编码
     * @returns 返回文件内容是json字符串数据
     */
    api.readFile = function(path, encoding) {
        return fs.readFileSync(path, encoding ? encoding : 'utf8');
    };
    /**
     * 当 file 是文件名时，将数据同步地写入文件，如果文件已存在则替换该文件。 data 可以是字符串或缓冲区
     * @param {*} path 
     * @param {*} content 
     * @description writeFileSync 默认写入的编码是'utf8', 返回的值是undefined
     */
    api.writeFile = function(path, content) {
        fs.writeFileSync(path, content);
    };

    /**
     * fs.readdirSync () 方法用于同步读取给定目录的内容。该方法返回一个包含目录中所有文件名或对象的数组
     * @param {*} path 目录的路径
     * @description readdirSync 默认写入的编码是'utf8', 它返回包含目录中文件的 String、Buffer 或 fs.Dirent 对象的数组
     */
    api.readdirSync = function(path) {
        return fs.readdirSync(path)
    }

    /**
     * fs.statSync () 方法用于同步返回有关给定文件路径的信息
     * @param {*} path 它保存必须检查的文件的路径。它可以是字符串、缓冲区或 URL。
     * @description statSync 默认写入的编码是'utf8',它返回一个包含文件路径详细信息的 Stats 对象
     *   isFile(): boolean;
     *   isDirectory(): boolean;
     *   isBlockDevice(): boolean;
     *   isCharacterDevice(): boolean;
     *   isSymbolicLink(): boolean;
     *   isFIFO(): boolean;
     *   isSocket(): boolean;
     */
    api.statSync = function(path) {
        return fs.statSync(path)
    }

    return api;
})();

export default FSUtils