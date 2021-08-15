import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { House } from '../../../../models/house';
import { HouseService } from '../../../../services/house.service';
@Component({
  selector: 'ag-admin-enrollment-house-detail-modal',
  templateUrl: './admin-enrollment-house-detail-modal.component.html',
  styleUrls: ['./admin-enrollment-house-detail-modal.component.css']
})
export class AdminEnrollmentHouseDetailModalComponent implements OnInit {
  house: any;
  loading = true;
  constructor(private houseService: HouseService, public dialogRef: MatDialogRef<AdminEnrollmentHouseDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
    this.loading = true;
    this.houseService.getHouse(this.data.houseId).subscribe(d => {
      this.house = d;
      this.loading = false;
    })
  }

  ngOnInit() {
  }

}
