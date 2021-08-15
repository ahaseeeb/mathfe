import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';
import { TypeService } from '../../services/type.service';
import { Type } from '../../models/type';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ag-admin-type-list',
  templateUrl: './admin-type-list.component.html',
  styleUrls: ['./admin-type-list.component.css']
})
export class AdminTypeListComponent implements OnInit {

  private _beURL = environment.apiURL + '/';
  public types: Type[];
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
    private typeService: TypeService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.typeService.getTypes()
      .subscribe(items => { 
        this.types = items.sort(this._sortById);
        this._updateloading(false);
      });
  }

  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.typeService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.typeService.updateStatus;
  }

  public imageUrl(url: string): string {
    return this._beURL + url;
  }

  public editType(id: number): void {
    this._router.navigate(['/admin/types/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Type" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/types/delete', id]);
        } else {
          //rejected
        }
      });
  }

  // sort block

  public sortBy(str: string): void {
    if (this.types && this.types.length) {
      switch (str) {
        case 'title':
          if (this.sortedByTitle) {
            this.types.reverse();
            this._resetSort();
            this.reversedByTitle = true;
          }
          else {
            this.types.sort(this._sortByTitle);
            this._resetSort();
            this.sortedByTitle = true;
          }
          break;
        case 'description':
          if (this.sortedByDescription) {
            this.types.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.types.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
      }
    }
  }

  private _sortById(a: Type, b: Type): number {
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

  private _sortByTitle(a: Type, b: Type): number {
    if (a.type.toLowerCase() < b.type.toLowerCase()) {
      return -1;
    }
    else if (a.type.toLowerCase() > b.type.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDescription(a: Type, b: Type): number {
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
