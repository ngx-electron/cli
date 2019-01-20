import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page1IndexComponent} from './containers/index/page1-index.component';


const routes: Routes = [{
    path: '',
    component: Page1IndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page1RoutingModule { }
