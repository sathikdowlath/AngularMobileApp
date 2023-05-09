import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.component.html',
  styleUrls: ['./patient-home.component.css']
})
export class PatientHomeComponent implements OnInit {


  images = [
    'https://i.ibb.co/Z22W3w7/Picsart-23-05-09-13-43-14-833.jpg',
    'https://i.ibb.co/5hGsjmf/Picsart-23-05-08-23-53-56-646.jpg',
    'https://i.ibb.co/dJNMfqy/Picsart-23-05-08-23-57-43-137.jpg',
    'https://i.ibb.co/LCcP10D/Picsart-23-05-09-13-20-56-415.jpg',
    'https://i.ibb.co/C8jdjdK/Picsart-23-05-09-13-19-06-143.jpg',

  ];
  currentImageIndex = 0;
  interval: any;
  constructor() { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.nextImage();
    }, 3000); // Set the interval time in milliseconds
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }
  prevImage() {
    this.currentImageIndex = (this.currentImageIndex === 0) ? (this.images.length - 1) : (this.currentImageIndex - 1);
  }
  nextImage() {
    this.currentImageIndex = (this.currentImageIndex === this.images.length - 1) ? 0 : (this.currentImageIndex + 1);
  }
}
