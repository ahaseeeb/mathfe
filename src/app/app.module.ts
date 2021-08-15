import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CourseListComponent } from './dashboard/course-list/course-list.component';
import { CourseComponent } from './dashboard/course-list/course.component';
import { CourseService } from './services/course.service';
import { QuestionService } from './services/question.service';
import { TrackService } from './services/track.service';
import { SkillService } from './services/skill.service';
import { HouseTrackService } from './services/house-track.service';
import { SkillTrackService } from './services/skill-track.service';
import { UserService } from './services/user.service';
import { DashboardService } from './services/dashboard.service';
import { HouseService } from './services/house.service';
import { FieldService } from './services/field.service';
import { RoleService } from './services/role.service';
import { TypeService } from './services/type.service';
import { UnitService } from './services/unit.service';
import { LevelService } from './services/level.service';
import { DifficultyService } from './services/difficulty.service';
import { HelperService } from './services/helper.service';
import { CourseDetailComponent } from './dashboard/course-detail/course-detail.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { routes } from './app.routes';
import { AdminComponent } from './admin/admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AdminCourseListComponent } from './admin/admin-course-list/admin-course-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminCourseCreateComponent } from './admin/admin-course-create/admin-course-create.component';
import { AdminCourseEditComponent } from './admin/admin-course-edit/admin-course-edit.component';
import { AdminCourseDeleteComponent } from './admin/admin-course-list/modal/admin-course-delete/admin-course-delete.component';
import { AdminUserListComponent } from './admin/admin-user-list/admin-user-list.component';
import { AdminUserReportComponent } from './admin/admin-user-report/admin-user-report.component';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuardService } from './services/auth-guard.service';
import { LandingComponent } from './landing/landing.component';
import { MemberComponent } from './member/member.component';
import { HouseComponent } from './member/house/house.component';
import { FooterComponent } from './footer.component';
import { HouseListComponent } from './member/house-list/house-list.component';
import { HouseDetailComponent } from './member/house-detail/house-detail.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { CustomMinDirective } from './directives/custom-min-validator.directive';
import { CustomMaxDirective } from './directives/custom-max-validator.directive';
import { TeachListComponent } from './member/teach-list/teach-list.component';
import { TeachComponent } from './member/teach-list/teach.component';
import { TeachDetailComponent } from './member/teach-list/teach-detail/teach-detail.component';
import { TrackPassedComponent } from './member/teach-list/track-passed/track-passed.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './member/teach-list/teach-detail/chart/chart.component';
import { BarchartComponent } from './member/teach-list/teach-detail/barchart/barchart.component';
import { StudentradarComponent } from './member/house-detail/studentradar/studentradar.component';
import { UserinfoComponent } from './member/userinfo/userinfo.component';
import { VideoComponent } from './member/video/video.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RouterModule } from '@angular/router';
import { QuizComponent } from './member/quiz/quiz.component';
import { MemberDashboardComponent } from './member/member-dashboard.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './pagenotfound.component';
import { UserProfileComponent } from './member/user-profile/user-profile.component';
import { TrackCreateComponent } from './member/track-create/track-create.component';
import { TrackEditComponent } from './member/track-edit/track-edit.component';
import { TrackDeleteComponent } from './member/track-delete/track-delete.component';
import { SkillCreateComponent } from './member/skill-create/skill-create.component';
import { SkillEditComponent } from './member/skill-edit/skill-edit.component';
import { SkillDeleteComponent } from './member/skill-delete/skill-delete.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AdminUserEditComponent } from './admin/admin-user-edit/admin-user-edit.component';
import { AdminTrackListComponent } from './admin/admin-track-list/admin-track-list.component';
import { AdminTrackEditComponent } from './admin/admin-track-edit/admin-track-edit.component';
import { AdminTrackCreateComponent } from './admin/admin-track-create/admin-track-create.component';
import { AdminSkillEditComponent } from './admin/admin-skill-edit/admin-skill-edit.component';
import { AdminSkillCreateComponent } from './admin/admin-skill-create/admin-skill-create.component';
import { AdminSkillListComponent } from './admin/admin-skill-list/admin-skill-list.component';
import { AdminSkillDeleteComponent } from './admin/admin-skill-delete/admin-skill-delete.component';
import { AdminQuestionListComponent } from './admin/admin-question-list/admin-question-list.component';

