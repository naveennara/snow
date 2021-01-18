import { Injectable } from '@angular/core';
import * as Globals from '../../globals';
import { ServerService } from '../../server.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class WorkAssignmentsService {
  globalInfo: any = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  constructor(private services: ServerService) { }

  getUsersByDept(url) {
    return this.services.getServers(url, this.globalInfo.accounts[0]._id);
  }

  getFormsByCat(url, data) {
    // const data: any = {cats: categories, accountId : this.globalInfo.accounts[0]._id};
    // const url: string = Globals.urls.getFormszByCategory;
    return this.services.postServers(url, data);
  }

  deleteWorkAssignment(assignId) {
    const url: string = Globals.urls.deleteWorkAssign + '/' + assignId;
    return this.services.getServers(url, assignId);
  }

  createWorkAssignments(data) {
    const url: string = Globals.urls.createWorkAssignments;
    return this.services.postServers(url, data);
  }

  convertExceltoJSON(url, data) {
    return  this.services.postServersMultipart(url, data);
  }

  previewWorkAssignments(id) {
    const url: string = Globals.urls.getWorkAssign + '/' + id;
    return this.services.getServers(url, id);
  }

  updateWorkAssignments(data) {
    const url: string = Globals.urls.updateTaskAssignment + '/' + data.taskAssignment._id;
    return this.services.postServers(url, data);
  }
}

