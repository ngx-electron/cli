import * as path from 'path';
import {exec, getOption} from './util';


export function serverStartAction(project, {
    aot, baseHref, browserTarget, commonChunk, configuration, deployUrl, disableHostCheck,
    evalSourceMap, hmr, hmrWarning, host, liveReload, open, optimization, poll, port, prod,
    progress, proxyConfig, publicHost, servePath, servePathDefaultWarning, sourceMap, ssl,
    sslCert, sslKey, vendorChunk, vendorSourceMap, verbose, watch
}) {
    const buildElectronCmd = `tsc -p ${path.join(process.cwd(), 'node_modules/@ngx-electron/cli/tsconfig.electron.json')}`;
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
