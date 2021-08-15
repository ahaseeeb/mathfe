import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'ag-admin-user-report',
  templateUrl: './admin-user-report.component.html',
  styleUrls: ['./admin-user-report.component.css']
})
export class AdminUserReportComponent implements OnInit {
  public msg = "";
  constructor(public dialogRef: MatDialogRef<AdminUserReportComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      if (data.message) {
        this.msg = data.message;
      }
    }
  }
  ngOnInit() {
  }

}
