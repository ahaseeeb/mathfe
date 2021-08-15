// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'ag-admin-quiz-delete',
//   templateUrl: './admin-quiz-delete.component.html',
//   styleUrls: ['./admin-quiz-delete.component.css']
// })
// export class AdminQuizDeleteComponent implements OnInit {

//   constructor(private quizService: QuizService) { }

//   ngOnInit() {

//   }

// }




import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackService } from 'app/services/track.service';
import { HelperService } from '../../services/helper.service';
import { Observable } from 'rxjs/Observable';
import { QuizService } from 'app/services/quiz.service';

@Component({
  selector: 'ag-admin-quiz-delete',
  templateUrl: './admin-quiz-delete.component.html',
  styleUrls: ['./admin-quiz-delete.component.css']
})
export class AdminQuizDeleteComponent implements OnInit {

  skillsExist = false;
  skillsExistMsg = '';
  skills = [];
  id: any;
  params: any;
  msg = 'Processing the delete request..';
  delink_all :boolean = false;

  constructor(private quizService: QuizService,
    private helperService: HelperService,
    private activatedRoute: ActivatedRoute,
    private trackService: TrackService,
    private router: Router) { }

  ngOnInit() {
    this.skillsExist = false;
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.deleteQuiz(false);
  };

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  deleteQuizWithAll() {
    this.deleteQuiz(true);
  }

  deleteQuiz(deleteSkills) {
    let req: Observable<any>;
    if (deleteSkills) {
      req = this.quizService.deleteQuizWithAll(this.id);
    } else {
      req = this.quizService.deleteQuiz(this.id);
    }
    req.subscribe(
      data => {
        this.quizService.updateStatus = data['message'];
        localStorage.removeItem('last_quiz_edit_id');
        setTimeout(() => this.quizService.updateStatus = '', 2000);
        this.router.navigate(['/admin/quizzes']);
        setTimeout(() => window.scrollTo(0, 0), 0);
      },
      error => {
        debugger;
        if (error.status == 409) {
          this.delink_all = true;
          this.msg = error.error.message;
        }
        else {
          this.msg = this.helperService.ParseErrorMsg(error);
        }

      }
    )
  }

}
