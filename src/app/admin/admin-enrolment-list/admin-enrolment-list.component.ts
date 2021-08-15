import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../environments/environment';
import { EnrolmentService } from '../../services/enrolment.service';
import { Enrolment } from '../../models/enrolment';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AdminEnrollmentUserDetailModalComponent } from './modal/admin-enrollment-user-detail-modal/admin-enrollment-user-detail-modal.component'
import { AdminEnrollmentHouseDetailModalComponent } from './modal/admin-enrollment-house-detail-modal/admin-enrollment-house-detail-modal.component';
@Component({
  selector: 'ag-admin-enrolment-list',
  templateUrl: './admin-enrolment-list.component.html',
  styleUrls: ['./admin-enrolment-list.component.css']
})
export class AdminEnrolmentListComponent implements OnInit {

  private _beURL = environment.apiURL + '/';
  public enrolments: Enrolment[];
  public allEnrolments: Enrolment[];
  public loading: boolean = true;
  message: '';

  // sort block
  public sortedByName: boolean = false;
  public sortedByRole: boolean = false;
  public sortedByHouse_Name: boolean = false;
  public sortedByProgress: boolean = false;
  public sortedByTxnID: boolean = false;
  public sortedByStart_Date: boolean = false;
  public sortedByExpiry_Date: boolean = false;
  public sortedByMastercode: boolean = false;
  public sortedByAmount_Paid: boolean = false;
  public sortedByPlaces: boolean = false;

  public reversedByName: boolean = false;
  public reversedByRole: boolean = false;
  public reversedByHouse_Name: boolean = false;
  public reversedByProgress: boolean = false;
  public reversedByTxnID: boolean = false;
  public reversedByStart_Date: boolean = false;
  public reversedByExpiry_Date: boolean = false;
  public reversedByMastercode: boolean = false;
  public reversedByAmount_Paid: boolean = false;
  public reversedByPlaces: boolean = false;

  ShowColumns = {
    User: true,
    Houses_Image: true,
    Name: true,
    Role: true,
    House_Name: true,
    Progress: true,
    TxnID: true,
    Start_Date: true,
    Expiry_Date: true,
    Mastercode: true,
    Amount_Paid: true,
    Places: true,
    Action: true
  }

  constructor(
    private _router: Router,
    private enrolmentService: EnrolmentService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.enrolmentService.getEnrolments()
      .subscribe((items: any) => {
        this.enrolments = items.enrolments.sort(this._sortById);
        this.allEnrolments = items.enrolments.sort(this._sortById);
        this._updateloading(false);
      });
  }

  private _updateloading(status: boolean): void {
    this.loading = status;
  }

  resetUpdateStatus() {
    this.enrolmentService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.enrolmentService.updateStatus;
  }

  public imageUrl(url: string): string {
    return this._beURL + url;
  }

