import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormstatsPage } from './formstats.page';

const routes: Routes = [
  {
    path: '',
    component: FormstatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormstatsPageRoutingModule {}
