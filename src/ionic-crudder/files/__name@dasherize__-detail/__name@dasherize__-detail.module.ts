import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { <%= classify(name) %>DetailPageRoutingModule } from './<%= dasherize(name) %>-detail-routing.module';
import { <%= classify(name) %>DetailPage } from '../<%= dasherize(name) %>-detail.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    <%= classify(name) %>DetailPageRoutingModule
  ],
  declarations: [<%= classify(name) %>DetailPage]
})
export class <%= classify(name) %>DetailPageModule {}
