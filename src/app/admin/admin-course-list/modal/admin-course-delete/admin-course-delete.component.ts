import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CourseService } from '../../../../services/course.service';
import { HelperService } from '../../../../services/helper.service';
@Component({
  selector: 'ag-admin-course-delete',
  templateUrl: './admin-course-delete.component.html',
  styleUrls: ['./admin-course-delete.component.css']
})
export class AdminCourseDeleteComponent implements OnInit {

  msg = "";
  error = false;
  loading = false;
  constructor(private courseService: CourseService,
    private helperService: HelperService,
    public dialogRef: MatDialogRef<AdminCourseDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  DeleteCourse() {
    this.loading = true;
    this.error = false;
    this.msg = "";
    this.courseService.deleteCourse(this.data.id).subscribe(
      data => {
        this.loading = false;
        this.dialogRef.close({
          msg: data['message'],
          success: true
        });
      },
      error => {
        this.loading = false;
        this.error = true;
        this.msg = this.helperService.ParseErrorMsg(error);
      }
    )
  }
  ngOnInit() {
  }

}
