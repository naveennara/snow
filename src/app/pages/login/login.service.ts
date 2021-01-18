import { Injectable } from '@angular/core';
import * as Globals from '../../globals';
import { Router } from '@angular/router';
import { ServerService } from '../../server.service';

// import { HttpEvent } from '@angular/common/http';
@Injectable()
export class loginServices {

    constructor(private services: ServerService,private router: Router) { }
    Login(data) {
       const url = Globals.urls.login;
       return this.services.postServers(url, data)
    }
    concurrent(url,data){
      return this.services.postServers(url, data)
    }
    DualLogin(data) {
      const url = Globals.urls.login;
      return this.services.postServers(url, data)
   }

    resetPWD(data){
       const url = Globals.urls.forgotPassword;
       return this.services.postServers(url, data)
    }

    changePWD(data){
      const url = Globals.urls.changePassword;
      return this.services.postServers(url, data)
    }
}