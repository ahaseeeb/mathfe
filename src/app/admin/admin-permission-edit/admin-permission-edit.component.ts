import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { Permission } from '../../models/permission';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'ag-admin-permission-edit',
  templateUrl: './admin-permission-edit.component.html',
  styleUrls: ['./admin-permission-edit.component.css']
})
export class AdminPermissionEditComponent implements OnInit, OnDestroy {

  status: string;
  message: string;
  id: any;
  params: any;


  permission = new Permission('id', 'permission', 'description');

  constructor(
    private activatedRoute: ActivatedRoute,
    private permissionService: PermissionService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.permissionService.getPermission(this.id).subscribe(
      data => {
        this.permission = data;
      },
      error => console.error(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updatePermission(permission: Permission) {
    this.permissionService.updatePermission(permission)
      .subscribe(
        permission => {
          this.status = 'success';
          this.message = permission['message'];
          this.permissionService.updateStatus = this.message = permission['message'];
          setTimeout(() => this.permissionService.updateStatus = '', 2000);
          this.router.navigate(['/admin/permissions']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => { 
          this.status = 'success';
          this.message =  this.helperService.ParseErrorMsg(error);
        }
      );
  }
}
