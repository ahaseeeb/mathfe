import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { LevelService } from '../../services/level.service';
import { Level } from '../../models/level';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'ag-admin-level-edit',
  templateUrl: './admin-level-edit.component.html',
  styleUrls: ['./admin-level-edit.component.css']
})
export class AdminLevelEditComponent implements OnInit, OnDestroy {
  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any;
  formData: FormData = new FormData();


  level = new Level('id', 0, 'description', 0, 0, 0, 0);

  constructor(
    private activatedRoute: ActivatedRoute,
    private levelService: LevelService,
    private router: Router,
    private helperService:HelperService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.levelService.getLevel(this.id).subscribe(
      data => {
        this.level = data;
      },
      error => console.error(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateLevel(level: Level) {
    this.levelService.updateLevel(level)
      .subscribe(
        level => {
          this.status = 'success';
          this.message = level['message'];
          this.levelService.updateStatus = this.message = level['message'];
          setTimeout(() => this.levelService.updateStatus = '', 2000);
          this.router.navigate(['/admin/levels']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.status = 'success';
          this.message =  this.helperService.ParseErrorMsg(error);
        }
      );
  }


}
