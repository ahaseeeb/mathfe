import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../../models/skill';
import { Track } from '../../models/track';
import { SkillTrackService } from '../../services/skill-track.service';

@Component({
  selector: 'ag-skill-delete',
  templateUrl: './skill-delete.component.html',
  styleUrls: ['./skill-delete.component.css']
})
export class SkillDeleteComponent implements OnInit {
  @Input() track:Track;
  @Input() skill:Skill;
  state: string;
  message: string;

  constructor(private skillTrackService:SkillTrackService) { }

  ngOnInit() {	
  }

  deleteSkill() {
  	this.skillTrackService.deleteSkill(this.track.id,this.skill.id).subscribe(
      skill  => {
        this.state = 'success';
        this.message = skill['message'];
		this.track['skills'] = skill['skills'];
		console.log(this.track['skills']);
      },
      error => { 
        console.error(<any>error);
        this.state = 'error';
        this.message = error['message'];
      }
    );
  }

  closeDeleteModal(){
  	this.message=null;
  	this.state=null;
  }

}