import { AdminTrackDeleteComponent } from './admin/admin-track-delete/admin-track-delete.component';
import { AdminQuestionFormComponent } from './admin/admin-question-form/admin-question-form.component';

import { AdminQuestionDeleteComponent } from './admin/admin-question-delete/admin-question-delete.component';

import { AdminHouseListComponent } from "./admin/admin-house-list/admin-house-list.component";
import { AdminHouseEditComponent } from './admin/admin-house-edit/admin-house-edit.component';
import { AdminHouseCreateComponent } from './admin/admin-house-create/admin-house-create.component';

import { AdminHouseDeleteComponent } from './admin/admin-house-list/modal/admin-house-delete/admin-house-delete.component';

import { AdminFieldListComponent } from "./admin/admin-field-list/admin-field-list.component";
import { AdminFieldCreateComponent } from './admin/admin-field-create/admin-field-create.component';
import { AdminFieldEditComponent } from './admin/admin-field-edit/admin-field-edit.component';
import { AdminFieldDeleteComponent } from './admin/admin-field-delete/admin-field-delete.component';

import { AdminTypeListComponent } from "./admin/admin-type-list/admin-type-list.component";
import { AdminTypeCreateComponent } from './admin/admin-type-create/admin-type-create.component';
import { AdminTypeEditComponent } from './admin/admin-type-edit/admin-type-edit.component';
import { AdminTypeDeleteComponent } from './admin/admin-type-delete/admin-type-delete.component';

import { AdminUnitListComponent } from "./admin/admin-unit-list/admin-unit-list.component";
import { AdminUnitCreateComponent } from './admin/admin-unit-create/admin-unit-create.component';
import { AdminUnitEditComponent } from './admin/admin-unit-edit/admin-unit-edit.component';
import { AdminUnitDeleteComponent } from './admin/admin-unit-delete/admin-unit-delete.component';

import { AdminLevelListComponent } from "./admin/admin-level-list/admin-level-list.component";
import { AdminLevelCreateComponent } from './admin/admin-level-create/admin-level-create.component';
import { AdminLevelEditComponent } from './admin/admin-level-edit/admin-level-edit.component';
import { AdminLevelDeleteComponent } from './admin/admin-level-delete/admin-level-delete.component';

import { AdminPermissionListComponent } from "./admin/admin-permission-list/admin-permission-list.component";
import { AdminPermissionCreateComponent } from './admin/admin-permission-create/admin-permission-create.component';
import { AdminPermissionEditComponent } from './admin/admin-permission-edit/admin-permission-edit.component';
import { AdminPermissionDeleteComponent } from './admin/admin-permission-delete/admin-permission-delete.component';

import { AdminRoleListComponent } from "./admin/admin-role-list/admin-role-list.component";
import { AdminRoleCreateComponent } from './admin/admin-role-create/admin-role-create.component';
import { AdminRoleEditComponent } from './admin/admin-role-edit/admin-role-edit.component';
import { AdminRoleDeleteComponent } from './admin/admin-role-delete/admin-role-delete.component';

import { AdminEnrolmentListComponent } from "./admin/admin-enrolment-list/admin-enrolment-list.component";
import { AdminEnrolmentCreateComponent } from "./admin/admin-enrolment-create/admin-enrolment-create.component";
import { AdminEnrolmentEditComponent } from "./admin/admin-enrolment-edit/admin-enrolment-edit.component";
import { AdminEnrolmentDeleteComponent } from "./admin/admin-enrolment-delete/admin-enrolment-delete.component";

import { AdminDifficultyListComponent } from "./admin/admin-difficulty-list/admin-difficulty-list.component";
import { AdminDifficultyCreateComponent } from './admin/admin-difficulty-create/admin-difficulty-create.component';
import { AdminDifficultyEditComponent } from './admin/admin-difficulty-edit/admin-difficulty-edit.component';
import { AdminDifficultyDeleteComponent } from './admin/admin-difficulty-delete/admin-difficulty-delete.component';

