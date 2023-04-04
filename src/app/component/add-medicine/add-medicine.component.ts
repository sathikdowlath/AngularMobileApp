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
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit {

  
    form!: FormGroup;
    loading = false;
    submitted = false;
    medicineUrl : string = "Medicine";

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private db: AngularFirestore        
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            medicineName: ['', Validators.required]
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
        this.createMedicine(this.form.value,"");        
    }

    deleteMedicine(medicineId:string) {
        return from(this.db.doc(this.medicineUrl+ `/${medicineId}`).delete());
    }

    updateMedicine(medicineId:string, changes: Partial<User>):Observable<any> {
        return from(this.db.doc(this.medicineUrl+`/${medicineId}`).update(changes));
    }

    createMedicine(newMedicine: Partial<User>, courseId?:string) {        
        if (courseId) {
            from(this.db.doc(this.medicineUrl+`/${courseId}`).set(newMedicine));
        }
        else {
            from(this.db.collection(this.medicineUrl).add(newMedicine));
        }        
        this.router.navigate(["/medicines"]);
    }

    // Choose ROLE using select dropdown
    changeRole(e) {
    console.log(e.value);    
  }

}
