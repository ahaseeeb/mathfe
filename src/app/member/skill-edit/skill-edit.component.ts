import { Component, OnInit, Input } from '@angular/core';
import { Skill } from '../../models/skill';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'ag-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css']
})
export class SkillEditComponent implements OnInit {
  state: string;
  message: string;
  @Input() skill:Skill;
  statuses: any;
  status: any;
  
  constructor(private skillService:SkillService) { }

  ngOnInit() {
    this.skillService.createSkill().subscribe(
      data => {
        this.statuses = data['statuses'];
      },
      error =>  console.error(<any>error)); 
  }

  updateSkill(skill) {
	  this.skillService.updateSkill(skill)
	    .subscribe(
	      skill  => {
	        this.state = 'success';
	        this.message = skill['message'];
	        this.skill = skill['skill'];
	      },
	      error => { 
	        console.error(<any>error);
	        this.state = 'error';
	        this.message = error['message'];
	      }
	    );
	  }

  closeEditModal(){
  	this.message=null;
  	this.state=null;
  }
}