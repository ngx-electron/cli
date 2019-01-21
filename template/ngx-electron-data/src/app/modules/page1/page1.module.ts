import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {containers} from './containers';
import {Page1RoutingModule} from './page1-routing.module';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {ShareModule} from '../share/share.module';

@NgModule({
    imports: [
        Page1RoutingModule,
        ShareModule
    ],
    declarations: [
      ...containers
    ],
    providers: []
})
export class Page1Module {
}
