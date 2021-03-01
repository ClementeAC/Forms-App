import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MainMenuPage } from "./main-menu.page";

const routes: Routes = [
  {
    path: "",
    component: MainMenuPage,
  },
  {
    path: "menu-details",
    loadChildren: () =>
      import("./menu-details/menu-details.module").then(
        (m) => m.MenuDetailsPageModule
      ),
  },
  {
    path: "forms",
    loadChildren: () =>
      import("./forms/forms.module").then((m) => m.FormsPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainMenuPageRoutingModule {}
