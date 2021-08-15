// import { quiz } from 'app/models/quiz';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { throwError, Observable } from 'rxjs';
import { quiz } from '../models/quiz';
@Injectable({
  providedIn: 'root'
})
export class QuizService {

  updateStatus = '';
  constructor(private http: HttpClient) { }

  public addQuiz(quiz) {
    return this.http.post<quiz>(environment.apiURL + '/quizzes', quiz)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));

  }

  public allQuiz() {
    return this.http.get<quiz>(environment.apiURL + '/quizzes')
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }

  public getQuiz(id) {
    return this.http.get(`${environment.apiURL}/quizzes/${id}`)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }

  updateQuiz(quiz: Object): Observable<quiz[]> {
    const apiUrl = `${environment.apiURL}/quizzes`;
    const url = `${apiUrl}/${quiz['id']}`;
    return this.http.put<quiz[]>(url, quiz)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }

  copyQuiz(id: string): Observable<quiz[]> {
    const apiUrl = `${environment.apiURL}/quizzes`;
    // const apiUrl = 'https://devapi.allgifted.com/skills'
    const url = `${apiUrl}/${id}` + `/copy`;
    return this.http.post<any>(url, null)
      .map((response) => response)
      .catch((error: any) => throwError(error.error || { message: 'Server Error' }));
  }


  deleteQuizWithAll(id: String): Observable<quiz[]> {
    const apiUrl = `${environment.apiURL}/quizzes`;
    const url = `${apiUrl}/${id}?delink_all=TRUE`;
    return this.http.delete<quiz[]>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }

  deleteQuiz(id: String): Observable<quiz[]> {
    const apiUrl = `${environment.apiURL}/quizzes`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<quiz[]>(url)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }

}
