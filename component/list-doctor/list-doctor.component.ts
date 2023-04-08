import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Doctor } from 'src/app/model/user';

@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: ['./list-doctor.component.css']
})
export class ListDoctorComponent implements OnInit {

  doctorList : Doctor[] = [];
  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    console.log("11111111111111");
    this.getDoctorsList();
  }

  getDoctorsList() {
    console.log("22222222");
    this.doctorList = [];
    this.db.collection("Users",
    ref => ref.where("role","==","doctor")).get().subscribe(snaps => {      
      snaps.forEach(snap => {
        var tempDoctors : Doctor = null;
        tempDoctors = snap.data();  
        tempDoctors.id = snap.id;      
        this.doctorList.push(tempDoctors);
      })
    });    
    console.log(this.doctorList);
  }

  deleteDoctor(docId:string){
    return this.db.doc(`Users/${docId}`).delete().then(()=> {
      console.log("Document successfully deleted!");
      this.getDoctorsList();
    }).catch((error)=>{
      console.error("Error removing document: ", error);
    }); 
  }
}
