import { debug } from 'util';
import { SkillService } from './../../services/skill.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track';
import { HelperService } from '../../services/helper.service';
import { QuizService } from 'app/services/quiz.service';
import { quiz } from 'app/models/quiz';
import { HouseService } from 'app/services/house.service';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'ag-admin-quiz-edit',
  templateUrl: './admin-quiz-edit.component.html',
  styleUrls: ['./admin-quiz-edit.component.css']
})
export class AdminQuizEditComponent implements OnInit {

  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any;
  levels = [];
  statuses = [];
  fields = [];
  skills = [];
  houses_array = [];
  skills_array = [];
  formData: any;
  quizObj: any = {};
  selected_houses: any[];
  selectedObjects: any;
  constructor(
    private houseService: HouseService,
    private skillService: SkillService,
    private activatedRoute: ActivatedRoute,
    private trackService: TrackService,
    private router: Router,
    private helperService: HelperService,
    private quizService: QuizService
  ) { }

  ngOnInit() {

    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);

    this.quizService.getQuiz(this.id).subscribe(
      data => {
        this.quizObj = data;

        let s_date = this.quizObj.start_available_time;
        let e_date = this.quizObj.end_available_time;

        let d1 = new Date(s_date);
        const fullYear = d1.getFullYear();
        const month = ('0' + (d1.getMonth() + 1)).slice(-2);
        const date = d1.getDate() < 10 ? ('0' + d1.getDate()) : (d1.getDate());
        let start_available = fullYear + '-' + month + '-' + date;
        this.quizObj.start_available_time = start_available;


        let d2 = new Date(e_date);
        const d2_fullYear = d2.getFullYear();
        const d2_month = ('0' + (d2.getMonth() + 1)).slice(-2);
        const d2_date = d2.getDate() < 10 ? ('0' + d2.getDate()) : (d2.getDate());
        let end_available = d2_fullYear + '-' + d2_month + '-' + d2_date;
        this.quizObj.end_available_time = end_available;


        let d3 = new Date(this.quizObj.due_time);
        const d3_fullYear = d3.getFullYear();
        const d3_month = ('0' + (d3.getMonth() + 1)).slice(-2);
        const d3_date = d3.getDate() < 10 ? ('0' + d3.getDate()) : (d3.getDate());
        let due_time = d3_fullYear + '-' + d3_month + '-' + d3_date + 'T' + (d3.getHours() < 10 ? '0' + d3.getHours() : d3.getHours()) + ":" + (d3.getMinutes() < 10 ? '0' + d3.getMinutes() : d3.getMinutes());;
        this.quizObj.due_time = due_time;

      },
      error => error(<any>error));


    this.skillService.getSkills().subscribe(
      data => {
        console.log("skills array testing now ");
        this.skills_array = data;
        console.log(this.skills_array);
      }, error => console.error(<any>error));

    this.houseService.getHouses().subscribe(
      data => {
        this.houses_array = data;
      }, error => console.error(<any>error));
  }


  diagnostic_number(length: number): Array<any> {
    if (length >= 0) {
      return new Array(length);
    }
  }

  updateQuiz(quiz) {
    quiz.id = this.id;

    // _______ start_available_datee ____________
    const current_start_available_date = new Date(quiz.start_available_time);
    var time = new Date().toLocaleTimeString().split(':');

    const hh = Number(time[0]) < 10 ? '0' + Number(time[0]) : Number(time[0]);
    const mm = Number(time[1]) < 10 ? '0' + Number(time[1]) : Number(time[1]);
    const sec = time[2].split(' ');
    const ss = Number(sec[0]) < 10 ? '0' + Number(sec[0]) : Number(sec[0]);

    const formatted_start_available_date = current_start_available_date.getFullYear() + '-' + ((current_start_available_date.getMonth() + 1) < 10 ? '0' + (current_start_available_date.getMonth() + 1) : (current_start_available_date.getMonth() + 1)) + '-' + (current_start_available_date.getDate() < 10 ? '0' + (current_start_available_date.getDate()) : current_start_available_date.getDate())
      + ' ' + hh + ':' + mm + ':' + ss ;

    // const formatted_start_available_date = current_start_available_date.getFullYear() + '-' + ((current_start_available_date.getMonth() + 1) < 10 ? '0' + (current_start_available_date.getMonth() + 1) : (current_start_available_date.getMonth() + 1)) + '-' + (current_start_available_date.getDate() < 10 ? '0' + (current_start_available_date.getDate()) : current_start_available_date.getDate())
    //   + ' ' +
    //   ('0' + current_start_available_date.getHours()).slice(-2) + ':' +
    //   ('0' + current_start_available_date.getMinutes()).slice(-2) + ':' +
    //   ('0' + current_start_available_date.getMinutes()).slice(-2);

    const x = formatted_start_available_date.split(' ');
    quiz.start_available_time = x[0] + ' ' + x[1];


    // _______ end_available_date ____________
    const current_end_available_date = new Date(quiz.end_available_time);
    const formatted_end_available_date = current_end_available_date.getFullYear() + '-' +
      ((current_end_available_date.getMonth() + 1) < 10 ? '0' + (current_end_available_date.getMonth() + 1) : (current_end_available_date.getMonth() + 1)) + '-' +
      (current_end_available_date.getDate() < 10 ? '0' + (current_end_available_date.getDate()) : current_end_available_date.getDate())
      + ' ' + hh + ':' + mm + ':' + ss;

      // (current_end_available_date.getDate() < 10 ? '0' + (current_end_available_date.getDate()) : current_end_available_date.getDate())
      // + ' ' +
      // ('0' + current_end_available_date.getHours()).slice(-2) + ':' +
      // ('0' + current_end_available_date.getMinutes()).slice(-2) + ':' +
      // ('0' + current_end_available_date.getMinutes()).slice(-2);


    // _______ due time ____________
    const y = formatted_end_available_date.split(' ');
    quiz.end_available_time = y[0] + ' ' + y[1];
    var z = quiz.due_time.split('T');
    quiz.due_time = z[0] + ' ' + z[1] + ':' + new Date().getSeconds();


    this.quizService.updateQuiz(quiz)
      .subscribe(
        quiz => {
          localStorage.setItem('last_quiz_edit_id', this.id)
          this.status = 'success';
          this.message = quiz['message'];
          this.trackService.updateStatus = this.message = quiz['message'];
          setTimeout(() => this.trackService.updateStatus = '', 2000);
          this.router.navigate(['/admin/quizzes']);
          // setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.status = 'danger';
          this.message = this.helperService.ParseErrorMsg(error);
        }
      );
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
