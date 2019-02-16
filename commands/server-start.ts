import * as path from 'path';
import {spawn, getArgs} from '../bin/util';


export function action(project, {
    aot, baseHref, browserTarget, commonChunk, configuration, deployUrl, disableHostCheck,
    evalSourceMap, hmr, hmrWarning, host, liveReload, open, optimization, poll, port, prod,
    progress, proxyConfig, publicHost, servePath, servePathDefaultWarning, sourceMap, ssl,
    sslCert, sslKey, vendorChunk, vendorSourceMap, verbose, watch
}) {
    spawn('npx', ['tsc', '-p', path.join(process.cwd(), project, 'electron')])
        .then(() => {
            spawn('npx', ['ng', 'serve',
                ...getArgs({aot, commonChunk, disableHostCheck, evalSourceMap, hmr, hmrWarning, liveReload, open, optimization,
                    poll, prod, progress, servePathDefaultWarning, sourceMap, ssl, vendorChunk, vendorSourceMap,
                    verbose, watch}),
                ...getArgs({baseHref, browserTarget, configuration, deployUrl, host, port, proxyConfig, publicHost, servePath,
                    sslCert, sslKey}, true)], {
                cwd: project
            });
            spawn('npx', ['wait-on', `http-get://${host}:${port}/`])
                .then(() => spawn('npx', ['electron', project, '--server',
                    ...getArgs({host, port}, true)]));
        });
}
