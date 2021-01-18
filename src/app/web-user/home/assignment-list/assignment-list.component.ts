import { webUserConstants } from './../../webuser-constant';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { RestAPICallsService } from '../../rest-apicalls.service';
import { environment } from '../../../../environments/environment';
import { objcetKeyConstants } from '../../object-key-constatnts';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-assignment-list',
  templateUrl: './assignment-list.component.html',
  styleUrls: ['./assignment-list.component.css'],
})
export class AssignmentListComponent implements OnInit {
  constants = webUserConstants.constantKeys;
  searchBy: string = null;
  limit = webUserConstants.pageLimit;
  offset = 1;
  taskListKeys = objcetKeyConstants.taskListKeys;
  modalRef: BsModalRef;
  // strat
  searchFlag = false;
  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  totalRecords: number;
  direction = '';
  modalOpen = false;
  modalconfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-sm'
  };
  isIntialRequestInProcess: boolean;
  intialRequestStatus: number;
  fillterBy = null;
  filtersList: any[] = [{name: 'All', value: null}, {name: 'New', value: 'Assigned'}, {name: 'Re-assigned', value: 'Reassigned'}];
  @ViewChild('restApiRes') restApiRes: ElementRef;
  // end
  constructor(public restAPICallsService: RestAPICallsService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public toastr: ToastrService,
              private modalService: BsModalService,

  ) {

   }
  assignmentList = [];
  slectedAssigmnet: any;
  ngOnInit() {

    this.getAssigmnetlist(this.fillterBy);

  }
  getAssignmentsFillter(filterType) {
    this.offset = 1;
    this.assignmentList = [];
    this.fillterBy = filterType;
    this.getAssigmnetlist(filterType);
  }
  getType(type: any) {
    switch (type) {
      case 'assigned':
        return '3px solid #5CB85C';
      case 'reassigned':
        return '3px solid #D9534F';
      case 'default':
        return '3px solid #eeeee';
    }
  }

  search(searchInput) {
    if (searchInput.search === undefined || searchInput.search === '') {
      this.searchBy = null;
    } else {
      this.searchBy = searchInput.search;
    }
    this.searchFlag = true;
    this.getAssigmnetlist(this.fillterBy);
  }
  gotoWorkOrders(assignmnet) {

    this.router.navigate(['webuser/assignments/workorderslist',
    assignmnet[this.taskListKeys.assignmentId],
    assignmnet[this.taskListKeys.formId],
    assignmnet[this.taskListKeys.taskId],
    webUserConstants.actionPageForAssignmnets]);
    
  //   this.router.navigate(['webuser/assignments/workorders',
  //   assignmnet[this.taskListKeys.formId],
  //   assignmnet[this.taskListKeys.assignmentId],
  //   assignmnet[this.taskListKeys.taskId],
  //   webUserConstants.actionPageForAssignmnets
  // ]);
  }

  getAssignmentListOnScrolldown() {
    this.offset++;
    this.searchFlag = false;
    this.getAssigmnetlist(this.fillterBy);
  }

  getAssigmnetlist(filterByType) {
    const loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;

    const url = webUserConstants.apis.assignmentsList + '/' + filterByType + '/' + this.searchBy + '/' + loginDetails._id
      + '/' + this.limit + '/' + this.offset;
    this.getAssignmentListProcess(url);
  }

  getAssignmentListProcess(url) {
    this.isIntialRequestInProcess = true;
    // intialRequestStatus = 3 means api call getting response,
    // intialRequestStatus = 2 means api call not tintiated or sevre side know issue,
    // intialRequestStatus = 1 gettting response from server but we have found 500 status code in this ,
    this.restAPICallsService.getAssignments(url).subscribe((res) => {
     
      this.isIntialRequestInProcess = false;
      if (res[webUserConstants.standardKeys.status] === 200) {
        const response = res[webUserConstants.standardKeys.data];
        this.totalRecords = response.total;
        if (this.searchFlag) {
          this.assignmentList = response.docs;
        } else {
           this.assignmentList = this.assignmentList.concat(response.docs);
        }
        this.intialRequestStatus = 3;
      } else if (res[webUserConstants.standardKeys.status] === 204) {
          this.intialRequestStatus = 3;
          if (this.searchFlag) {
            this.assignmentList = [];
          }
          // this.assignmentList = [];
          this.toastr.success(webUserConstants.workAssigmnetsConstants.noWorkAssignmentstoLaod);
      } else if (res[webUserConstants.standardKeys.status] === 500) {
       // this is for, we are able to reach the server but internal problem  occured
        this.intialRequestStatus = 1;
      }

    }, (error) => {
      this.isIntialRequestInProcess = false;
      // this.modalRef = this.modalService.show(this.restApiRes);
      // this is for, we are unable to reach the server
      this.intialRequestStatus = 2;
    });
  }

  gotoHistoryView(assignmnet) {
    this.router.navigate(['webuser/assignments/history',
    assignmnet[this.taskListKeys.assignmentId] ,
    'tasks']);

  }

  showInfo(assignmnet, infoModel) {
    this.modalRef = this.modalService.show(infoModel, this.modalconfig);
    this.slectedAssigmnet = assignmnet;
  }

  gotoFormFill(assignmnet) {
    this.router.navigate(['webuser/assignments/workorders/record',
    assignmnet[this.taskListKeys.formId],
    assignmnet[this.taskListKeys.assignmentId],
    assignmnet[this.taskListKeys.taskId],
    webUserConstants.nullString,
    webUserConstants.formFillActionType,
    webUserConstants.actionPageForAssignmnets,
    webUserConstants.nullString

   ]);
  }

  gotoRejectedWorkorders(assignmnet) {
    this.router.navigate(['webuser/assignments/workorderslist',
    assignmnet[this.taskListKeys.assignmentId],
    assignmnet[this.taskListKeys.formId],
    assignmnet[this.taskListKeys.taskId],
    webUserConstants.actionPageForAssignmnets]);

  }

  tryAginForGetResssign() {
    const loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;
    const url = webUserConstants.apis.assignmentsList + '/11' + this.fillterBy + '/' + this.searchBy + '/' + loginDetails._id
      + '/' + this.limit + '/' + this.offset;
    this.getAssignmentListProcess(url);
  }


}
