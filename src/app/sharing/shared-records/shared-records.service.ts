import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { WindowRef } from '../sharing-module/WindowRef';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SharedRecordsService {
  globalInfo: any = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  isDateStarted: any;
  recordInfo: any;
  taskData:any;
  isPendingRecords: boolean;
  myInnerHeight: any;
  myInnerComponentHeight: any;
  showEdit:boolean;
	userList: any;
  workFlowLevel: any;
	formId: any;
  constructor(private services: ServerService, private winRef: WindowRef) {
    this.myInnerHeight = winRef.nativeWindow.innerHeight;
    this.myInnerComponentHeight = winRef.nativeWindow.innerHeight - 5;
  }
  getRecords(url,data){
    return  this.services.postServers(url, data);
  }
  getMedia(url){
    return  this.services.getServers(url, '');
  }
  getForm(url){
    return  this.services.getServers(url, '');
  }
  exportRecords(url,data){
    return  this.services.postServers(url, data);
  }
  convertExceltoJSON(url, data) {
    return  this.services.postServersMultipart(url, data);
  }
  getUsersByDept(url) {
    return this.services.getServers(url,'');
  }
  addOrDeletePrepopRecords(url, data) {
    return  this.services.postServers(url, data);
  }
  getAttachedReferences(url) {
    return  this.services.getServers(url, '');
  }
  getAttachedReference(url, type) {
    return this.services.getServersFiles(url, type, '');
  }
}
