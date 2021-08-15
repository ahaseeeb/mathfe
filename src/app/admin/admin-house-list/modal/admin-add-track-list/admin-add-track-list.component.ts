import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { debug } from 'util';
import { TrackService } from '../../../../services/track.service';
import { HouseTrackService } from '../../../../services/house-track.service';
import { Track } from '../../../../models/track';
@Component({
  selector: 'ag-admin-add-track-list',
  templateUrl: './admin-add-track-list.component.html',
  styleUrls: ['./admin-add-track-list.component.css']
})
export class AdminAddTrackListComponent implements OnInit {
  tracks: Track[] = [];
  public loading: boolean = true;
  track_ids = [];
  error = false;

  constructor(private housetrackService: HouseTrackService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AdminAddTrackListComponent>) {
    this.loading = true;
    this.error = false;
    this.housetrackService.getTracks().subscribe(x => {

      this.housetrackService.getTracksByHouse(this.data.houseid).subscribe(y => {
        let aviableTracks = [];
        x.forEach((item, index) => {
          let isExist = y.class.filter(t => { return t.id == item.id }).length > 0;
          if (isExist) {
            this.track_ids.push(item.id)
          }
          aviableTracks.push(item);
        });
        this.tracks = aviableTracks;
        this.loading = false;
      })
    })
  }
  saveTrack() {
    let selectedTracks = [];
    this.track_ids.forEach((item, index) => {
      let t = this.tracks.filter(t => { return t.id == item })[0]
      selectedTracks.push(t.id);
    });
    this.housetrackService.addHouseTracks(this.data.houseid, selectedTracks).subscribe((result: any) => {
      this.dialogRef.close(result.message);
    },
      error => {
        this.error = true;
        console.error(error)
      }
    );
  }
  ngOnInit() {
  }

}
