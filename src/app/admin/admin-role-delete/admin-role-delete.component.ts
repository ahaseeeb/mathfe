import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'app/services/role.service';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-role-delete',
  templateUrl: './admin-role-delete.component.html',
  styleUrls: ['./admin-role-delete.component.css']
})
export class AdminRoleDeleteComponent implements OnInit {

  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private helperService: HelperService, private activatedRoute: ActivatedRoute, private roleService: RoleService, private router: Router) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.roleService.deleteRole(this.id).subscribe(
      data => {
        this.roleService.updateStatus = data['message'];
        setTimeout(() => this.roleService.updateStatus = '', 2000);
        this.router.navigate(['/admin/roles']);
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
