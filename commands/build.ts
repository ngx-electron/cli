import * as path from 'path';
import {getArgs, setTargetForElectron, setTargetForWeb, spawn} from '../bin/util';

export function action(project, {
    mac, linux, win, x64, ia32, armv7l, arm64, dir, prepackaged, config,
    aot, buildOptimizer, commonChunk, configuration, deleteOutputPath, deployUrl,
    evalSourceMap, extractCss, extractLicenses, forkTypeChecker, i18nFile, i18nFormat, i18nLocale,
    i18nMissingTranslation, index, lazyModules, main, namedChunks, ngswConfigPath, optimization,
    outputHashing, outputPath, poll, polyfills, preserveSymlinks, prod, profile, progress, serviceWorker,
    vendorChunk, vendorSourceMap, verbose, watch, showCircularDependencies, skipAppShell, sourceMap,
    statsJson, subresourceIntegrity, tsConfig
}) {
    // setTargetForElectron(project);
    spawn('npx', ['tsc', '-p', path.join(process.cwd(), project, 'electron')])
        .then(() => spawn('npx', ['ng', 'build',
            ...getArgs({aot, buildOptimizer, commonChunk, evalSourceMap, extractCss, extractLicenses,
                forkTypeChecker, i18nLocale, i18nMissingTranslation, lazyModules, namedChunks, optimization, outputHashing,
                poll, polyfills, preserveSymlinks, prod, profile, progress, serviceWorker, vendorChunk, vendorSourceMap,
                verbose, watch, showCircularDependencies, skipAppShell, sourceMap, statsJson, subresourceIntegrity}),
            ...getArgs({baseHref: './', configuration, deployUrl, deleteOutputPath, i18nFile, i18nFormat, index, main, ngswConfigPath,
                outputPath, tsConfig}, true)], {
            cwd: project
        }))
        .then(() => spawn('npx', ['electron-builder', 'build',
            ...getArgs({mac, linux, win, x64, ia32, armv7l, arm64, dir, prepackaged}),
            ...getArgs({config: config ? config : path.join(process.cwd(), project, 'electron', 'electron-builder.json')}, true)], {
            cwd: project
        }))
        /*.then(() => setTargetForWeb(project))*/;
}
