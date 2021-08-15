import { Component, OnInit } from '@angular/core';
import { Course } from '../models/course';
import { Dashboard } from '../models/dashboard';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'ag-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard: any;
  selectedCourse: Course;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  	this.dashboard = this.dashboardService.getCourses();
  }

  selectCourse(course: Course) {
  	this.selectedCourse = course;
  }

   public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
