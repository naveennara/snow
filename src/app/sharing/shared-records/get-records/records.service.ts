import { Injectable } from '@angular/core';
import { ServerService } from '../../../server.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
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
    singleSelection: true,
    idField: 'formId',
    textField: 'formName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettings2 ={
    singleSelection: true,
    idField: 'userId',
    textField: 'userName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  }
  dropdownSettings3= {
    singleSelection: false,
    idField: '_id',
    textField: 'username',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  constructor(private services: ServerService) { }
  getUsers(url) {
    return  this.services.getServers(url, '');
  }
}
