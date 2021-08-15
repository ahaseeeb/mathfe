import { Routes } from "@angular/router";
import { AdminCourseListComponent } from "./admin-course-list/admin-course-list.component";
import { AdminDashboardComponent } from "./admin-dashboard.component";
import { AdminCourseCreateComponent } from './admin-course-create/admin-course-create.component';
import { AdminCourseEditComponent } from './admin-course-edit/admin-course-edit.component';

import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { AdminTrackListComponent } from "./admin-track-list/admin-track-list.component";
import { AdminTrackCreateComponent } from './admin-track-create/admin-track-create.component';
import { AdminTrackEditComponent } from './admin-track-edit/admin-track-edit.component';
import { AdminTrackDeleteComponent } from './admin-track-delete/admin-track-delete.component';
import { AdminSkillListComponent } from "./admin-skill-list/admin-skill-list.component";
import { AdminSkillCreateComponent } from './admin-skill-create/admin-skill-create.component';
import { AdminSkillEditComponent } from './admin-skill-edit/admin-skill-edit.component';
import { AdminSkillDeleteComponent } from './admin-skill-delete/admin-skill-delete.component';
import { AdminQuestionListComponent } from "./admin-question-list/admin-question-list.component";
import { AdminQuestionFormComponent } from './admin-question-form/admin-question-form.component';

import { AdminQuestionDeleteComponent } from './admin-question-delete/admin-question-delete.component';

import { AdminHouseListComponent } from "./admin-house-list/admin-house-list.component";
import { AdminHouseCreateComponent } from './admin-house-create/admin-house-create.component';
import { AdminHouseEditComponent } from './admin-house-edit/admin-house-edit.component';
// import { AdminHouseDeleteComponent } from './admin-house-delete/admin-house-delete.component';

import { AdminFieldListComponent } from "./admin-field-list/admin-field-list.component";
import { AdminFieldCreateComponent } from './admin-field-create/admin-field-create.component';
import { AdminFieldEditComponent } from './admin-field-edit/admin-field-edit.component';
import { AdminFieldDeleteComponent } from './admin-field-delete/admin-field-delete.component';


import { AdminRoleListComponent } from "./admin-role-list/admin-role-list.component";
import { AdminRoleCreateComponent } from './admin-role-create/admin-role-create.component';
import { AdminRoleEditComponent } from './admin-role-edit/admin-role-edit.component';
import { AdminRoleDeleteComponent } from './admin-role-delete/admin-role-delete.component';


import { AdminTypeListComponent } from "./admin-type-list/admin-type-list.component";
import { AdminTypeCreateComponent } from './admin-type-create/admin-type-create.component';
import { AdminTypeEditComponent } from './admin-type-edit/admin-type-edit.component';
import { AdminTypeDeleteComponent } from './admin-type-delete/admin-type-delete.component';

import { AdminUnitListComponent } from "./admin-unit-list/admin-unit-list.component";
import { AdminUnitCreateComponent } from './admin-unit-create/admin-unit-create.component';
import { AdminUnitEditComponent } from './admin-unit-edit/admin-unit-edit.component';
import { AdminUnitDeleteComponent } from './admin-unit-delete/admin-unit-delete.component';

import { AdminLevelListComponent } from "./admin-level-list/admin-level-list.component";
import { AdminLevelCreateComponent } from './admin-level-create/admin-level-create.component';
import { AdminLevelEditComponent } from './admin-level-edit/admin-level-edit.component';
import { AdminLevelDeleteComponent } from './admin-level-delete/admin-level-delete.component';

import { AdminPermissionListComponent } from "./admin-permission-list/admin-permission-list.component";
import { AdminPermissionCreateComponent } from './admin-permission-create/admin-permission-create.component';
import { AdminPermissionEditComponent } from './admin-permission-edit/admin-permission-edit.component';
import { AdminPermissionDeleteComponent } from './admin-permission-delete/admin-permission-delete.component';

import { AdminDifficultyListComponent } from "./admin-difficulty-list/admin-difficulty-list.component";
import { AdminDifficultyCreateComponent } from './admin-difficulty-create/admin-difficulty-create.component';
import { AdminDifficultyEditComponent } from './admin-difficulty-edit/admin-difficulty-edit.component';
import { AdminDifficultyDeleteComponent } from './admin-difficulty-delete/admin-difficulty-delete.component';


