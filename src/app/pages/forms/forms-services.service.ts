import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../globals';
@Injectable({
  providedIn: 'root'
})
export class FormsServicesService {
  recordId: string;
  dropdownSettings= {
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
  dropdownSettings4= {
    singleSelection: true,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  formData:any ={};
  formSkeleton: any;
  formTemplate: string;
  formDataBeforeUpdate: any;
  Modifiedwidgets = [];
  skeletonchanges: any;
  formSkeletonOnEdit: any;
  formId: any;
  formIdDelete: any;
  excelFormSkeleton: any;
  isFileUploaded: any;
  dragAndDrop: boolean;
  formBack = false;
  categoriesList;
  importFormId;
  dropdownTables=[];
  formSubmitted = false;
  exifDataImageList= []
  constructor(private services: ServerService, private router: Router,private toastr: ToastrService,
    ) { }
  getCategoriesUsers(url) {
    return  this.services.getServers(url, '');
  }
  getFormsList(url){
    return  this.services.getServers(url, '');
  }
  
  getFormExcel(url){
    return  this.services.getServersExcel(url, '');
  }
  
  createFrom(url,data){
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
    this.router.navigate(['/mainLayout/forms/edit', data._id]);
  }
  getRecordsUrl(data){
    this.router.navigate(['/mainLayout/forms/getRecords', data._id,data.name]);
  } 
  
  editForm(url) {
    return  this.services.getServers(url, '');
  }

  showFormInfo(url) {
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
  getDepartments(url) {
    return  this.services.getServers(url, '');
  }
  shareform(url, data) {
    return  this.services.postServers(url, data);
  }
  attachReferences(url, data) {
    return  this.services.postServersMultipart(url, data);
  }
  getAttachedReferences(url) {
    return  this.services.getServers(url, '');
  }
  getAttachedReference(url, type) {
    return this.services.getServersFiles(url, type, '');
  }
  deleteForm(url) {
    return this.services.postServers(url, []);
  }
  formCreationThroughExcel(url, data) {
    return  this.services.postServersMultipart(url, data);
  }
  goToVersionsList(form) {
    this.router.navigate(['/mainLayout/forms/versionHistory', form._id]);
  }

  getFormVersions(url) {
    return  this.services.getServers(url, '');
  }

  importFormAsTemplate(url, data) {
    return  this.services.postServers(url, data);
  }
  editRecordSubmit(url, data) {
    return  this.services.postServers(url, data);
  }
  
  getWorkflowNames(url,dept) {
    return this.services.getServers(url, dept);
  }
  setImageExifInfo(imageExifData){
    this.exifDataImageList.push(imageExifData);
  }
  getImageExifInfo(){
    return this.exifDataImageList;
  }
  resetImageInfoImageList(){
    this.exifDataImageList = [];
  }
  getUserTemplate(url){
    let deptsObservable: any;
    return  deptsObservable = new Observable(observer => {
      this.services.getServersExcel(url, '').subscribe(
        (res: any) => {
          if (res) {
            const excelFile = new Blob([res], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const blobURL = window.URL.createObjectURL(excelFile);
            const anchor = document.createElement('a');
            anchor.download = 'FormCreation' + '.xlsx';
            anchor.href = blobURL;
            document.body.appendChild(anchor);
            anchor.click();
            setTimeout(function(){
              // For Firefox it is necessary to delay revoking the ObjectURL
              document.body.removeChild(anchor);
              window.URL.revokeObjectURL(blobURL);
            }, 100);
          } else {
          }
          observer.next('1');
        }

      );
    });
  }
  public getColumns(url){
    let colObservable: any;
    return  colObservable = new Observable(observer => {
      let collList: any[];
      this.services.getServers(url, '').subscribe(
        (res: any) => {
          if (res) {
            switch (res.status) {
              case 200:
                collList= res.data;
              break;
              case 204:
                collList =[];
                this.toastr.info(res.message);
            }
          } else {
            collList = [];

          }
          observer.next(collList);
        }

      );

    });
  }
  public getCollections(url):any{
    let collObservable: any;
    return  collObservable = new Observable(observer => {
      let collList: any[];
      this.services.getServers(url, '').subscribe(
        (res: any) => {
          if (res) {
            switch (res.status) {
              case 200:
                collList= res.data;
                this.dropdownTables = res.data;
              break;
              case 204:
                collList =[];
                this.dropdownTables = [];
                this.toastr.info(res.message);
            }
          } else {
            collList = [];
            this.dropdownTables = [];
            this.toastr.warning(Globals.allConstants.constantKeys.dataErrMsg);
          }
          observer.next(collList);
        }

      );

    });
  }
}
