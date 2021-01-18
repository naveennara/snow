import { Component, OnInit, Input, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import * as Globals from '../../../globals';
import { ToastrService } from 'ngx-toastr';
import { WorkflowCycleService } from './workflow-cycle-services';
import { TaskListComponent } from '../task-list/task-list.component';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-workflow-cycle',
  templateUrl: './workflow-cycle.component.html',
  styleUrls: ['./workflow-cycle.component.css']
})
export class WorkflowCycleComponent implements OnInit {
  @Input() task: any;
  @Output() closeSideBar: EventEmitter<number> = new EventEmitter();
  @ViewChild('staticTabs') staticTabs: TaskListComponent;
  private sub: any;
  assignedTo;
  droppedItems;
  comments;
  taskobject;
  status;
  userName = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).username;
  constructor(
    private toastr: ToastrService,
    private commonservice: CommonService,
    private workflowCycleServices: WorkflowCycleService

  ) { }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.droppedItems = this.task.data;
    this.taskobject = this.task.taskInfo;
    this.status = this.task.status;
    if (this.task.userName === undefined) {
      this.assignedTo = 'Workflow completes on approval';

    } else {
      this.assignedTo = this.task.userName.username;
    }

  }
  ngOnInit() {
    this.droppedItems = this.task.data;
    this.assignedTo = this.task.userName.username;
    this.taskobject = this.task.taskInfo;
    this.status = this.task.status;
  }
  // tslint:disable-next-line:variable-name
  updateWorkFlow(_object) {
    let formIds = Object.keys(_object);
    let formData = {};
    let image;
    let url;
    const timeZoneOffset = new Date().getTimezoneOffset();
    formIds.forEach(id => {
      let index = this.droppedItems.findIndex(widget => widget.id == id);
      formData[this.droppedItems[index].label] = _object[id];
      if (typeof _object[id] == 'object') {
        image = _object[id];
      }
    })
    if(this.task.recordlevel == 1){
        url =  Globals.urls.updateRecordReview;
    }else{
       url = Globals.urls.updateWorkflowcycle;
    }
    let assignedByValue;
    if (this.taskobject.workflowAssignedBy) {
      assignedByValue = {};
    } else {
      assignedByValue = this.taskobject.workflowAssignedBy;
    }

    const body = {
      status: this.status,
      level: this.taskobject.workAssignmentLevel,
      workFlow: this.taskobject.workflowName,
      formFields: {
        assignedBy: this.userName,
        assignedTo:this.task.userName,
        formId: this.taskobject.formId
      },
      userInfo: this.userName,
      taskId: this.taskobject._id,
      recordId:this.taskobject.recordId,
      formData: formData
    };
    body['timeZoneOffset'] = timeZoneOffset;

    //let imagData = _object
    const formdata = new FormData();
    formdata.append('img', image);
    formdata.append('data', JSON.stringify(body));
    this.workflowCycleServices.acceptandrejectTask(url, formdata).subscribe(
      (res: any) => {
        switch (res.status) {
          case 200:
            this.toastr.success(res.message);
           
            if(this.task.recordlevel == 1){
              this.commonservice.formEdit.next(res.record);
            }else{
              this.commonservice.search.next({ search: '' });
              this.commonservice.approvalsCount.next(true);
            }
            this.closeSideBarView();
            break;
          case 204:
            this.toastr.info(res.message);
            break;
          default:
            this.toastr.error(res.message);
        }
      });
  }
  closeSideBarView() {
    this.closeSideBar.emit();
  }

}
