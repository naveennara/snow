import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class TemplatesService {
  formIdDelete;
  dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettings1= {
    singleSelection: false,
    idField: 'id',
    textField: 'label',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  dropdownSettings3= {
    singleSelection: false,
    idField: '_id',
    textField: 'username',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  formData: any;
  formSkeleton: any;
  formTemplate: string;
  formDataBeforeUpdate: any;
  Modifiedwidgets = [];
  skeletonchanges: any;
  formSkeletonOnEdit: any;
  formId: any;
  constructor(private services: ServerService, private router: Router) { }
  getDepartmentsList(url) {
    return  this.services.getServers(url, '');
  }
  getFormsList(url) {
    return  this.services.getServers(url, '');
  }
  getCategoriesUsers(url) {
    return  this.services.getServers(url, '');
  }

  getFormExcel(url) {
    return  this.services.getServersExcel(url, '');
  }
  createFrom(url, data) {
    return  this.services.postServers(url, data);
  }
  updateFrom(url, data) {
    return this.services.postServers(url, data);
  }
  saveFormData(data, type) {
    this.formData = data;
    this.formTemplate = type;
  }
  saveFormDateBeforeUpdate(data) {
    this.formDataBeforeUpdate = data;
  }
  saveFormSkeleton(data, data1) {
    this.formSkeleton = data;
    this.formSkeletonOnEdit = data1;
  }
  CheckFormExists(url){
    return  this.services.getServers(url, '');
  }
  editUrl(data) {
    this.router.navigate(['/mainLayout/templates/edit', data._id]);
  }
  getRecordsUrl(data) {
    this.router.navigate(['/mainLayout/forms/getRecords', data._id,data.name]);
  }

  importTemplate(data) {
    this.router.navigate(['/mainLayout/templates/importTemplate', data._id]);
  }

  deleteTemplate(url) {
    return this.services.postServers(url, []);
  }


  editTemplate(url) {
    return  this.services.getServers(url, '');
  }
  formID(id) {
    this.formId = id;
  }
  storeModifiedWidgets(data, action) {
    if (action !== 'push') {
      this.Modifiedwidgets.splice(action, 1);
    } else {
      this.Modifiedwidgets.push(data);
    }
  }
  checkSoftorHardChange(data) {
    this.skeletonchanges = data;
  }

}
