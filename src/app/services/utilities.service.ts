import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  

  constructor(private router: Router) { }

  public roleRedirect(role: string) {
    if (role == 'admin') {
      this.router.navigate(["/admin"]);
    } else if (role == 'doctor') {
      this.router.navigate(["/dashboard"]);
    } else if (role == 'patient') {
      this.router.navigate(["/patient"]);
    } else if (role == 'parent') {
      this.router.navigate(["/parent"]);
    }
  }

}
