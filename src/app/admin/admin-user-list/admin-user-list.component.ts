import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AdminUserReportComponent } from '../admin-user-report/admin-user-report.component'
import { MatDialog } from '@angular/material';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ng-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
  users = [];
  status: string;
  message: string;
  loading = true;
  // sort block

  public sortedByEmail: boolean = false;
  public sortedByID: boolean = false;
  public sortedByFirst_Name: boolean = false;
  public sortedByLast_Name: boolean = false;
  public sortedByName: boolean = false;
  public sortedByMaxile_Level: boolean = false;
  public sortedByisAdmin: boolean = false;
  public sortedByGame_Level: boolean = false;
  public sortedByDate_of_Birth: boolean = false;
  public sortedByLast_Test_Date: boolean = false;

  public reversedByEmail: boolean = false;
  public reversedByID: boolean = false;
  public reversedByFirst_Name: boolean = false;
  public reversedByLast_Name: boolean = false;
  public reversedByName: boolean = false;
  public reversedByMaxile_Level: boolean = false;
  public reversedByisAdmin: boolean = false;
  public reversedByGame_Level: boolean = false;
  public reversedByDate_of_Birth: boolean = false;
  public reversedByLast_Test_Date: boolean = false;

  ShowColumns = {
    User: true,
    Email: true,
    First_Name: true,
    Last_Name: true,
    Name: true,
    Admin: true,
    Maxile_Level: true,
    Game_Level: true,
    Date_of_Birth: true,
    Last_Test_Date: true,
    Edit: true,
    ID: true
  }

  constructor(private userService: UserService, public dialog: MatDialog, private helperService: HelperService) { }

  ngOnInit() {
    this.bindUsers();
  }


  add_RemoveAdmin(userId) {
    let objIndex = this.users.findIndex((obj => obj.id === userId));
    if (this.users[objIndex].is_admin === 1) {

      this.users[objIndex].is_admin = 0;
    } else if (this.users[objIndex].is_admin === 0) {

      this.users[objIndex].is_admin = 1;
    }

  }

  private bindUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
        console.log("users data");
        console.log(this.users);
        this.loading = false;
      },
      error => {
        console.error(<any>error);
        this.loading = false;
      });

  }

  resetUpdateStatus() {
    this.userService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.userService.updateStatus;
  }

  public openDialog(id: String): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete User" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          this.userService.deleteUser(id).subscribe(
            data => {
              this.userService.updateStatus = data['message'];
              window.scrollTo(0, 0);
              setTimeout(() => this.userService.updateStatus = '', 2000);
            },
            error => {
              window.scrollTo(0, 0);
              this.userService.updateStatus = this.helperService.ParseErrorMsg(error);
            });
        } else {
          //rejected
        }
      });
  }


  public diagnostic(id: Number, user): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "The next test this user will do is the diagnostic. Is that your intended " } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          this.loading = true;
          this.userService.diagnostic(user, id).subscribe(
            data => {
              this.loading = false;
              this.userService.updateStatus = data['message'];

              user.game_level = data["data"].game_level;
              user.maxile_level = data["data"].maxile_level;
              window.scrollTo(0, 0);
              setTimeout(() => this.userService.updateStatus = '', 2000);

            },
            error => {
              this.loading = false;
              window.scrollTo(0, 0);
              this.userService.updateStatus = this.helperService.ParseErrorMsg(error);
            });
        } else {
          //rejected
        }
      });
  }




  public confirmReset(id: Number, user): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Reset User" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          this.loading = true;
          this.userService.resetUser(id).subscribe(
            data => {
              this.loading = false;
              this.userService.updateStatus = data['message'];

              user.game_level = data["data"].game_level;
              user.maxile_level = data["data"].maxile_level;
              window.scrollTo(0, 0);
              setTimeout(() => this.userService.updateStatus = '', 2000);

            },
            error => {
              this.loading = false;
              window.scrollTo(0, 0);
              this.userService.updateStatus = this.helperService.ParseErrorMsg(error);
            });
        } else {
          //rejected
        }
      });
  }



  public genrateReport(id: Number): void {
    this.loading = true;
    this.userService.getUserReport(id).subscribe(
      data => {
        this.loading = false;
        this.dialog.open(AdminUserReportComponent, { data: { message: data['message'] } })
      },
      error => {
        this.loading = false;
        window.scrollTo(0, 0);
        this.userService.updateStatus = this.helperService.ParseErrorMsg(error);
      });

  }
  // sort block
  public sortBy(str: string): void {
    if (this.users && this.users.length) {
      switch (str) {
        case 'id':
          if (this.sortedByID) {
            this.users.reverse();
            this._resetSort();
            this.reversedByID = true;
          }
          else {
            this.users.sort(this._sortById);
            this._resetSort();
            this.sortedByID = true;
          }
          break;
        case 'email':
          if (this.sortedByEmail) {
            this.users.reverse();
            this._resetSort();
            this.reversedByEmail = true;
          }
          else {
            this.users.sort(this._sortByEmail);
            this._resetSort();
            this.sortedByEmail = true;
          }
          break;
        case 'firstname':
          if (this.sortedByFirst_Name) {
            this.users.reverse();
            this._resetSort();
            this.reversedByFirst_Name = true;
          }
          else {
            this.users.sort(this._sortByFirst_Name);
            this._resetSort();
            this.sortedByFirst_Name = true;
          }
          break;
        case 'lastname':
          if (this.sortedByLast_Name) {
            this.users.reverse();
            this._resetSort();
            this.reversedByLast_Name = true;
          }
          else {
            this.users.sort(this._sortByLast_Name);
            this._resetSort();
            this.sortedByLast_Name = true;
          }
          break;
        case 'name':
          if (this.sortedByName) {
            this.users.reverse();
            this._resetSort();
            this.reversedByName = true;
          }
          else {
            this.users.sort(this._sortByName);
            this._resetSort();
            this.sortedByName = true;
          }
          break;
        case 'maxile_level':
          if (this.sortedByMaxile_Level) {
            this.users.reverse();
            this._resetSort();
            this.reversedByMaxile_Level = true;
          }
          else {
            this.users.sort(this._sortByMaxile_Level);
            this._resetSort();
            this.sortedByMaxile_Level = true;
          }
          break;
        case 'isAdmin':
          if (this.sortedByisAdmin) {
            this.users.reverse();
            this._resetSort();
            this.reversedByisAdmin = true;
          }
          else {
            this.users.sort(this._sortByisAdmin);
            this._resetSort();
            this.sortedByisAdmin = true;
          }
          break;
        case 'game_level':
          if (this.sortedByGame_Level) {
            this.users.reverse();
            this._resetSort();
            this.reversedByGame_Level = true;
          }
          else {
            this.users.sort(this._sortByGame_Level);
            this._resetSort();
            this.sortedByGame_Level = true;
          }
          break;
        case 'date_of_birth':
          if (this.sortedByDate_of_Birth) {
            this.users.reverse();
            this._resetSort();
            this.reversedByDate_of_Birth = true;
          }
          else {
            this.users.sort(this._sortByDate_of_Birth);
            this._resetSort();
            this.sortedByDate_of_Birth = true;
          }
          break;
        case 'last_test_date':
          if (this.sortedByLast_Test_Date) {
            this.users.reverse();
            this._resetSort();
            this.reversedByLast_Test_Date = true;
          }
          else {
            this.users.sort(this._sortByLast_Test_Date);
            this._resetSort();
            this.sortedByLast_Test_Date = true;
          }
          break;
      }
    }
  }
  handleImageLoadError = (event) => {
    event.target.src = "/assets/images/no_user.png";
  }
  private _sortById(a: User, b: User): number {
    if (parseInt(a.id) < parseInt(b.id)) {
      return -1;
    }
    else if (parseInt(a.id) > parseInt(b.id)) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByEmail(a: User, b: User): number {
    a.email = a.email || "";
    b.email = b.email || "";
    if (a.email.toLowerCase() < b.email.toLowerCase()) {
      return -1;
    }
    else if (a.email.toLowerCase() > b.email.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByFirst_Name(a: User, b: User): number {
    a.firstname = a.firstname || "";
    b.firstname = b.firstname || "";
    if (a.firstname.toLowerCase() < b.firstname.toLowerCase()) {
      return -1;
    }
    else if (a.firstname.toLowerCase() > b.firstname.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByLast_Name(a: User, b: User): number {
    a.lastname = a.lastname || "";
    b.lastname = b.lastname || "";
    if (a.lastname.toLowerCase() < b.lastname.toLowerCase()) {
      return -1;
    }
    else if (a.lastname.toLowerCase() > b.lastname.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByName(a: User, b: User): number {
    a.name = a.name || "";
    b.name = b.name || "";
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    else if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByMaxile_Level(a: User, b: User): number {
    a.maxile_level = a.maxile_level || "";
    b.maxile_level = b.maxile_level || "";
    if (a.maxile_level < b.maxile_level) {
      return -1;
    }
    else if (a.maxile_level > b.maxile_level) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _sortByisAdmin(a: any, b: any): number {
    a.is_admin = a.is_admin || "";
    b.is_admin = b.is_admin || "";
    if (a.is_admin < b.is_admin) {
      return -1;
    }
    else if (a.is_admin > b.is_admin) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _sortByGame_Level(a: User, b: User): number {
    a.game_level = a.game_level || "";
    b.game_level = b.game_level || "";
    if (a.game_level < b.game_level) {
      return -1;
    }
    else if (a.game_level > b.game_level) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByDate_of_Birth(a: User, b: User): number {
    a.date_of_birth = a.date_of_birth || "";
    b.date_of_birth = b.date_of_birth || "";
    if (a.date_of_birth.toLowerCase() < b.date_of_birth.toLowerCase()) {
      return -1;
    }
    else if (a.date_of_birth.toLowerCase() > b.date_of_birth.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByLast_Test_Date(a: User, b: User): number {
    a.last_test_date = a.last_test_date || "";
    b.last_test_date = b.last_test_date || "";
    if (a.last_test_date.toLowerCase() < b.last_test_date.toLowerCase()) {
      return -1;
    }
    else if (a.last_test_date.toLowerCase() > b.last_test_date.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _resetSort(): void {
    this.sortedByEmail = false;
    this.sortedByID = false;
    this.sortedByFirst_Name = false;
    this.sortedByLast_Name = false;
    this.sortedByName = false;
    this.sortedByMaxile_Level = false;
    this.sortedByisAdmin = false;
    this.sortedByGame_Level = false;
    this.sortedByDate_of_Birth = false;
    this.sortedByLast_Test_Date = false;

    this.reversedByEmail = false;
    this.reversedByID = false;
    this.reversedByFirst_Name = false;
    this.reversedByLast_Name = false;
    this.reversedByName = false;
    this.reversedByMaxile_Level = false;
    this.reversedByisAdmin = false;
    this.reversedByGame_Level = false;
    this.reversedByDate_of_Birth = false;
    this.reversedByLast_Test_Date = false;
  }

}
