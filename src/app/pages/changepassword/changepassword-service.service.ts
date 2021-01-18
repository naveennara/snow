import { Injectable } from '@angular/core';
import * as Globals from '../../globals';
import { Router } from '@angular/router';
import { ServerService } from '../../server.service';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordServiceService {
  navigateToLogin: boolean;
  constructor(private services: ServerService, private router: Router) { }
  changePWD(data) {
    const url = Globals.urls.changePassword;
    return this.services.postServers(url, data);
  }
  setVariable(data) {
    this.navigateToLogin = data;
  }
  pwdCheckforChangePassword(data) {
    const url = Globals.urls.pwdCheckforChangePassword;
    return  this.services.postServers(url, data);
  }
}
