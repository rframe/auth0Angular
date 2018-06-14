import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth0CallbackComponent } from './auth0-callback.component';
import {Auth0CallbackRoutingModule} from './auth0-callback-routing/auth0-callback-routing.module';

@NgModule({
  imports: [
    CommonModule,
    Auth0CallbackRoutingModule,
  ],
  declarations: [Auth0CallbackComponent]
})
export class Auth0CallbackModule { }
