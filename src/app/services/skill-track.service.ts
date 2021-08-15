import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';
@Injectable()
export class SkillTrackService {

	constructor(private http: HttpClient) { }

	getSkills(): Observable<any> {
		return this.http.get(`${environment.apiURL}/skills`)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	getSkillsByTrack(trackid): Observable<any> {
		return this.http.get(`${environment.apiURL}/tracks/${trackid}/skills`)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	addSkill(skill: Skill, trackid: String): Observable<Skill[]> {
		const apiUrl = `${environment.apiURL}/tracks`;
		const url = `${apiUrl}/${trackid}/skills/${skill.id}`;
		return this.http.post<Skill[]>(url, skill)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	addSkillByTrack(skills, trackid): Observable<any> {
		const apiUrl = `${environment.apiURL}/tracks`;
		const url = `${apiUrl}/${trackid}/skills`;
		return this.http.post(url, skills)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	getSkill(id: String): Observable<any> {
		return this.http.get(`${environment.apiURL}/skills/` + id)
			.map((response) => response['skill'])
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}

	updateSkill(skill: Object): Observable<Skill[]> {
		const apiUrl = `${environment.apiURL}/skills`;
		const url = `${apiUrl}/${skill['id']}`;
		return this.http.put<Skill[]>(url, skill)
			.map((response) => response)
			.catch((error: any) => throwError(error.error || { message: 'Server Error' }));
	}

	deleteSkill(trackid: String, skillid: String): Observable<Skill[]> {
		const apiUrl = `${environment.apiURL}/tracks`;
		const url = `${apiUrl}/${trackid}/skills/${skillid}`;
		return this.http.delete<Skill[]>(url)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	deleteSkillByTrackId(trackid: String, skillid: String): Observable<Skill[]> {
		const apiUrl = `${environment.apiURL}/tracks`;
		const url = `${apiUrl}/${trackid}/skills/${skillid}`;
		return this.http.delete<Skill[]>(url)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	deleteAllSkills(trackid: String): Observable<Skill[]> {
		const apiUrl = `${environment.apiURL}/tracks`;
		const url = `${apiUrl}/${trackid}/skills`;
		return this.http.delete<Skill[]>(url)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
	createSkill(): Observable<any> {
		return this.http.get(`${environment.apiURL}/skills/create`)
			.map((response) => response)
			.catch((error: any) => throwError(error || { message: 'Server Error' }));
	}
}
