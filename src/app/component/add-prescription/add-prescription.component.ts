import { Component, OnInit, VERSION } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserConfig } from 'src/app/app-configuration';
import { Appointment, Medicine, User } from 'src/app/model/user';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {
  medicineList : Medicine[] = [];
  medicineUrl : string = "Medicine";
  patientDetails : User;
  appointmentDetails : Appointment;
  selectedAppointId : string = "";
  constructor(private _utilityService : UtilitiesService,public appUserConfig: AppUserConfig,private router: ActivatedRoute,private db: AngularFirestore) { }
  patientAppointmnetData : any;
    
  ngOnInit() {    
    this.getMedicineList();
    this.patientAppointmnetData = this._utilityService.getPatientAppointmnetData();
    this.patientDetails = this.patientAppointmnetData.patient;
    this.appointmentDetails = this.patientAppointmnetData.appointment;
    this.addRow();
  }

  dynamicArray = [];
  newDynamic;
  
  addRow() {
    this.dynamicArray.push({ medicine: '', morning: '', noon:'',night:''});
    console.log('New row added successfully', 'New Row');
  }
  deleteRow(index) {
    this.dynamicArray.splice(index, 1);
  }
  savePrescription() {
    console.log(this.dynamicArray);
  }

  getMedicineList() {
    this.medicineList = [];
    this.db.collection(this.medicineUrl).get().subscribe(snaps => {      
      snaps.forEach(snap => {
        var tempMed : Medicine = null;
        tempMed = snap.data();  
        tempMed.id = snap.id;      
        this.medicineList.push(tempMed);
      })
    });    
    console.log(this.medicineList);
  }

}
