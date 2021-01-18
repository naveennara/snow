import { Component, OnInit } from '@angular/core';
import {WorkflowManagementService} from '../workflow-management.service';
import * as Globals from '../../../globals';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-work-flow-list',
  templateUrl: './work-flow-list.component.html',
  styleUrls: ['./work-flow-list.component.css'],
  providers: [WorkflowManagementService]
})

export class WorkFlowListComponent implements OnInit {
  Imgsrc = Globals.noDataFound;
  constructor(
    private service: WorkflowManagementService,
    private commonservice: CommonService
  ) { }
  workflowList: any[];
  totalCount: number;
  limit: number;
  pageNumber = 1;
  showButtons = true;
  search: string;
  workflowKeys = Globals.allConstants.constantKeys;
  subscriptions: Subscription[]=[];
  ngOnInit() {
    this.getWorkflows(1);
    let search = this.commonservice.search.subscribe(
      (data: any) => {
        this.search = data.search;
        this.getWorkflows(1);
      }
    );
    this.subscriptions.push(search);
    if(JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).privilege[Globals.Privileges['workflow']] == 0){
      this.commonservice.hideCreate.next(true);
      this.showButtons = false; 
    }
  }

  getWorkflows(newPageNumber) {
    this.commonservice.showCreate.next(true);
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    const globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    let dept: any;
    if (globalInfo.type === 0) {
      dept = globalInfo.username;
    } else {
      dept = globalInfo.accounts[0]._id;
    }
    // tslint:disable-next-line:max-line-length
    const url = Globals.urls.deptWiseWorkFlows + '/' + this.search + '/' + dept  + '/' + Globals.itemsPerPage + '/' + newPageNumber;
    this.service.getWorkflows(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.workflowList = res.data.docs;
          this.totalCount = res.data.total;
          this.limit = res.data.limit;
        } else {
          this.workflowList = [];
        }
      }
    );
  }
  gotoWorkflow(req: any) {
    this.commonservice.editActivated.next(true);
    this.service.gotoWorkflow(req);
  }

  viewWorkflow() {

  }

  onDeleteItem(message: string): void {
    this.getWorkflows(1);
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
  }
}
