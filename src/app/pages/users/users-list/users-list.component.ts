import { Component, OnInit, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import * as Globals from '../../../globals';
import { UsersService } from '../users.service';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import { UserConstants } from '../users-constants';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UsersListComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  usersActivity: FormGroup;
  Users: any[];
  deptAdmins: any[];
  groupAdmins: any[];
  limit: number;
  imageSrc = Globals.imageSrc;
  noDataImg = Globals.noDataFound;
  pageNumber: number = 1;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  imgUrldataUser = Globals.urls.Global_imagePath;
  showButtons = true;
  departmentList:any;
  accounts:any;
  dropdownSettings:object;
  defaultPage = 1;
  activityData:any;
  showActivityTable:boolean=false;
  innerHeight: any;
  innerWidth: any;
  submitted = false;
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  search: string;
  page: string;
  userkeys: any;
  accountId;
  deptName = '';
  openModal = false;
  total_count: number;
  paginationLimit = 10;
  activityLimit = 10;
  activityPageNumber = 1;
  totalValues;
  dateFormat  = Globals.dateFormats;
  resetPasswordUser: any;
  resetSuccessfull: boolean;
  password = Globals.restPassword;
  subscriptions: Subscription[]=[];
  constructor(
              public ngxSmartModalService: NgxSmartModalService,
              private services: UsersService,
              private formBuilder: FormBuilder,
              private commonservice: CommonService,
              private toastr: ToastrService) { this.userkeys = Globals.allConstants.constantKeys; }
// Function Code: U-1
  ngOnInit() {
    this.getUsers(1);
    this.endMinDate = new Date();
    this.endMaxDate = new Date();
    this.startMaxDate = new Date();
    let search = this.commonservice.search.subscribe(
      (data: any) => {
        this.search = data.search;
        this.getUsers(1);
      }
    );
    this.getALLDepartments();
    this.innerHeight = (window.screen.height) + 'px';
    this.innerWidth = (window.screen.width) + 'px';
    this.dropdownSettings = this.services.dropdownSettings;
    this.usersActivity = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      accounts: [[], Validators.required]
  });
    let filterbyDept = this.commonservice.callGetForms.subscribe(
      (res: any) => {
        if (res !== undefined) {
          this.deptName = res.name;
          this.accountId = res._id;
          this.getUsers(1);
        }
      }
    );
    this.subscriptions.push(filterbyDept);
    this.subscriptions.push(search);
    if(this.loginDetails.privilege[Globals.Privileges['users']] == 0){
      this.commonservice.hideCreate.next(true);
      this.showButtons = false; 
    }
  }
  deleteUser(userId) {
    this.services.userId = userId;
    this.commonservice.delete.next(true);
  }
  confirmDelete(action:string) {
    if(action == 'Yes'){
      const url: string = Globals.urls.deleteUser + '/' + this.services.userId;
      this.services.deleteUser(url).subscribe(
      (res: any) => {
        if ( res.status === 200) {
          this.toastr.success(res.message);
          this.getUsers(1);
          this.notifyParentOnUpdate.emit('success');
        } else {
          this.toastr.error(res.message);
          this.notifyParentOnUpdate.emit('Failed');
        }
      });
    }   
  }
  // Function Code: U-3
  getALLDepartments() {
    let url: string;
    url = Globals.urls.getAllListOfDepartments + '/'+null;
    this.services.getDepartments(url).subscribe(
      (res: any) => {
          if (res) {
            if (res.status === 200) {
              res.data.unshift({name: 'All', _id: 'All'});
              this.departmentList = res.data;
            } else if (res.status === 204) {
              this.departmentList = [];
            }
          } else {
            this.departmentList = [];
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
  get f() { return this.usersActivity.controls; }
  // Function Code: U-4
  filterUseractivity(filterData, pageNum, valid) {
    let url: string;
    this.submitted = true;
    this.activityData = [];
    if (valid) {
      if (filterData.startDate !== '' && filterData.endDate !== '') {
        filterData['offset'] = pageNum;
        filterData['limit'] = 12;
        const fromdate = filterData['startDate'];
        if (this.loginDetails.type === 0) {
          if (filterData['accounts'] === 'All') {
            // tslint:disable-next-line:max-line-length
            url = Globals.urls.getAllActivities + '/All' + '/users/' + fromdate + '/' + filterData['endDate'] + '/' + filterData['limit'] + '/' + filterData['offset'];
           } else {
            // tslint:disable-next-line:max-line-length
            url = Globals.urls.getAllActivities + '/' + filterData['accounts']._id + '/users/' + fromdate + '/' + filterData['endDate'] + '/' + filterData['limit'] + '/' + filterData['offset'];
            }
        } else if (this.loginDetails.type === 1) {
           // tslint:disable-next-line:max-line-length
           url = Globals.urls.getAllActivities + '/' + this.loginDetails['accounts'][0]._id + '/users/' + fromdate + '/' + filterData['endDate'] + '/' + filterData['limit'] + '/' + filterData['offset'];
        }
        this.services.getAllActivities(url).subscribe(
          (res: any) => {
            this.showActivityTable = true;
            if (res.status === 200) {
              this.totalValues = res.data.length;
              this.activityData = res.data.docs;
            } else if (res.status === 204) {
              this.toastr.info(res.message);
            }
          });
      }
    } else {
      return;
    }
  }
  errorHandler(event) {
    event.target.src = this.imageSrc;
  }
  // Function Code: U-2
  getUsers(newPageNumber) {
    let url: string;
    this.page = this.userkeys['users'];
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    let deptFilter: string;
    this.commonservice.showCreate.next(true);
    if (this.loginDetails.type === 0) {
        if (this.accountId !== undefined) {
          deptFilter = this.accountId;
        } else {
          deptFilter = 'All';
        }
        // tslint:disable-next-line:max-line-length
        url = Globals.urls.getUser + '/' + this.page + '/' + this.search + '/' + deptFilter + '/' + this.loginDetails.type + '/' + this.loginDetails._id + '/null/' + Globals.itemsPerPage + '/' + newPageNumber;
       } else {
      if (this.loginDetails.accounts.length > 0) {
        if (this.loginDetails.type === 3) {
          if (this.accountId !== undefined) {
            deptFilter = this.accountId;
          } else {
            deptFilter = 'All';
          }
          // tslint:disable-next-line:max-line-length
          url = Globals.urls.getUser + '/' + this.page + '/' + this.search + '/' + deptFilter + '/' +  this.loginDetails.type + '/' + this.loginDetails._id + '/null/'  + Globals.itemsPerPage + '/' + newPageNumber;
        } else {
          // tslint:disable-next-line:max-line-length
          url = Globals.urls.getUser + '/' + this.page + '/' + this.search + '/' + this.loginDetails.accounts[0]._id + '/' +  this.loginDetails.type + '/' + this.loginDetails._id + '/null/'  + Globals.itemsPerPage + '/' + newPageNumber;
        }
      }
    }
    this.services.getUsers(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
              this.Users = res.data.docs;
              this.total_count = res.data.total; // total data count.
              this.paginationLimit = res.data.limit; // Total Limit to show
          } else if (res.status === 204) {
            this.Users = [];
          }
        } else {
          this.toastr.error(res.data.message);
        }
      }
    );

  }
  // Function Code: U-5
  editUser(user) {
    this.services.editUrl(user);
  }
  // Function Code: U-6
  onDeleteItem(message: any): void {
    if (message === this.userkeys['success']) {
      this.getUsers(1);
    }
  }
  unlockUser(info){
    let url = Globals.urls.unlockUser + '/' + info._id;
    this.services.unlock(url,{}).subscribe(
      (res:any) => {
          if(res.status == 200){
            //this.tableData = this.tableData.filter(data => data._id !== info._id);
            let index = this.Users.findIndex(obj=>obj._id ==  info._id);
            this.Users[index].isAccountLocked = false;
            this.toastr.success(res.message);
          }
          else{
              //swal(res.data.message);
          }
      }
    );
  }
  openConfirmation(user){
    this.resetPasswordUser = user;
    this.resetSuccessfull = false;
    this.ngxSmartModalService.getModal('passwordModel').open();

  }
  resetPassword() {
    let url: string;
    url = Globals.urls.resetPassword;
    let data ={userId:this.resetPasswordUser._id};
    this.services.resetPassword(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {       
          this.toastr.success(res.message);
          this.resetSuccessfull = true;
         // this.ngxSmartModalService.getModal('passwordModel').close();

        } else {
          this.toastr.info(res.message);
        }
    });
      
  }
  onSelect(event){
    if(event.heading == 'Activity'){
      this.commonservice.configSettings.next('hideUserSearch');
    }else{
      this.commonservice.configSettings.next('showUserSearch');
    }
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe()) 
  }
  }


