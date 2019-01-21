import * as path from 'path';
import {exec, replaceContent} from './util';
const fse = require('fs-extra');

export function action(projectName, {data, skipInstall}) {
    fse.ensureDirSync(path.join(process.cwd(), projectName));
    console.log('项目下载完成');
    const templatePath = data ? '../template/ngx-electron-data' : '../template/ngx-electron-core';
    fse.copySync(path.join(__dirname, templatePath), path.join(process.cwd(), projectName));
    replaceContent(projectName, 'package.json')
        .then(() => replaceContent(projectName, 'angular.json'))
        .then(() => replaceContent(projectName, 'main.ts'))
        .then(() => {
            if (!skipInstall) {
                console.log('开始下载依赖包...');
                exec(`cd ${projectName} && npm i`);
            }
        });
}
