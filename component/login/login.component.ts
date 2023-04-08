import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import * as firebaseui from 'firebaseui';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService } from '../../services/account.service';
import { AlertService } from '../../services/alert.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUserConfig } from '../../app-configuration';
import { User } from '../../model/user';
import { UtilitiesService } from '../../services/utilities.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form!: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private alertService: AlertService,
        private db: AngularFirestore,
        public appUserConfig: AppUserConfig,
        private utilitiesService: UtilitiesService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
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

        this.db.collection(
            "Users",
            ref => ref.where("userName", "==", this.f.username.value).where("password", "==", this.f.password.value)

        ).get()
            .subscribe(snaps => {
                if (snaps.size > 0) {
                    const newSnap = snaps;
                    newSnap.forEach(snap => {
                        const userDat: User = snap.data();
                        userDat.id = snap.id;
                        this.appUserConfig.firstName = userDat.firstName;
                        this.appUserConfig.id = userDat.id;
                        this.appUserConfig.lastName = userDat.lastName;
                        this.appUserConfig.userName = userDat.userName;
                        this.appUserConfig.role = userDat.role;
                        this.utilitiesService.roleRedirect(this.appUserConfig.role);
                    })
                } else {
                    this.submitted = false;
                    return;
                }
            });
    }
}