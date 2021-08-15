import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'ag-admin-role-list',
  templateUrl: './admin-role-list.component.html',
  styleUrls: ['./admin-role-list.component.css']
})
export class AdminRoleListComponent implements OnInit {
  private _beURL = environment.apiURL + '/';
  public roles: Role[];
  public loading: boolean = true;
  message: '';

  // sort block

  public sortedByTitle: boolean = false;
  public sortedByDescription: boolean = false;
  public sortedByStart: boolean = false;
  public sortedByEnd: boolean = false;

  public reversedByTitle: boolean = false;
  public reversedByDescription: boolean = false;
  public reversedByStart: boolean = false;
  public reversedByEnd: boolean = false;

  ShowColumns = {
    Title: true,
    Description: true,
    Action: true
  }

  constructor(
    private _router: Router,
    private roleService: RoleService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.roleService.getRoles()
      .subscribe(items => {
        this.roles = items.sort(this._sortById);
        this._updateloading(false);
      });
  }

  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.roleService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.roleService.updateStatus;
  }

  public imageUrl(url: string): string {
    return this._beURL + url;
  }

  public editRole(id: number): void {
    this._router.navigate(['/admin/roles/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Role" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/roles/delete', id]);
        } else {
          //rejected
        }
      });
  }

  // sort block

  public sortBy(str: string): void {
    if (this.roles && this.roles.length) {
      switch (str) {
        case 'title':
          if (this.sortedByTitle) {
            this.roles.reverse();
            this._resetSort();
            this.reversedByTitle = true;
          }
          else {
            this.roles.sort(this._sortByTitle);
            this._resetSort();
            this.sortedByTitle = true;
          }
          break;
        case 'description':
          if (this.sortedByDescription) {
            this.roles.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.roles.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
      }
    }
  }

  private _sortById(a: Role, b: Role): number {
    if (a.id < b.id) {
      return -1;
    }
    else if (a.id > b.id) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByTitle(a: Role, b: Role): number {
    if (a.role.toLowerCase() < b.role.toLowerCase()) {
      return -1;
    }
    else if (a.role.toLowerCase() > b.role.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDescription(a: Role, b: Role): number {
    if (a.description.toLowerCase() < b.description.toLowerCase()) {
      return -1;
    }
    else if (a.description.toLowerCase() > b.description.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _resetSort(): void {
    this.sortedByTitle = false;
    this.sortedByDescription = false;
    this.reversedByTitle = false;
    this.reversedByDescription = false;
  }

}
