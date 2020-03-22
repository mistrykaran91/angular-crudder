import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= classify(name) %>DetailPage } from './<%= dasherize(name) %>-detail.page';


const routes: Routes = [
  {
    path :'',
    component: <%= classify(name) %>DetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= classify(name) %>DetailPageRoutingModule {}