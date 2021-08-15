import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'; 
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';
import { FieldService } from '../../services/field.service';
import { Field } from '../../models/field';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ag-admin-field-list',
  templateUrl: './admin-field-list.component.html',
  styleUrls: ['./admin-field-list.component.css']
})
export class AdminFieldListComponent  implements OnInit {

  private _beURL = environment.apiURL + '/';
  public fields: Field[];
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
    private fieldService: FieldService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fieldService.getFields()
      .subscribe(items => { 
        this.fields = items.sort(this._sortById);
        this._updateloading(false);
      });
  }

  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.fieldService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.fieldService.updateStatus;
  }

  public imageUrl(url: string): string {
    return this._beURL + url;
  }

  public editField(id: number): void {
    this._router.navigate(['/admin/fields/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }
  
  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Field" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/fields/delete', id]);
        } else {
          //rejected
        }
      });
  }

  // sort block

  public sortBy(str: string): void {
    if (this.fields && this.fields.length) {
      switch (str) {
        case 'title':
          if (this.sortedByTitle) {
            this.fields.reverse();
            this._resetSort();
            this.reversedByTitle = true;
          }
          else {
            this.fields.sort(this._sortByTitle);
            this._resetSort();
            this.sortedByTitle = true;
          }
          break;
        case 'description':
          if (this.sortedByDescription) {
            this.fields.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.fields.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
      }
    }
  }

  private _sortById(a: Field, b: Field): number {
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

  private _sortByTitle(a: Field, b: Field): number {
    if (a.field.toLowerCase() < b.field.toLowerCase()) {
      return -1;
    } 
    else if (a.field.toLowerCase() > b.field.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDescription(a: Field, b: Field): number {
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
