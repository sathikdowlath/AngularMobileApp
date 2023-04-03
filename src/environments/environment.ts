// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {    
    //apiKey: "AIzaSyB9xHYeMWnlnZpNXqd0yjJqERGmoBESY-w",
    //authDomain: "sathik-test.firebaseapp.com",
    //projectId: "sathik-test",
    //storageBucket: "sathik-test.appspot.com",
    //messagingSenderId: "237333223541",
    //appId: "1:237333223541:web:e3c51c4315dce7e486c03c"
    
      apiKey: "AIzaSyCey_yS2VoHNH7qWwM0HrBjSiLLpQccXNs",
      authDomain: "doctor-patient-tracker-43206.firebaseapp.com",
      projectId: "doctor-patient-tracker-43206",
      storageBucket: "doctor-patient-tracker-43206.appspot.com",
      messagingSenderId: "424174309751",
      appId: "1:424174309751:web:fa2063d9e8a6a9af8a9172"
  },
  //apiUrl: 'http://localhost:4000',
  api: {

  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