import { AdminEnrolmentListComponent } from "./admin-enrolment-list/admin-enrolment-list.component";
import { AdminEnrolmentCreateComponent } from './admin-enrolment-create/admin-enrolment-create.component';
import { AdminEnrolmentEditComponent } from './admin-enrolment-edit/admin-enrolment-edit.component';
import { AdminEnrolmentDeleteComponent } from './admin-enrolment-delete/admin-enrolment-delete.component';
import { AdminQuizAddComponent } from "./admin-quiz-add/admin-quiz-add.component";
import { AdminQuizListComponent } from "./admin-quiz-list/admin-quiz-list.component";
import { AdminQuizDeleteComponent } from "./admin-quiz-delete/admin-quiz-delete.component";
import { AdminQuizEditComponent } from "./admin-quiz-edit/admin-quiz-edit.component";

export const adminRoutes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'courses', component: AdminCourseListComponent },
  { path: 'courses/create', component: AdminCourseCreateComponent },
  { path: 'courses/edit/:id', component: AdminCourseEditComponent },
  { path: 'tracks', component: AdminTrackListComponent },
  { path: 'tracks/create', component: AdminTrackCreateComponent },
  { path: 'tracks/edit/:id', component: AdminTrackEditComponent },
  { path: 'tracks/delete/:id', component: AdminTrackDeleteComponent },
  { path: 'skills', component: AdminSkillListComponent },
  { path: 'skills/create', component: AdminSkillCreateComponent },
  { path: 'skills/edit/:id', component: AdminSkillEditComponent },
  { path: 'skills/delete/:id', component: AdminSkillDeleteComponent },

  { path: 'houses', component: AdminHouseListComponent },
  { path: 'houses/create', component: AdminHouseCreateComponent },
  { path: 'houses/edit/:id', component: AdminHouseEditComponent },
  // { path: 'houses/delete/:id', component: AdminHouseDeleteComponent },

  { path: 'fields', component: AdminFieldListComponent },
  { path: 'fields/create', component: AdminFieldCreateComponent },
  { path: 'fields/edit/:id', component: AdminFieldEditComponent },
  { path: 'fields/delete/:id', component: AdminFieldDeleteComponent },

  { path: 'roles', component: AdminRoleListComponent },
  { path: 'roles/create', component: AdminRoleCreateComponent },
  { path: 'roles/edit/:id', component: AdminRoleEditComponent },
  { path: 'roles/delete/:id', component: AdminRoleDeleteComponent },

  { path: 'types', component: AdminTypeListComponent },
  { path: 'types/create', component: AdminTypeCreateComponent },
  { path: 'types/edit/:id', component: AdminTypeEditComponent },
  { path: 'types/delete/:id', component: AdminTypeDeleteComponent },

  { path: 'units', component: AdminUnitListComponent },
  { path: 'units/create', component: AdminUnitCreateComponent },
  { path: 'units/edit/:id', component: AdminUnitEditComponent },
  { path: 'units/delete/:id', component: AdminUnitDeleteComponent },

  { path: 'enrolments', component: AdminEnrolmentListComponent },
  { path: 'enrolments/create', component: AdminEnrolmentCreateComponent },
  { path: 'enrolments/edit/:id', component: AdminEnrolmentEditComponent },
  { path: 'enrolments/delete/:id', component: AdminEnrolmentDeleteComponent },

  { path: 'levels', component: AdminLevelListComponent },
  { path: 'levels/create', component: AdminLevelCreateComponent },
  { path: 'levels/edit/:id', component: AdminLevelEditComponent },
  { path: 'levels/delete/:id', component: AdminLevelDeleteComponent },

  { path: 'permissions', component: AdminPermissionListComponent },
  { path: 'permissions/create', component: AdminPermissionCreateComponent },
  { path: 'permissions/edit/:id', component: AdminPermissionEditComponent },
  { path: 'permissions/delete/:id', component: AdminPermissionDeleteComponent },

  { path: 'difficulties', component: AdminDifficultyListComponent },
  { path: 'difficulties/create', component: AdminDifficultyCreateComponent },
  { path: 'difficulties/edit/:id', component: AdminDifficultyEditComponent },
  { path: 'difficulties/delete/:id', component: AdminDifficultyDeleteComponent },

  { path: 'questions', component: AdminQuestionListComponent },
  { path: 'questions/create', component: AdminQuestionFormComponent },
  { path: 'questions/edit/:id', component: AdminQuestionFormComponent },
  { path: 'questions/delete/:id', component: AdminQuestionDeleteComponent },
  { path: 'users', component: AdminUserListComponent },
  { path: 'users/edit/:id', component: AdminUserEditComponent },

  { path: 'quizzes', component: AdminQuizListComponent },
  { path: 'quizzes/create', component: AdminQuizAddComponent },
  { path: 'quizzes/edit/:id', component: AdminQuizEditComponent },
  { path: 'quizzes/delete/:id', component: AdminQuizDeleteComponent }

];
