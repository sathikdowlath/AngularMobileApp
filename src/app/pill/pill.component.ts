import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUserConfig } from '../app-configuration';
import { Medicine, User } from '../model/user';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.css']
})
export class PillComponent implements OnInit {

  medications = ['Medication A', 'Medication B', 'Medication C'];
  times = ['🌅 8:00 AM', '☀️ 12:00 PM', '🌙 6:00 PM'];
  selectedMedication: string;
  selectedTime: string;
  medicineList: Medicine[] = [];
  medicineUrl: string = "Medicine";
  currentUser: User = null;
  constructor(private db: AngularFirestore, private appUserConfig: AppUserConfig, private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.getPatientDetails();
    this.getMedicineList();
  }
  getPatientDetails() {
    this.db.doc("Users/" + this.appUserConfig.id)
      .valueChanges()
      .subscribe(userData => {
        this.currentUser = userData;
        console.log(userData);
      });
  }


  setReminder() {
    if (this.selectedMedication && this.selectedTime) {
      const message = `Reminder set for ${this.selectedMedication} at ${this.selectedTime}`;
      this.snackBar.open(message, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    } else {
      const message = 'Please select a medication and a reminder time';
      this.snackBar.open(message, '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top'
      });
    }
  }
  getMedicineList() {
    this.medicineList = [];
    this.db.collection(this.medicineUrl).get().subscribe(snaps => {
      snaps.forEach(snap => {
        var tempMed: Medicine = null;
        tempMed = snap.data();
        tempMed.id = snap.id;
        this.medicineList.push(tempMed);
      })
    });
    console.log(this.medicineList);
  }
}
