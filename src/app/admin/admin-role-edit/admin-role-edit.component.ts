import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-role-edit',
  templateUrl: './admin-role-edit.component.html',
  styleUrls: ['./admin-role-edit.component.css']
})
export class AdminRoleEditComponent implements OnInit {

  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any;
  formData: FormData = new FormData();


  objRole = new Role('id', 'role', 'description');

  constructor(
    private activatedRoute: ActivatedRoute,
    private roleService: RoleService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.roleService.getRole(this.id).subscribe(
      data => {
        this.objRole = data;
      },
      error => console.error(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateRole(role: Role) {
    this.roleService.updateRole(role)
      .subscribe(
        role => {
          this.status = 'success';
          this.message = role['message'];
          this.roleService.updateStatus = this.message = role['message'];
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
