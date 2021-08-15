import { Injectable } from '@angular/core';
import { Field } from '../models/field';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable()
export class FieldService {

  constructor(private http: HttpClient) { }

  updateStatus: string = "";

  getFields(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/fields`)
      .map((response) => response["fields"])
      .catch((error: any) => {
        return throwError((error.json() ? error : (error.statusText)) || { message: 'Server Error' })
      }
      );
  }
  addField(field: Object): Observable<Field[]> {
    return this.http.post<Field[]>(`${environment.apiURL}/fields`, field)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  getField(id: String): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/fields/` + id)
      .map((response) => response['field'])
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  updateField(field: Object): Observable<Field[]> {
    const apiUrl = `${environment.apiURL}/fields`;
    const url = `${apiUrl}/${field['id']}`;
    return this.http.put<any>(url, field)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }

  deleteField(id: String): Observable<Field[]> {
    const apiUrl = `${environment.apiURL}/fields`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
}
