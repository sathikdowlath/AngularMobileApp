import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUserConfig } from 'src/app/app-configuration';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css']
})
export class PatientsComponent implements OnInit {

  currentUser : User = null;
  constructor(private db: AngularFirestore,private appUserConfig: AppUserConfig) { }

  ngOnInit(): void {
  this.getPatientDetails();  
  }


  getPatientDetails(){
    this.db.doc("Users/"+this.appUserConfig.id)
    .valueChanges()
    .subscribe(userData => {
      this.currentUser = userData;
        console.log(userData);
    });
  }

}
