import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { House } from '../../models/house';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { NotifyDialogComponent } from "../notify-dialog/notify-dialog.component";
import { TrackService } from '../../services/track.service';
import { Track } from '../../models/track';
import { AdminHouseSkillsTrackListComponent } from './modal/admin-house-skills-track-list/admin-house-skills-track-list.component';
import { AdminAddSkillComponent } from './modal/admin-add-skill/admin-add-skill.component';
import { SkillTrackService } from '../../services/skill-track.service';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-track-list',
  templateUrl: './admin-track-list.component.html',
  styleUrls: ['./admin-track-list.component.css']
})
export class AdminTrackListComponent implements OnInit {
  loading = true;
  tracks: Track[];
  allTrack = [];
  public houses: House[];
  message: '';

  ShowColumns = {
    Track: true,
    Description: true,
    Status: true,
    Field: true,
    Level: true,
    Classes: true,
    Action: true
  }
  constructor(private skillTrackService: SkillTrackService, private trackService: TrackService, private _router: Router,
    public dialog: MatDialog,
    private helperService: HelperService) { }

  ngOnInit() {

    this.loading = true;
    this.trackService.getTracks().subscribe(x => {
      this.tracks = x;
      this.allTrack = x;
      this.loading = false;
      if (localStorage.getItem("last_track_edit_id")) {
        setTimeout(() => {
          let id = localStorage.getItem("last_track_edit_id");
          var elmnt = document.getElementById("track_" + id);
          elmnt.scrollIntoView({ block: 'end', behavior: 'smooth' });
          localStorage.removeItem('last_track_edit_id');
        }, 1000)
      }
    })

    console.log("tracks array testing");
    console.log(this.tracks);
  }

  public doSearch(query) {
    let filtered = [];
    this.allTrack.forEach((v, i) => {
      let add = false;
      if (query) {
        query = query.toLowerCase();
        if (v.description) {
          if (v.description.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
        if (v.track) {
          if (v.track.toLowerCase().indexOf(query) != -1) {
            add = true;
          }
        }
      } else {
        add = true;
      }
      if (add) {
        filtered.push(v);
      }
    })
    this.tracks = filtered;
  }


  resetUpdateStatus() {
    this.trackService.updateStatus = '';
  }

  get updateStatus(): string {
    return this.trackService.updateStatus;
  }

  openViewSkills(trackid): void {
    const dialogRef = this.dialog.open(AdminHouseSkillsTrackListComponent, {
      data: { trackid: trackid }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getAddSkill(trackid) {
    const dialogRef = this.dialog.open(AdminAddSkillComponent, {
      width: '400px',
      data: { trackid: trackid }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialog.open(NotifyDialogComponent, {
          data: {
            message: result,
            title: "Add Skills",
            error: false
          }
        });
      }
    });
  }

  deleteAllSkills(trackid) {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Do you really want to delete all skills from this track? ", title: "Delete All Skills" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          this.loading = true;
          this.skillTrackService.deleteAllSkills(trackid).subscribe((x: any) => {
            this.loading = false;
            this.dialog.open(NotifyDialogComponent, {
              data: {
                message: x.message,
                title: "Delete Skills",
                error: false
              }
            });
          }, (err) => {
            this.loading = false;
            this.dialog.open(NotifyDialogComponent, {
              data: {
                message: this.helperService.ParseErrorMsg(err),
                title: "Delete Skills",
                error: true
              }
            });
          })
        } else {
          //rejected
        }
      });
  }
}
