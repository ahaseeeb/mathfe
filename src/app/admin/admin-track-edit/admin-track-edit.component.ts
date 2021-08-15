import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-track-edit',
  templateUrl: './admin-track-edit.component.html',
  styleUrls: ['./admin-track-edit.component.css']
})
export class AdminTrackEditComponent implements OnInit {

  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any;
  levels = [];
  statuses = [];
  fields = [];
  skills = [];
  formData: any;

  trackObj: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private trackService: TrackService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.trackService.getTrack(this.id).subscribe(
      data => {
        data.skill_ids = [];
        if (data.skills) {
          data.skills.forEach((v, i) => {
            data.skill_ids.push(v.id)
          })
        }
        this.trackObj = data;
      },
      error => console.error(<any>error));

    this.trackService.createTrack().subscribe(
      data => {
        this.levels = data['levels'];
        this.statuses = data['statuses'];
        this.fields = data['fields'];
        this.skills = data['skills'];
      },
      error => console.error(<any>error));
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateTrack(track) {
    track.id = this.id;
    this.trackService.updateTrack(track)
      .subscribe(
        track => {
          localStorage.setItem("last_quiz_edit_id",this.id)
          this.status = 'success';
          this.message = track['message'];
          this.trackService.updateStatus = this.message = track['message'];
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
