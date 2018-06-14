import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from '../layout.component';
import {NotFoundComponent} from '../../../feature/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'Home'
      },
      {
        path: 'Home',
        loadChildren: '../../../feature/home/home.module#HomeModule'
      },
      {
        path: 'callback',
        loadChildren: '../../../feature/auth0-callback/auth0-callback.module#Auth0CallbackModule'
      },
      {path: '**', pathMatch: 'full', component: NotFoundComponent}
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
