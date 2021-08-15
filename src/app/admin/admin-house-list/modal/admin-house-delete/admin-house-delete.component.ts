import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HouseService } from '../../../../services/house.service';
import { HelperService } from '../../../../services/helper.service';
@Component({
  selector: 'ag-admin-house-delete',
  templateUrl: './admin-house-delete.component.html',
  styleUrls: ['./admin-house-delete.component.css']
})
export class AdminHouseDeleteComponent implements OnInit {
  msg = "";
  error = false;
  loading = false;
  constructor(private houseService: HouseService, private helperService: HelperService, public dialogRef: MatDialogRef<AdminHouseDeleteComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data) {

    }
  }

  DeleteHouse() {
    this.loading = true;
    this.error = false;
    this.msg = "";
    this.houseService.deleteHouse(this.data.id).subscribe(
      data => {
        this.loading = false;
        this.dialogRef.close({
          msg: data['message'],
          success: true
        });
      },
      error => {
        this.loading = false;
        this.error = true;
        this.msg = this.helperService.ParseErrorMsg(error);
      }
    )
  }
  ngOnInit() {
  }

}
