#!/usr/bin/env node
import * as program from 'commander';
import * as child_process from 'child_process';

const actionMap = {
    serverAction,
    localAction
};

interface CommandStructure {
    name: string;
    actionName: string;
    desc: string;
    usage: string;
    alias?: string;
    options?: {
        flags: string;
        desc: string;
        defaultValue?: any;
    }[];
}

const commands: CommandStructure[] = require('./commands');

program.version(require('../package').version)
    .usage('<command> [options]');

for (const command of commands) {
    const cmd = program.command(command.name)
        .description(command.desc)
        .usage(command.usage);
    if (command.alias) {
        cmd.alias(command.alias);
    }
    if (command.options) {
        for (const option of command.options) {
            if (option.defaultValue) {
                cmd.option(option.flags, option.desc, option.defaultValue);
            } else {
                cmd.option(option.flags, option.desc);
            }
        }
    }
    cmd.action(actionMap[command.actionName]);
}

program.parse(process.argv);

function serverAction(project, {
    aot, baseHref, browserTarget, commonChunk, configuration, deployUrl, disableHostCheck,
    evalSourceMap, hmr, hmrWarning, host, liveReload, open, optimization, poll, port, prod,
    progress, proxyConfig, publicHost, servePath, servePathDefaultWarning, sourceMap, ssl,
    sslCert, sslKey, vendorChunk, vendorSourceMap, verbose, watch
}) {
    const buildElectronCmd = 'tsc -p node_modules/@ngx-electron/main/tsconfig.electron.json';
    const ngServeCmd = `ng serve ${getOption({aot})}${getOption({baseHref}, true)}` +
        `${getOption({browserTarget}, true)}${getOption({commonChunk})}` +
        `${getOption({configuration}, true)}${getOption({deployUrl}, true)}` +
        `${getOption({disableHostCheck})}${getOption({evalSourceMap})}${getOption({hmr})}` +
        `${getOption({hmrWarning})}${getOption({host}, true)}${getOption({liveReload})}` +
        `${getOption({open})}${getOption({optimization})}${getOption({poll})}` +
        `${getOption({port}, true)}${getOption({prod})} ${getOption({progress})}` +
        `${getOption({proxyConfig}, true)}${getOption({publicHost}, true)}` +
        `${getOption({servePath}, true)}${getOption({servePathDefaultWarning})}` +
        `${getOption({sourceMap})}${getOption({ssl})}${getOption({sslCert}, true)}` +
        `${getOption({sslKey}, true)}${getOption({vendorChunk})}` +
        `${getOption({vendorSourceMap})}${getOption({verbose})}${getOption({watch})}`;
    exec(`npx ${ngServeCmd}`);
    const waitOnCmd = `wait-on http-get://${host}:${port}/`;
    const electronCmd = `electron ${project} --server ${getOption({port}, true)}${getOption({host}, true)}`;
    exec(`npx ${waitOnCmd} && npx ${buildElectronCmd} && npx ${electronCmd}`);
    console.log(ngServeCmd);
    console.log(`${waitOnCmd} && ${buildElectronCmd} && ${electronCmd}`);
}

function localAction(project, {
    aot, baseHref, buildOptimizer, commonChunk, configuration, deleteOutputPath, deployUrl,
    evalSourceMap, extractCss, extractLicenses, forkTypeChecker, i18nFile, i18nFormat, i18nLocale,
    i18nMissingTranslation, index, lazyModules, main, namedChunks, ngswConfigPath, optimization,
    outputHashing, outputPath, poll, polyfills, preserveSymlinks, prod, profile, progress, serviceWorker,
    vendorChunk, vendorSourceMap, verbose, watch, showCircularDependencies, skipAppShell, sourceMap,
    statsJson, subresourceIntegrity, tsConfig
}) {
    const buildElectronCmd = 'tsc -p node_modules/@ngx-electron/main/tsconfig.electron.json';
    const ngBuild = `ng build ${getOption({aot})}${getOption({baseHref}, true)}` +
        `${getOption({buildOptimizer})}${getOption({commonChunk})}` +
        `${getOption({configuration}, true)}${getOption({deployUrl}, true)}` +
        `${getOption({deleteOutputPath}, true)}${getOption({evalSourceMap})}${getOption({extractCss})}` +
        `${getOption({extractLicenses})}${getOption({forkTypeChecker})}${getOption({i18nFile}, true)}` +
        `${getOption({i18nFormat}, true)}${getOption({i18nLocale})}${getOption({i18nMissingTranslation})}` +
        `${getOption({index}, true)}${getOption({lazyModules})} ${getOption({main}, true)}` +
        `${getOption({namedChunks})}${getOption({ngswConfigPath}, true)}${getOption({optimization})}` +
        `${getOption({outputHashing})}${getOption({outputPath}, true)}${getOption({poll})}` +
        `${getOption({polyfills})}${getOption({preserveSymlinks})}${getOption({prod})}` +
        `${getOption({profile})}${getOption({progress})}${getOption({serviceWorker})}${getOption({vendorChunk})}` +
        `${getOption({vendorSourceMap})}${getOption({verbose})}${getOption({watch})}` +
        `${getOption({showCircularDependencies})}${getOption({skipAppShell})}${getOption({sourceMap})}` +
        `${getOption({statsJson})}${getOption({subresourceIntegrity})}${getOption({tsConfig}, true)}`;
    const electronCmd = `electron ${project} --open-dev-tools`;
    exec(`npx ${buildElectronCmd} && npx ${ngBuild} && npx ${electronCmd}`);
    console.log(`${buildElectronCmd} && ${ngBuild} && ${electronCmd}`);
}

function exec(cmd: string) {
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

function getOption(obj: object, showValue: boolean = false) {
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
function toLine(name: string) {
    return name.replace(/([A-Z])/g, '-$1').toLowerCase();
}
