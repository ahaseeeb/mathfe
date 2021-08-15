import { Injectable } from '@angular/core';
import { Level } from '../models/level';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
@Injectable()

export class LevelService {

  constructor(private http: HttpClient) { }

  updateStatus: string = "";

  getLevels(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/levels`)
      .map((response) => response["levels"])
      .catch((error: any) => {
        return throwError((error.json() ? error : (error.statusText)) || { message: 'Server Error' })
      }
      )
  }
  addLevel(level: Object): Observable<Level[]> {
    return this.http.post<Level[]>(`${environment.apiURL}/levels`, level)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  getLevel(id: String): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/levels/` + id)
      .map((response) => response['level'])
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  updateLevel(level: Object): Observable<Level[]> {
    const apiUrl = `${environment.apiURL}/levels`;
    const url = `${apiUrl}/${level['id']}`;
    return this.http.put<any>(url, level)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }

  deleteLevel(id: String): Observable<Level[]> {
    const apiUrl = `${environment.apiURL}/levels`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
}