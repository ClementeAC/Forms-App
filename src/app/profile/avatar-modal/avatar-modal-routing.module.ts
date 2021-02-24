import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvatarModalPage } from './avatar-modal.page';

const routes: Routes = [
  {
    path: '',
    component: AvatarModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvatarModalPageRoutingModule {}
