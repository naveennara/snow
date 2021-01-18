import { Injectable } from '@angular/core';
import * as Globals from '../../globals';
import { Router } from '@angular/router';
import { ServerService } from '../../server.service';

// import { HttpEvent } from '@angular/common/http';
@Injectable()
export class headerServices {

    constructor(private services: ServerService, private router: Router) { }
    
    LogoutFromWeb(data) {
        const url = Globals.urls.logout;
        return this.services.postServers(url, data);
    }
    tabClosed(url,data){
      return this.services.postServers(url, data);
    }
    public getDepartments(url): any {
        return this.services.getServers(url, '');
      }
      public getListOfUsers(url): any {
        return this.services.getServers(url, '');
      }
}
