import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Doctor } from 'src/app/model/user';
import { AlertService } from 'src/app/services/alert.service';
import {from, Observable, of} from "rxjs";
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {

  form!: FormGroup;
    loading = false;
    submitted = false;
    
  constructor(
    private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private db: AngularFirestore 
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      specialist: ['',Validators.required],
      degree: ['',Validators.required],
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    console.log(this.form.value);
    this.addDoctor(this.form.value,"");        
}

addDoctor(newDoctor: Partial<Doctor>, docId?:string) {
  var roleUrl = "Users";
  newDoctor.role = "doctor";
  if (docId) {
      from(this.db.doc(roleUrl+`/${docId}`).set(newDoctor));
  }
  else {
      from(this.db.collection(roleUrl).add(newDoctor));
  }    
  this.alertService.success('Registration successful', { keepAfterRouteChange: true });
  this.router.navigate(["/doctorslist"]);
}

}
