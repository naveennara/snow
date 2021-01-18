import { Injectable } from '@angular/core';
import * as Globals from '../../globals';
import { Router } from '@angular/router';
import { ServerService } from '../../server.service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  globalInfo: any = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  isPrepop;
  taskId:string;
  gridView;
  dropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  userdropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'username',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  layerdropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'externalName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 5,
    allowSearchFilter: true
  };
  constructor(private services: ServerService, private router: Router) { }

  getTasksList(url) {
    // const url: string = Globals.urls.getTasksList + '/' + dept;
    return this.services.getServers(url, '');
  }
  createTask(data) {
    const url = Globals.urls.createTask;
    return this.services.postServers(url, data);
  }
  // goToCreateWorkAssignments(taskId, projectId) {
  //   this.router.navigate(['/mainLayout/tasks/workAssignmentList', taskId]);
  // }

  getCategories(url) {
    return this.services.getServers(url, '');
  }

  goToWorkAssignments(taskId, projectId) {
    if (projectId == null) {
      this.router.navigate(['mainLayout', 'tasks', 'workAssignmentList', taskId]);
    } else {
      this.router.navigate(['mainLayout', 'projectsTab', 'projectTasks', projectId, 'workAssignmentList', taskId]);
    }
  }

  goToEditTask(task, projectId) {
    if (projectId == null) {
      this.router.navigate(['mainLayout', 'tasks', 'edit', task._id]);
    } else {
      this.router.navigate(['mainLayout', 'projectsTab', 'projectTasks', projectId, 'edit', task._id]);
    }

    // this.router.navigate(['mainLayout/tasks', {outlets: {sidebarOutlet: ['edit', task._id]}}]);
  }

  getTaskInfo(taskId) {
    const url: string = Globals.urls.getTaskData + '/' + taskId;
    return this.services.getServers(url, taskId);
  }

  getTaskBasicInfo(taskId) {
    const url: string = Globals.urls.getTaskBasicInfo + '/' + taskId;
    return this.services.getServers(url, taskId);
  }

  updateTask(data) {
    const url: string = Globals.urls.updateTask + '/' + data._id;
    return this.services.postServers(url, data);
  }

  deleteTask(url,taskId) {
    return this.services.postServers(url, []);
  }

  getTaskWorkAssigns(taskId) {
    const url: string = Globals.urls.getTaskWorkAssigns + '/' + taskId;
    return this.services.getServers(url, taskId);
  }
  getTaskAcceptAndRejectForm(url) {

    return this.services.getServers(url, '');
  }

  getWorkFlowDetails(url) {
    return this.services.getServers(url, '');
  }
  
  getGAsAndMods(url, dept) {
    return this.services.getServers(url, dept);
  }

  getProjectInfo(projectId) {
    const url: string = Globals.urls.getProjectInfo + '/' + projectId;
    return this.services.getServers(url, projectId);
  }
  getRecordsUrl(data){
    this.router.navigate(['/mainLayout/tasks/getRecords', data._id,data.name]);
  } 
  
  getLayers(url) {
    return this.services.getServers(url, '');
  }
}
