import { Component, OnInit,Input } from '@angular/core';
import { House } from '../../models/house';
import { Skill } from '../../models/skill';
import { ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'ag-enrolled-class',
  templateUrl: './enrolled-class.component.html',
  styleUrls: ['./enrolled-class.component.css']
})
export class EnrolledClassComponent implements OnInit {
  selectedHouse: House;
  houseid: any;
  selectedVideo: Skill;
  constructor(private route: ActivatedRoute) {
    $('.spinner-footer-envelope').show();
    this.houseid = this.route.snapshot.paramMap.get("id");
    var houses = localStorage.getItem('EnrolledClassess');
    if (houses) {
      this.selectedHouse = JSON.parse(houses).filter((d) => d.id == this.houseid)[0];
    }
    $('.spinner-footer-envelope').hide();
  }
  selectHouse(house: House) {
    debugger;
    this.selectedHouse = house; 
  }
  selectSkill(skill: Skill) {
    this.selectedVideo = skill;
  }
  ngOnInit() {
  }

}
