import { Routes } from "@angular/router";
import { MemberDashboardComponent } from "./member-dashboard.component";
import { ContactComponent } from "../contact/contact.component";
import { AboutComponent } from "../about/about.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { TrackCreateComponent } from "./track-create/track-create.component";
import { VideoComponent } from "./video/video.component";
import { ClassManagementComponent } from "./class-management/class-management.component";
import { StudentManagementComponent } from "./student-management/student-management.component";
import { CourseManagementComponent } from "./course-management/course-management.component";
import { RecommendedCoursesComponent } from "./recommended-courses/recommended-courses.component";
import { EnrolledClassComponent } from "./enrolled-class/enrolled-class.component";

export const memberRoutes: Routes = [
  { path: '', component: MemberDashboardComponent},
  { path: 'profile', component: UserProfileComponent},
  { path: 'tracks/create', component: TrackCreateComponent},
  { path: 'video/:id', component: VideoComponent },
  { path: 'video', component: VideoComponent },
  { path: 'enrolled-classes', component: MemberDashboardComponent },
  { path: 'class-management', component: ClassManagementComponent },
  { path: 'student-management/:id', component: StudentManagementComponent },
  { path: 'course-management/:id', component: CourseManagementComponent },
  { path: 'recommended-courses', component: RecommendedCoursesComponent },
  { path: 'enrolled-class/:id',component:EnrolledClassComponent}
];