import { AdminHouseTracksListComponent } from './admin/admin-house-list/modal/admin-house-tracks-list/admin-house-tracks-list.component';
import { AdminAddTrackListComponent } from './admin/admin-house-list/modal/admin-add-track-list/admin-add-track-list.component';
import { AdminHouseSkillsTrackListComponent } from './admin/admin-track-list/modal/admin-house-skills-track-list/admin-house-skills-track-list.component';
import { AdminAddSkillComponent } from './admin/admin-track-list/modal/admin-add-skill/admin-add-skill.component';

import { DynamicContentComponent } from './admin/admin-question-list/dynamicContent/dynamicContent.component';

import { ConfirmDialogComponent } from './admin/confirm-dialog/confirm-dialog.component';
import { NotifyDialogComponent } from './admin/notify-dialog/notify-dialog.component';
import { DialogDeleteQuestion } from './admin/admin-question-list/admin-question-list.component';
import { ModalComponent } from './member/modal.component';
import { ModalService } from './services/modal.service';

import { LandingPageComponent } from './member/landing-page/landing-page.component';
import { ClassManagementComponent } from './member/class-management/class-management.component';
import { StudentManagementComponent } from './member/student-management/student-management.component';
import { CourseManagementComponent } from './member/course-management/course-management.component';
import { TeachDetailStudentComponent } from './member/teach-list/teach-detail-student/teach-detail-student.component';
import { TeachDetailCourseComponent } from './member/teach-list/teach-detail-course/teach-detail-course.component';
import { RecommendedCoursesComponent } from './member/recommended-courses/recommended-courses.component';
import { ClassManagementSharedComponent } from './member/class-management-shared/class-management-shared.component';
import { EnrolledClassComponent } from './member/enrolled-class/enrolled-class.component'
import { AdminEnrollmentUserDetailModalComponent } from './admin/admin-enrolment-list/modal/admin-enrollment-user-detail-modal/admin-enrollment-user-detail-modal.component';
import { AdminEnrollmentHouseDetailModalComponent } from './admin/admin-enrolment-list/modal/admin-enrollment-house-detail-modal/admin-enrollment-house-detail-modal.component';

//Angular Material
import { AngularMaterialModule } from './angularmaterial.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { NgxPayPalModule } from 'ngx-paypal';
import { DataTableModule } from "angular-6-datatable";

