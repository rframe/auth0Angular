import {Injectable} from '@angular/core';
import * as auth0 from 'auth0-js';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs/index';
import {environment} from '../../../environments/environment';
import {authenticationKeys} from '../../models/enums/authentication-keys';
import {AuthenticatedUser} from '../../models/interfaces/authenticated-user';

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
    scope: 'openid email profile'
  });

  private _authenticatedUser$ = new BehaviorSubject<AuthenticatedUser>(null);

  /**
   * Is User Authenticated as Observable
   * @returns {Observable<boolean>}
   */
  get authenticatedUser$(): Observable<AuthenticatedUser> {
    return this._authenticatedUser$.asObservable();
  }

  /**
   * Class Constructor Function
   * @param {Router} router
   */
  constructor(private router: Router) {
    this.updateAuthenticatedUser$();
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
        console.log(authResult);
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
    localStorage.removeItem(authenticationKeys.accessToken);
    localStorage.removeItem(authenticationKeys.idToken);
    localStorage.removeItem(authenticationKeys.expiresAt);
    localStorage.removeItem(authenticationKeys.emailVerified);
    localStorage.removeItem(authenticationKeys.emailAddress);
    this.updateAuthenticatedUser$();
    // Go back to the home route
    this.router.navigate(['/Home']);
  }

  /**
   * Check if the user is Authenticate
   * @returns {boolean}
   */
  get isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = this._expiresAt;
    return new Date().getTime() < expiresAt;
  }

  /**
   * Bearer Token
   * @returns {string}
   */
  get bearerToken(): string {
    return `Bearer ${this._accessToken}`;
  }

  /**
   * Set Authenticated User Observable
   */
  updateAuthenticatedUser$() {
    const expiresAt = this._expiresAt;
    const isAuthenticated = this.isAuthenticated;

    const emailAddressVerified = this._emailVerified;
    const emailAddress = this._emailAddress;
    const authenticatedUser = {
      expiresAt,
      isAuthenticated,
      emailAddressVerified,
      emailAddress
    } as AuthenticatedUser;

    this._authenticatedUser$.next(authenticatedUser);
  }

  /**
   * Access Token
   * @returns {string}
   * @private
   */
  private get _accessToken(): string {
    return localStorage.getItem(authenticationKeys.accessToken);
  }

  /**
   * Id Token
   * @returns {string}
   * @private
   */
  private get _idToken(): string {
    return localStorage.getItem(authenticationKeys.idToken);
  }

  /**
   * Get is email verified
   * @returns {boolean}
   * @private
   */
  private get _emailVerified(): boolean {
    return JSON.parse(localStorage.getItem(authenticationKeys.emailVerified)) || false;
  }

  /**
   * Get Email Address
   * @returns {boolean}
   * @private
   */
  private get _emailAddress(): string {
    return localStorage.getItem(authenticationKeys.emailAddress);
  }

  /**
   * Get Expires At
   * @returns {any}
   * @private
   */
  private get _expiresAt() {
    return JSON.parse(localStorage.getItem(authenticationKeys.expiresAt) || '{}');
  }

  /**
   * Set the authorization result
   * @param authResult
   */
  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem(authenticationKeys.accessToken, authResult.accessToken);
    localStorage.setItem(authenticationKeys.idToken, authResult.idToken);
    localStorage.setItem(authenticationKeys.expiresAt, expiresAt);
    localStorage.setItem(authenticationKeys.emailVerified,
      (!!(authResult.idTokenPayload && authResult.idTokenPayload.email_verified)).toString());
    localStorage.setItem(authenticationKeys.emailAddress, authResult.idTokenPayload && authResult.idTokenPayload.email);
    this.updateAuthenticatedUser$();
  }
}
