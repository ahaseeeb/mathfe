import { Component, OnInit, Inject } from '@angular/core';
import { Difficulty } from 'app/models/difficulty';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component"
import { DifficultyService } from 'app/services/difficulty.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'ag-admin-difficulty-list',
  templateUrl: './admin-difficulty-list.component.html',
  styleUrls: ['./admin-difficulty-list.component.css']
})
export class AdminDifficultyListComponent implements OnInit {

  private _beURL = environment.apiURL + '/';
  public difficulties: Difficulty[];
  public loading: boolean = true;


  // sort block

  public sortedByTitle: boolean = false;
  public sortedByDescription: boolean = false;
  public sortedByShortDescription: boolean = false;
  public sortedByAuther: boolean = false;

  public reversedByTitle: boolean = false;
  public reversedByDescription: boolean = false;
  public reversedByShortDescription: boolean = false;
  public reversedByAuther: boolean = false;

  ShowColumns = {
    Difficulty: true,
    Description: true,
    Short_Description: true,
    Action: true
  }

  constructor(
    private _router: Router,
    private difficultyService: DifficultyService,
    public dialog: MatDialog
  ) { }

  ngOnInit() { 
    this._updateloading(true);
    this.difficultyService.getDifficulties()
      .subscribe(items => { 
        this.difficulties = items.sort(this._sortById);
        this._updateloading(false);
      });
  }
  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.difficultyService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.difficultyService.updateStatus;
  }
 
  public editDifficulty(id: number): void {
    this._router.navigate(['/admin/difficulties/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Difficulty" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/difficulties/delete', id]);
        } else {
          //rejected
        }
      });
  }
  // sort block

  public sortBy(str: string): void {
    if (this.difficulties && this.difficulties.length) {
      switch (str) {
        case 'title':
          if (this.sortedByTitle) {
            this.difficulties.reverse();
            this._resetSort();
            this.reversedByTitle = true;
          }
          else {
            this.difficulties.sort(this._sortByTitle);
            this._resetSort();
            this.sortedByTitle = true;
          }
          break;
        case 'description':
          if (this.sortedByDescription) {
            this.difficulties.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.difficulties.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
           case 'short_description':
          if (this.sortedByShortDescription) {
            this.difficulties.reverse();
            this._resetSort();
            this.reversedByShortDescription = true;
          }
          else {
            this.difficulties.sort(this._sortByShortDescription);
            this._resetSort();
            this.sortedByShortDescription = true;
          }
          break;
        case 'auther':
          if (this.sortedByAuther) {
            this.difficulties.reverse();
            this._resetSort();
            this.reversedByAuther = true;
          }
          else {
            this.difficulties.sort(this._sortByAuther);
            this._resetSort();
            this.sortedByAuther = true;
          }
          break;
      }
    }
  }


  private _sortById(a: Difficulty, b: Difficulty): number {
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

  private _sortByTitle(a: Difficulty, b: Difficulty): number {
    if (a.difficulty < b.difficulty) {
      return -1;
    }
    else if (a.difficulty > b.difficulty) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDescription(a: Difficulty, b: Difficulty): number {
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
 private _sortByShortDescription(a: Difficulty, b: Difficulty): number {
    if (a.short_description.toLowerCase() < b.short_description.toLowerCase()) {
      return -1;
    }
    else if (a.short_description.toLowerCase() > b.short_description.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _sortByAuther(a, b): number {
    if (a.user.firstname.toLowerCase() < b.user.firstname.toLowerCase()) {
      return -1;
    }
    else if (a.user.firstname.toLowerCase() > b.user.firstname.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _resetSort(): void {
    this.sortedByTitle = false;
    this.sortedByDescription = false;
    this.sortedByShortDescription = false;
    this.reversedByTitle = false;
    this.reversedByDescription = false;
    this.reversedByShortDescription = false;
    this.reversedByAuther = false;

  }

}