import { KatexModule } from 'ng-katex';
import { PermissionService } from './services/permission.service';
import { EnrolmentService } from './services/enrolment.service';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AdminQuizAddComponent } from './admin/admin-quiz-add/admin-quiz-add.component';
import { AdminQuizListComponent } from './admin/admin-quiz-list/admin-quiz-list.component';
import { AdminQuizDeleteComponent } from './admin/admin-quiz-delete/admin-quiz-delete.component';
import { AdminQuizEditComponent } from './admin/admin-quiz-edit/admin-quiz-edit.component'
export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CourseListComponent,
    CourseComponent,
    CourseDetailComponent,
    ContactComponent,
    AboutComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminCourseListComponent,
    AdminCourseCreateComponent,
    AdminCourseEditComponent,
    AdminCourseDeleteComponent,
    AdminUserListComponent,
    LandingComponent,
    MemberComponent,
    HouseComponent,
    FooterComponent,
    HouseListComponent,
    HouseDetailComponent,
    DropdownDirective,
    CustomMinDirective,
    CustomMaxDirective,
    TeachListComponent,
    TeachComponent,
    TeachDetailComponent,
    TrackPassedComponent,
    ChartComponent,
    BarchartComponent,
    StudentradarComponent,
    UserinfoComponent,
    VideoComponent,
    LeaderboardComponent,
    QuizComponent,
    MemberDashboardComponent,
    LoginComponent,
    PageNotFoundComponent,
    UserProfileComponent,
    TrackCreateComponent,
    TrackEditComponent,
    TrackDeleteComponent,
    SkillCreateComponent,
    SkillEditComponent,
    SkillDeleteComponent,
    PrivacyComponent,
    AdminUserEditComponent,
    AdminTrackListComponent,
    AdminTrackEditComponent,
    AdminTrackCreateComponent,
    AdminSkillEditComponent,
    AdminSkillCreateComponent,
    AdminSkillListComponent,
    AdminQuestionListComponent,
    AdminSkillDeleteComponent,
    AdminTrackDeleteComponent,
    AdminQuestionFormComponent,
    AdminQuestionDeleteComponent,
    AdminEnrolmentListComponent,
    AdminEnrolmentCreateComponent,
    AdminEnrolmentEditComponent,
    AdminEnrolmentDeleteComponent,
    AdminHouseListComponent,
    AdminHouseEditComponent,
    AdminHouseCreateComponent,
    AdminHouseDeleteComponent,
    AdminHouseSkillsTrackListComponent,
    AdminFieldListComponent,
    AdminFieldEditComponent,
    AdminFieldCreateComponent,
    AdminFieldDeleteComponent,

    AdminTypeListComponent,
    AdminTypeEditComponent,
    AdminTypeCreateComponent,
    AdminTypeDeleteComponent,

    AdminUnitListComponent,
    AdminUnitEditComponent,
    AdminUnitCreateComponent,
    AdminUnitDeleteComponent,

    AdminLevelListComponent,
    AdminLevelEditComponent,
    AdminLevelCreateComponent,
    AdminLevelDeleteComponent,

    AdminRoleListComponent,
    AdminRoleCreateComponent,
    AdminRoleEditComponent,
    AdminRoleDeleteComponent,

    AdminPermissionListComponent,
    AdminPermissionEditComponent,
    AdminPermissionCreateComponent,
    AdminPermissionDeleteComponent,
    AdminAddSkillComponent,
    AdminDifficultyListComponent,
    AdminDifficultyEditComponent,
    AdminDifficultyCreateComponent,
    AdminDifficultyDeleteComponent,
    AdminHouseTracksListComponent,
    AdminEnrollmentUserDetailModalComponent,
    AdminEnrollmentHouseDetailModalComponent,
    AdminAddTrackListComponent,
    DynamicContentComponent,

    DialogDeleteQuestion,
    ConfirmDialogComponent,
    AdminUserReportComponent,
    NotifyDialogComponent,
    ModalComponent,
    LandingPageComponent,
    ClassManagementComponent,
    StudentManagementComponent,
    CourseManagementComponent,
    TeachDetailStudentComponent,
    TeachDetailCourseComponent,
    RecommendedCoursesComponent,
    ClassManagementSharedComponent,
    EnrolledClassComponent,
    AdminQuizAddComponent,
    AdminQuizListComponent,
    AdminQuizDeleteComponent,
    AdminQuizEditComponent
  ],
  imports: [
    routes,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    HttpModule,
    ChartsModule,
    NgxPayPalModule,
    SelectDropDownModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          'localhost:4200',
          'localhost',
          'devapi.pamelalim.me',
          'localhost:8000',
          'quiz.pamelalim.me',
          'api.pamelalim.me',
          'math.pamelalim.me',
          'quiz.allgifted.com',
          'mathapi.pamelalim.me',
          'devapi.allgifted.com',
          'math.allgifted.com'
        ]
      }
    }),
    AngularMaterialModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    NgMasonryGridModule,
    DataTableModule,
    KatexModule
  ],
  entryComponents: [DialogDeleteQuestion, AdminHouseDeleteComponent, AdminCourseDeleteComponent,
    ConfirmDialogComponent, AdminUserReportComponent, NotifyDialogComponent, AdminHouseTracksListComponent,
    AdminEnrollmentUserDetailModalComponent, AdminEnrollmentHouseDetailModalComponent, AdminAddTrackListComponent,
    AdminHouseSkillsTrackListComponent, AdminAddSkillComponent],
  providers: [TrackService, CourseService, QuestionService, DashboardService,
    HouseService, FieldService, TypeService, UnitService, PermissionService, LevelService,
    DifficultyService, RoleService,
    UserService, AuthService, AuthGuardService, HouseTrackService,
    SkillService, SkillTrackService, ModalService, HelperService, EnrolmentService],
  bootstrap: [AppComponent]
})

export class AppModule { }



