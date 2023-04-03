import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppUserConfig } from 'src/app/app-configuration';
import { Appointment, Doctor } from 'src/app/model/user';
import { AlertService } from 'src/app/services/alert.service';
import {from, Observable, of} from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {

  doctorList : Doctor[] = [];
  firstFormGroup = this._formBuilder.group({
    selectDoctor: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  selected = 'option2';
  loading = false;
  form!: FormGroup;
  submitted = false;
   
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  
  
  constructor(public datepipe: DatePipe,private router: Router,private alertService: AlertService,
    private _formBuilder: FormBuilder,private db: AngularFirestore,public appUserConfig: AppUserConfig) { }

  ngOnInit(): void {
    this.getDoctorsList();
    this.form = this._formBuilder.group({
      doctorId: ['', Validators.required],
      appointmentDate: ['', Validators.required],
      appointmentTime: ['', Validators.required],
      reasonForVisit: ['', Validators.required]      
  });
  }

  getDoctorsList() {    
    this.doctorList = [];
    this.db.collection("Users",
    ref => ref.where("role","==","doctor")
    ).get().subscribe(snaps => {      
      snaps.forEach(snap => {
        var tempDoctors : Doctor = null;
        tempDoctors = snap.data();  
        tempDoctors.id = snap.id;      
        this.doctorList.push(tempDoctors);
      })
    });    
    console.log(this.doctorList);
  }


  onSubmit(){
    this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        console.log(this.form.value);        
        this.saveAppointment(this.form.value,"");  
  }

  saveAppointment(newAppointment: Partial<Appointment>, courseId?:string){
    var appointmentUrl = "Appointments";
    newAppointment.patientId = this.appUserConfig.id;
    newAppointment.appointmentDate = this.datepipe.transform(newAppointment.appointmentDate, 'dd-MM-yyyy');
    from(this.db.collection(appointmentUrl).add(newAppointment));
      this.alertService.success('Registration successful', { keepAfterRouteChange: true });
      this.router.navigate(["/patient"]);    
  }

  // Choose ROLE using select dropdown
  changeDoctor(e) {    
    console.log(e.value);  
  }
}
