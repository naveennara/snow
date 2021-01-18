import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../../server.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class LicenseManagementService {
  renewLicense;
  constructor(private services: ServerService, private router: Router) { }
  addLicenses(url, data) {
    return this.services.postServers(url, data);
  }
  getLicenses(url) {
    return this.services.getServers(url, '');
  }
  editLicense(data) {
    this.router.navigate(['/mainLayout/licenses/renew']);
  }
  renewLicenses(url,data){
    return this.services.postServers(url, data);
  }
  public getDepartments(url): any {
    let deptsObservable: any;
    return  deptsObservable = new Observable(observer => {
      let deptList: any[];
      this.services.getServers(url, '').subscribe(
        (res: any) => {
          if (res) {
            switch (res.status) {
              case 200:
              deptList= res.data;
              break;
              case 204:
              deptList =[];
            }
          } else {
            deptList = [];
          }
          observer.next(deptList);
        }

      );

    });
  }
}
