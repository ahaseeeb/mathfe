import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { HelperService } from '../../services/helper.service';
@Component({
  selector: 'ag-admin-course-edit',
  templateUrl: './admin-course-edit.component.html',
  styleUrls: ['./admin-course-edit.component.css']
})
export class AdminCourseEditComponent implements OnInit, OnDestroy {
  beURL = environment.apiURL + '/';
  status: string;
  message: string;
  id: any;
  params: any;
  selectedFile: File = null;
  imgURL: string = "images/upload.png";
  formData: FormData = new FormData();
  loading = true;

  course = new Course('id', 'course', 'description', 'image', 'start_maxile_score', 'end_maxile_score');

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.params = this.activatedRoute.params.subscribe(params => this.id = params['id']);
    this.loading = true;
    this.courseService.getCourse(this.id).subscribe(
      data => {
        this.course = data;
        this.imgURL = this.beURL + this.course.image;
        this.loading = false;
      },
      error => {
        console.error(<any>error)
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  updateCourse(course) {
    this.formData.append('_method', 'PATCH');
    if (!this.imgURL.includes(course.image)) {
      this.formData.append('image', this.selectedFile);
    }
    this.formData.append('description', course.description);
    this.formData.append('course', course.course);
    this.formData.append('start_maxile_score', course.start_maxile_score);
    this.formData.append('end_maxile_score', course.end_maxile_score);
    this.loading = true;
    this.courseService.updateCourse(this.formData, course.id)
      .subscribe(
        course => {
          this.status = 'success';
          this.message = course['message'];
          this.courseService.updateStatus = this.message = course['message'];
          setTimeout(() => this.courseService.updateStatus = '', 2000);
          this.router.navigate(['/admin/courses']);
          setTimeout(() => window.scrollTo(0, 0), 0);
          this.loading=false;
        },
        error => {
          this.status = 'success';
          this.message = this.helperService.ParseErrorMsg(error);
          this.loading=false;
        }
      );
  }

  onFileSelected(files: FileList) {
    this.selectedFile = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imgURL = event.target.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

}
