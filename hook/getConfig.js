/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const path = require("path");
const fs = require("fs");


const loadEnv = function(dirPath, targetPath, mode, filter = /\.ts$/) {
    const directory = path.resolve(dirPath, targetPath);
    const modulesFile = {};
    // console.log(require(`${directory}/dev.ts`))
    fs.readdirSync(directory).forEach((file) => {
        console.log(directory)

        const fullPath = path.resolve(directory, file);
        console.log(fullPath)
        if (!filter.test(fullPath)) return;
        const fileName = file.replace(/^(.*)\.\w+$/, "$1");
        console.log(`../${targetPath}/dev`)

        let fileContent = fs.readFileSync(`${directory}/${file}`, 'utf8')
            // const fileContent = require(`../${targetPath}/dev.ts`)
        fileContent = fileContent.replace(/ +/g, "").replace(/[\r\n]/g, "").match(/\{(.*)\}/g)[0]
        fileContent = fileContent.replace(/\{+/g, "").replace(/\}+/g, "")
        const _arr = fileContent.split(',');
        const ENV = {}
        _arr.forEach((item) => {
                const _env = item.split(":");
                ENV[_env[0]] = _env[1];
            })
            // 这个方法有缺陷，如果字符串里面有多个冒号「：」里面的属性就不对了，后续优化吧
        modulesFile[fileName] = ENV;
    });
    return modulesFile[mode]
}

export default loadEnv