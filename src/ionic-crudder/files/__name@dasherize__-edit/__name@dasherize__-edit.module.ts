import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { <%= classify(name) %>EditPageRoutingModule } from './<%= dasherize(name) %>-edit-routing.module';
import { <%= classify(name) %>EditPage } from './<%= dasherize(name) %>-edit.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    <%= classify(name) %>EditPageRoutingModule
  ],
  declarations: [<%= classify(name) %>EditPage]
})
export class <%= classify(name) %>EditPageModule {}
