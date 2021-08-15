import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ag-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnChanges {
  beURL = environment.apiURL + '/';
  @Input() selectedCourse: Course;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  ngOnChanges(changes) {
    // console.log(changes.selectedCourse);
  }

  public login(obj) {
    this.authService.login(true);
    localStorage.setItem('house', JSON.stringify(obj));
  }

  public directEnrol(obj) {
    localStorage.setItem('house', JSON.stringify(obj));
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
