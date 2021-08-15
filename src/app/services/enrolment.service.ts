import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
import { Enrolment } from '../models/enrolment';

@Injectable()
export class EnrolmentService {

  constructor(private http: HttpClient) { }
  updateStatus: string = "";

  getEnrolments(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/enrolments`)
      .map((response) => {
        return response;
      })
      .catch((error: any) => {
        return throwError((error.json() ? error : (error.statusText)) || { message: 'Server Error' })
      }
      );
  }
  addEnrolment(role: Object): Observable<Enrolment[]> {
    return this.http.post<any[]>(`${environment.apiURL}/enrolments`, role)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  getEnrolment(id: String): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/enrolments/` + id)
      .map((response) => response['enrolment'])
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  updateEnrolment(enrolment: Object): Observable<Enrolment[]> {
    const apiUrl = `${environment.apiURL}/enrolments`;
    const url = `${apiUrl}/${enrolment['id']}`;
    return this.http.put<any>(url, enrolment)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  } 
  deleteEnrolment(id: String): Observable<Enrolment[]> {
    const apiUrl = `${environment.apiURL}/enrolments`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  createEnrolment(): Observable<any> {
		return this.http.get(`${environment.apiURL}/enrolments/create`)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  
// testing service
  test(): Observable<any> {

    return this.http.get(`${environment.apiURL}/quizzes`).map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}

}
