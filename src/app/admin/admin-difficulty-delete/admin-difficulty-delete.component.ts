import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DifficultyService } from 'app/services/difficulty.service';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-difficulty-delete',
  templateUrl: './admin-difficulty-delete.component.html',
  styleUrls: ['./admin-difficulty-delete.component.css']
})
export class AdminDifficultyDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private helperService:HelperService,private activatedRoute: ActivatedRoute, private difficultyService: DifficultyService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.difficultyService.deleteDifficulty(this.id).subscribe(
      data => {
        this.difficultyService.updateStatus = data['message'];
        setTimeout(() => this.difficultyService.updateStatus = '', 2000);
        this.router.navigate(['/admin/difficulties']);
        setTimeout(() => window.scrollTo(0, 0), 0);
      },
      error => {
        this.msg =  this.helperService.ParseErrorMsg(error);
      }
    )
  };
  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
