import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-permission-delete',
  templateUrl: './admin-permission-delete.component.html',
  styleUrls: ['./admin-permission-delete.component.css']
})
export class AdminPermissionDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private helperService: HelperService, private activatedRoute: ActivatedRoute, private permissionService: PermissionService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.permissionService.deletePermission(this.id).subscribe(
      data => {
        this.permissionService.updateStatus = data['message'];
        setTimeout(() => this.permissionService.updateStatus = '', 2000);
        this.router.navigate(['/admin/permissions']);
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
