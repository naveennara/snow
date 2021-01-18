import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApprovalsService {

  constructor(private services: ServerService,private router: Router) { }
  
  getTasksList(url) {
    // const url: string = Globals.urls.getTasksList + '/' + dept;
    return this.services.getServers(url, '');
  }
  getTaskAcceptAndRejectForm(url) {

    return this.services.getServers(url, '');
  }
  goToWorkAssignments(taskId, projectId) {
    
      this.router.navigate(['mainLayout', 'approvals', 'workAssignmentList', taskId]);
   
  }
  getTaskInfo(url,taskId) {
    return this.services.getServers(url, taskId);
  }
  getTaskWorkAssigns(url,taskId) {
    return this.services.getServers(url, taskId);
  }
}
