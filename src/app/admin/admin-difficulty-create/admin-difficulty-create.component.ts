import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DifficultyService } from '../../services/difficulty.service';
import { Difficulty } from 'app/models/difficulty';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-difficulty-create',
  templateUrl: './admin-difficulty-create.component.html',
  styleUrls: ['./admin-difficulty-create.component.css']
})
export class AdminDifficultyCreateComponent implements OnInit {
  public status: string;
  public message: string;

  constructor(
    private difficultyService: DifficultyService,
    private router: Router,
    private helperService:HelperService) {

  }

  ngOnInit() { }

  public createDifficulty(difficulty: Difficulty): void {

    this.difficultyService.addDifficulty(difficulty)
      .subscribe(
        difficulty => {
          this.difficultyService.updateStatus = difficulty['message'];
          setTimeout(() => this.difficultyService.updateStatus = '', 2000);
          this.router.navigate(['/admin/difficulties']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => { 
          this.status = 'success'; 
          this.message =  this.helperService.ParseErrorMsg(error)
        }
      );
  }
}
