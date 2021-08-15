import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { DifficultyService } from '../../services/difficulty.service';
import { Difficulty } from '../../models/difficulty';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-difficulty-edit',
  templateUrl: './admin-difficulty-edit.component.html',
  styleUrls: ['./admin-difficulty-edit.component.css']
})
export class AdminDifficultyEditComponent implements OnInit, OnDestroy {
  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any;
  formData: FormData = new FormData();


  difficulty = new Difficulty('id', 0, 'description', '', 0);

  constructor(
    private activatedRoute: ActivatedRoute,
    private difficultyService: DifficultyService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.difficultyService.getDifficulty(this.id).subscribe(
      data => {
        this.difficulty = data;
      },
      error => console.error(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateDifficulty(difficulty: Difficulty) {
    this.difficultyService.updateDifficulty(difficulty)
      .subscribe(
        difficulty => {
          this.status = 'success';
          this.message = difficulty['message'];
          this.difficultyService.updateStatus = this.message = difficulty['message'];
          setTimeout(() => this.difficultyService.updateStatus = '', 2000);
          this.router.navigate(['/admin/difficulties']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error)
        }
      );
  }


}
