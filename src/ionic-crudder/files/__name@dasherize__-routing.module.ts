import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { <%= classify(name) %>Page } from './<%= dasherize(name) %>.page';


const routes: Routes = [
  {
    path :'',
    component: <%= classify(name) %>Page
  },
  {
    path: ':<%= camelize(name) %>Id',
    loadChildren: () =>
      import('./<%= dasherize(name) %>-detail/<%= dasherize(name) %>-detail.module').then(
        m => m.<%= classify(name) %>DetailPageModule
      ),
    pathMatch: 'full'
  },
  {
    path: ':<%= camelize(name) %>Id/edit',
    loadChildren: () =>
      import('./<%= dasherize(name) %>-edit/<%= dasherize(name) %>-edit.module').then(
        m => m.<%= classify(name) %>EditPageModule
      ),
    pathMatch: 'full'
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class <%= classify(name) %>PageRoutingModule {}