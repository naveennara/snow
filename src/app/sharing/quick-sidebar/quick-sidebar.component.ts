import { Component, OnInit, ViewChildren, QueryList, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../sharing-module/common.service';
import { WorkAssignmentCreateComponent } from '../../pages/work-assignments/work-assignment-create/work-assignment-create.component';
import { WorkAssignmentEditComponent } from '../../pages/work-assignments/work-assignment-edit/work-assignment-edit.component';
import * as $ from 'jquery';
import { SharedRecordsService } from '../../sharing/shared-records/shared-records.service';
import { QuickSidebarService } from './quick-sidebar.service';
import * as Globals from '../../globals';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { FormsServicesService } from 'src/app/pages/forms/forms-services.service';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quick-sidebar',
  templateUrl: './quick-sidebar.component.html',
  styleUrls: ['./quick-sidebar.component.css']
})
export class QuickSidebarComponent implements OnInit {
  @ViewChildren(WorkAssignmentCreateComponent) createWA: QueryList<WorkAssignmentCreateComponent>;
  @ViewChildren(WorkAssignmentEditComponent) editWA: QueryList<WorkAssignmentEditComponent>;
  @ViewChild('staticTabs', { static: true }) staticTabs: TabsetComponent;
  status: boolean = false;
  flag;
  dashboardData;
  taskId: string;
  pageToOpen: string;
  fileInput: boolean;
  assignmentId: string;
  task;
  widgets;
  formdata;
  ispreview;
  taskData;
  editForm = false;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  appversion;
  toggleEdit;
  public setwidth: number = 50;
  public setInnerwidth: number = 90;
  isActionBtn: boolean = false;
  svgIcons = Globals.svgIcons;
  showEdit: boolean;
  constantKeys;
  recordId: any;
  subscriptions: Subscription[]=[];
  //recordData: any;
  //attachedData: any;
  constructor(
    private router: Router,
    private service: QuickSidebarService,
    private commonService: CommonService,
    private sharedServices: SharedRecordsService,
    public elRef: ElementRef,
    private toastr: ToastrService,
    private services: FormsServicesService
  ) {this.constantKeys = Globals.allConstants.constantKeys; }

  clickEvent() {
    this.status = true;
    document.getElementById('sidebarAnchor').click();
    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'hidden';

  }

