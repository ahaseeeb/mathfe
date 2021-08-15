import { Injectable } from '@angular/core';
import { Track } from '../models/track';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
@Injectable()
export class TrackService {

	constructor(private http: HttpClient) { }
	updateStatus = "";
	getTracks(): Observable<any> {
		return this.http.get(`${environment.apiURL}/tracks`)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	getTracksBySkillId(skillId): Observable<any> {
		return this.http.get(`${environment.apiURL}/skills/${skillId}/tracks`)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	addTrack(track: Object): Observable<Track[]> {
		
		return this.http.post<Track[]>(`${environment.apiURL}/tracks`, track)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}



	updateTrack(track: Object): Observable<Track[]> {
		const apiUrl = `${environment.apiURL}/tracks`;
		const url = `${apiUrl}/${track['id']}`;
		return this.http.put<Track[]>(url, track)
			.map((response) => response)
			.catch((error: any) => throwError(error.error || { message: 'Server Error' }));
	}

	deleteTrack(id: String): Observable<Track[]> {
		const apiUrl = `${environment.apiURL}/tracks`;
		const url = `${apiUrl}/${id}`;
		return this.http.delete<Track[]>(url)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	deleteTrackWithSkills(id: String): Observable<Track[]> {
		const apiUrl = `${environment.apiURL}/tracks`;
		const url = `${apiUrl}/${id}?delink_skills=TRUE`;
		return this.http.delete<Track[]>(url)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}

	createTrack(): Observable<any> {
		return this.http.get(`${environment.apiURL}/tracks/create`)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}

	getTrack(id: String): Observable<any> {
		return this.http.get(`${environment.apiURL}/tracks/${id}`)
			.map((response) => { 
				return response['tracks']
			})
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}

}
