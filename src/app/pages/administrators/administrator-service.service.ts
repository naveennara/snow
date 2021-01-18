import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})

export class AdministratorServiceService {
  dropdownSettings= {
    singleSelection: true,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettings1= {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  adminTypeString:String;
  adminType:Number;
  privilegesChecked: number[] = [];
  deptList:any[];
  deptsObservable;
  adminId:string;
  constructor(private services: ServerService, private router: Router) { }
  createAdministrator(url,data){
    return  this.services.postServersMultipart(url, data);
  }
  getAdmins(url) {
    return  this.services.getServers(url, '');
  }
  unlock(url,data){
    return  this.services.postServers(url,data)
  }
  public getDepartments(url): any {
    return  this.deptsObservable = new Observable(observer => {
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
  deleteAdministrator(url)
  {
    return this.services.postServers(url,[]);

  }
  editAdministrator(url){
    return  this.services.getServers(url, '');
  }
  
  editUrl(admin){
    this.router.navigate(['/mainLayout/administrators/edit', admin._id]);

  }
  updateAdministrator(url,data){
    return  this.services.postServersMultipart(url, data);
  }
  resetPassword(url, data) {
    return this.services.postServers(url,data);
  }
}
