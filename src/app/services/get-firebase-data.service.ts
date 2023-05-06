import { Injectable } from '@angular/core';
import { Appointment, Doctor } from '../model/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUserConfig } from '../app-configuration';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetFirebaseDataService {

  appointmentList : Appointment[] = [];
  doctorList : Doctor[] = [];
  constructor(private db: AngularFirestore,private appUserConfig: AppUserConfig) { }
  appointmentListLength : number = 0;

  getAppointmentDetails() :  any {
    this.appointmentList = [];
    this.db.collection(
      "Appointments"
      //ref => ref.where("patientId", "==", patientId)
      //     .where("url", "==", "angular-forms-course")
      //     .orderBy("seqNo")
  ).get()
      .subscribe(snaps => {
          snaps.forEach(snap => {
            var tempAppointment: Appointment = null;
            tempAppointment = snap.data();
            tempAppointment.id = snap.id;
            this.appointmentList.push(tempAppointment);            
          });
          return this.appointmentList;
      });      
  }
}
