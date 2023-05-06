import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUserConfig } from 'src/app/app-configuration';
import { Appointment, AppointmentWithPrecription, Doctor, Prescription } from 'src/app/model/user';
import { GetFirebaseDataService } from 'src/app/services/get-firebase-data.service';

@Component({
  selector: 'app-patient-records',
  templateUrl: './patient-records.component.html',
  styleUrls: ['./patient-records.component.css']
})
export class PatientRecordsComponent implements OnInit {
  appointmentList : Appointment[] = [];
  prescriptionList : Prescription[] = [];
  appointmentWithPrecription : AppointmentWithPrecription[] = [];
  
  doctorList : Doctor[] = [];
  constructor(private db: AngularFirestore,private appUserConfig: AppUserConfig) { }
  appointmentListLength : number = 0;
  ngOnInit(): void {    
    this.getDoctorsList();
  }


  getDoctorsList() {
    
    this.doctorList = [];
    this.db.collection("Users",
    ref => ref.where("role","==","doctor")).get().subscribe(snaps => {      
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

  getAppointmentDetails(){
    this.appointmentList = [];
    this.appointmentListLength = this.appointmentList.length;    
    this.db.collection(
      "Appointments",
      ref => ref.where("patientId", "==", this.appUserConfig.id)
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
          });
          if(this.appointmentList.length > 0 ){
            this.getPrescriptionDetails();
          }
      });      
  }

  getPrescriptionDetails(){
    this.prescriptionList = [];    
    this.db.collection(
      "Prescription"      
  ).get()
      .subscribe(snaps => {
          snaps.forEach(snap => {
            var tempPrescription: Prescription = null;
            tempPrescription = snap.data();
            tempPrescription.id = snap.id;            
            this.prescriptionList.push(tempPrescription);            
          });  
          this.appointmentList.forEach( app =>{
            if(app.status == "closed"){
              var tempPrescription : Prescription = null;
              tempPrescription = this.prescriptionList.filter(p => p.id == app.prescriptionId)[0];
              this.appointmentWithPrecription.push({ Appointment : app, Prescription : tempPrescription })
            }
          } );          
      });      
  }

  getDoctorName(docId : string){
    var docName : Doctor = null;
    docName = this.doctorList.filter(d => d.id == docId)[0];
    return "Dr. "+ docName.firstName;
  }
}