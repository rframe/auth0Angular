import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Auth0CallbackComponent} from '../auth0-callback.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: Auth0CallbackComponent
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
export class Auth0CallbackRoutingModule {
}
