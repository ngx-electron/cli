import * as path from 'path';
import {replaceContent} from './util';
const fse = require('fs-extra');

export function newAction(projectName, {data}) {
    fse.ensureDirSync(path.join(process.cwd(), projectName));
    const templatePath = data ? '../template/ngx-electron-data' : '../template/ngx-electron-core';
    fse.copySync(path.join(__dirname, templatePath), path.join(process.cwd(), projectName));
    replaceContent(projectName, 'package.json');
    replaceContent(projectName, 'angular.json');
    replaceContent(projectName, 'main.ts');
}
