import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-auth0-callback',
  templateUrl: './auth0-callback.component.html',
  styleUrls: ['./auth0-callback.component.scss']
})
export class Auth0CallbackComponent implements OnInit {

  /**
   * Class Constructor function
   * @param {AuthenticationService} _authenticationService - auth0 Authentication Service
   */
  constructor(private _authenticationService: AuthenticationService) { }

  /**
   * Angular lifecycle hook oninit
   */
  ngOnInit() {
    // TODO: move this to a resolver or guard, there is no reason for this to load a component
    this._authenticationService.handleAuthentication();
  }

}
