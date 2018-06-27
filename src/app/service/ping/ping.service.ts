import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, catchError} from 'rxjs/internal/operators';
import {Observable} from 'rxjs/index';
import {AuthenticationService} from '../authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PingService {
  undefined;

  /**
   * Class Constructor Function
   * @param {HttpClient} _http - Angualr http service
   * @param {AuthenticationService} _authentication - Auth0 Authentication service
   */
  constructor(private _http: HttpClient,
              private _authentication: AuthenticationService) { }

  /**
   * Get the claims for the current user from the server
   * @returns {Observable<any>}
   */
  claims() {
    return this.get<any>('/api/claims');
  }

  /**
   * Ping the server with an insecure request
   * @returns {Observable<string>}
   */
  ping() {
    return this.get<string>('/api/ping', { responseType: 'text' });
  }

  /**
   * Ping the server with a secure request
   * @returns {Observable<string>}
   */
  pingSecure() {
    return this.get<string>('/api/ping/secure', { responseType: 'text' });
  }

  /**
   * Base get method, this should be moved to a base http method for the application
   * @param {string} url
   * @param {HttpOptions} options
   * @returns {Observable<t>}
   */
  private get<t>(url: string, options = null) {
    const defaultOptions = this.defaultOptions(options);
    return this._http.get<t>(url, defaultOptions)
      .pipe(
        catchError((x) => {
          return Observable.create<t>(y => { y.next(this.undefined); });
        })
      );
  }

  /**
   * Default Options for the request to the server
   * @param {{headers: HttpHeaders}} options
   * @returns {{headers: HttpHeaders}}
   */
  private defaultOptions(options)  {

    options = options || {  };
    if (!options.headers) {
      options.headers = new HttpHeaders();
    }

    options.headers = options.headers.set('authorization',
      this._authentication.bearerToken
    );
    return options;
  }
}
