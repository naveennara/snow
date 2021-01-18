import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {
 dropdownSettings= {
    singleSelection: false,
    idField: '_id',
    textField: 'username',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  deparmentId:string;
  constructor(private services: ServerService, private router: Router) { }
  getDepartments(url) {
    return  this.services.getServers(url, '');
  }
  getUsersAdmins = function(url) {
    return  this.services.getServers(url, '');
  };
  createDepartment(url, data) {
    return  this.services.postServers(url, data);
  }
  deleteDepartment(url) {
  
    return this.services.postServers(url,[]);
  }
  editDepartment(url){
    return  this.services.getServers(url, '');
  }
  removeAdmins(url,data){
    return  this.services.postServers(url, data);

  }
  updateDepartment(url,data){
    return  this.services.postServers(url, data);
  }
  updateSetting(url,data){
    return  this.services.postServers(url, data);
  }
  editUrl(department){
    this.router.navigate(['/mainLayout/accounts/edit', department._id]);

  }
  removeAdminsUrl(department){
    this.router.navigate(['/mainLayout/accounts/removeAdmins', department._id]);
  }
}
