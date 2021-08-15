import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeService } from '../../services/type.service';
import { Type } from '../../models/type';

import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'ag-admin-type-edit',
  templateUrl: './admin-type-edit.component.html',
  styleUrls: ['./admin-type-edit.component.css']
})
export class AdminTypeEditComponent implements OnInit, OnDestroy {

  status: string;
  message: string;
  id: any;
  params: any;


  type = new Type('id', 'type', 'description');

  constructor(
    private activatedRoute: ActivatedRoute,
    private typeService: TypeService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.typeService.getType(this.id).subscribe(
      data => {
        this.type = data;
      },
      error => console.error(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateType(type: Type) {
    this.typeService.updateType(type)
      .subscribe(
        type => {
          this.status = 'success';
          this.message = type['message'];
          this.typeService.updateStatus = this.message = type['message'];
          setTimeout(() => this.typeService.updateStatus = '', 2000);
          this.router.navigate(['/admin/types']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error);
        }
      );
  }
}
