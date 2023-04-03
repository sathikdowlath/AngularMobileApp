import { Injectable, InjectionToken  } from '@angular/core';

@Injectable({ providedIn : "root"})
export class AppUserConfig {
    id?: string;
    userName?: string;
    password?: string;
    firstName?: string;
    lastName?: string;    
    role?:string;
}

export const APP_CONFIGURATION = new InjectionToken<AppUserConfig>("app-configuration.ts");