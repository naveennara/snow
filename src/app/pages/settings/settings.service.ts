import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  editedTable = false;
  externalName: any;

  constructor(private services: ServerService,private toastr: ToastrService,private router: Router) { }
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
  public getAdmins(url): any {
    let adminsObservable: any;
    return  adminsObservable = new Observable(observer => {
      let adminsList: any[];
      this.services.getServers(url, '').subscribe(
        (res: any) => {
          if (res) {
            switch (res.status) {
              case 200:
                adminsList= res.data;
              break;
              case 204:
                adminsList =[];
            }
          } else {
            adminsList = [];
          }
          observer.next(adminsList);
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
              break;
              case 204:
                this.toastr.info(res.message);
                collList =[];
            }
          } else {
            this.toastr.info(res.message);
            collList = [];
          }
          observer.next(collList);
        }

      );

    });
  }
  getPrivileges(url){
    return  this.services.getServers(url, '');
  } 
  setPrivileges(url,data){
    return  this.services.postServers(url, data);
  }
  getMap(url){
    return  this.services.getServers(url, '');
  }
  getConfig(url){
    return  this.services.getServers(url, '');
  }
  getSettingsInfo(url){
    return  this.services.getServers(url, '');
  }
  viewProfile(url) {
    return  this.services.getServers(url, '');
  }
  updateMap(url,data){
    return  this.services.postServers(url, data);
  }
  updateConfig(url,data){
    return  this.services.postServersMultipart(url, data);
  }
  updateProfile(url,data){
    return  this.services.postServersMultipart(url, data);
  }
  xlsxtojsonuser(url, data) {
    return  this.services.postServersMultipart(url, data);
  }
  createdropDownFromFile(url,data){
    return  this.services.postServers(url, data);
  }
  deleteRecords(url,data){
    return  this.services.postServers(url, data);
  }
  updateSetting(url,data){
    return  this.services.postServers(url, data);
  }
  createLayer(url, data) {
    return this.services.postServers(url, data);
  }
  deleteLayer(url, data) {
    return this.services.postServers(url, data);
  }
  updateLayer(url, data) {
    return this.services.postServers(url, data);
  }
  getLayers(url) {
    return this.services.getServers(url, '');
  }
  getlayerByName(url){
    return this.services.getServers(url,'')
  }
 
  getLayersByTaskId(url){
    return this.services.getServers(url, '')
  }
  editUrl(externalName){
    this.router.navigate(['/mainLayout/settings/layerEdit', externalName]);
  }
}
