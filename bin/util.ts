import * as child_process from 'child_process';
import * as path from 'path';
import {SpawnOptions} from 'child_process';
const fse = require('fs-extra');

export function spawn(command: string, args?: string[], options?: SpawnOptions) {
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

export function getArgs(obj: object, withValue = false) {
    const args = new Array<string>();
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
export function toLine(name: string) {
    return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}

export function replaceContent(projectName: string, file: string) {
    return new Promise(resolve => {
        fse.readFile(path.join(process.cwd(), `${projectName}/${file}`), 'utf8', (err, content) => {
            if (err) {
                console.log(err);
                return;
            }
            fse.writeFile(path.join(process.cwd(), `${projectName}/${file}`),
                content.replace(/demo/g, projectName), 'utf8', (err2) => {
                    if (err2) {
                        console.log(err2);
                    } else {
                        console.log(`${file}文件下载完成`);
                        resolve();
                    }
                });
        });
    });
}
