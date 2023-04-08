import { Component, OnInit, VERSION } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppUserConfig } from 'src/app/app-configuration';
import { AddMedicine, Appointment, Medicine, Prescription, User } from 'src/app/model/user';
import { UtilitiesService } from 'src/app/services/utilities.service';
import {from, Observable, of} from "rxjs";

@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})
export class AddPrescriptionComponent implements OnInit {
  medicineList : Medicine[] = [];
  medicineUrl : string = "Medicine";
  appointmentsUrl : string = "Appointments";
  prescriptionUrl : string = "Prescription";
  patientDetails : User;
  appointmentDetails : Appointment;
  selectedAppointId : string = "";
  constructor(private _utilityService : UtilitiesService,
              public appUserConfig: AppUserConfig,
              private router: Router,
              private db: AngularFirestore) { }
  patientAppointmnetData : any;
  remarks : string = null;
  temperature : string = null;
  pulse : string = null;
  saveData : Prescription ; 
  saveData1 : Medicine = null; 
  addMedicine : AddMedicine;
  dynamicArray = [];
  newDynamic;

  ngOnInit() {    
    this.getMedicineList();
    this.patientAppointmnetData = this._utilityService.getPatientAppointmnetData();
    this.patientDetails = this.patientAppointmnetData.patient;
    this.appointmentDetails = this.patientAppointmnetData.appointment;
    this.addRow();
  }

  
  
  addRow() {
    this.dynamicArray.push({ medicine: '', morning: '', noon:'',night:''});
    console.log('New row added successfully', 'New Row');
  }
  deleteRow(index) {
    this.dynamicArray.splice(index, 1);
  }
  savePrescription() {    
    this.saveData = {
      temperature : this.temperature,
      pulse : this.pulse,
      remarks : this.remarks,
      medicines : this.dynamicArray,
      appointmentId : this.appointmentDetails.id,
    };
    console.log(this.saveData);
    this.createPrescription(this.saveData,"");
  }

  createPrescription(newPrescription: Partial<Prescription>, prescriptionId?:string) {        
    if (prescriptionId) {
        from(this.db.doc(this.prescriptionUrl+`/${prescriptionId}`).set(newPrescription)).subscribe(obj =>{          
          this.updateStatusNavigate();
        });
    }
    else {
        from(this.db.collection(this.prescriptionUrl).add(newPrescription)).subscribe(obj =>{ 
          this.appointmentDetails.prescriptionId = obj.id;
          this.appointmentDetails.status = 'closed';
          this.updateStatusNavigate();
        });
    }        
    
}

  updateStatusNavigate(){
    from(this.db.doc(this.appointmentsUrl+`/${this.appointmentDetails.id}`).set(this.appointmentDetails)).subscribe(obj =>{
      this.router.navigate(["/dashboard"]);
    });    
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