  closeSidebar() {
    this.status = false;
    if (this.flag === true) {
      this.setwidth = 60;
      this.setInnerwidth = 90;
    }
    document.getElementById('sidebarAnchorClose').click();
    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'auto';

  }
  maximizeWindow() {
    this.flag = !this.flag;
    if (this.flag === false) {
      this.setwidth = 60;
      this.setInnerwidth = 90;
    }
    else {
      this.setwidth = 100;
      this.setInnerwidth = 90;
    }
  }
  cancel() {
    this.pageToOpen = 'taskWA';
  }
  ngAfterViewInit() {
    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'auto';

  }
  ngOnInit() {
    this.elRef.nativeElement.ownerDocument.body.style.overflow = 'auto';
    jQuery(function () {
      let nav_open = 0;
      let quick_sidebar_open = 0;
      if (!quick_sidebar_open) {
        var toggle = $('.quick-sidebar-toggler');
        toggle.on('click', function () {
          if (nav_open === 1) {
            $('html').removeClass('quick_sidebar_open');
            $('.quick-sidebar-overlay').remove();
            toggle.removeClass('toggled');
            quick_sidebar_open = 0;
          } else {
            $('html').addClass('quick_sidebar_open');
            toggle.addClass('toggled');
            $('<div class="quick-sidebar-overlay"></div>').insertAfter('.quick-sidebar');
            quick_sidebar_open = 1;
          }
        });
       
        $(".close-quick-sidebar").on('click', function () {
          $('html').removeClass('quick_sidebar_open');
          $('.quick-sidebar-toggler').removeClass('toggled');
          $('.quick-sidebar-overlay').remove();
          quick_sidebar_open = 0;
        });
        quick_sidebar_open = 1;
      }
    });

    // const str = 'mainLayout/tasks';
    // this.router.navigate([]);
    let openSideBar = this.commonService.openSideBar.subscribe(
      (data: any) => {
        this.fileInput = data.file;
        this.pageToOpen = data.page;
        this.setwidth = 50;
        this.taskId = data.id;
        this.assignmentId = data.waId;
        this.clickEvent();
        // have to write ng switch to handle all pages on sidebar and make it generic
        if (this.createWA.first !== undefined) {
          // this.status = !this.status;
          this.createWA.first.resetSideBar();
        }
        if (this.editWA.first !== undefined) {
          // this.status = !this.status;
          this.editWA.first.resetSideBar();

        }
        
      });
    let formOpen =this.commonService.formOpen.subscribe(
      (data: any) => {
        this.pageToOpen = 'form';
        this.toggleEdit = false;
        this.setwidth = 30;
        this.widgets = data.formSkeleton;
        this.formdata = data.recordInfo;
        this.showEdit = this.sharedServices.showEdit;
        this.editForm = false;
        this.isActionBtn = false;
        this.ispreview = 'preview';
        // if (this.sharedServices.isDateStarted || data.recordEdit) {
        //   this.ispreview = 'Edit';
        //   this.editForm = true;
        // } else {
        //   this.ispreview = 'preview';
        // }
        this.clickEvent();
        this.staticTabs.tabs[0].active = true;
        if (data.recordInfo && (this.constantKeys[data.recordInfo[this.constantKeys['recordStatus']]] == 1 || this.constantKeys[data.recordInfo[this.constantKeys['recordStatus']]] == 0 || this.constantKeys[data.recordInfo[this.constantKeys['recordStatus']]] == 2)) {
          if(data.recordInfo.workFlowAssignedTo && this.loginDetails._id == data.recordInfo.workFlowAssignedTo._id){
            this.showEdit = true;
            
            // if(this.showEdit == true){
            //   this.showEdit = true;
            // }else{
            //   this.editForm = false;
            //   this.showEdit = false;
            // }
           
          }else{
            this.editForm = false;
              this.showEdit = false;
           // this.editForm = true;
           
          }
          //this.toastr.warning(Globals.allConstants.constantKeys.workFlowStartedMsg);
        }

      });
   

    // version hitory subscrber start
    let appVersionHistory = this.commonService.appVersionHistory.subscribe(
      (data: any) => {
        this.setwidth = 50;
        this.appversion =  data.platform;
        this.pageToOpen = 'versionHistory';
        this.clickEvent();
      });
    // version hitory subscrber end
    let dashboard = this.commonService.dashboard.subscribe(
      (data: any) => {
        if(data){
          this.pageToOpen = 'dashboard';
          this.dashboardData = data;
          this.setwidth = 60;
          this.clickEvent();
        }
      
      });
   
    let openSideBarWorkflow = this.commonService.openSideBarWorkflow.subscribe((data: any) => {
      if(data){
      const finalObject = { data: data.data, taskInfo: data.taskInfo, status: data.status, userName: data.userName };
      this.task = finalObject;
      this.setwidth = 30;
      this.pageToOpen = 'workflowCycle';
      this.clickEvent();
      }
    });
    let showWA = this.commonService.showWA.subscribe(
      (res: any) => {
        if (res !== undefined)
          //this.status = !this.status;
          this.clickEvent();
        this.pageToOpen = res.page;

      }
    );
    let workFlowHistory = this.commonService.workFlowHistory.subscribe(
      (res: any) => {
        if(res !== undefined)
        {
          this.setwidth = 50;
          this.recordId = {id:res.taskId,level:0};
          this.pageToOpen = 'WFHistory';
          this.clickEvent();
        }
        
      }
    );
    let photoOnmap =this.commonService.photoOnmap.subscribe(
      (res: any) => {
        if (res !== undefined)
        this.closeSidebar();
      }
    );
    let locations= this.commonService.locations.subscribe(
      (res: any) => {
        if (res !== undefined)
        this.closeSidebar();
      }
    );
    this.subscriptions.push(workFlowHistory);
		this.subscriptions.push(photoOnmap);
		this.subscriptions.push(locations);
		this.subscriptions.push(showWA);
		this.subscriptions.push(openSideBarWorkflow);
    this.subscriptions.push(formOpen);
    this.subscriptions.push(openSideBar);
    this.subscriptions.push(dashboard);
    this.subscriptions.push(appVersionHistory);
  }
  toggle(){
      if(this.toggleEdit == true){
      
          this.ispreview = 'Edit';
          this.editForm = true;
       
      }else{
        this.ispreview = 'preview';
        this.editForm = false;
      }  
    
  }
  workflowHistory(){
    this.setwidth = 50;
    this.recordId = {id:this.formdata._id,level:1};
    this.pageToOpen = 'WFHistory';
  }
  showSketching(){
    if(this.formdata.sketching == true){
      this.commonService.sketching.next(this.formdata);
      this.closeSidebar();
    }else{
      this.toastr.warning(Globals.allConstants.constantKeys.noSketchingMsg);
    }
  }
  showGeoTaggedPhotos(){
    if(this.services.getImageExifInfo().length>0){
      this.commonService.geoTaggedImagesList.next(this.services.getImageExifInfo());
      this.closeSidebar();
      //this.toastr.info('Please enable map view');
    } else {
      this.toastr.warning("This record has no geo tagged photos");
    }
  }
  acceptWorkflow(task) {
    let taskId = task.taskId;
    if (!taskId || taskId == 'null') {
      taskId = task.formId
    }
    const url = Globals.urls.getWorkflowMangementAssigneeInfo + '/' + 'approve' + '/' + task.workAssignmentLevel + '/' + taskId + '/' + this.loginDetails._id;
    this.service.getTaskAcceptAndRejectForm(url).subscribe((res: any) => {
      if (res.status === 200) {
        this.openWorkFlow(res, task, 'accepted');
      } else {

      }
    });
  }
  rejectWorkflow(task) {
    if (task.workAssignmentLevel == 1 && task.submittedBy == 'Anonymous') {
      this.toastr.info(Globals.allConstants.constantKeys.rejectErrMsg);
    } else {
      let taskId = task.taskId;
      if (!taskId || taskId == 'null') {
        taskId = task.formId
      }
      const url = Globals.urls.getWorkflowMangementAssigneeInfo + '/' + 'reject' + '/' + task.workAssignmentLevel + '/' + taskId + '/' + this.loginDetails._id;
      this.service.getTaskAcceptAndRejectForm(url).subscribe((res: any) => {
        if (res.status === 200) {
          this.openWorkFlow(res, task, 'rejected');

        } else {

        }
      });
    }

  }
  openWorkFlow(data, task, status) {
    let url = Globals.urls.recordWFData + '/' + task._id;
    this.service.getTaskAcceptAndRejectForm(url).subscribe((res: any) => {
      if (res.status === 200) {
        if (res.data[0]) {
          res.data[0]['_id'] = task.taskId;
          res.data[0]['recordId'] = task._id;
          res.data[0]['formId'] = task.formId;
        }
        const finalObject = { data: data.data.formInfo.FormSkeleton, taskInfo: res.data[0], recordlevel: 1, status: status, userName: data.data.userInfo.username };
        this.task = finalObject;
        this.pageToOpen = 'workflowCycle';
      } else {

      }
    });

  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  

  }
}
