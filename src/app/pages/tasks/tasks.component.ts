import { Component, OnInit } from '@angular/core';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
import { ActivatedRoute } from '@angular/router';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  pageDetails: any;
  loginDetails: any;
  ellipseList: any;
  headerInputs: any;
  projectId: string;
  sub: any;
  createEllipseRouting: any[];
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['projectId']) {
        this.projectId = params['projectId'];
        this.pageDetails = {pageName : 'Project Tasks', pageIcon: Globals.headerIcons.tasksGrey};
        this.createEllipseRouting = ['/mainLayout', 'projectsTab', 'projectTasks', this.projectId, 'create', this.projectId];
      
      } else {
        this.projectId = null;
        this.pageDetails = {pageName : 'Tasks', pageIcon: Globals.headerIcons.tasksGrey};
        this.createEllipseRouting = ['/mainLayout', 'tasks', 'create'];
      }
    });
    this.loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    // this.ellipseList = ['Create'];
    if (((this.loginDetails['type'] === 1) && (this.projectId === null)) || ((this.loginDetails['type'] === 3) && (this.projectId != null))) {
      this.ellipseList = ['Create'];
    }
    // else {
    //   this.ellipseList = [];
    // }
    this.headerInputs = [HeaderInputs.keys.tasks];
  }
 
}
