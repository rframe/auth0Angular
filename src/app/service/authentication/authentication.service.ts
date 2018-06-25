import {Injectable} from '@angular/core';
import * as auth0 from 'auth0-js';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {environment} from '../../../environments/environment';

(window as any).global = window;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _auth0 = new auth0.WebAuth({
    clientID: environment.auth0_clientID,
    domain: environment.auth0_domain,
    responseType: 'token id_token',
    audience: environment.auth0_audience,
    redirectUri: environment.auth0_redirectUri,
    scope: 'openid'
  });

  private _isAuthenticated$ = new BehaviorSubject(false);

  /**
   * Is User Authenticated as Observable
   * @returns {Observable<boolean>}
   */
  get isAuthenticated$(): Observable<boolean> {
    return this._isAuthenticated$.asObservable();
  }

  /**
   * Class Constructor Function
   * @param {Router} router
   */
  constructor(private router: Router) {
    this.isAuthenticated();
  }

  /**
   * Log the user Int, open auth0 login page
   */
  login(): void {
    this._auth0.authorize();
  }

  /**
   * hande authentication, read the authorization result from the url hash and process the result
   */
  handleAuthentication(): void {
    this._auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        // This seems to cause the navigation to Home to fail, has will be removed upon navigation anyways
        // window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/Home']);
      } else if (err) {
        this.router.navigate(['/Home']);
        // console.log(err);
      }
    });
  }

  /**
   * Log the user out, to do this we remove the access_token, id_toke and expires_at from the local storage
   */
  logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.isAuthenticated();
    // Go back to the home route
    this.router.navigate(['/Home']);
  }

  /**
   * Check if the user is Authenticate
   * @returns {boolean}
   */
  isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at') || '{}');
    const authenticated = new Date().getTime() < expiresAt;
    this._isAuthenticated$.next(authenticated);
    return authenticated;
  }

  /**
   * Bearer Token
   * @returns {string}
   */
  get bearerToken(): string {
    return `Bearer ${this._accessToken}`;
  }

  /**
   * Access Token
   * @returns {string}
   * @private
   */
  private get _accessToken(): string {
    return localStorage.getItem('access_token');
  }

  /**
   * Id Token
   * @returns {string}
   * @private
   */
  private get _idToken(): string {
    return localStorage.getItem('id_token');
  }

  /**
   * Set the authorization result
   * @param authResult
   */
  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.isAuthenticated();
  }
}
