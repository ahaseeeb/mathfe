import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable()
export class QuestionService {

  constructor(private http: HttpClient) { }

  getQuestions(currentPage): Observable<any> {
    return this.http.get<any>(environment.apiURL + '/questions?page=' + currentPage)
      .map((response) => response)
      .catch((error: any) => throwError(error || { message: 'Server Error' }));
  }

  deleteQuestion(id: String): Observable<any[]> {
    const apiUrl = `${environment.apiURL}/questions`;
    const url = `${apiUrl}/${id}`;
    return this.http.delete<any>(url)
      .map((response) => response);
  }

  getQuestionOptions(): Observable<any> {
    return this.http.get<any>(environment.apiURL + '/questions/create')
      .map((response) => response);
  }

  addQuestion(question: Object): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/questions`, question)
      .map((response) => response);
  }

  getQuestion(id: String): Observable<any> {
    return this.http.get<any>(`${environment.apiURL}/questions/` + id)
      .map((response) => response['question']);
  }

  updateQuestion(question: any, id: any): Observable<any> {
    return this.http.post<any>(`${environment.apiURL}/questions/` + id, question)
      .map((response) => response);
  }

  getSearchOptions(): Observable<any> {
    return this.http.get<any>(environment.apiURL + '/questions/search_init')
      .map((response) => response);
  }

  searchQuestions(searchQuery): Observable<any> {
    return this.http.post<any>(environment.apiURL + '/questions/search', searchQuery)
      .map((response) => response);
  }
}
