import { Injectable } from '@angular/core';
import { Unit } from '../models/unit';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
@Injectable()
export class UnitService {

  constructor(private http: HttpClient) { }

  updateStatus: string = "";

  getUnits(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/units`)
      .map((response) => response["units"])
      .catch((error: any) => {
        return throwError((error.json() ? error : (error.statusText)) || { message: 'Server Error' })
      }
      );
  }
  addUnit(unit: Object): Observable<Unit[]> {
    return this.http.post<Unit[]>(`${environment.apiURL}/units`, unit)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  getUnit(id: String): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/units/` + id)
      .map((response) => response['unit'])
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  updateUnit(unit: Object): Observable<Unit[]> { 
    const apiUrl = `${environment.apiURL}/units`;
    const url = `${apiUrl}/${unit['id']}`;
    return this.http.put<any>(url, unit)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }

  deleteUnit(id: String): Observable<Unit[]> {
    const apiUrl = `${environment.apiURL}/units`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
}