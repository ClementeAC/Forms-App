import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormstatsPageRoutingModule } from './formstats-routing.module';

import { FormstatsPage } from './formstats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormstatsPageRoutingModule
  ],
  declarations: [FormstatsPage]
})
export class FormstatsPageModule {}
