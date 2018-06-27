import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {logValue} from '../models/rxjs/operators';
import {AuthenticatedUser} from '../models/interfaces/authenticated-user';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedUserGuard implements CanActivate, CanActivateChild {

  constructor(private _authenticationService: AuthenticationService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._authenticationService.isAuthenticated;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(childRoute, state);
  }
}
