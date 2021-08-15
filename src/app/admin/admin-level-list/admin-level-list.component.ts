import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';;
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';
import { LevelService } from '../../services/level.service';
import { Level } from '../../models/level';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'ag-admin-level-list',
  templateUrl: './admin-level-list.component.html',
  styleUrls: ['./admin-level-list.component.css']
})
export class AdminLevelListComponent implements OnInit {

  private _beURL = environment.apiURL + '/';
  public levels: Level[];
  public loading: boolean = true;

  // sort block

  public sortedByTitle: boolean = false;
  public sortedByAge: boolean = false;
  public sortedByDescription: boolean = false;
  public sortedByStart: boolean = false;
  public sortedByEnd: boolean = false;

  public reversedByTitle: boolean = false;
  public reversedByAge: boolean = false;
  public reversedByDescription: boolean = false;
  public reversedByStart: boolean = false;
  public reversedByEnd: boolean = false;

  ShowColumns = {
    Level: true,
    Age: true,
    Start_Maxile_Level: true,
    End_Maxile_Level: true,
    Description: true,
    Action: true
  }

  constructor(
    private _router: Router,
    private levelService: LevelService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.levelService.getLevels()
      .subscribe(items => {
        this.levels = items.sort(this._sortById);
        this._updateloading(false);
      });
  }

  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.levelService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.levelService.updateStatus;
  }

  public imageUrl(url: string): string {
    return this._beURL + url;
  }

  public editLevel(id: number): void {
    this._router.navigate(['/admin/levels/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Level" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/levels/delete', id]);
        } else {
          //rejected
        }
      });
  }

  // sort block

  public sortBy(str: string): void {
    if (this.levels && this.levels.length) {
      switch (str) {
        case 'title':
          if (this.sortedByTitle) {
            this.levels.reverse();
            this._resetSort();
            this.reversedByTitle = true;
          }
          else {
            this.levels.sort(this._sortByTitle);
            this._resetSort();
            this.sortedByTitle = true;
          }
          break;
        case 'age':
          if (this.sortedByAge) {
            this.levels.reverse();
            this._resetSort();
            this.reversedByAge = true;
          }
          else {
            this.levels.sort(this._sortByAge);
            this._resetSort();
            this.sortedByAge = true;
          }
          break;
        case 'start':
          if (this.sortedByStart) {
            this.levels.reverse();
            this._resetSort();
            this.reversedByStart = true;
          }
          else {
            this.levels.sort(this._sortByStart);
            this._resetSort();
            this.sortedByStart = true;
          }
          break;
        case 'end':
          if (this.sortedByEnd) {
            this.levels.reverse();
            this._resetSort();
            this.reversedByEnd = true;
          }
          else {
            this.levels.sort(this._sortByEnd);
            this._resetSort();
            this.sortedByEnd = true;
          }
          break;
        case 'description':
          if (this.sortedByDescription) {
            this.levels.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.levels.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
      }
    }
  }

  private _sortById(a: Level, b: Level): number {
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

  private _sortByTitle(a: Level, b: Level): number {
    if (a.level < b.level) {
      return -1;
    }
    else if (a.level > b.level) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByAge(a: Level, b: Level): number {
    if (a.age < b.age) {
      return -1;
    }
    else if (a.age > b.age) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByStart(a: Level, b: Level): number {
    if (a.start_maxile_level < b.start_maxile_level) {
      return -1;
    }
    else if (a.start_maxile_level > b.start_maxile_level) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByEnd(a: Level, b: Level): number {
    if (a.end_maxile_level < b.end_maxile_level) {
      return -1;
    }
    else if (a.end_maxile_level > b.end_maxile_level) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDescription(a: Level, b: Level): number {
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
    this.sortedByAge = false;
    this.sortedByStart = false;
    this.sortedByEnd = false;
    this.reversedByTitle = false;
    this.reversedByDescription = false;
    this.reversedByAge = false;
    this.reversedByStart = false;
    this.reversedByEnd = false;
  }

}
