

import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, Input, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceManagementServiceService } from '../device-management-service.service';
import * as Globals from '../../../globals';
import { TabsetComponent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-device-management-list',
  templateUrl: './device-management-list.component.html',
  styleUrls: ['./device-management-list.component.css']
})
export class DeviceManagementListComponent implements OnInit {
  selectedRow: number;
  selectedStatus: any;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  activity: FormGroup;
  limit: number;
  submitted = false;
  url;
  fromdate;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  private hideUnauthoisedElement: boolean = false;
  departmentList: any;
  accounts: any;
  dropdownSettings: object;
  defaultPage = 1;
  activityData: any;
  devicesList;
  statusList;
  Counts;
  imageSrc = Globals.imageSrc;
  noDataImg = Globals.noDataFound;
  deviceOptionsList;
  tableActivityFeilds = Globals.allConstants.constantKeys.tableActivityFeilds;
  tableFeilds = Globals.allConstants.constantKeys.tableFeilds;
  deviceStatusList = Globals.allConstants.constantKeys.deviceStatusList;
  Imgsrc = Globals.noDataFound;
  accountId;
  public modalRef: BsModalRef;
  popupMessage;
  id;
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  deviceKeys;
  deptName = '';
  paginationLimit = 10;
  pageNumber = 1;
  total_count: number;

  activityLimit = 10;
  activityPageNumber = 1;
  totalValues;
  tableRows = [];
  tableColumns = [];
  tableSorting = {};
  privilegeEdit = false;
  dateFormat  = Globals.dateFormats;
  search: any;
  subscriptions: Subscription[]=[];

