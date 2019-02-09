import * as path from 'path';
import {replaceContent, spawn} from '../bin/util';
const fse = require('fs-extra');
const {peerDependencies, version} = require('../package');

export function action(project, {data, skipInstall}) {
    fse.ensureDirSync(path.join(process.cwd(), project));
    console.log('应用下载完成');
    const templatePath = data ? '../template/ngx-electron-data' : '../template/ngx-electron-core';
    fse.copySync(path.join(__dirname, templatePath), path.join(process.cwd(), project));
    replaceContent(project, 'package.json')
        .then(() => replaceContent(project, 'angular.json'))
        .then(() => replaceContent(project, 'main.ts'))
        .then(() => replaceContent(project, 'electron-builder.json'))
        .then(() => replaceContent(project, 'package.json', '"@ngx-electron/data": "lastest"',
            `"@ngx-electron/data": "${peerDependencies['@ngx-electron/data']}"`))
        .then(() => replaceContent(project, 'package.json', '"@ngx-electron/core": "lastest"',
            `"@ngx-electron/core": "${peerDependencies['@ngx-electron/core']}"`))
        .then(() => replaceContent(project, 'package.json', `"@ngx-electron/main": "lastest"`,
            `"@ngx-electron/main": "${peerDependencies['@ngx-electron/main']}"`))
        .then(() => replaceContent(project, 'package.json', '"@ngx-electron/cli": "lastest"',
            `"@ngx-electron/cli": "${version}"`))
        .then(() => {
            if (!skipInstall) {
                console.log('开始下载依赖包...');
                spawn('npm', ['install'], {
                    cwd: project
                });
            } else {
                console.log('取消下载依赖包。');
            }
        });
}
