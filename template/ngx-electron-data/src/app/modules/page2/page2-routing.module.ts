import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Page2IndexComponent} from './containers/index/page2-index.component';


const routes: Routes = [{
    path: '',
    component: Page2IndexComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page2RoutingModule { }
