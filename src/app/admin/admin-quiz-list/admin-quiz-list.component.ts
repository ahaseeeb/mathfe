import { quiz } from './../../models/quiz';
import { Component, OnInit } from '@angular/core';
import { QuizService } from 'app/services/quiz.service';
// import { quiz } from 'app/models/quiz';

@Component({
  selector: 'ag-admin-quiz-list',
  templateUrl: './admin-quiz-list.component.html',
  styleUrls: ['./admin-quiz-list.component.css']
})

export class AdminQuizListComponent implements OnInit {

  // public quiz: quiz[] = [];
  loading = true;
  quizzes: quiz;
  allQuizzes;
  all_quizzes = [];
  public copyMessage: string;
  public copyMessageSuccess: boolean;

  // public houses: House[];
  message: '';

  ShowColumns = {
    quiz: true,
    description: true,
    diagnostic: true,
    source: true,
    start_available_time: true,
    end_available_time: true,
    due_time: true,
    Action: true
  }

  constructor(private quizService: QuizService) { }

  ngOnInit() {
    this.getQuizzes();
  }


  getQuizzes() {
    this.loading = true;
    this.quizService.allQuiz().subscribe(x => {
      // x.start_available_time = this.tConvert(x.start_available_time);
      x.start_available_time;
      //  this.tConvert(x.start_available_time)
      this.quizzes = x;
      this.allQuizzes = x;
      this.loading = false;
      if (localStorage.getItem("last_quiz_edit_id")) {
        setTimeout(() => {
          let id = localStorage.getItem("last_quiz_edit_id");
          var elmnt = document.getElementById("quiz_" + id);
          // elmnt.scrollIntoView({ block: 'end', behavior: 'smooth' });
          localStorage.removeItem('last_quiz_edit_id');
        }, 1000)
      }
    });
  }

  public doSearch(query) {
    let filtered = [];
    this.allQuizzes.forEach((v, i) => {
      let add = false;
      if (query) {
        query = query.toLowerCase();
        if (v.description) {
          if (v.description.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
        if (v.track) {
          if (v.track.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
      } else {
        add = true;
      }
      if (add) {
        filtered.push(v);
      }
    })
    // this.quizzes = filtered;
  }


  public copyQuiz(id: string): void {

    this.quizService.copyQuiz(id).subscribe(result => {
      if (result != null) {

        this.copyMessageSuccess = true;
        this.copyMessage = "Quiz copied successfully!!";
        this.getQuizzes();
      }
      else {
        this.copyMessageSuccess = false;
        this.copyMessage = result["message"];
      }
      setTimeout(() => {
        // this.copyMessageSuccess = true;
        // this.copyMessage = "Quiz copied successfully!!";
        // this.getQuizzes();
        this.copyMessageSuccess = false;
        this.copyMessage = null;
      }, 3000);
    });
  }


  // public copySkill(id: string) : void{

  //   this.skillService.copySkill(id).subscribe(result =>{
  //     if(result["code"] == 201){
  //       this.copyMessageSuccess = true;
  //       this.copyMessage = result["message"];
  //       let skill = result["skill"];
  //       let cSkill = this.skills.find(x => x.id == id);
  //       cSkill.id = skill.id;
  //       this.skills.push(cSkill);
  //     }
  //     else{
  //       this.copyMessageSuccess = false;
  //       this.copyMessage = result["message"];
  //     }
  //     setTimeout(()=>{
  //       this.copyMessageSuccess = false;
  //         this.copyMessage = null;
  //     }, 3000);
  //   });
  // }

  resetUpdateStatus() {
    this.quizService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.quizService.updateStatus;
  }

  keepManageSkills() {

  }

  addManageHouses() {

  }

  addManageQuestions() {

  }



}
