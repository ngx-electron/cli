import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {containers} from './containers';
import {Page2RoutingModule} from './page2-routing.module';
import {NgxElectronCoreModule} from '@ngx-electron/core';

@NgModule({
    imports: [
        Page2RoutingModule,
        CommonModule,
        NgxElectronCoreModule
    ],
    declarations: [
      ...containers
    ],
    providers: []
})
export class Page2Module {
}
