import { Injectable } from '@angular/core';
import { Permission } from '../models/permission';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
@Injectable()
export class PermissionService {

  constructor(private http: HttpClient) { }

  updateStatus: string = "";

  getPermissions(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiURL}/permissions`)
      .map((response) => response["permissions"])
      .catch((error: any) => {
        return throwError((error.json() ? error : (error.statusText)) || { message: 'Server Error' })
      }
      );
  }
  addPermission(permission: Object): Observable<Permission[]> {
    return this.http.post<Permission[]>(`${environment.apiURL}/permissions`, permission)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  getPermission(id: String): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/permissions/` + id)
      .map((response) => response['permission'])
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
  updatePermission(permission: Object): Observable<Permission[]> { 
    const apiUrl = `${environment.apiURL}/permissions`;
    const url = `${apiUrl}/${permission['id']}`;
    return this.http.put<any>(url, permission)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }

  deletePermission(id: String): Observable<Permission[]> {
    const apiUrl = `${environment.apiURL}/permissions`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }
}