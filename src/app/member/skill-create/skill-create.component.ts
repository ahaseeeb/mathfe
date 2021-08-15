import { Component, OnInit, Input } from '@angular/core';
import { SkillService} from '../../services/skill.service';
import { Router} from '@angular/router';
import { Track } from '../../models/track';
import { Skill } from '../../models/skill';
import { Status } from '../../models/status';

@Component({
  selector: 'ag-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css']
})
export class SkillCreateComponent implements OnInit {
	@Input() track:Track;
	status: Status;
	message: string;
	statuses: Status[];
	my_skills: any;
	public_skills: any;
  state: string;

  constructor(private skillService: SkillService, private router:Router) { }

  ngOnInit() {
    this.skillService.createSkill().subscribe(
      data => {
        this.statuses = data['statuses'];
        this.my_skills = data['my_skills'];
        this.public_skills = data['public_skills'];
      },
      error =>  console.error(<any>error)); 
  }

  addSkill(skill) {
   this.skillService.addSkill(skill)
   .subscribe(
     skill  => {
       this.router.navigate(['/']);
       this.state = 'success';
       this.message = skill['message'];
       this.my_skills.push(skill['skill']);
       this.track['skills'].push(skill['skill']);
     },
     error => {
       console.error(<any>error);
       this.state = 'success';
       this.message = error['message'];
     }
   );
  }
}