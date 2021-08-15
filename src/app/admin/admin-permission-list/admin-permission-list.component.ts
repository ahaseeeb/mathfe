import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';;
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { PermissionService } from '../../services/permission.service';
import { Permission } from '../../models/permission';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ag-admin-permission-list',
  templateUrl: './admin-permission-list.component.html',
  styleUrls: ['./admin-permission-list.component.css']
})
export class AdminPermissionListComponent implements OnInit {

  private _beURL = environment.apiURL + '/';
  public permissions: Permission[];
  public loading: boolean = true;

  // sort block

  public sortedByTitle: boolean = false;
  public sortedByDescription: boolean = false;

  public reversedByTitle: boolean = false;
  public reversedByDescription: boolean = false;

  ShowColumns = {
    Title: true,
    Description: true,
    Action: true
  }

  constructor(
    private _router: Router,
    private permissionService: PermissionService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.permissionService.getPermissions()
      .subscribe(items => {        
        this.permissions = items.sort(this._sortById);
        this._updateloading(false);
      });
  }

  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.permissionService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.permissionService.updateStatus;
  }

  public imageUrl(url: string): string {
    return this._beURL + url;
  }

  public editPermission(id: number): void {
    this._router.navigate(['/admin/permissions/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Permission" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/permissions/delete', id]);
        } else {
          //rejected
        }
      });
  }

  // sort block

  public sortBy(str: string): void {
    if (this.permissions && this.permissions.length) {
      switch (str) {
        case 'title':
          if (this.sortedByTitle) {
            this.permissions.reverse();
            this._resetSort();
            this.reversedByTitle = true;
          }
          else {
            this.permissions.sort(this._sortByTitle);
            this._resetSort();
            this.sortedByTitle = true;
          }
          break;
        case 'description':
          if (this.sortedByDescription) {
            this.permissions.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.permissions.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
      }
    }
  }

  private _sortById(a: Permission, b: Permission): number {
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

  private _sortByTitle(a: Permission, b: Permission): number {
    if (a.permission.toLowerCase() < b.permission.toLowerCase()) {
      return -1;
    }
    else if (a.permission.toLowerCase() > b.permission.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDescription(a: Permission, b: Permission): number {
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
