import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PlaceDetailsPage } from './places/place-details/place-details.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'landing-page',
    pathMatch: 'full'
  },
  {
    path: 'places',
      children: [
        {
          path: "",
          loadChildren: () => import('./places/places.module').then(m => m.PlacesPageModule)
        },
        {
          path: ":placeId",
          loadChildren: () => import('./places/place-details/place-details.module').then(m => m.PlaceDetailsPageModule)
        }
      ]
  },
  {
    path: 'new-place',
    loadChildren: () => import('./places/place-add/place-add.module').then(m => m.PlaceAddPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)
  },
  {
    path: 'log-in',
    loadChildren: () => import('./log-in/log-in.module').then( m => m.LogInPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
