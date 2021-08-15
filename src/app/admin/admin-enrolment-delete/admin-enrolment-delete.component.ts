import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnrolmentService } from 'app/services/enrolment.service';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-enrolment-delete',
  templateUrl: './admin-enrolment-delete.component.html',
  styleUrls: ['./admin-enrolment-delete.component.css']
})
export class AdminEnrolmentDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private helperService: HelperService, private activatedRoute: ActivatedRoute, private enrolmentService: EnrolmentService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.enrolmentService.deleteEnrolment(this.id).subscribe(
      data => {
        this.enrolmentService.updateStatus = data['message'];
        setTimeout(() => this.enrolmentService.updateStatus = '', 2000);
        this.router.navigate(['/admin/enrolments']);
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
