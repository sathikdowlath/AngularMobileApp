import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { AlertService } from '../../services/alert.service';
import {from, Observable, of} from "rxjs";
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../model/user';
import { UtilitiesService } from '../../services/utilities.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private db: AngularFirestore        
    ) { }
    public roles: any;
    ngOnInit() {
        this.roles = ['doctor', 'patient', 'parent']
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: [''],
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(5)]],
            role:['', Validators.required]
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
        this.createCourse(this.form.value,"");        
    }

    deleteCourse(courseId:string) {
        return from(this.db.doc(`Users/${courseId}`).delete());
    }

    updateCourse(userId:string, changes: Partial<User>):Observable<any> {
        return from(this.db.doc(`Users/${userId}`).update(changes));
    }

    createCourse(newUser: Partial<User>, courseId?:string) {
        var roleUrl = "Users";
        // if(newUser.role=="doctor"){
        //     roleUrl = "Doctors";
        // } else {
        //     roleUrl = "Users";
        // }        
        if (courseId) {
            from(this.db.doc(roleUrl+`/${courseId}`).set(newUser));
        }
        else {
            from(this.db.collection(roleUrl).add(newUser));
        }      
        this.alertService.success('Registration successful', { keepAfterRouteChange: true });
        this.router.navigate(["/login"]);
    }

    // Choose ROLE using select dropdown
    changeRole(e) {
    console.log(e.value);    
  }

}
