import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { <%= classify(name) %>PageRoutingModule } from './<%= dasherize(name) %>-routing.module';
import { <%= classify(name) %>Page } from './<%= dasherize(name) %>.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    <%= classify(name) %>PageRoutingModule
  ],
  declarations: [<%= classify(name) %>Page]
})
export class <%= classify(name) %>PageModule {}
