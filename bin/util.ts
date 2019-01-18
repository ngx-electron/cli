import * as child_process from 'child_process';


export function exec(cmd: string) {
    child_process.exec(cmd, (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        } else if (stdout) {
            console.log(stdout);
        } else {
            console.log(stderr);
        }
    });
}

export function getOption(obj: object, showValue: boolean = false) {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    if (value) {
        const optionName =  `--${toLine(key)}`;
        return showValue ? `${optionName} ${value} ` : `${optionName} `;
    } else {
        return '';
    }
}

// 驼峰转换下划线
export function toLine(name: string) {
    return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}
