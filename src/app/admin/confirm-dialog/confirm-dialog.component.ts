import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'ag-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  public msg = "Are you sure you want to delete?";
  public title = "Confirmation";
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      if (data.message) {
        this.msg = data.message;
      }
      if (data.title) {
        this.title = data.title;
      }
    }
  }
  ngOnInit() {
  }

}
