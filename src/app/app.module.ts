import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import {Routes ,RouterModule} from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { MatButtonModule, MatMenuModule, MatSidenavModule } from '@angular/material';
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FirestoreSettingsToken} from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './project/project-form/project-form.component';
import { ProjectViewComponent } from './project/project-view/project-view.component';
import { MyprojectComponent } from './project/myproject/myproject.component';
import { EditComponent } from './project/edit/edit.component';
import { DetailComponent } from './project/detail/detail.component';
import { ProfileComponent } from './buyer/profile/profile.component';
import { RequestformComponent } from './buyer/requestform/requestform.component';
import { RequestdetailComponent } from './buyer/requestdetail/requestdetail.component';
import { MyrequestComponent } from './buyer/myrequest/myrequest.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponentComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    ProjectsComponent,
    ProjectFormComponent,
    ProjectViewComponent,
    MyprojectComponent,
    EditComponent,
    DetailComponent,
    ProfileComponent,
    RequestformComponent,
    RequestdetailComponent,
    MyrequestComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
   MatButtonModule,
   MatMenuModule,
  NgbModule,
   MatSidenavModule,
   AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
     ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
       ToastrModule.forRoot(),
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
