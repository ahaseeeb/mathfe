import { Injectable } from '@angular/core';
import { Difficulty } from '../models/difficulty';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable()
export class DifficultyService {

  constructor(private http: HttpClient) { }

  updateStatus: string = "";

  getDifficulties(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/difficulties`)
      .map((response) => response["difficulties"])
      .catch((error: any) => {
        return throwError((error.json() ? error : (error.statusText)) || { message: 'Server Error' })
      }
      )
  }
  addDifficulty(difficulty: Object): Observable<Difficulty[]> {
    return this.http.post<Difficulty[]>(`${environment.apiURL}/difficulties`, difficulty)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  getDifficulty(id: String): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/difficulties/` + id)
      .map((response) => response['difficulty'])
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  updateDifficulty(difficulty: Object): Observable<Difficulty[]> {
    const apiUrl = `${environment.apiURL}/difficulties`;
    const url = `${apiUrl}/${difficulty['id']}`;
    return this.http.put<any>(url, difficulty)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }

  deleteDifficulty(id: String): Observable<Difficulty[]> {
    const apiUrl = `${environment.apiURL}/difficulties`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
}
