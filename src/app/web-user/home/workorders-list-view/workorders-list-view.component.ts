import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { RestAPICallsService } from '../../rest-apicalls.service';
import { environment } from '../../../../environments/environment';
import { webUserConstants } from '../../webuser-constant';
import { objcetKeyConstants } from '../../object-key-constatnts';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-workorders-list-view',
  templateUrl: './workorders-list-view.component.html',
  styleUrls: ['./workorders-list-view.component.css']
})
export class WorkordersListViewComponent implements OnInit {
  filterBy: any = null;
  searchBy: string;
  limit = webUserConstants.pageLimit;
  offset = 1;
  workOrdersListKeys = objcetKeyConstants.workOrdersList;
  constants = webUserConstants.constantKeys;
  // strat

  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;
  displayKey: any;
  isIntialRequestInProcess: boolean;
  intialRequestStatus: number;
  totalworkOrders: number;
  filtersList: any[] = [{name: 'All', value: null}, {name: 'Assigned', value: 'New'}, {name: 'Re-assigned', value: 'Reassigned'}];
  
  constructor(public restAPICallsService: RestAPICallsService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public toastr: ToastrService,
              private location: Location,

  ) {

   }
  workOrdersList = [];
  breadCumbs;
  ngOnInit() {
    if (this.activatedRoute.snapshot.params.assignmentId && this.activatedRoute.snapshot.params.assignmentId !== 'null') {
      this.breadCumbs = [ {name: 'Assignments', state: 'webuser/assignments'},
                          {name: 'Work Orders', state: ''}];
    } else {
      this.breadCumbs = [ {name: 'Forms', state: 'webuser/assignments/forms'},
      {name: 'Work Orders -reassign', state: ''}];
    }
    this.getRecordsList(this.filterBy);
  }
  back() {
    this.location.back();
  }
  getType(type: any) {
    switch (type) {
      case 0:
        return '3px solid #5CB85C';
      case 1:
        return '3px solid #D9534F';
      case 'default':
        return '3px solid #eeeee';
    }
  }
  getRecordsFillter(filterType) {
    this.offset = 1;
    this.workOrdersList = [];
    this.getRecordsList(filterType);
  }
  getAssignmentListOnScrolldown() {
    this.offset++;
    this.getRecordsList(this.filterBy);
  }

  getRecordsList(filterByType) {
    this.searchBy = null;
    this.filterBy = filterByType;
    const loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;
    const url = webUserConstants.apis.getWorkOrders  + '/'
    + loginDetails._id + '/'
    + this.activatedRoute.snapshot.params.assignmentId + '/' // assignment id
    + this.activatedRoute.snapshot.params.formId + '/' // form Id
    + webUserConstants.nullValue + '/' // searchBy
    + filterByType + '/' // filterBy
    + this.limit + '/'
    + this.offset;
    this.getRecordsListProcess(url);

  }
  getRecordsListProcess(url) {
    this.isIntialRequestInProcess = true;
    this.restAPICallsService.getWorkOrdersList(url).subscribe((res) => {
      // this.assignmentList = response.docs;
      this.isIntialRequestInProcess = false;
      if (res[webUserConstants.standardKeys.status] === 200) {
        const response = res[webUserConstants.standardKeys.data];
        this.totalworkOrders = response.total;
        this.workOrdersList = this.workOrdersList.concat(response.docs);
        this.displayKey = response[this.workOrdersListKeys.displaykey];
        this.intialRequestStatus = 3;
        this.offset++;
      } else if (res[webUserConstants.standardKeys.status] === 204) {
          this.toastr.success(webUserConstants.assignmentsHistoryConstants.noHistoryToLaod);
          this.intialRequestStatus = 3;
      } else if (res[webUserConstants.standardKeys.status] === 500) {
        // this is for, we are able to reach the server but internal problem  occured
         this.intialRequestStatus = 1;
       }

    }, (error) => {
      this.isIntialRequestInProcess = false;
      // this is for, we are unable to reach the server
      this.intialRequestStatus = 2;
    });
  }
  gotoFormView(workorder) {
    this.router.navigate(['webuser/assignments/workorders/record',
    workorder[this.workOrdersListKeys.formId],
    this.activatedRoute.snapshot.params.assignmentId,
    this.activatedRoute.snapshot.params.taskId,
    workorder[this.workOrdersListKeys.recordId],
    webUserConstants.formprepopActionType,
    this.activatedRoute.snapshot.params.actionPage,
    webUserConstants.nullString
  ]);
    // this.router.navigate(['webuser/assignments/workorders', workorder[this.historyRecordsListKeys.formId],
    // workorder[this.historyRecordsListKeys.assignmentId], workorder[this.historyRecordsListKeys.taskId]]);

  }

  tryAginForGetRecords() {
    const loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;
    const url = webUserConstants.apis.getWorkOrders  + '/'
    + loginDetails._id + '/'
    + this.activatedRoute.snapshot.params.assignmentId + '/' // assignment id
    + this.activatedRoute.snapshot.params.formId + '/' // form Id
    + webUserConstants.nullValue + '/' // searchBy
    + webUserConstants.nullValue + '/' // filterBy
    + this.limit + '/'
    + this.offset;
    this.getRecordsListProcess(url);
  }

  goToForm() {
    this.router.navigate(['webuser/assignments/workorders/record',
    this.activatedRoute.snapshot.params.formId,
    this.activatedRoute.snapshot.params.assignmentId,
    this.activatedRoute.snapshot.params.taskId,
    webUserConstants.nullString,
    webUserConstants.formFillActionType,
    this.activatedRoute.snapshot.params.actionPage,
    webUserConstants.nullString
  ]);

  }

}
