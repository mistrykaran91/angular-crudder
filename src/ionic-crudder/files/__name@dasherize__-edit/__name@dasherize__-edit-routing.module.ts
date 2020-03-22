import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= classify(name) %>EditPage } from './<%= dasherize(name) %>-edit.page';


const routes: Routes = [
  {
    path :'',
    component: <%= classify(name) %>EditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= classify(name) %>EditPageRoutingModule {}