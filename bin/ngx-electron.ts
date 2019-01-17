#!/usr/bin/env node
import * as program from 'commander';
import * as child_process from 'child_process';

process.title = 'ngx-electron';

program.version(require('../package').version)
    .usage('<command> [options]')
    .command('*', '启动应用程序')
    .option('--aot', 'Build using Ahead of Time compilation.')
    .option('--base-href [value]', 'Base url for the application being built.')
    .option('--browser-target [value]', 'Target to serve.')
    .option('--common-chunk', 'Use a separate bundle containing code used across multiple bundles.')
    .option('-c, --configuration [value]',
        'A named configuration environment, as specified in the "configurations" section of angular.json.')
    .option('--deploy-url [value]', 'URL where files will be deployed.')
    .option('--disable-host-check', 'Don\'t verify connected clients are part of allowed hosts.')
    .option('--eval-source-map', 'Output in-file eval sourcemaps.')
    .option('--hmr', 'Enable hot module replacement.')
    .option('--hmr-warning', 'Show a warning when the --hmr option is enabled.')
    .option('--host [value]', 'Host to listen on.', 'localhost')
    .option('--live-reload', 'Whether to reload the page on change, using live-reload.')
    .option('-o, --open', 'Opens the url in default browser.')
    .option('--optimization', 'Enables optimization of the build output.')
    .option('--poll', 'Enable and define the file watching poll time period in milliseconds.')
    .option('--port [value]', 'Port to listen on.', 4200)
    .option('--prod', 'When true, sets the build configuration to the production environment.\n' +
        '    All builds make use of bundling and limited tree-shaking, A production build also runs limited dead code' +
        ' elimination using UglifyJS.')
    .option('--progress', 'Log progress to the console while building.')
    .option('--proxy-config [value]', 'Proxy configuration file.')
    .option('--public-host [value]', 'Specify the URL that the browser client will use.')
    .option('--serve-path [value]', 'The pathname where the app will be served.')
    .option('--serve-path-default-warning', 'Show a warning when deploy-url/base-href use unsupported serve path values.')
    .option('--source-map', 'Output sourcemaps.')
    .option('--ssl', 'Serve using HTTPS.')
    .option('--ssl-cert [value]', 'SSL certificate to use for serving HTTPS.')
    .option('--ssl-key [value]', 'SSL key to use for serving HTTPS.')
    .option('--vendor-chunk', 'Use a separate bundle containing only vendor libraries.')
    .option('--vendor-source-map', 'Resolve vendor packages sourcemaps.')
    .option('--verbose', 'Adds more details to output logging.')
    .option('--watch', 'Rebuild on change.')
    .option('-s, --server', '设置加载的页面来自于服务器')
    .option('-s, --server', '设置加载的页面来自于服务器')
    .action(action)
    .parse(process.argv);

function action(type, {
    aot, baseHref, browserTarget, commonChunk, configuration, deployUrl, disableHostCheck,
    evalSourceMap, hmr, hmrWarning, host, liveReload, open, optimization, poll, port, prod,
    progress, proxyConfig, publicHost, servePath, servePathDefaultWarning, sourceMap, ssl,
    sslCert, sslKey, vendorChunk, vendorSourceMap, verbose, watch, server
}) {
    const buildElectronCmd = 'tsc -p node_modules/@ngx-electron/main/tsconfig.electron.json';
    if (server) {
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
        const electronCmd = `electron ${type} --server ${getOption({port}, true)}${getOption({host}, true)}`;
        exec(`npx ${waitOnCmd} && npx ${buildElectronCmd} && npx ${electronCmd}`);
        console.log(ngServeCmd);
        console.log(`${waitOnCmd} && ${buildElectronCmd} && ${electronCmd}`);
    } else {
        const ngBuild = 'ng build';
        const electronCmd = `electron ${type}`;
        exec(`npx ${buildElectronCmd} && npx ${ngBuild} && npx ${electronCmd}`);
        console.log(`${buildElectronCmd} && ${ngBuild} && ${electronCmd}`);
    }
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