    // sorting: any = {
  //   column: 'Name', //to match the variable of one of the columns
  //   descending: false
  // };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private deviceManegmentServices: DeviceManagementServiceService,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private ngxSmartModalService: NgxSmartModalService

  ) { this.deviceKeys = Globals.allConstants.constantKeys; }


  ngOnInit() {
    this.getDevicesData(1);
    let filterbyDept= this.commonservice.callGetForms.subscribe(
      (res: any) => {
        if (res !== undefined) {
          this.deptName = res.name;
          this.accountId = res._id;
          this.getDevicesData(1);
        }
      }
    );
    let search = this.commonservice.search.subscribe(
      (data: any) => {
        this.search = data.search;
        this.getDevicesData(1);
      }
    );
    this.commonservice.devicesPending.subscribe(
      (data: any) => {
        if(data !==0){
          this.selectedStatus = 'Pending'
          if( this.staticTabs.tabs[0] && this.staticTabs.tabs[0].active != true){
            this.getDevicesData(1);
            this.staticTabs.tabs[0].active = true;
          }
          
        }else{
          this.selectedStatus = 'All';
          this.staticTabs.tabs[0].active = true;
          this.getDevicesData(1);
        }
       
      }
    );
    this.subscriptions.push(filterbyDept);
    this.subscriptions.push(search);
    this.getALLDepartments();
    this.endMinDate = new Date();
    this.endMaxDate = new Date();
    this.startMaxDate = new Date();
    this.dropdownSettings = this.deviceManegmentServices.dropdownSettings;
    this.activity = this.formBuilder.group({
      todate: ['', Validators.required],
      fromdate: ['', Validators.required],
      accounts: [[]],
    });
    if(this.loginDetails.type == 0){
      this.activity.controls['accounts'].setValidators( [Validators.required]);
      this.activity.controls['accounts'].updateValueAndValidity();

    }else{
      this.activity.controls['accounts'].setValidators(null);
      this.activity.controls['accounts'].updateValueAndValidity();               
    }
    if(this.loginDetails.type === 1 && this.loginDetails.privilege[Globals.Privileges['devices']] == 0){
      this.privilegeEdit = true;
      //this.editTaskForm.disable();
    }
  }
  getALLDepartments() {
    const url = Globals.urls.getAllListOfDepartments + '/'+null;
    this.deviceManegmentServices.getDepartments(url).subscribe(
      (res: any) => {
        switch (res.status) {
          case 200:
            res.data.unshift({name: 'All', _id: 'All'});
            this.departmentList = res.data;
            break;
          case 204:
            this.departmentList = [];
            break;
          default:
            this.departmentList = [];
            this.toastr.error(this.deviceKeys['errorMsg']);
        }
      }
    );
  }
  getDevicesData(newPageNumber) {
    this.commonservice.editActivated.next('');
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    if(!this.selectedStatus){
      this.selectedStatus = 'All';
    }
     if(this.deviceManegmentServices.pendingDevices == true){
      this.selectedStatus = 'Pending';
    }
    if (this.loginDetails.type === 0) {
      if (this.accountId !== undefined) {
        this.id = this.accountId;
      } else {
        this.id = this.deviceKeys['all'];
      }
    } else {
      this.id = this.loginDetails['accounts'][0]._id;
    }

    const url = Globals.urls.getDevicelist + '/' + this.id + '/' + this.loginDetails.type + '/' +this.selectedStatus+'/'+ this.search +'/'+ this.paginationLimit + '/' + newPageNumber;
    this.deviceManegmentServices.getDeviceData(url).subscribe(
      (res: any) => {
        switch (res.status) {
          case 200:
            this.devicesList = res.data.docs;
            this.pageNumber = res.data.page;
            this.total_count = res.data.total;
            // this statuslist is for filter by status devices
            this.statusList = res.data;
            this.deviceManegmentServices.pendingDevices = false;
            break;
          case 204:
            this.devicesList = [];
            this.statusList = [];
            this.deviceManegmentServices.pendingDevices = false;
            break;
          default:
            this.toastr.error(this.deviceKeys['errorMsg']);
        }
      });
  }
  onItemSelect(event) {
  }
  onSelectAll(event) {
  }
  errorHandler(event) {
  }
  filterDeviceStatus(status, index) {
    this.selectedRow = index;
    this.selectedStatus = status;
    this.getDevicesData(1);
    // if (status === this.deviceKeys['all']) {
    //   this.devicesList = this.statusList;
    // } else {
    //   const filterStatus = this.statusList.filter(
    //     statusInfo => statusInfo.status === status);
    //   this.devicesList = filterStatus;
    //   this.pageNumber = 1;
    //   this.total_count = filterStatus.length;
    // }
  }
  getDevicesStatus(status) {
    this.deviceOptionsList = [''];
    switch (status) {
      case this.deviceKeys['approved']:
        this.deviceOptionsList = [this.deviceKeys['suspende']];
        this.hideUnauthoisedElement = false;
        break;
      case this.deviceKeys['rejected']:
        this.hideUnauthoisedElement = true;
        break;
      case this.deviceKeys['suspended']:
        this.deviceOptionsList = [this.deviceKeys['revoke']];
        this.hideUnauthoisedElement = false;
        break;
      case this.deviceKeys['revoked']:
        this.deviceOptionsList = [this.deviceKeys['approve'], this.deviceKeys['reject']];
        this.hideUnauthoisedElement = false;
        break;
      case this.deviceKeys['pending']:
        this.deviceOptionsList = [this.deviceKeys['approve'], this.deviceKeys['reject'], this.deviceKeys['unauthorize']];
        this.hideUnauthoisedElement = false;
        break;
      case this.deviceKeys['unauthorized']:
        this.deviceOptionsList = [this.deviceKeys['revoke']];
        this.hideUnauthoisedElement = false;
        break;
      default:
        this.toastr.error = this.deviceKeys['errorMsg'];
    }
  }

  deviceRequest(status, id, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });

    this.popupMessage = 'You want to ' + status + ' Device!';


  }
  updateDeviceStatus(status, id) {
    if (this.loginDetails.type === 0) {
      this.accountId = Globals.allConstants.constantKeys.all;
    } else {
      this.accountId = this.loginDetails['accounts'][0]._id;
    }

    const object = { status: status, accountId: this.accountId };
    const url: string = Globals.urls.updateDeviceStatus + '/' + id;
    this.deviceManegmentServices.updateDeviceStatus(url, object).subscribe(
      (res: any) => {
        switch (res.status) {
          case 200:
            this.getDevicesData(1);
            this.commonservice.approvalsCount.next(true);
            this.toastr.success(res.message);
            break;
          case 204:
            this.toastr.info(res.message);
            break;
          default:
            this.toastr.error(this.deviceKeys['errorMsg']);
        }
      });
    this.modalRef.hide();

  }
  cancelPopup(status) {
    this.toastr.error(this.deviceKeys.deviceMsg + status + this.deviceKeys.actionCancelled);
    this.modalRef.hide();
  }
  onDeleteItem(message: any): void {
    if (message === this.deviceKeys['successMsg']) {
      this.getDevicesData(1);
    }

  }

  filterDeviceactivity(filterData, pageNum, valid) {
    this.submitted = true;
    if (valid) {
      if (filterData) {
        filterData['offset'] = pageNum;
        filterData['limit'] = 12;
        const fromDate = filterData['fromdate'].setHours(0, 0, 0, 0);
        this.fromdate = new Date(fromDate);
      }
      if (this.loginDetails.type === 0) {
        if (filterData.departments_id === 'All') {
          // tslint:disable-next-line:max-line-length
          this.url = Globals.urls.getAllDeviceActivities + '/All' + '/devices' + '/' + this.fromdate + '/' + filterData['todate'] + '/' + filterData['limit'] + '/' + filterData['offset'];
        } else {
          // tslint:disable-next-line:max-line-length
          this.url = Globals.urls.getAllDeviceActivities + '/' + filterData['accounts']._id + '/devices' + '/' + this.fromdate + '/' + filterData['todate'] + '/' + filterData['limit'] + '/' + filterData['offset'];
        }
      } else {
        // tslint:disable-next-line:max-line-length
        this.url = Globals.urls.getAllDeviceActivities + '/' + this.loginDetails['accounts'][0]._id + '/devices' + '/' + this.fromdate + '/' + filterData['todate'] + '/' + filterData['limit'] + '/' + filterData['offset'];

      }
      this.deviceManegmentServices.getAllDeviceActivities(this.url).subscribe(
        (res: any) => {
          switch (res.status) {
            case 200:
              this.activityData = res.data.docs;
              this.totalValues = this.activityData.length; // total data count.
              break;
            case 204:
              this.activityData = [];
              this.toastr.info(res.message);
              break;
            default:
              this.activityData = [];
              this.toastr.error(this.deviceKeys['errorMsg']);
          }
        });
    } else {
      return;
    }
  }
  bsValueChange(value) {
    if (value !== null) {
      this.endMinDate.setDate(value.getDate());
      this.endMinDate.setMonth(value.getMonth());
      this.endMinDate.setFullYear(value.getFullYear());
   }
  }
  endValueChange(value) {
    if (value !== null) {
      this.startMaxDate = new Date();
      this.startMaxDate.setDate(value.getDate());
      this.startMaxDate.setMonth(value.getMonth());
      this.startMaxDate.setFullYear(value.getFullYear());
    }
  }
  get f() { return this.activity.controls; }

  onSelect(event){
    if(event.heading == 'Activity'){
      this.commonservice.configSettings.next('hideDeviceSearch');
    }else{
      this.commonservice.configSettings.next('showDeviceSearch');
    }
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
  }
}

