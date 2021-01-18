import { Component, OnInit } from '@angular/core';
import { ApprovalsService } from '../approvals.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as Globals from '../../../globals';
import { Router, ActivatedRoute } from '@angular/router';
import { PageHeaderService } from '../../../sharing/page-header/page-header.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-approvals-list',
  templateUrl: './approvals-list.component.html',
  styleUrls: ['./approvals-list.component.css']
})
export class ApprovalsListComponent implements OnInit {
  Imgsrc = Globals.noDataFound;
  headerIcons = Globals.headerIcons;
  sidebarIcons= Globals.sidebarIcons;
  displayIcons = Globals.svgIcons;
  tasksList: any[];
  search: string;
  page: string;
  totalCount: number;
  limit: number;
  pageNumber: number = 1;
  show = true;
  globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  loginUserType;
  constants = Globals.allConstants.constantKeys;
  constructor(
    private service: ApprovalsService,
    private commonservice: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageHeaderService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.commonservice.search.subscribe(
      (data: any) => {
        this.search = data.search;
        this.page = data.page;
        this.getListOfTasks(1, 'All');
      }
    );
    this.getListOfTasks(1, 'All');
  }
  getTaskType(taskType: any) {
    switch (taskType) {
      case 'New':
        return '3px solid #6861ce';
      case 'Assigned':
        return '3px solid #ffad46';
      case 'In progress':
        return '3px solid #1572e8';
      case 'Completed':
        return '3px solid #31ce36';
      case 'workflow Cycle Started':
        return '3px solid #A2A2A2';
      case 'default':
        return '3px solid #eeeee';
    }
  }
  assignWA(data) {
    this.commonservice.hideCreate.next(true);
    this.service.goToWorkAssignments(data._id, 'null' );
    // if (data.users.length === 0) {
    //   this.service.goToCreateWorkAssignments(data._id, this.projectId);
    // } else {
    //   this.service.goToUpdateWorkAssignments(data._id, this.projectId);
    // }
  }

  toggle() {
    this.show = !this.show;
  }
  getListOfTasks(newPageNumber, selectedValue) {
    this.commonservice.editActivated.next('');
    const globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    let url = Globals.urls.getTasksModerator +'/'+ globalInfo._id + '/' + Globals.itemsPerPage + '/' + newPageNumber;
    

    this.service.getTasksList(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.tasksList = res.data.docs;
          this.totalCount = res.data.total; // total data count.
          this.limit = res.data.limit; // Total Limit to show
        } else {
          this.tasksList = [];
        }
      }
    );
  }
  acceptWorkflow(task) {
    // tslint:disable-next-line:max-line-length
    const url =  Globals.urls.getWorkflowMangementAssigneeInfo  + '/' + 'approve' + '/' + task.workAssignmentLevel + '/' + task._id +  '/' + this.globalInfo._id;
    this.service.getTaskAcceptAndRejectForm(url).subscribe((res: any) => {
      if ( res.status === 200) {
        this.commonservice.openSideBarWorkflow.next({data: res.data.formInfo.FormSkeleton, taskInfo: task , status: 'accepted' , userName:  res.data.userInfo.username});
      } else {

      }
    });
  }
  rejectWorkflow(task) {
     // tslint:disable-next-line:max-line-length
    const url = Globals.urls.getWorkflowMangementAssigneeInfo + '/' + 'reject' + '/' + task.workAssignmentLevel + '/' + task._id +  '/' + this.globalInfo._id;
    this.service.getTaskAcceptAndRejectForm(url).subscribe((res: any) => {
      if ( res.status === 200) {
        this.commonservice.openSideBarWorkflow.next({data: res.data.formInfo.FormSkeleton, taskInfo: task , status: 'rejected' , userName:  res.data.userInfo.username});

      } else {

      }
    });
  }
  viewWorkFlowHistory(data) {
    this.commonservice.workFlowHistory.next({taskId:data._id});

  }

}
