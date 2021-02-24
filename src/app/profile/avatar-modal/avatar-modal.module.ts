import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvatarModalPageRoutingModule } from './avatar-modal-routing.module';

import { AvatarModalPage } from './avatar-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvatarModalPageRoutingModule
  ],
  declarations: [AvatarModalPage]
})
export class AvatarModalPageModule {}
