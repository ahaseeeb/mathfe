import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { House } from '../../models/house';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-track-create',
  templateUrl: './admin-track-create.component.html',
  styleUrls: ['./admin-track-create.component.css']
})
export class AdminTrackCreateComponent implements OnInit {
  public status: string;
  public message: string;
  levels = [];
  statuses = [];
  fields = [];
  skills = [];
  formData: any;

  constructor(
    private trackService: TrackService,
    private router: Router, private helperService: HelperService) { }

  ngOnInit() {
    this.trackService.createTrack().subscribe(
      data => {
        console.log('data');
        console.log(data);
        this.levels = data['levels'];
        this.statuses = data['statuses'];
        this.fields = data['fields'];
        this.skills = data['skills'];
      },
      error => console.error(<any>error));
  }

  public createTrack(track): void {
    console.log(track);
    this.trackService.addTrack(track)
      .subscribe(
        track => {

          this.trackService.updateStatus = track['message'];
          setTimeout(() => this.trackService.updateStatus = '', 2000);
          this.router.navigate(['/admin/tracks']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error);
        }
      );
  }
}
