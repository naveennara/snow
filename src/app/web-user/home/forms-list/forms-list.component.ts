import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { RestAPICallsService } from '../../rest-apicalls.service';
import { environment } from '../../../../environments/environment';
import { webUserConstants } from '../../webuser-constant';
import { objcetKeyConstants } from '../../object-key-constatnts';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormsListComponent implements OnInit {
  filterBy: any;
  searchBy: string = null;
  limit = webUserConstants.pageLimit;
  offset = 1;
  formsListKeys = objcetKeyConstants.formsListKeys;
  modalRef: BsModalRef;
  // strat
  searchFlag:boolean = false;
  array = [];
  sum = 100;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  direction = '';
  modalOpen = false;
  breadCumbs;
  modalconfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-md'
  };
  isIntialRequestInProcess: boolean;
  intialRequestStatus: number;
  totalCount: number;
  constants = webUserConstants.constantKeys;
  // end
  constructor(public restAPICallsService: RestAPICallsService,
              public router: Router,
              public activatedRoute: ActivatedRoute,
              public toastr: ToastrService,
              private modalService: BsModalService,

  ) {

   }
  formsList = [];
  selectedForm: any;
  ngOnInit() {

    this.getFormslist();
    //this.breadCumbs = [ {name: 'Forms', state: 'webuser/assignments'}];

  }
  search(searchInput){
    if (searchInput.search === undefined || searchInput.search === '') {
      this.searchBy = null;
    }else{
      this.searchBy = searchInput.search;
    }
    this.searchFlag = true;
    this.getFormslist();
  }
  getAssignmentListOnScrolldown() {
    this.offset++;
    this.searchFlag = false;
    this.getFormslist();
  }

  getFormslist() {
    this.filterBy = null;
    const loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;

    const url = webUserConstants.apis.formsList + '/'  + this.searchBy + '/' + loginDetails._id
      + '/' + this.limit + '/' + this.offset;
    this.getFormslistProcess(url);
  }
  getFormslistProcess(url: string ) {
    this.isIntialRequestInProcess = true;
    this.restAPICallsService.getAssignments(url).subscribe((res) => {
      // this.assignmentList = response.docs;
      this.isIntialRequestInProcess = false;
      if (res[webUserConstants.standardKeys.status] === 200) {
        const response = res[webUserConstants.standardKeys.data];
        if(this.searchFlag){
          this.formsList =response.docs;
        }else{
           this.formsList = this.formsList.concat(response.docs);
        }
        this.intialRequestStatus = 3;
        this.totalCount = response.total;
      } else if (res[webUserConstants.standardKeys.status] === 204) {
          this.toastr.success(webUserConstants.workAssigmnetsConstants.noWorkAssignmentstoLaod);
          this.formsList = [];
          this.intialRequestStatus = 3;
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
  gotoHistoryView(form) {
  
    // assigmnet id we have chmage to form id
    this.router.navigate(['webuser/assignments/history', form[this.formsListKeys._id], 'forms']);

  }

  showInfo(form, infoModel) {
    const url = webUserConstants.apis.formInfo + '/'  + form._id;
    this.restAPICallsService.getAssignments(url).subscribe((res) => {
      if (res['status'] === 200) {
        this.modalRef = this.modalService.show(infoModel, this.modalconfig);
        this.selectedForm = res['data'];
      }
    }, (error) => {
      //console.log(error);
    });



  }

  gotoFormFill(form) {
    this.router.navigate(['webuser/assignments/workorders/record',
    form[this.formsListKeys._id],
    // assignmnet[this.taskListKeys.assignmentId],
    // assignmnet[this.taskListKeys.taskId],
    webUserConstants.nullString,
    webUserConstants.nullString,
    webUserConstants.nullString,
    webUserConstants.formFillActionType,
    webUserConstants.actionPageForForms,
    webUserConstants.nullString
   ]);
  }
  gotoWorkOrders(assignmnet) {
    this.router.navigate(['webuser/assignments/workorderslist',
    webUserConstants.nullString,
    assignmnet[this.formsListKeys._id],
    webUserConstants.nullString,
    webUserConstants.actionPageForForms,

  ]);
  }

  tryAginForGetForms() {
    const loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;
    const url = webUserConstants.apis.assignmentsList + '/11' + this.filterBy + '/' + this.searchBy + '/' + loginDetails._id
      + '/' + this.limit + '/' + this.offset;
    this.getFormslistProcess(url);
  }


}
