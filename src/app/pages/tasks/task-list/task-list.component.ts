import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as Globals from '../../../globals';
import { QuickSidebarComponent } from '../../../sharing/quick-sidebar/quick-sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { PageHeaderService } from '../../../sharing/page-header/page-header.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TasksService, QuickSidebarComponent]
})
export class TaskListComponent implements OnInit {
  Imgsrc = Globals.noDataFound;
  headerIcons = Globals.headerIcons;
  sidebarIcons= Globals.sidebarIcons;
  tasksList: any[];
  workflowHistory: any[];
  search: string;
  page: string;
  totalCount: number;
  limit: number;
  pageNumber: number = 1;
  show = true;
  globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  loginUserType;
  taskAction: string;
  taskType: string;
  taskTitle: string;
  projectId: string;
  recordsIcons = Globals.svgIcons;
  private sub: any;
  accountId;
  deptName = '';
  isOpen = false;
  showButtons = true;
  taskStatusObject = Globals.taskStatusObject;
  taskKeys = Globals.allConstants.constantKeys;
  subscriptions: Subscription[]=[];
  constructor(
    private service: TasksService,
    private commonservice: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageHeaderService,
    private toastr: ToastrService
  ) {
    this.loginUserType = this.globalInfo.type;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['projectId']) {
        this.commonservice.updateBreadCrumb.next({ breadcrumbText: 'Tasks' });
        this.taskType = 'projectTask';
        this.taskTitle = 'Project Tasks';
        this.projectId = params['projectId'];
      } else {
        this.taskType = 'task';
        this.taskTitle = 'Tasks';
        this.projectId = null;
      }
      this.getListOfTasks(1, 'All');
      this.commonservice.approvalsCount.next(true);
      if (this.loginUserType === 1) {
        this.taskAction = 'Edit Task';
      } else {
        this.taskAction = 'Preview Task';
      }
      let search = this.commonservice.search.subscribe(
        (data: any) => {
          this.search = data.search;
          this.page = data.page;
          this.getListOfTasks(1, 'All');
        }
      );
      this.subscriptions.push(search);
    });
    let filterbyDept = this.commonservice.callGetForms.subscribe(
      (res: any) => {
        if (res !== undefined) {
          this.deptName = res.name;
          this.accountId = res._id;
          this.getListOfTasks(1, 'All');
        }
      }
    );
    this.subscriptions.push(filterbyDept);
  }
  BackToProjects() {
    this.commonservice.updateBreadCrumbOnBack.next({ breadcrumbText: 'Tasks' });
    this.router.navigate(['mainLayout/projectsTab/projects']);
  }
  showOrHide(){
    if( this.globalInfo.type == 1){
      if(this.taskType == 'task' ){
        if(this.globalInfo.privilege[Globals.Privileges['tasks']] == 0){
          this.commonservice.hideCreate.next(true);
          return false;
        }else{
          return true;
        }
      }else{
        return false;
      }
    }
    else if(this.globalInfo.type == 3){
      if(this.taskType == 'projectTask' ){
        return true;
      }else{
        return false;
      }
    }
  }
  showPendingDays(status){
    if(status.includes('Pending')){
      return true;
    }else{
      return false;
    }
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

  toggle() {
    this.show = !this.show;
    this.service.gridView = !this.show;
  }

  getListOfTasks(newPageNumber, selectedValue) {
    this.commonservice.showCreate.next(true);
    const globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    let dept: any;
    if (globalInfo.type === 0) {
      dept = globalInfo.username;
    } else {
      if (globalInfo.type === 3) {
        if (this.accountId !== undefined) {
          dept = this.accountId;
        } else {
          dept = 'All';
        }
      } else {
        dept = globalInfo.accounts[0]._id;
      }
    }
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    let url: string;
    if (globalInfo.type === 1 || globalInfo.type === 3) {
      // tslint:disable-next-line:max-line-length
      url = Globals.urls.getTasks + '/' + this.search + '/' + dept + '/' + globalInfo._id + '/' + globalInfo.type + '/' + this.projectId + '/' + Globals.itemsPerPage + '/' + newPageNumber;
    } else {
      // tslint:disable-next-line:max-line-length
      url = Globals.urls.getTasks + '/' + this.search + '/All/' + globalInfo._id + '/' + globalInfo.type + '/' + this.projectId + '/' + Globals.itemsPerPage + '/' + newPageNumber;
    }

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

  assignWA(data) {
    this.commonservice.hideCreate.next(true);
    this.service.goToWorkAssignments(data._id, this.projectId);
    // if (data.users.length === 0) {
    //   this.service.goToCreateWorkAssignments(data._id, this.projectId);
    // } else {
    //   this.service.goToUpdateWorkAssignments(data._id, this.projectId);
    // }
  }

  editTask(data) {
    if(this.showOrHide()){
      this.commonservice.editActivated.next(true);

    }else{
      this.commonservice.editActivated.next(false);

    }
    this.service.goToEditTask(data, this.projectId);
  }

  // ==> View WorkFlow History
  viewWorkFlowHistory(data) {
    this.commonservice.workFlowHistory.next({taskId:data._id});

  }

  closeSidebar() {
    this.isOpen = false;
  }

  acceptWorkflow(task) {
    // tslint:disable-next-line:max-line-length
    const url = Globals.urls.getWorkflowMangementAssigneeInfo + '/' + 'approve' + '/' + task.workAssignmentLevel + '/' + task._id +  '/' + this.globalInfo._id;
    this.service.getTaskAcceptAndRejectForm(url).subscribe((res: any) => {
      if (res.status === 200) {
        this.commonservice.openSideBarWorkflow.next({
          data: res.data.formInfo.FormSkeleton,
          taskInfo: task,
          status: 'accepted',
          userName: res.data.userInfo.username
        });
      } else {

      }
    });
  }
  rejectWorkflow(task) {
    // tslint:disable-next-line:max-line-length
    const url = Globals.urls.getWorkflowMangementAssigneeInfo + '/' + 'reject' + '/' + task.workAssignmentLevel + '/' + task._id + '/' + this.globalInfo._id;
    this.service.getTaskAcceptAndRejectForm(url).subscribe((res: any) => {
      if (res.status === 200) {
        this.commonservice.openSideBarWorkflow.next({
          data: res.data.formInfo.FormSkeleton,
          taskInfo: task,
          status: 'rejected',
          userName: res.data.userInfo.username
        });

      } else {

      }
    });
  }


  getSubmittedRecords(task) {
    this.commonservice.recordsView.next({ name: task.name });
    this.service.getRecordsUrl(task);
    // this.toastr.warning('Hello, currently no data available to show! To view the data, please apply the filter');
  }
  onDeleteItem(message: string): void {
    this.getListOfTasks(1, 'All');
  }

  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
  }
}


