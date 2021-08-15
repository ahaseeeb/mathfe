import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) { }

  updateStatus: string = "";

  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/roles`)
      .map((response) => response["roles"])
      .catch((error: any) => {
        return throwError((error.json() ? error : (error.statusText)) || { message: 'Server Error' })
      }
      );
  }
  addRole(role: Object): Observable<Role[]> {
    return this.http.post<Role[]>(`${environment.apiURL}/roles`, role)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  getRole(id: String): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/roles/` + id)
      .map((response) => response['role'])
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  updateRole(role: Object): Observable<Role[]> {
    const apiUrl = `${environment.apiURL}/roles`;
    const url = `${apiUrl}/${role['id']}`;
    return this.http.put<any>(url, role)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }

  deleteRole(id: String): Observable<Role[]> {
    const apiUrl = `${environment.apiURL}/roles`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
}
