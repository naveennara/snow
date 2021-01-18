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
  selector: 'app-assignment-history',
  templateUrl: './assignment-history.component.html',
  styleUrls: ['./assignment-history.component.css']
})
export class AssignmentHistoryComponent implements OnInit {
  filterBy: any;
  searchBy: string;
  limit = webUserConstants.pageLimit;
  offset = 1;
  historyRecordsListKeys = objcetKeyConstants.historyRecordsList;

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
  totalCount: number;
  constructor(public restAPICallsService: RestAPICallsService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public toastr: ToastrService,
              private location: Location,

  ) {

   }
  historyList = [];
  breadCumbs;
  ngOnInit() {
    if (this.activatedRoute.snapshot.params.actionPage === 'tasks') {
      this.breadCumbs = [ {name: 'Assignments', state: 'webuser/assignments'},
      {name: 'History', state: 'webuser/assignments'}];
    } else {
      this.breadCumbs = [ {name: 'Forms', state: 'webuser/assignments/forms'},
      {name: 'History', state: 'webuser/assignments'}];
    }

    this.getHistory();
  }

  getAssignmentListOnScrolldown() {
    this.getHistory();
  }
  back() {
    this.location.back();
  }
  getHistory() {
    this.searchBy = null;
    this.filterBy = null;
    const loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;
    const url = webUserConstants.apis.history  + '/' + this.activatedRoute.snapshot.params.actionPage + '/' + loginDetails._id + '/'
    + this.activatedRoute.snapshot.params.id + '/' + webUserConstants.nullValue + '/' + this.limit + '/' + this.offset;
    this.getHistoryProcess(url);
  }
  getHistoryProcess(url) {

    this.isIntialRequestInProcess = true;
    this.restAPICallsService.getHistory(url).subscribe((res) => {
      // this.assignmentList = response.docs;
      this.isIntialRequestInProcess = false;
      if (res[webUserConstants.standardKeys.status] === 200) {
        const response = res[webUserConstants.standardKeys.data];
        this.historyList = this.historyList.concat(response.docs);
        this.displayKey = response[this.historyRecordsListKeys.displaykey];
        this.intialRequestStatus = 3;
        this.totalCount =  response.total;
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
    workorder[this.historyRecordsListKeys.formId],
    workorder[this.historyRecordsListKeys.assignmentId],
    workorder[this.historyRecordsListKeys.taskId]?workorder[this.historyRecordsListKeys.taskId]:webUserConstants.nullString,
    workorder[this.historyRecordsListKeys.recordId],
    webUserConstants.formViewActionType,
    this.activatedRoute.snapshot.params.actionPage,
    workorder[this.historyRecordsListKeys._id]
  ]);
  }

  tryAginForGetHistory() {
    const loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;
    const url = webUserConstants.apis.history  + '/' + this.activatedRoute.snapshot.params.actionPage + '/' + loginDetails._id + '/'
    + this.activatedRoute.snapshot.params.id + '/' + webUserConstants.nullValue + '/' + this.limit + '/' + this.offset;
    this.getHistoryProcess(url);
  }
}
