import * as path from 'path';
import {exec, replaceContent} from './util';
const fse = require('fs-extra');

export function newAction(projectName, {data, skipInstall}) {
    fse.ensureDirSync(path.join(process.cwd(), projectName));
    const templatePath = data ? '../template/ngx-electron-data' : '../template/ngx-electron-core';
    fse.copySync(path.join(__dirname, templatePath), path.join(process.cwd(), projectName));
    replaceContent(projectName, 'package.json')
        .then(() => replaceContent(projectName, 'angular.json'))
        .then(() => replaceContent(projectName, 'main.ts'))
        .then(() => {
            if (!skipInstall) {
                exec(`cd ${projectName} && npm i`);
            }
        });
}
