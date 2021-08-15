import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { Role } from 'app/models/role';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-role-create',
  templateUrl: './admin-role-create.component.html',
  styleUrls: ['./admin-role-create.component.css']
})
export class AdminRoleCreateComponent implements OnInit {

  public status: string;
  public message: string;

  constructor(
    private roleService: RoleService,
    private router: Router,
    private helperService: HelperService) {

  }

  ngOnInit() { }

  public createRole(role: Role): void {

    this.roleService.addRole(role)
      .subscribe(
      role => {
        this.roleService.updateStatus = role['message'];
        setTimeout(() => this.roleService.updateStatus = '', 2000);
        this.router.navigate(['/admin/roles']);
        setTimeout(() => window.scrollTo(0, 0), 0);
      },
      error => {
        this.status = 'success';
        this.message = this.helperService.ParseErrorMsg(error);
      }
      );
  } 

}
