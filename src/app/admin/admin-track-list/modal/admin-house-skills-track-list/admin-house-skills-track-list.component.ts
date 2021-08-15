import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from "../../../confirm-dialog/confirm-dialog.component"
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { Track } from '../../../../models/track';
import { SkillTrackService } from '../../../../services/skill-track.service';

@Component({
  selector: 'ag-admin-house-skills-track-list',
  templateUrl: './admin-house-skills-track-list.component.html',
  styleUrls: ['./admin-house-skills-track-list.component.css']
})
export class AdminHouseSkillsTrackListComponent implements OnInit {
  loading = true;
  skills = [];
  updateStatus: '';
  public sortedByDescription: boolean = false;
  public reversedByDescription: boolean = false;
  private _beURL = environment.apiURL + '/';
  message: '';

  constructor(private skillService: SkillTrackService, public dialogRef: MatDialogRef<AdminHouseSkillsTrackListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    private sanitizer: DomSanitizer) {
    this.loading = true;
    this.skillService.getSkillsByTrack(this.data.trackid).subscribe(x => {

      x.skill.forEach((v, i) => {
        var videos = [];
        if (!v.links) {
          if (v.lesson_link) {
            videos.push(v.lesson_link)
          }
        } else {
          videos = v.links;
        }
        //if (videos.length == 0) {
        //  // //Default Video
        //  videos.push({
        //    id: -1,
        //    link: "/videos/skills/logo.mp4"
        //  });
        //} 
        v.videos = [];
        videos.forEach((url, ii) => {
          v.videos.push({
            play: false,
            link: this._beURL + url.link
          });
        });
      });
      this.skills = x.skill;
      this.loading = false;
    })
  }
  public videoUrl(skill): string {
    let url = skill.lesson_link;
    if (url) {
      return this._beURL + url;
    }
    else return this._beURL + "/videos/skills/logo.mp4"
  }
  ngOnInit() {
  }

  deleteSkill(skillid) {
    this.dialog.open(ConfirmDialogComponent, { data: { message: "Do you really want to delete the track from this class?", title: "Delete Track" } }).afterClosed().
      subscribe(ifYes => {
        if (ifYes) {
          this.loading = true;
          this.skillService.deleteSkillByTrackId(this.data.trackid, skillid).subscribe((x: any) => {
            this.skills = x.skills;
            this.message = x.message;
            this.loading = false;
            //accepted
          }, (err) => {
          })
        } else {
          //rejected
        }
      });
  }
  public sortBy(str: string): void {
    if (this.skills && this.skills.length) {
      switch (str) {
        case 'description':
          if (this.sortedByDescription) {
            this.skills.reverse();
            this._resetSort();
            this.reversedByDescription = true;
          }
          else {
            this.skills.sort(this._sortByDescription);
            this._resetSort();
            this.sortedByDescription = true;
          }
          break;
      }
    }
  }
  private _resetSort(): void {
    this.sortedByDescription = false;
    this.reversedByDescription = false;

  }

  private _sortByDescription(a: Track, b: Track): number {
    if (a.description.toLowerCase() < b.description.toLowerCase()) {
      return -1;
    }
    else if (a.description.toLowerCase() > b.description.toLowerCase()) {
      return 1;
    }
    else {
      return 0;
    }
  }

}
