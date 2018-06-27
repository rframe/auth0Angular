import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {AuthenticatedUser} from '../models/interfaces/authenticated-user';

@Injectable({
  providedIn: 'root'
})
export class VerifiedEmailGuard implements CanActivate, CanActivateChild {

  constructor(private _authenticationService: AuthenticationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this._authenticationService
      .updateAuthenticatedUser$();
    return this._authenticationService
      .authenticatedUser$
      .pipe(
        (x: AuthenticatedUser) => x.emailAddressVerified
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
