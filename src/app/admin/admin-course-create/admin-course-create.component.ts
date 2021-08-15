import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'ag-admin-course-create',
  templateUrl: './admin-course-create.component.html',
  styleUrls: ['./admin-course-create.component.css']
})

export class AdminCourseCreateComponent implements OnInit {
  public status: string;
  public message: string;
  public selectedFile: File = null;
  public imgURL: string = 'images/upload.png';

  constructor(
    private courseService: CourseService,
    private helperService: HelperService,
    private router: Router) { }

  ngOnInit() { }

  public createCourse(course): void {
    const formData: FormData = new FormData();

    formData.append('image', this.selectedFile);
    formData.append('course', course.course);
    formData.append('description', course.description);
    formData.append('start_maxile_score', course.start_maxile_score);
    formData.append('end_maxile_score', course.end_maxile_score);

    this.courseService.addCourse(formData)
      .subscribe(
        course => {
          this.courseService.updateStatus = course['message'];
          setTimeout(() => this.courseService.updateStatus = '', 2000);
          this.router.navigate(['/admin/courses']);
          setTimeout(() => window.scrollTo(0, 0), 0);
        },
        error => {
          this.status = 'danger';
          this.message = this.helperService.ParseErrorMsg(error);
        }
      );
  }

  public onFileSelected(files: FileList): void {
    this.selectedFile = files.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
}
