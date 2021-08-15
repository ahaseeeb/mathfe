import { Injectable } from '@angular/core';
import { Type } from '../models/type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable()
export class TypeService {

  constructor(private http: HttpClient) { }

  updateStatus: string = "";

  getTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/types`)
      .map((response) => response["Type"])
      .catch((error: any) => {
        return throwError((error.json() ? error : (error.statusText)) || { message: 'Server Error' })
      }
      );
  }
  addType(type: Object): Observable<Type[]> {
    return this.http.post<Type[]>(`${environment.apiURL}/types`, type)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  getType(id: String): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/types/` + id)
      .map((response) => response['type'])
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  updateType(type: Object): Observable<Type[]> {
    const apiUrl = `${environment.apiURL}/types`;
    const url = `${apiUrl}/${type['id']}`;
    return this.http.put<any>(url, type)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }

  deleteType(id: String): Observable<Type[]> {
    const apiUrl = `${environment.apiURL}/types`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
}