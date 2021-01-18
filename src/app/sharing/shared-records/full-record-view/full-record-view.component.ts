import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../sharing-module/common.service';
import { SharedRecordsService } from '../shared-records.service';
import * as Globals from '../../../globals';
import { TasksService } from '../../../../../src/app/pages/tasks/tasks.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-full-record-view',
  templateUrl: './full-record-view.component.html',
  styleUrls: ['./full-record-view.component.css']
})
export class FullRecordViewComponent implements OnInit {
  public params: any;
  taskId: any;
  date: Date;
  dateCheck: boolean;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  WF: boolean = false;
  constructor(private services: SharedRecordsService,
    private commonService: CommonService,
     private taskservice: TasksService) { }
  agInit(params: any): void {
    this.params = params;
    if(this.services.userList){
      let username = this.services.userList.filter(obj => obj._id == params.value).map(object => object.username);
        if(username[0]){
          this.params.value = username[0];
        }
    }
    if(params.value == undefined){
      this.params.value = 'Unassigned';
    }
    
    if(this.params.data.workFlowAssignedTo){
      if(this.loginDetails.type != 1 && this.params.data.workFlowAssignedTo._id == this.loginDetails._id){
        this.WF =  true;
       }else{
         this.WF =  false;
       }
    }
    
  }
  checkWorkFlow(){
    if(this.loginDetails.type != 1 && this.params.data.workFlowAssignedTo._id == this.loginDetails._id){
      return true;
    }else{
      return false;
    }
  }
  ngOnchanges(){
    //console.log(this.params)
  }
  showForm(){
    if( this.services.taskData){
      this.taskId = this.services.taskData.data.taskId;
      this.taskservice.getTaskInfo(this.taskId).subscribe((res: any) => {
        const startDate = new Date(res.data.startDate);
        this.date = new Date();
       // this.date >= startDate ||
        if ( this.params.data.status == 0) {
            this.dateCheck = false;
        } else {
            this.dateCheck = true;
        }
        this.services.isDateStarted = this.dateCheck;
        this.services.workFlowLevel = res.data.workflowLevel;
      });
    }
    this.services.recordInfo = this.params.data;
    let formId;
    if(this.params.data.formId){
      formId = this.params.data.formId;
    }else{
      formId = this.services.formId;
    }
    const url = Globals.urls.getform + "/" + formId ;
    this.services.getMedia(url).subscribe(
      (res: any) => {
        if(res.status == 200) {
          this.commonService.formOpen.next({recordInfo:this.params.data,formSkeleton:res.data.formSkeleton,recordEdit:false});
        } else if(res.status == 404) {
          
        } else if(res.status == 500) {
          //swal(CONSTANTS.serverProblem);
        }
      });
  }
  ngOnInit() {
  }

}
