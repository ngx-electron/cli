import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {containers} from './containers';
import {Page1RoutingModule} from './page1-routing.module';
import {NgxElectronCoreModule} from '@ngx-electron/core';

@NgModule({
    imports: [
        Page1RoutingModule,
        CommonModule,
        NgxElectronCoreModule
    ],
    declarations: [
      ...containers
    ],
    providers: []
})
export class Page1Module {
}
