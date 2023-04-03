import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUserConfig } from 'src/app/app-configuration';
import {from, Observable, of} from "rxjs";
import { Appointment, Doctor } from 'src/app/model/user';
@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.css']
})
export class PatientAppointmentsComponent implements OnInit {
  appointmentList : Appointment[] = [];
  doctorList : Doctor[] = [];
  constructor(private db: AngularFirestore,private appUserConfig: AppUserConfig) { }
  appointmentListLength : number = 0;
  ngOnInit(): void {    
    this.getDoctorsList();
  }

  getAppointmentDetails(){
    this.appointmentList = [];
    this.appointmentListLength = this.appointmentList.length;    
    this.db.collection(
      "Appointments"
      // ref => ref.where("seqNo", "<=", 20)
      //     .where("url", "==", "angular-forms-course")
      //     .orderBy("seqNo")
  ).get()
      .subscribe(snaps => {
          snaps.forEach(snap => {
            var tempAppointment: Appointment = null;
            tempAppointment = snap.data();
            tempAppointment.id = snap.id;
            tempAppointment.doctorName = this.getDoctorName(tempAppointment.doctorId);            
            this.appointmentList.push(tempAppointment);
            this.appointmentListLength = this.appointmentList.length;
          })
      });      
  }
  getDoctorName(docId : string){
    var docName : Doctor = null;
    docName = this.doctorList.filter(d => d.id == docId)[0];
    return "Dr. "+ docName.firstName;
  }

  deleteAppointment(appointmentId: string) {
    return this.db.doc(`Appointments/${appointmentId}`).delete().then(()=> {
      console.log("Document successfully deleted!");
      this.getAppointmentDetails();
    }).catch((error)=>{
      console.error("Error removing document: ", error);
    });    
  }

  saveAppointment(){
    var appointmentUrl = "Appointments";
    var appObj = {
      "appointmentDate" : "03/26/2023",
      "doctorId": "vjwKq1tMAm8wCfngqMAw",
      "patientId" : this.appUserConfig.id,
      "reasonForVisit" : " Fever "
    }
      from(this.db.collection(appointmentUrl).add(appObj)).subscribe(()=>{
        this.getAppointmentDetails();        
      });
  }

  getDoctorsList() {
    console.log("22222222");
    this.doctorList = [];
    this.db.collection("Doctors").get().subscribe(snaps => {      
      snaps.forEach(snap => {
        var tempDoctors : Doctor = null;
        tempDoctors = snap.data();  
        tempDoctors.id = snap.id;      
        this.doctorList.push(tempDoctors);
      })
      this.getAppointmentDetails();
    });    
    console.log(this.doctorList);
  }
}
