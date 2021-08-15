import { Component, OnInit, Inject } from '@angular/core';
import { HouseTrackService } from '../../../../services/house-track.service';
import { Track } from '../../../../models/track';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from "../../../confirm-dialog/confirm-dialog.component"
import { Router } from '@angular/router';
import { debug } from 'util';
import { HouseService } from '../../../../services/house.service';

@Component({
  selector: 'ag-admin-house-tracks-list',
  templateUrl: './admin-house-tracks-list.component.html',
  styleUrls: ['./admin-house-tracks-list.component.css']
})
export class AdminHouseTracksListComponent implements OnInit {
  loading = true;
  tracks: Track[] = [];
  updateStatus: '';
  constructor(private trackService: HouseTrackService, public dialogRef: MatDialogRef<AdminHouseTracksListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private houseService: HouseService, ) {
    this.loading = true;
    this.trackService.getTracksByHouse(this.data.houseid).subscribe(x => {
      this.tracks = x.class;
      this.loading = false;
    })
  }

  ngOnInit() {
  }
  resetUpdateStatus() {
    this.updateStatus = '';
  }
  UnlinkTrack(trackid) {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Do you really want to delete the track from this class?", title: "Delete Track" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          this.loading = true;
          this.trackService.deleteTrack(this.data.houseid, trackid).subscribe((x: any) => {
            this.tracks = x.tracks;
            this.updateStatus = x.message;
            this.loading = false;
            //accepted
          }, (err) => {
          })
        } else {
          //rejected
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
