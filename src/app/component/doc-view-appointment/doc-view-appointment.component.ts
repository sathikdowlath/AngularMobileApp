import { DatePipe } from '@angular/common';
import { QueryValueType } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUserConfig } from 'src/app/app-configuration';
import { Appointment, User } from 'src/app/model/user';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-doc-view-appointment',
  templateUrl: './doc-view-appointment.component.html',
  styleUrls: ['./doc-view-appointment.component.css']
})
export class DocViewAppointmentComponent implements OnInit {
  appointmentList: Appointment[] = [];
  appointmentListFilter: Appointment[] = [];
  appointmentListLength: number = 0;
  patientList: User[] = [];
  form!: FormGroup;
  get f() { return this.form.controls; }
  submitted = false;
  loading = false;
  tempDateString: string = "";
  constructor(private _utilityService : UtilitiesService,private router: Router, public datepipe: DatePipe, private _formBuilder: FormBuilder,
    private db: AngularFirestore, private appUserConfig: AppUserConfig) { }

  ngOnInit(): void {
    this.tempDateString = this.datepipe.transform(new Date(), 'dd-MM-yyyy');
    this.getDoctorsList();
    this.form = this._formBuilder.group({
      appointmentDate: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.tempDateString = this.datepipe.transform(this.form.value.appointmentDate, 'dd-MM-yyyy');
    this.filterAppointmentsDate(this.tempDateString);
    this.loading = false;
  }

  filterAppointmentsDate(dateString: string) {
    this.appointmentListFilter = this.appointmentList.filter(d => d.appointmentDate == dateString && d.status=='open');
    this.appointmentListFilter = this.appointmentListFilter.sort((a,b)=> a.appointmentTime.localeCompare(b.appointmentTime))
  } 


  getAppointmentDetails() {
    this.appointmentList = [];
    this.appointmentListLength = this.appointmentList.length;
    this.db.collection(
      "Appointments", ref => ref.where("doctorId", "==", this.appUserConfig.id)
    ).get()
      .subscribe(snaps => {
        this.appointmentList = [];
        snaps.forEach(snap => {
          var tempAppointment: Appointment = null;
          tempAppointment = snap.data();
          tempAppointment.id = snap.id;
          this.appointmentList.push(tempAppointment);
          this.appointmentListLength = this.appointmentList.length;
        });
        this.filterAppointmentsDate(this.tempDateString);
      });
  }

  getPatientDetails(patientId: string) {
    var patientName: User = null;
    patientName = this.patientList.filter(d => d.id == patientId)[0];
    return patientName;
  }
  getPatientName(patientId: string) {
    var patientName: User = null;
    patientName = this.patientList.filter(d => d.id == patientId)[0];
    return patientName.lastName + ", " + patientName.firstName;
  }

  getDoctorsList() {

    this.patientList = [];
    this.db.collection("Users",
      ref => ref.where("role", "==", "patient")).get().subscribe(snaps => {
        this.patientList = [];
        snaps.forEach(snap => {
          var tempDoctors: User = null;
          tempDoctors = snap.data();
          tempDoctors.id = snap.id;
          this.patientList.push(tempDoctors);
        })
        this.getAppointmentDetails();
      });
    console.log(this.patientList);
  }

  prescriptionDetails(appointData: Appointment) {
    this._utilityService.setPatientAppointmnetData(this.getPatientDetails(appointData.patientId),appointData);
    this.router.navigate(["/addPrescription"]);
  }
}
