import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/auth';
import {AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/firestore';
import {AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/functions';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {AboutComponent} from './about/about.component';
import {EditCourseDialogComponent} from './edit-course-dialog/edit-course-dialog.component';
import {LoginComponent} from './component/login/login.component';
import {CoursesCardListComponent} from './courses-card-list/courses-card-list.component';
import {AppRoutingModule} from './app-routing.module';
import {CourseComponent} from './course/course.component';
import {CreateCourseComponent} from './create-course/create-course.component';
 import {CreateUserComponent} from './create-user/create-user.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
 import { DoctorsComponent } from './component/doctors/doctors.component';
import { PatientsComponent } from './component/patients/patients.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { RegisterComponent } from './component/register/register.component';
import { AppUserConfig, APP_CONFIGURATION } from './app-configuration';
import { ParentComponent } from './component/parent/parent.component';
import { AdminComponent } from './component/admin/admin.component';
import { ManageUserComponent } from './component/manage-user/manage-user.component';
import { AddEditUserComponent } from './component/add-edit-user/add-edit-user.component';
import { MaterialModule } from './material.module';
import { PatientRecordsComponent } from './component/patient-records/patient-records.component';
import { PatientAppointmentsComponent } from './component/patient-appointments/patient-appointments.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { AddDoctorComponent } from './component/add-doctor/add-doctor.component';
import { ListDoctorComponent } from './component/list-doctor/list-doctor.component';
import { BookAppointmentComponent } from './component/book-appointment/book-appointment.component';
import { DatePipe } from '@angular/common'

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    CourseComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    LoginComponent,
    CreateCourseComponent,
    CreateUserComponent,
    DoctorsComponent,
    PatientsComponent,
    DashboardComponent,
    RegisterComponent,
    ParentComponent,
    AdminComponent,
    ManageUserComponent,
    AddEditUserComponent,
    PatientRecordsComponent,
    PatientAppointmentsComponent,
    CanvasJSChart,
    AddDoctorComponent,
    ListDoctorComponent,
    BookAppointmentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // MatMenuModule,
    // MatButtonModule,
    // MatIconModule,
    // MatCardModule,
    // MatTabsModule,
    // MatSidenavModule,
    // MatSlideToggleModule,
    // MatListModule,
    // MatToolbarModule,
    // MatInputModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatProgressSpinnerModule,
    // MatProgressBarModule,
    // MatDialogModule,
    // MatSelectModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireFunctionsModule,
    MaterialModule
  ],
  providers: [{ provide: DatePipe},
  { provide: AppUserConfig, useExisting:APP_CONFIGURATION },
  { provide: HTTP_INTERCEPTORS, useClass : AppUserConfig, multi:true}
  // { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['localhost', 9099] : undefined },
  // { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined },
  // { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
