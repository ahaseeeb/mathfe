import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeService } from '../../services/type.service';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-type-delete',
  templateUrl: './admin-type-delete.component.html',
  styleUrls: ['./admin-type-delete.component.css']
})
export class AdminTypeDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private helperService: HelperService, private activatedRoute: ActivatedRoute, private typeService: TypeService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.typeService.deleteType(this.id).subscribe(
      data => {
        this.typeService.updateStatus = data['message'];
        setTimeout(() => this.typeService.updateStatus = '', 2000);
        this.router.navigate(['/admin/types']);
        setTimeout(() => window.scrollTo(0, 0), 0);
      },
      error => {
        this.msg = this.helperService.ParseErrorMsg(error);
      }
    )
  };
  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
