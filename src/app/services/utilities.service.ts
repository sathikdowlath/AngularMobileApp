import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment, User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  
  private patientDetails;
  private appointmentDetails;
  constructor(private router: Router) { }

  public roleRedirect(role: string) {
    if (role == 'admin') {
      this.router.navigate(["/admin"]);
    } else if (role == 'doctor') {
      this.router.navigate(["/dashboard"]);
    } else if (role == 'patient') {
      this.router.navigate(["/patient"]);
    } else if (role == 'parent') {
      this.router.navigate(["/parent"]);
    }
  }

  setPatientAppointmnetData(patient : User, appointment : Appointment){
    this.patientDetails = patient;
    this.appointmentDetails = appointment;
  }

  getPatientAppointmnetData(){
    let data = { patient :  this.patientDetails , appointment : this.appointmentDetails};
    return data;
  }

  setPatientAppointmnetDataNull(){
    this.patientDetails = null;
    this.appointmentDetails = null;
  }

}
