import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppUserConfig, APP_CONFIGURATION } from './app/app-configuration';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

(async function () {
  
  var appUserConfig : any;
  appUserConfig = getAppUserConfigDefault();  
  
  const appUserConfigProvider = { provide : APP_CONFIGURATION, useValue : appUserConfig }
  
  platformBrowserDynamic([appUserConfigProvider]).bootstrapModule(AppModule).catch(err => console.error(err));
  
})();


function getAppUserConfigDefault():AppUserConfig{
return   {
    id : "",
    userName : "",
    password : "",
    firstName : "",
    lastName : "",
    role : ""
}
}