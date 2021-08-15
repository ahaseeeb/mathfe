import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from 'app/services/skill.service';
import { HelperService } from '../../services/helper.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'ag-admin-skill-delete',
  templateUrl: './admin-skill-delete.component.html',
  styleUrls: ['./admin-skill-delete.component.css']
})
export class AdminSkillDeleteComponent implements OnInit {
  tracksExist = false;
  tracksExistMsg = "";
  id: any;
  params: any;
  msg = "Processing the delete request..";
  constructor(private helperService: HelperService, private activatedRoute: ActivatedRoute, private skillService: SkillService, private router: Router) { }

  ngOnInit() { 
    this.tracksExist = false;
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.deleteSkills(false);
  };
  deleteSkillsWithTracks() {
    this.deleteSkills(true);
  }
  deleteSkills(deleteTracks) { 
    let req: Observable<any>;
    if (deleteTracks) {
      req = this.skillService.deleteSkillWithTracks(this.id);
    } else {
      req = this.skillService.deleteSkill(this.id);
    }
    req.subscribe(
      data => {
        this.skillService.updateStatus = data['message'];
        setTimeout(() => this.skillService.updateStatus = '', 2000);
        this.router.navigate(['/admin/skills']);
        setTimeout(() => window.scrollTo(0, 0), 0);
      },
      error => {
        if (error.error) {
          if (error.error.code == "delink_tracks") {
            this.tracksExist = true;
            this.tracksExistMsg = error.error.message;
          } else {
            this.msg = this.msg = this.helperService.ParseErrorMsg(error);
          }
        } else {
          this.msg = this.msg = this.helperService.ParseErrorMsg(error);
        }

      }
    )
  }
  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
