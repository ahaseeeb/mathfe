import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { Course } from '../../models/course';
import { House } from '../../models/house';
import { Skill } from '../../models/skill';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'ag-class-management-shared',
  templateUrl: './class-management-shared.component.html',
  styleUrls: ['./class-management-shared.component.css']
})
export class ClassManagementSharedComponent implements OnInit {
  @Input() activeTab: any;
  selectedHouse: House;
  dashboard: any;
  houses: any;
  courses: any;
  selectedCourse: Course;
  selectedTeach: House;
  selectedVideo: Skill;
  user: Observable<any>;
  houseid: any;
  constructor(private dashboardService: DashboardService, private route: ActivatedRoute) { }

  ngOnInit() {
    $('.spinner-footer-envelope').show();
    this.houseid = this.route.snapshot.paramMap.get("id");
    this.dashboardService.getUser().subscribe(
      data => {
        this.user = data;
      },
      error => console.error(<any>error));

    var houses = localStorage.getItem('EnrolledTeachers');
    if (houses) {
      this.selectedTeach = JSON.parse(houses).filter((d) => d.id == this.houseid)[0];
    }
    $('.spinner-footer-envelope').hide();

  }
  selectCourse(course: Course) {
    this.selectedCourse = course;
    this.selectedTeach = null;
    // this.selectedHouse = null;
  }
  selectTeach(house: House) {
    this.selectedTeach = house;
    this.selectedCourse = null;
    //this.selectedHouse = null;
  }
  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  selectSkill(skill: Skill) {
    this.selectedVideo = skill;
  }

}
