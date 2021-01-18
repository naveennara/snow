import { Component, OnInit, TemplateRef  } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { SharedRecordsService } from '../../../../app/sharing/shared-records/shared-records.service'
// import { WorkAssignmentsService } from '../work-assignments.service';
import * as Globals from '../../../globals';
import { PageHeaderService } from '../../../sharing/page-header/page-header.service';
import { ApprovalsService } from '../approvals.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-approvals-work-assignments',
  templateUrl: './approvals-work-assignments.component.html',
  styleUrls: ['./approvals-work-assignments.component.css']
})
export class ApprovalsWorkAssignmentsComponent implements OnInit {
  taskId: string;
  private sub: any;
  // taskBasicInfo: any;
  taskWAList: any[];
  message: string;
  Imgsrc = Globals.noDataFound;
  globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  recordsIcons = Globals.svgIcons;
  isPrepop;
  constants = Globals.allConstants.constantKeys;
  taskName;
  workflowLevel: any;
  workFlowStatus: any;
  taskInfo: any;
  constructor(
    // private toastr: ToastrService,
    private service: ApprovalsService,
    private route: ActivatedRoute,
    private commonservice: CommonService,
    private sharedRecordsService: SharedRecordsService,
    private location: Location,
    private router: Router,
    private pageService: PageHeaderService
  ) {

    this.commonservice.refresh.subscribe((taskId) => {
      this.loadWorkAssigns(taskId);
    });
  }

  loadWorkAssigns(taskId) {
    const url: string = Globals.urls.getTaskWorkAssigns + '/' + taskId;
    this.service.getTaskWorkAssigns(url,taskId).subscribe(
      (result: any) => {
        if (result.status === 200) {
          this.taskWAList = JSON.parse(JSON.stringify(result.data));
        } else {
          this.taskWAList = [];
        }
        
    });
  }

  BackToTasks() {
    this.location.back();
    this.commonservice.updateBreadCrumbOnBack.next({breadcrumbText: 'WorkAssignments'});
  
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.taskId = params['taskId'];
      this.commonservice.updateBreadCrumb.next({breadcrumbText: 'WorkAssignments'});
      
      const url: string = Globals.urls.getTaskData + '/' + this.taskId;
      this.service.getTaskInfo(url,this.taskId).subscribe((res: any) => {
        if (res.status === 200) {
        this.taskInfo = res.data;
        this.taskName =  res.data.name;
        this.workflowLevel = res.data.workflowLevel;
         this.workFlowStatus = res.data.statusOfTheTask;
        }
      });
      this.loadWorkAssigns(this.taskId);
    });
  }
  getSubmittedRecords(task){
    this.sharedRecordsService.isPendingRecords = false;
    this.router.navigate(['/mainLayout/approvals/getRecords', task.taskId,this.taskInfo.name,this.workFlowStatus]);
    this.commonservice.recordsView.next({name:'Submitted Records'});
    task['workFlowAssignedTo'] = this.taskInfo.workFlowAssignedTo;
    this.sharedRecordsService.taskData = {data:task,status:'all',total_count:task.submittedRecords,workflowLevel:this.workflowLevel};
   }
   getPendingRecords(task){
     this.sharedRecordsService.isPendingRecords = true;
     this.router.navigate(['/mainLayout/approvals/getRecords', task.taskId,this.taskInfo.name,task._id]);
     this.commonservice.recordsView.next({name:'Pending Records'});
     this.sharedRecordsService.taskData = {data:task,status:0,total_count:task.pendingRecords,workflowLevel:this.workflowLevel};
   }
}
