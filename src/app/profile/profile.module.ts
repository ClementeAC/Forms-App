import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { ProfilePageRoutingModule } from "./profile-routing.module";

import { ProfilePage } from "./profile.page";

import { AvatarModalPage } from "./avatar-modal/avatar-modal.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ProfilePage, AvatarModalPage],
  entryComponents: [AvatarModalPage],
})
export class ProfilePageModule {}
