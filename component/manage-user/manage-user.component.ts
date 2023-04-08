import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  usersList: User[] = [];
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersList = [];
    this.db.collection("Users").get()
      .subscribe(snaps => {
        snaps.forEach(snap => {
          var tempUser: User = null;
          tempUser = snap.data();
          tempUser.id = snap.id;
          this.usersList.push(tempUser);
        })
      });
  }

  deleteUser(courseId: string) {
    return this.db.doc(`Users/${courseId}`).delete().then(()=> {
      console.log("Document successfully deleted!");
      this.getAllUsers();
    }).catch((error)=>{
      console.error("Error removing document: ", error);
    });    
  }

  updateUser(userId: string, changes: Partial<User>): Observable<any> {
    return from(this.db.doc(`Users/${userId}`).update(changes));
  }

}
