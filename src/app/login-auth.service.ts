import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from './auth.service';
import * as Globals from './globals';
@Injectable()

export class LoginAuthService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router,private deviceService: DeviceDetectorService,
    ) {}
  
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.checkLogin()
      .then(
        (authenticated: boolean) => {
          if (authenticated) {
            return true;
          } else {
            let version = this.deviceService.getDeviceInfo().browser_version.split('.');
            if(this.deviceService.getDeviceInfo().browser == Globals.browserkeys.browser_version && Number(version[0]) >= 80 ){
              this.router.navigate(['/login']);
            }else if(this.deviceService.getDeviceInfo().browser == Globals.browserkeys.browser_version && Number(version[0])<80){
              let value = window.confirm(Globals.browserkeys.versionMsg)
              if(value == true){
               this.router.navigate(['/login']);
              }
            }
            else{
             let value = window.confirm(Globals.browserkeys.browserMsg)
             if(value == true){
              this.router.navigate(['/login']);
             }
            }
            return false;
          }
        }
      );
  }

  canActivateChild(route: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}