  public editEnrolment(id: number): void {
    this._router.navigate(['/admin/enrolments/edit', id]);
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // open dialog block

  public openDialog(id: number): void {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Are you sure?", title: "Delete Enrolment" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          //accepted
          this._router.navigate(['/admin/enrolments/delete', id]);
        } else {
          //rejected
        }
      });
  }

  public openUserDetailDialog(userId) {
    this.dialog.open(AdminEnrollmentUserDetailModalComponent, { data: { userId: userId } });
  }
  public openHouseDetailDialog(houseId) {
    this.dialog.open(AdminEnrollmentHouseDetailModalComponent, { data: { houseId: houseId } });
  }
  handleImageLoadError = (event) => {
    event.target.src = "/assets/images/no_user.png";
  }
  public doSearch(query) {
    let filtered = [];
    this.allEnrolments.forEach((v, i) => {
      let add = false;
      if (query) {
        query = query.toLowerCase();
        if (v.users.firstname) {
          if (v.users.firstname.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
        if (v.users.lastname) {
          if (v.users.lastname.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
        if (v.houses.house) {
          if (v.houses.house.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
      } else {
        add = true;
      }
      if (add) {
        filtered.push(v);
      }
    })
    this.enrolments = filtered;
  }
  // sort block
  public sortBy(str: string): void {
    if (this.enrolments && this.enrolments.length) {
      switch (str) {
        case 'name':
          if (this.sortedByName) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByName = true;
          }
          else {
            this.enrolments.sort(this._sortByName);
            this._resetSort();
            this.sortedByName = true;
          }
          break;
        case 'role':
          if (this.sortedByRole) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByRole = true;
          }
          else {
            this.enrolments.sort(this._sortByRole);
            this._resetSort();
            this.sortedByRole = true;
          }
          break;
        case 'house_name':
          if (this.sortedByHouse_Name) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByHouse_Name = true;
          }
          else {
            this.enrolments.sort(this._sortByHouse_Name);
            this._resetSort();
            this.sortedByHouse_Name = true;
          }
          break;
        case 'progress':
          if (this.sortedByProgress) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByProgress = true;
          }
          else {
            this.enrolments.sort(this._sortByProgress);
            this._resetSort();
            this.sortedByProgress = true;
          }
          break;
        case 'txnID':
          if (this.sortedByTxnID) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByTxnID = true;
          }
          else {
            this.enrolments.sort(this._sortByTransaction_id);
            this._resetSort();
            this.sortedByTxnID = true;
          }
          break;
        case 'start_date':
          if (this.sortedByStart_Date) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByStart_Date = true;
          }
          else {
            this.enrolments.sort(this._sortByStart_Date);
            this._resetSort();
            this.sortedByStart_Date = true;
          }
          break;
        case 'expiry_date':
          if (this.sortedByExpiry_Date) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByExpiry_Date = true;
          }
          else {
            this.enrolments.sort(this._sortByExpiry_Date);
            this._resetSort();
            this.sortedByExpiry_Date = true;
          }
          break;
        case 'mastercode':
          if (this.sortedByMastercode) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByMastercode = true;
          }
          else {
            this.enrolments.sort(this._sortByMastercode);
            this._resetSort();
            this.sortedByMastercode = true;
          }
          break;
        case 'amount_paid':
          if (this.sortedByAmount_Paid) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByAmount_Paid = true;
          }
          else {
            this.enrolments.sort(this._sortByAmount_Paid);
            this._resetSort();
            this.sortedByAmount_Paid = true;
          }
          break;
        case 'places':
          if (this.sortedByPlaces) {
            this.enrolments.reverse();
            this._resetSort();
            this.reversedByPlaces = true;
          }
          else {
            this.enrolments.sort(this._sortByPlaces);
            this._resetSort();
            this.sortedByPlaces = true;
          }
          break;
      }
    }
  }

  private _sortById(a: Enrolment, b: Enrolment): number {
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

  private _sortByName(a: Enrolment, b: Enrolment): number {
    a.users.name = a.users.name || "";
    b.users.name = b.users.name || "";
    if (a.users.name.toLowerCase() < b.users.name.toLowerCase()) {
      return -1;
    }
    else if (a.users.name.toLowerCase() > b.users.name.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByRole(a: Enrolment, b: Enrolment): number {

    a.roles.role = a.roles.role || "";
    b.roles.role = b.roles.role || "";
    if (a.roles.role.toLowerCase() < b.roles.role.toLowerCase()) {
      return -1;
    }
    else if (a.roles.role.toLowerCase() > b.roles.role.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _sortByHouse_Name(a: Enrolment, b: Enrolment): number {
    a.houses.house = a.houses.house || "";
    b.houses.house = b.houses.house || "";
    if (a.houses.house.toLowerCase() < b.houses.house.toLowerCase()) {
      return -1;
    }
    else if (a.houses.house.toLowerCase() > b.houses.house.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _sortByProgress(a: Enrolment, b: Enrolment): number {
    a.progress = a.progress || "";
    b.progress = b.progress || "";
    if (a.progress < b.progress) {
      return -1;
    }
    else if (a.progress > b.progress) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _sortByTransaction_id(a: Enrolment, b: Enrolment): number {
    a.transaction_id = a.transaction_id || "";
    b.transaction_id = b.transaction_id || "";
    if (a.transaction_id < b.transaction_id) {
      return -1;
    }
    else if (a.transaction_id > b.transaction_id) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _sortByStart_Date(a: Enrolment, b: Enrolment): number {
    a.start_date = a.start_date || "";
    b.start_date = b.start_date || "";
    if (a.start_date.toLowerCase() < b.start_date.toLowerCase()) {
      return -1;
    }
    else if (a.start_date.toLowerCase() > b.start_date.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByExpiry_Date(a: Enrolment, b: Enrolment): number {
    a.expiry_date = a.expiry_date || "";
    b.expiry_date = b.expiry_date || "";
    if (a.expiry_date.toLowerCase() < b.expiry_date.toLowerCase()) {
      return -1;
    }
    else if (a.expiry_date.toLowerCase() > b.expiry_date.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

  private _sortByMastercode(a: Enrolment, b: Enrolment): number {
    a.mastercode = a.mastercode || "";
    b.mastercode = b.mastercode || "";
    if (a.mastercode.toLowerCase() < b.mastercode.toLowerCase()) {
      return -1;
    }
    else if (a.mastercode.toLowerCase() > b.mastercode.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _sortByAmount_Paid(a: Enrolment, b: Enrolment): number {
    a.amount_paid = a.amount_paid || "";
    b.amount_paid = b.amount_paid || "";
    if (a.amount_paid.toLowerCase() < b.amount_paid.toLowerCase()) {
      return -1;
    }
    else if (a.amount_paid.toLowerCase() > b.amount_paid.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _sortByPlaces(a: Enrolment, b: Enrolment): number {
    a.places_alloted = a.places_alloted || "";
    b.places_alloted = b.places_alloted || "";
    if (a.places_alloted.toLowerCase() < b.places_alloted.toLowerCase()) {
      return -1;
    }
    else if (a.places_alloted.toLowerCase() > b.places_alloted.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }
  private _resetSort(): void {
    this.sortedByName = false;
    this.sortedByRole = false;
    this.sortedByHouse_Name = false;
    this.sortedByProgress = false;
    this.sortedByTxnID = false;
    this.sortedByStart_Date = false;
    this.sortedByExpiry_Date = false;
    this.sortedByMastercode = false;
    this.sortedByAmount_Paid = false;
    this.sortedByPlaces = false;

    this.reversedByName = false;
    this.reversedByRole = false;
    this.reversedByHouse_Name = false;
    this.reversedByProgress = false;
    this.reversedByTxnID = false;
    this.reversedByStart_Date = false;
    this.reversedByExpiry_Date = false;
    this.reversedByMastercode = false;
    this.reversedByAmount_Paid = false;
    this.reversedByPlaces = false;
  }

}
