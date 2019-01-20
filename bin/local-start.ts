import * as path from 'path';
import {exec, getOption} from './util';


export function localStartAction(project, {
    aot, baseHref, buildOptimizer, commonChunk, configuration, deleteOutputPath, deployUrl,
    evalSourceMap, extractCss, extractLicenses, forkTypeChecker, i18nFile, i18nFormat, i18nLocale,
    i18nMissingTranslation, index, lazyModules, main, namedChunks, ngswConfigPath, optimization,
    outputHashing, outputPath, poll, polyfills, preserveSymlinks, prod, profile, progress, serviceWorker,
    vendorChunk, vendorSourceMap, verbose, watch, showCircularDependencies, skipAppShell, sourceMap,
    statsJson, subresourceIntegrity, tsConfig
}) {
    const buildElectronCmd = `tsc -p ${path.join(__dirname, '../tsconfig.electron.json')}`;
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
