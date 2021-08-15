import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';;
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { UnitService } from '../../services/unit.service';
import { Unit } from '../../models/unit';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ag-admin-unit-list',
  templateUrl: './admin-unit-list.component.html',
  styleUrls: ['./admin-unit-list.component.css']
})
export class AdminUnitListComponent implements OnInit {

  private _beURL = environment.apiURL + '/';
  public units: Unit[];
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
    private unitService: UnitService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.unitService.getUnits()
      .subscribe(items => {        
        this.units = items.sort(this._sortById);
        this._updateloading(false);
      });
  }

  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.unitService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.unitService.updateStatus;
  }

  public imageUrl(url: string): string {
    return this._beURL + url;
  }

  public editUnit(id: number): void {
    this._router.navigate(['/admin/units/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Unit" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/units/delete', id]);
        } else {
          //rejected
        }
      });
  }

  // sort block

  public sortBy(str: string): void {
    if (this.units && this.units.length) {
      switch (str) {
        case 'title':
          if (this.sortedByTitle) {
            this.units.reverse();
            this._resetSort();
            this.reversedByTitle = true;
          }
          else {
            this.units.sort(this._sortByTitle);
            this._resetSort();
            this.sortedByTitle = true;
          }
          break;
        case 'description':
          if (this.sortedByDescription) {
            this.units.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.units.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
      }
    }
  }

  private _sortById(a: Unit, b: Unit): number {
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

  private _sortByTitle(a: Unit, b: Unit): number {
    if (a.unit.toLowerCase() < b.unit.toLowerCase()) {
      return -1;
    }
    else if (a.unit.toLowerCase() > b.unit.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDescription(a: Unit, b: Unit): number {
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
