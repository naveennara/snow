import { Component, OnInit, TemplateRef  } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from '../../tasks/tasks.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { QuickSidebarComponent } from '../../../sharing/quick-sidebar/quick-sidebar.component';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { SharedRecordsService } from '../../../../app/sharing/shared-records/shared-records.service'
// import { WorkAssignmentsService } from '../work-assignments.service';
import * as Globals from '../../../globals';
import { PageHeaderService } from '../../../sharing/page-header/page-header.service';
@Component({
  selector: 'app-work-assignment-list',
  templateUrl: './work-assignment-list.component.html',
  styleUrls: ['./work-assignment-list.component.css'],
  providers: [QuickSidebarComponent]
})
export class WorkAssignmentListComponent implements OnInit {
  public modalRef: BsModalRef;
  taskId: string;
  projectId: string;
  taskType: string;
  private sub: any;
  // taskBasicInfo: any;
  taskWAList: any[];
  message: string;
  enablePopup: boolean;
  Imgsrc = Globals.noDataFound;
  globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  recordsIcons = Globals.svgIcons;
  isPrepop;
  workFlowStatus;
  workflowLevel: any;
  assignKeys = Globals.allConstants.constantKeys;
  taskInfo: any;
  taskName: any;
  constructor(
    // private toastr: ToastrService,
    private route: ActivatedRoute,
    private taskService: TasksService,
    private modalService: BsModalService,
    private sidebar: QuickSidebarComponent,
    private commonservice: CommonService,
    private sharedRecordsService: SharedRecordsService,
    // private workAssignmentService: WorkAssignmentsService
    private router: Router,
    private pageService: PageHeaderService
  ) {

    this.commonservice.refresh.subscribe((taskId) => {
      this.loadWorkAssigns(taskId);
    });
  }

  loadWorkAssigns(taskId) {
    this.taskService.getTaskWorkAssigns(taskId).subscribe(
      (result: any) => {
        if (result.status === 200) {
          this.taskWAList = JSON.parse(JSON.stringify(result.data));
        } else {
          this.taskWAList = [];
        }
        if (this.taskWAList.length > 0) {
          this.enablePopup = false;
        } else {
          this.enablePopup = true;
        }
    });
  }
  showOrHide(){
    if(this.workFlowStatus == Globals.taskStatusObject['workflowCycleStarted']){
      return false;
    }else{
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
  
  }
  BackToTasks() {
    if (this.taskType === 'task') {
      
      this.commonservice.updateBreadCrumbOnBack.next({breadcrumbText: 'Work Assignments'});
      this.router.navigate(['mainLayout/tasks']);
    } else {
      this.pageService.breadCrumbRemove = true;
      this.commonservice.updateBreadCrumbOnBack.next({breadcrumbText: 'Work Assignments'});
      this.router.navigate(['mainLayout/projectsTab/projectTasks', this.projectId]);
    }
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      // this.projectId = params['projectId'];
      this.commonservice.updateBreadCrumb.next({breadcrumbText: 'Work Assignments'});
      this.route.parent.params.subscribe(params1 => {
        this.projectId = params1['projectId'];
        if (this.projectId === undefined) {
          this.taskType = 'task';
        } else {
          this.taskType = 'projectTask';
        }
      });
      this.taskService.getTaskInfo(this.taskId).subscribe((res: any) => {
        if (res.status === 200) {
          this.isPrepop = res.data.isPrepopAttached;
          this.taskName =  res.data.name;
          this.taskInfo = res.data;
          this.workflowLevel = res.data.workflowLevel;
          this.workFlowStatus = res.data.statusOfTheTask;
        }
      });
      this.loadWorkAssigns(this.taskId);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  // confirm(): void {
  //   this.message = 'Confirmed!';
  //   this.modalRef.hide();
  // }

  // decline(): void {
  //   this.message = 'Declined!';
  //   this.modalRef.hide();
  // }

  createWorkAssignment(taskId, isFileUpload) {
    this.commonservice.openSideBar.next({id: this.taskId, waId: undefined, file: isFileUpload, page: 'createWA'});
    this.sidebar.clickEvent();
    if (this.enablePopup) {
      this.modalRef.hide();
    }
  }

  editTaskAssignment(data) {
    this.commonservice.openSideBar.next({id: data.taskId, waId: data._id, file: undefined, page: 'editWA'});
    this.sidebar.clickEvent();
  }

  onDeleteItem(message: string): void {
    this.ngOnInit();
  }
  getSubmittedRecords(task){
    this.sharedRecordsService.isPendingRecords = false;
    if (this.taskType === 'task') {
      this.router.navigate(['/mainLayout/tasks/getRecords', task.taskId,this.taskInfo.name,this.workFlowStatus]);
    }else{
      this.router.navigate(['mainLayout', 'projectsTab', 'projectTasks', this.projectId, 'getRecords',task.taskId,this.taskInfo.name,this.workFlowStatus]);

    }
    this.commonservice.recordsView.next({name:'Submitted Records'});
    task['workFlowAssignedTo'] = this.taskInfo.workFlowAssignedTo;
    task['taskAccountId'] = this.taskInfo.accountId;
    this.sharedRecordsService.taskData = {data:task,status:'all',total_count:task.submittedRecords,workflowLevel:this.workflowLevel};
    sessionStorage.setItem('taskData',JSON.stringify(this.sharedRecordsService.taskData));
    //{ path: 'getRecords/:taskId/:taskInfo.name/:assignmentId', component: GetRecordsComponent }
    //this.commonservice.getRecords.next({data:task,status:'all',total_count:task.submittedRecords});
   }
   getPendingRecords(task){
     this.sharedRecordsService.isPendingRecords = true;
     if (this.taskType === 'task') {
      this.router.navigate(['/mainLayout/tasks/getRecords', task.taskId,this.taskInfo.name,this.workFlowStatus]);
    }else{
      this.router.navigate(['mainLayout', 'projectsTab', 'projectTasks', this.projectId, 'getRecords',task.taskId,this.taskInfo.name,this.workFlowStatus]);

    }
    // this.router.navigate(['/mainLayout/tasks/getRecords', task.taskId,task.name,task._id]);
     this.commonservice.recordsView.next({name:'Pending Records'});
     task['taskAccountId'] = this.taskInfo.accountId;
     this.sharedRecordsService.taskData = {data:task,status:0,total_count:task.pendingRecords,workflowLevel:this.workflowLevel};
     sessionStorage.setItem('taskData',JSON.stringify(this.sharedRecordsService.taskData));
   }
}
