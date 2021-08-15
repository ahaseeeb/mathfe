import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'ag-notify-dialog',
  templateUrl: './notify-dialog.component.html',
  styleUrls: ['./notify-dialog.component.css']
})
export class NotifyDialogComponent implements OnInit {

  public msg = "Sucess";
  public title = "Info";
  public error = false;
  constructor(public dialogRef: MatDialogRef<NotifyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {
      if (data.message) {
        this.msg = data.message;
      }
      if (data.title) {
        this.title = data.title;
      }
      this.error = data.error;
    }
  }

  ngOnInit() {
  }

}
