import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable()
export class DashboardService {
  constructor(private http: HttpClient) { }

  getHouses(): Observable<any> {
    return this.http.get(`${environment.apiURL}/enrols/users`)
      .map((response) =>  response['houses'])
    .catch((error: any) => throwError(error || {message: 'Server Error'} ));
  }
  getCourses(): Observable<any> {
    return this.http.get(`${environment.apiURL}/courses`)
    .map((response) => response['courses'])
    .catch((error: any) => throwError(error || {message: 'Server Error'} ));
  }

  getLeaders(): Observable<any> {
    return this.http.get(`${environment.apiURL}/leaders`)
    .map((response) => response)
    .catch((error: any) => throwError(error || {message: 'Server Error'} ));
  }

  getTeach(): Observable<any> {
    return this.http.get(`${environment.apiURL}/enrols/teachers`)
    .map((response) => response['houses'])
    .catch((error: any) => throwError(error || {message: 'Server Error'} ));
  }

  getUser(): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/protected`)
    .map((response) => response['user']);
  }

  getDashboard(): Observable<any> {
    return this.http.get(`${environment.apiURL}/api/protected`)
    .map((response) => response['data'])
    .catch((error: any) => throwError(error || {message: 'Server Error'} ));
  }
}
