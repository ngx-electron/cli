import * as child_process from 'child_process';
import * as path from 'path';
import {SpawnOptions} from 'child_process';
const fse = require('fs-extra');

function spawn(command: string, args?: string[], options?: SpawnOptions) {
    console.log(args ? args.reduce((c, arg) => `${c} ${arg}`, command) : command);
    return new Promise(resolve => {
        const childProcess = child_process.spawn(process.platform === 'win32' ? `${command}.cmd` : command, args, options);
        childProcess.stdout.on('end', resolve);
        childProcess.stdout.on('data', log);
        childProcess.stderr.on('data', log);
    });
}

function log(data: Buffer) {
    console.log(data.toString());
}

function getArgs(obj: object, withValue = false) {
    const args = [];
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (value) {
            args.push(`--${toLine(key)}`);
            if (withValue) {
                args.push(value);
            }
        }
    }
    return args;
}

// 驼峰转换下划线
function toLine(name: string) {
    return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

function replaceContent(project: string, file: string, searchValue: any = /demo/g, replaceValue?: string) {
    return new Promise(resolve => {
        fse.readFile(path.join(process.cwd(), project, file), 'utf8', (err, content) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!replaceValue) {
                const dirs = project.split('/');
                replaceValue = dirs[dirs.length - 1];
            }
            fse.writeFile(path.join(process.cwd(), project, file),
                content.replace(searchValue, replaceValue), 'utf8', (err2) => {
                    if (err2) {
                        console.log(err2);
                    } else {
                        console.log(`${file}文件更新完成`);
                        resolve();
                    }
                });
        });
    });
}

function setTargetForElectron(project: string) {
    return setTarget(project, 'electron-renderer');
}

function setTargetForWeb(project: string) {
    return setTarget(project, 'web');
}

function setTarget(project: string, target: string) {
    const f_angular = path.join(process.cwd(), project,
        'node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js');
    return new Promise(resolve => {
        fse.readFile(f_angular, 'utf8', (err, data) => {
            if (err) {
                return console.log(err);
            }
            const result = data.replace(/target: "electron-renderer",/g, '')
                .replace(/target: "web",/g, '')
                .replace(/return \{/g, `return {target: "${target}",`);

            fse.writeFile(f_angular, result, 'utf8', (err2) => {
                if (err2) {
                    return console.log(err2);
                }
            });
        });
    });
}

export {setTargetForElectron, setTargetForWeb, replaceContent, getArgs, spawn};
