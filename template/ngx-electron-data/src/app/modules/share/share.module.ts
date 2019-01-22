import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {NgxElectronCoreModule} from '@ngx-electron/core';
import {NgxElectronDataModule} from '@ngx-electron/data';
import {components} from './components';

@NgModule({
    imports: [
        CommonModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,
        FormsModule
    ],
    declarations: [
        ...components
    ],
    providers: [],
    exports: [
        CommonModule,
        NgxElectronCoreModule,
        NgxElectronDataModule,
        FormsModule,
        ...components
    ]
})
export class ShareModule {
}
