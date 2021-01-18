import { Component, OnInit } from '@angular/core';
import * as Globals from '../../globals';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent implements OnInit {
  pageDetails: any;
  ellipseList: any;
  headerInputs: any;
  createEllipseRouting: any[];
  constructor() { }

  ngOnInit() {
    this.pageDetails = {pageName : 'Approvals', pageIcon:  Globals.headerIcons.tasksGrey};
    this.createEllipseRouting = ['/mainLayout', 'approvals'];
  }

}
