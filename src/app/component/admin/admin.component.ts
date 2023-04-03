import { Component, OnInit } from '@angular/core';
import { AppUserConfig } from 'src/app/app-configuration';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public appUser : AppUserConfig) { }

  ngOnInit(): void {
    
  }

}
