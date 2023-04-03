import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {CourseComponent} from './course/course.component';
import {LoginComponent} from './component/login/login.component';
import {CreateCourseComponent} from './create-course/create-course.component';
import {AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {CreateUserComponent} from './create-user/create-user.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DoctorsComponent } from './component/doctors/doctors.component';
import { PatientsComponent } from './component/patients/patients.component';
import { RegisterComponent } from './component/register/register.component';
import { ParentComponent } from './component/parent/parent.component';
import { AdminComponent } from './component/admin/admin.component';
import { ManageUserComponent } from './component/manage-user/manage-user.component';
import { ListDoctorComponent } from './component/list-doctor/list-doctor.component';
import { AddDoctorComponent } from './component/add-doctor/add-doctor.component';
import { BookAppointmentComponent } from './component/book-appointment/book-appointment.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'create-course',
    component: CreateCourseComponent

  },
  {
    path: 'create-user',
    component: CreateUserComponent

  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent
  },
  {
    path:'doctors',
    component:DoctorsComponent
  },
  {
    path:'patients',
    component:PatientsComponent
  },
  {
    path:'parent',
    component:ParentComponent
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'users',
    component: ManageUserComponent
  },
  {
    path: 'courses/:courseUrl',
    component: CourseComponent
  },
  {
    path : 'doctorslist',
    component: ListDoctorComponent
  },
  {
    path:'addDoctor',
    component: AddDoctorComponent
  },
  {
    path:'bookApp',
    component: BookAppointmentComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
