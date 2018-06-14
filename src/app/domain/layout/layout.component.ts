import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Observable} from 'rxjs/index';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private _authenticationService: AuthenticationService) {
  }

  /**
   * Angular Lifecycle hook onit
   */
  ngOnInit() {
    this.isAuthenticated$ = this._authenticationService.isAuthenticated$;
  }

  /**
   * Log in button clicked, open login page
   */
  login() {
    this._authenticationService.login();
  }

  /**
   * logout button was clicked, log the user out
   */
  logout() {
    this._authenticationService.logout();
  }
}
