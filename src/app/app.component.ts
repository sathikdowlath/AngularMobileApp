import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { concatMap, filter, map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AppUserConfig } from './app-configuration';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public appUserConfig: AppUserConfig, private router: Router) {

  }

  ngOnInit() {

  }

  logOut() {
    this.resetAppUserConfig();
    this.router.navigate(["/login"]);
  }

  resetAppUserConfig() {
    this.appUserConfig.firstName = "";
    this.appUserConfig.id = "";
    this.appUserConfig.lastName = "";
    this.appUserConfig.userName = "";
    this.appUserConfig.role = "";
  }

}
