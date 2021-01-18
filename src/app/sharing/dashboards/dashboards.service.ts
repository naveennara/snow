import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  constructor(private services: ServerService) { }
  public getDashboard(url): any {
    let dashboardObservable: any;
    return  dashboardObservable = new Observable(observer => {
      let dataList: any[];
      this.services.getServers(url, '').subscribe(
        (res: any) => {
          if (res) {
            switch (res.status) {
              case 200:
              dataList= res.data;
              break;
              case 204:
                dataList =[];
            }
          } else {
            dataList = [];
          }
          observer.next(dataList);
        }

      );

    });
  }
  releaseLicense(url,data){
    return  this.services.postServers(url,data)
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
