import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css']
})
export class DoctorsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  columnChartOptions = {
    animationEnabled: true,
    title: {
      text: 'Monthly Patient Count',
    },
    data: [
      {
        // Change type to "doughnut", "line", "splineArea", etc.
        type: 'column',
        dataPoints: [
          { label: 'Nov 2022', y: 35 },
          { label: 'Dec 2022', y: 24 },
          { label: 'Jan 2023', y: 38 },
          { label: 'Feb 2023', y: 41 },
          { label: 'Mar 2023', y: 56 }          
        ],
      },
    ],
  };

  // pieChartOptions = {
  //   animationEnabled: true,
  //   title: {
  //     text: 'Doctor`s Appointment',
  //   },
  //   theme: 'light2', // "light1", "dark1", "dark2"
  //   data: [
  //     {
  //       type: 'pie',
  //       dataPoints: [
  //         { label: 'Dr Zakir', y: 10 },
  //         { label: 'Dr Kumar', y: 15 },
  //         { label: 'Dr Ashiq', y: 25 },
  //         { label: 'Dr Aseema', y: 30 },
  //         { label: 'Dr Anisha', y: 28 },
  //       ],
  //     },
  //   ],
  // };

  // lineChartOptions = {
  //   animationEnabled: true,
  //   title: {
  //     text: 'Yearly Patient Count',
  //   },
  //   theme: 'light2', // "light1", "dark1", "dark2"
  //   data: [
  //     {
  //       type: 'line',
  //       dataPoints: [
  //         { label: '2018', y: 159 },
  //         { label: '2019', y: 270 },
  //         { label: '2020', y: 320 },
  //         { label: '2021', y: 395 },
  //         { label: '2022', y: 250 },
  //         { label: '2023', y: 410 },
  //       ],
  //     },
  //   ],
  // };
}
