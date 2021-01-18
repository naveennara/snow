import { Component, ViewChild, OnInit,Input ,ChangeDetectionStrategy, OnChanges} from '@angular/core';
import { Constants } from  '../records-constants';
import * as Globals from '../../../globals';
import { RecordsService } from '../get-records/records.service';
import { SharedRecordsService } from '../../shared-records/shared-records.service'
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WindowRef } from '../../../sharing/sharing-module/WindowRef';
import { Location } from '@angular/common';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-get-records',
  templateUrl: './get-records.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./get-records.component.css']
})
export class GetRecordsComponent implements OnInit {
 // @ViewChild(SharedRecordsComponent) child !: SharedRecordsComponent;
  myInnerHeight: any;
  myInnerComponentHeight: any;
  taskStatus: any;
  constructor(
    private services: RecordsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private winRef: WindowRef,
    private router: Router,
    private location: Location,
    private commonservice: CommonService,
    private SharedRecordsService:SharedRecordsService,
  ) { 
    this.myInnerHeight = winRef.nativeWindow.innerHeight;
    this.myInnerComponentHeight = winRef.nativeWindow.innerHeight - 5;
    this.formkeys = Globals.allConstants.constantKeys;

  }
  @Input() taskInfo;
  isCollapsed = true;
  submitted = false;
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  formkeys: any;
  getData: FormGroup;
  usersList: any[];
  requestData: any;
  url: string;
  dropdownSettings: any;
  dropdownSettings1: any;
  dropdownSettings2:any;
  taskId;
  formId;
  formName;
  taskName;
  showFilter = false;
  statusFilters = [
    { _id: 'all', name: 'All'},
    { _id: 1, name: 'Submitted'},
    { _id: 3, name: 'Reassigned'}
  ];
  formsList = [];
  limit = 500;
  dateFormat  = Globals.dateFormats;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  ngOnInit() {
    this.dropdownSettings = this.services.dropdownSettings3;
    this.dropdownSettings1 = this.services.dropdownSettings;
    this.dropdownSettings2 = this.services.dropdownSettings1;
    this.getData = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      user: [''],
      form:[''],
    });
    if(this.loginDetails.type == 1 || this.loginDetails.type == 3){
      
      this.getData.get('user').setValidators([Validators.required]);
      this.getData.get('user').updateValueAndValidity();
    }
    const timeZoneOffset = new Date().getTimezoneOffset();
    this.endMinDate = new Date();
    this.endMaxDate = new Date();
    this.startMaxDate = new Date();
    this.route.params.subscribe(params => {
      this.url = Globals.urls.getRecords;
      if(params['formId']){
        this.formId = params['formId'];
        this.formName = params['formName']; 
        this.showFilter = true;
        //this.getData.get('form').setValidators([null]);
        if(this.loginDetails.type == 1 || this.loginDetails.type == 3){
          this.getUsers();
        }
        let data = {}
        data['formId'] = this.formId;
        data['formName'] = this.formName ;
        data['user'] = 'All';
        data['status'] = 'all';
        data['placeOfRecord'] = 'Forms'; 
        data['workflowLevel'] = 1;
        data[this.formkeys['toDate']] = new Date(new Date().setHours(0, 0, 0, 0));
        data[this.formkeys['fromDate']] = new Date(new Date().setHours(0, 0, 0, 0));
        this.SharedRecordsService.isPendingRecords = false;
        if(this.loginDetails.type == 5 || this.loginDetails.type == 4){
          data['loginId'] = this.loginDetails._id;
        }
        data['limit']= this.limit;
        data['skipCount'] = 0;
        data['timeZoneOffset'] = timeZoneOffset;
        this.requestData = data;
      }
     else if(params['taskId']){
      this.taskId = params['taskId'];
      this.taskName = params['taskName']; 
      this.taskStatus = params['taskStatus'];
      this.dropdownSettings =  this.services.dropdownSettings2;
      if(this.SharedRecordsService.taskData){
        this.taskInfo = this.SharedRecordsService.taskData;
      }else{
        this.taskInfo =  JSON.parse(sessionStorage.getItem('taskData'));
      }
      let data = {}
      this.showFilter = false;
      data['taskId'] = params['taskId'];
      data['taskName'] =  params['taskName'];
      data['taskStatus'] =  params['taskStatus'];
      data['user'] = this.taskInfo.data.user;
      data['formId'] = this.taskInfo.data.formId;
      data['formName'] =this.taskInfo.data.formName;
      data['status'] = this.taskInfo.status; 
      data['total_count'] = this.taskInfo.total_count;
      data['limit']= this.limit;
      data['skipCount'] = 0;
      data['assignmentId'] = this.taskInfo.data._id;
      data['name'] = this.taskInfo.data.name;
      data['workflowLevel'] = this.taskInfo.workflowLevel;
      data['workFlowAssignedTo'] = this.taskInfo.data.workFlowAssignedTo;
      data['taskAccountId'] = this.taskInfo.data.taskAccountId;
      if(this.router.url.includes('projectTasks')){
        data['placeOfRecord'] = 'Projects';
      }else{
        data['placeOfRecord'] = 'Tasks';
      }
      if(this.taskInfo.workflowLevel){
        if(this.loginDetails.type == 5 || this.loginDetails.type == 4){
          data['loginId'] = this.loginDetails._id;
        }
      }
     
      data['timeZoneOffset'] = timeZoneOffset;
      this.requestData = data;
      // this.getUsersForms();
      // this.getData.get('form').setValidators([Validators.required]);
     }
    });
    
  }
 
  get f() { return this.getData.controls; }

  cancel(){
    this.location.back();
    
    if(this.taskInfo && this.taskInfo.status == 0){
      this.commonservice.updateBreadCrumbOnBack.next({breadcrumbText: 'Pending Records'});

    }else{
      this.commonservice.updateBreadCrumbOnBack.next({breadcrumbText: 'Submitted Records'});
    }
    sessionStorage.removeItem('taskData');
    //this.router.navigate(['mainLayout/tasks/workAssignmentList',this.taskId]);
  }
  refresh(){
    const timeZoneOffset = new Date().getTimezoneOffset();
    if(this.formId){
      // this.formId = params['formId'];
      // this.formName = params['formName']; 
      this.showFilter = true;
      //this.getData.get('form').setValidators([null]);
      if(this.loginDetails.type == 1 || this.loginDetails.type == 3){
        this.getUsers();
      }
      let data = {}
      data['formId'] = this.formId;
      data['formName'] = this.formName;
      data['status'] = 'all';
      data['placeOfRecord'] = 'Forms'; 
      data['workflowLevel'] = 1;
      if(this.submitted ){
        Object.assign(data,this.getData.value);
        if(this.loginDetails.type == 1 || this.loginDetails.type == 3){
          data['user'] = data['user'].map(a => a._id);
        }else{
          data['user'] = 'All';
        }
      }else{
        data[this.formkeys['toDate']] = new Date(new Date().setHours(0, 0, 0, 0));
        data[this.formkeys['fromDate']] = new Date(new Date().setHours(0, 0, 0, 0));
        data['user'] = 'All';
      }
      this.SharedRecordsService.isPendingRecords = false;
      if(this.loginDetails.type == 5 || this.loginDetails.type == 4){
        data['loginId'] = this.loginDetails._id;
      }
      data['limit']= this.limit;
      data['skipCount'] = 0;
      data['timeZoneOffset'] = timeZoneOffset;
      this.requestData = data;
    }
   else if( this.taskId){
    // this.taskId = params['taskId'];
    // this.taskName = params['taskName']; 
    this.dropdownSettings =  this.services.dropdownSettings2;
    if(this.SharedRecordsService.taskData){
      this.taskInfo = this.SharedRecordsService.taskData;
    }else{
      this.taskInfo =  JSON.parse(sessionStorage.getItem('taskData'));
    }
    let data = {}
    this.showFilter = false;
    data['taskId'] = this.taskId;
    data['taskName'] =  this.taskName;
    data['taskStatus'] =  this.taskStatus;
    data['user'] = this.taskInfo.data.user;
    data['formId'] = this.taskInfo.data.formId;
    data['formName'] =this.taskInfo.data.formName;
    data['status'] = this.taskInfo.status; 
    data['total_count'] = this.taskInfo.total_count;
    data['limit']= this.limit;
    data['skipCount'] = 0;
    data['assignmentId'] = this.taskInfo.data._id;
    data['name'] = this.taskInfo.data.name;
    data['workflowLevel'] = this.taskInfo.workflowLevel;
    data['workFlowAssignedTo'] = this.taskInfo.data.workFlowAssignedTo;
    data['taskAccountId'] = this.taskInfo.data.taskAccountId;
    if(this.router.url.includes('projectTasks')){
      data['placeOfRecord'] = 'Projects';
    }else{
      data['placeOfRecord'] = 'Tasks';
    }
    if(this.taskInfo.workflowLevel){
      if(this.loginDetails.type == 5 || this.loginDetails.type == 4){
        data['loginId'] = this.loginDetails._id;
      }
    }
   
    data['timeZoneOffset'] = timeZoneOffset;
    this.requestData = data;
    // this.getUsersForms();
    // this.getData.get('form').setValidators([Validators.required]);
   }
  }
 getUsers(){
  const url = Globals.urls.getUsersList + '/' + this.loginDetails.accounts[0]._id;
  this.services.getUsers(url).subscribe(
    (res: any) => {
        if (res) {
          if (res.status === 200) {
            res.data.unshift({username:'Anonymous',_id:'Anonymous'});
            this.usersList = res.data;
          } else if (res.status === 204) {
            this.usersList = [];
          }
        } else {
          this.usersList = [];
        }
      }
    );
 }
 getUsersForms(){
  const url = Globals.urls.getUsersAndFormsAssinegdToTask + '/' + this.taskId;
  this.services.getUsers(url).subscribe(
    (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.usersList = res.data.users;
            this.usersList.unshift({userName: 'All', userId: 'All'});
            this.formsList = res.data.forms;
          } else if (res.status === 204) {
            this.usersList = [];
            this.formsList = [];
          }
        } else {
          this.usersList = [];
          this.formsList = [];
        }
      }
    );
 }
  bsValueChange(value) {
    if ( value !== null ) {
      this.endMinDate.setDate(value.getDate());
      this.endMinDate.setMonth(value.getMonth());
      this.endMinDate.setFullYear(value.getFullYear());
    }
  }
  endValueChange(value) {
    if ( value !== null ) {
      this.startMaxDate = new Date();
      this.startMaxDate.setDate(value.getDate());
      this.startMaxDate.setMonth(value.getMonth());
      this.startMaxDate.setFullYear(value.getFullYear());
    }
  }
  getRecords(){
    const timeZoneOffset = new Date().getTimezoneOffset();
    this.submitted = true;
    if (this.getData.invalid) {
      return;
    }else if(this.getData.valid){
      this.isCollapsed = !this.isCollapsed;
    this.url = Globals.urls.getRecords;
    let data = Object.assign({},this.getData.value);
    if(this.formId){
      data['formId'] = this.formId;
      data['formName'] = this.formName ;
      if(this.loginDetails.type == 1 || this.loginDetails.type == 3){
        data['user'] = data['user'].map(a => a._id);
      }else{
        data['user'] = 'All';
      }
      data['status'] = 'all';
      data['placeOfRecord'] = 'Forms'; 
      data['workflowLevel'] = 1;
      this.SharedRecordsService.isPendingRecords = false;
    }else if(this.taskId){
      data['taskId'] = this.taskId;
      data['user'] = data['user'][0]; 
      data['formId'] = data.form[0].formId;
      data['formName'] = data.form[0].formName;
      data['status'] = 'all'; 
    } 
   // if( data['workflowLevel'] == 1){
        if(this.loginDetails.type == 5 || this.loginDetails.type == 4){
          data['loginId'] = this.loginDetails._id;
        }
     // }
    data['limit']= this.limit;
    data['skipCount'] = 0;
    data['timeZoneOffset'] = timeZoneOffset;
    // this.child.requestData = data;
    // this.child.url = Globals.urls.getRecords;
    // this.child.onGrid();
    this.requestData = data;
    }
  }
}
