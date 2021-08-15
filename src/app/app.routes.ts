import {Routes, RouterModule} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LandingComponent} from "./landing/landing.component";
import {ContactComponent} from "./contact/contact.component";
import {AboutComponent} from "./about/about.component";
import {ModuleWithProviders} from "@angular/core";
import {AdminComponent} from './admin/admin.component';
import {adminRoutes} from './admin/admin.routes';
import {memberRoutes} from './member/member.routes';
import {AuthGuardService} from './services/auth-guard.service';
import {MemberComponent} from './member/member.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { VideoComponent } from './member/video/video.component';
import { PageNotFoundComponent } from './pagenotfound.component';
import { PrivacyComponent } from './privacy/privacy.component';


const appRoutes: Routes = [
  { path: '', redirectTo:'/', pathMatch: 'full'},
  { path: '', component: DashboardComponent},
  { path:'home', component: LandingComponent},
  { path: 'login', component: LoginComponent},
  { path: 'leader', component: LeaderboardComponent},
  { path: 'about', component: AboutComponent},
  { path: 'admin', component: AdminComponent, children: adminRoutes, canActivate: [AuthGuardService]},
  { path: 'member', component: MemberComponent, children: memberRoutes, canActivate: [AuthGuardService]},
  { path:'privacy', component: PrivacyComponent },
  { path: 'video/:id', component: VideoComponent, canActivate: [AuthGuardService]},
  { path: '**', component: PageNotFoundComponent },

];

export const routes:ModuleWithProviders = RouterModule.forRoot(appRoutes);