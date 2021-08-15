import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrackService } from 'app/services/track.service';
import { HelperService } from '../../services/helper.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'ag-admin-track-delete',
  templateUrl: './admin-track-delete.component.html',
  styleUrls: ['./admin-track-delete.component.css']
})
export class AdminTrackDeleteComponent implements OnInit {

  skillsExist = false;
  skillsExistMsg = "";
  skills = [];
  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private helperService: HelperService, private activatedRoute: ActivatedRoute, private trackService: TrackService, private router: Router) { }

  ngOnInit() {
    this.skillsExist = false;
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.deleteTracks(false);
  };

  ngOnDestroy() {
    this.params.unsubscribe();
  }
  deleteTracksWithSkills() {
    this.deleteTracks(true);
  }
  deleteTracks(deleteSkills) {
    let req: Observable<any>;
    if (deleteSkills) {
      req = this.trackService.deleteTrackWithSkills(this.id);
    } else {
      req = this.trackService.deleteTrack(this.id);
    }
    req.subscribe(
      data => {
        this.trackService.updateStatus = data['message'];
        setTimeout(() => this.trackService.updateStatus = '', 2000);
        this.router.navigate(['/admin/tracks']);
        setTimeout(() => window.scrollTo(0, 0), 0);
      },
      error => {
        if (error.status == 409) {
          if (error.error.code == "delink_skills") {
            this.skillsExist = true;
            this.skillsExistMsg = error.error.message;
            this.skills = error.error.skills;
          } else {
            this.msg = "Server Error";
            console.error(error);
          }
        }
        else {
          this.msg = this.helperService.ParseErrorMsg(error);
        }

      }
    )
  }

}
