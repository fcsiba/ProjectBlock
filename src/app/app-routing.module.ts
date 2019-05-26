import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { AboutComponent } from './about/about.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { SignupComponent } from './user/signup/signup.component';
import { ProjectFormComponent } from './project/project-form/project-form.component';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { MyprojectComponent } from './project/myproject/myproject.component';
import { AuthGuard } from "./shared/services/guard/auth.guard";
import { EditComponent } from './project/edit/edit.component';
import { DetailComponent } from './project/detail/detail.component';
import { ProfileComponent } from './buyer/profile/profile.component';
import { RequestformComponent } from './buyer/requestform/requestform.component';
import { RequestdetailComponent } from './buyer/requestdetail/requestdetail.component';
import { MyrequestComponent } from './buyer/myrequest/myrequest.component';



const routes: Routes = [

{path:'',component: HomeComponentComponent },
{path:'about',component: AboutComponent},
{path:'login',component: LoginComponent},
{path:'signup',component: SignupComponent},
{path:'dashboard',component: DashboardComponent},
{path:'form',component: ProjectFormComponent,canActivate: [AuthGuard]},
{path:'view',component: ProjectViewComponent},
{path:'project',component: MyprojectComponent},
{path:'project/detail/:id',component: DetailComponent},
{path:'project/edit',component: EditComponent},
{path:'project/detail/:pid/requestform/:id',component: RequestformComponent},
{path:'project/detail/:id/user/detail/:uid',component: ProfileComponent},
{path:'user/detail/:uid',component: ProfileComponent},
{path:'project/form/:id',component: ProjectFormComponent},
{path:'requestdetail',component: RequestdetailComponent},
{path:'myrequest',component: MyrequestComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
