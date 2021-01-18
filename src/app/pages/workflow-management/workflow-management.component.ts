import { Component, OnInit } from '@angular/core';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-workflow-management',
  templateUrl: './workflow-management.component.html',
  styleUrls: ['./workflow-management.component.css']
})
export class WorkflowManagementComponent implements OnInit {
  pageDetails = {pageName : 'Workflow Management', pageIcon: Globals.headerIcons.workflowGrey};
  loginDetails: any;
  ellipseList: any;
  headerInputs: any;
  constructor() { }

  ngOnInit() {
    this.loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    if (this.loginDetails['type'] === 1) {
    this.ellipseList = ['Create'];
    } else {
    this.ellipseList = [];
    }
    this.headerInputs = [HeaderInputs.keys.workflow];
  }

}
