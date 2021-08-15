import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import { Observable, of, Subject } from 'rxjs';
import * as auth0 from 'auth0-js';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../environments/environment"

@Injectable()
export class AuthService {
  refreshSubscription: any;
  auth0 = new auth0.WebAuth({
    clientID: environment.webAuth.clientID,
    domain: environment.webAuth.domain,
    responseType: 'token id_token',
    audience: environment.webAuth.audience,
    redirectUri: environment.webAuth.redirectUri,
    scope: 'openid profile email name picture',
    theme: {
      logo: environment.webAuth.theme.logo
    },
    params: {

    }
  });
  private asyncProfileImageWorker = new Subject<boolean>();
  public scheduleRenewal() {
    if (!this.isAuthenticated()) return;
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        console.log('will refresh token in ' + Math.max(1, expiresAt - now) / 1000 + ' seconds')
        return Observable.timer(Math.max(1, expiresAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      this.renewToken();
      this.scheduleRenewal();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }

  constructor(
    public router: Router,
    private jwtHelper: JwtHelperService) {

  }

  public login(enrol): void {
    debugger;
    if (enrol) {
      this.auth0.baseOptions.redirectUri = this.auth0.baseOptions.redirectUri + "?enrol=true";
    }
    this.auth0.authorize();
  }
  profileImage(): Observable<boolean> {
    return this.asyncProfileImageWorker.asObservable();
  }
  triggerUpdateProfileImageObservable() {
    this.asyncProfileImageWorker.next(true);
  }
  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        var isEnrol = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent("enrol").replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
        if (!isEnrol) {
          localStorage.removeItem('house');
        }
        window.location.hash = '/member';
        this.setSession(authResult);
        this.router.navigate(['/member']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('profile_image', authResult.idTokenPayload.picture);
    this.triggerUpdateProfileImageObservable();
    this.scheduleRenewal();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    this.unscheduleRenewal();
    this.asyncProfileImageWorker.next(false);
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  loggedIn() {
    return this.jwtHelper.isTokenExpired();
  }

  public renewToken() {
    console.log('Refresh Token Start')
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Refresh Token Success')
        this.setSession(result);
      }
    });
  }
}
