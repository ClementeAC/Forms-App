import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "sign-in",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "main-menu",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./main-menu/main-menu.module").then(
            (m) => m.MainMenuPageModule
          ),
      },
      {
        path: ":menuId",
        loadChildren: () =>
          import("./main-menu/menu-details/menu-details.module").then(
            (m) => m.MenuDetailsPageModule
          ),
      },
      {
        path: "forms/:formId",
        loadChildren: () =>
          import("./main-menu/forms/forms.module").then(
            (m) => m.FormsPageModule
          ),
      },
      {
        path: "forms/formstats/:formId",
        loadChildren: () =>
          import("./main-menu/forms/formstats/formstats.module").then(
            (m) => m.FormstatsPageModule
          ),
      },
    ],
  },
  {
    path: "sign-in",
    loadChildren: () =>
      import("./sign-in/sign-in.module").then((m) => m.SignInPageModule),
  },
  {
    path: "landing-page",
    loadChildren: () =>
      import("./landing-page/landing-page.module").then(
        (m) => m.LandingPagePageModule
      ),
  },
  {
    path: "log-in",
    loadChildren: () =>
      import("./log-in/log-in.module").then((m) => m.LogInPageModule),
  },
  {
    path: "profile",
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfilePageModule),
      },
      {
        path: "avatar-modal",
        loadChildren: () =>
          import("./profile/avatar-modal/avatar-modal.module").then(
            (m) => m.AvatarModalPageModule
          ),
      },
    ],
  },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
