import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Doctor, Medicine } from 'src/app/model/user';

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})
export class MedicinesComponent implements OnInit {

  medicineList : Medicine[] = [];
  medicineUrl : string = "Medicine";
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {    
    this.getMedicineList();
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

  deleteMedicine(docId:string){
    return this.db.doc(this.medicineUrl+`/${docId}`).delete().then(()=> {
      console.log("Document successfully deleted!");
      this.getMedicineList();
    }).catch((error)=>{
      console.error("Error removing document: ", error);
    }); 
  }

}
