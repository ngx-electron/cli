import {ApplicationRef, enableProdMode, NgModuleRef} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {createNewHosts} from '@angularclass/hmr';

if (environment.production) {
  enableProdMode();
}


const hmrBootstrap = (module: any, bootstrap2: () => Promise<NgModuleRef<any>>) => {
    let ngModule: NgModuleRef<any>;
    module.hot.accept();
    bootstrap2().then(currentModule => ngModule = currentModule);
    module.hot.dispose(() => {
        const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
        const elements = appRef.components.map(c => c.location.nativeElement);
        const removeOldHosts = createNewHosts(elements);
        ngModule.destroy();
        removeOldHosts();
    });
};

const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);
if (module[ 'hot' ]) {
    hmrBootstrap(module, bootstrap);
} else {
    bootstrap().catch(err => console.error(err));
}
