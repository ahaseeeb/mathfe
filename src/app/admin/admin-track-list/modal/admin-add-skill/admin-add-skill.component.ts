import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from "../../../confirm-dialog/confirm-dialog.component"
import { Router } from '@angular/router';
import { debug } from 'util';
import { environment } from 'environments/environment';
import { Track } from '../../../../models/track';
import { Skill } from '../../../../models/skill';
import { SkillTrackService } from '../../../../services/skill-track.service';

@Component({
  selector: 'ag-admin-add-skill',
  templateUrl: './admin-add-skill.component.html',
  styleUrls: ['./admin-add-skill.component.css']
})
export class AdminAddSkillComponent implements OnInit {
  skills: Skill[] = [];
  public loading: boolean = true;
  skill_ids = [];
  error = false;
  constructor(private skillTrackService: SkillTrackService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog, public dialogRef: MatDialogRef<AdminAddSkillComponent>) {
    this.loading = true;
    this.error = false;
    this.skillTrackService.getSkills().subscribe(x => {
      this.skillTrackService.getSkillsByTrack(this.data.trackid).subscribe(y => {
        let aviableSkills = [];
        x.forEach((item, index) => {
          let isExist = y.skill.filter(t => { return t.id == item.id }).length > 0;
          if (isExist) {
            this.skill_ids.push(item.id);
          }
          aviableSkills.push(item)

        });
        this.skills = aviableSkills;
        this.loading = false;
      })
    })
  }
  saveTrack() {
    this.error = false;
    let selectedSkill = [];
    this.skill_ids.forEach((item, index) => {
      let t = this.skills.filter(t => { return t.id == item })[0]
      selectedSkill.push(t.id);
    });
    this.skillTrackService.addSkillByTrack(selectedSkill, this.data.trackid).subscribe((result: any) => {
      // Handle result
      this.dialogRef.close(result.message);
    },
      error => {
        //Server error, please try after some time.
        this.error = true;
        console.error(error);
      }
    );
  }
  ngOnInit() {
  }

}
