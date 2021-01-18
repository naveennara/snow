import { Component, OnInit, OnDestroy, HostListener, EventEmitter, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Globals from '../../../globals';
import { AdministratorServiceService } from '../administrator-service.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { adminConstants } from '../administrator-constants';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.css']
})
export class AdministratorListComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  Admins: any[];
  deptAdmins: any[];
  groupAdmins: any[];
  totalCount: number;
  limit: number;
  imageSrc = Globals.imageSrc;
  pageNumber = 1;
  innerHeight: any;
  innerWidth: any;
  noDataImg = Globals.noDataFound;
  imgUrldataAdmin = Globals.urls.Global_imagePath;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  adminKeys: any;
  search: string;
  page: string;
  editTitle;
  accountId;
  deptName = '';
  openModal = false;
  adminTypes;
  filteredAdmins = [];
  tempAdminsList = [];
  paginationHide = false;
  adminFilter;
  adminType;
  selectedRow: number;
  editAdmin:boolean = true;
  resetPasswordUser: any;
  resetSuccessfull: boolean;
  password = Globals.restPassword;
  subscription: Subscription[]=[];
  // @HostListener('window:resize', ['$event'])

  constructor(
    private router: Router,
    public ngxSmartModalService: NgxSmartModalService,
    private services: AdministratorServiceService,
    private commonservice: CommonService,
    private toastr: ToastrService
    ) {
      this.innerHeight = (window.screen.height) + 'px';
      this.innerWidth = (window.screen.width) + 'px';
      this.adminKeys = Globals.allConstants.constantKeys;
    }


  getAdmins(newPageNumber, selectedValue) {
    this.commonservice.showCreate.next(true);
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    this.page = this.adminKeys['admins'];
    let url: string;
    if (this.loginDetails.type === 0) {
      let deptFilter: string;
      if (this.accountId !== undefined) {
        deptFilter = this.accountId;
      } else {
        deptFilter = 'All';
      }
      if (selectedValue === 'All') {
        // tslint:disable-next-line:max-line-length
          url = Globals.urls.getUser + '/' + this.page + '/' + this.search + '/' + deptFilter + '/' + this.loginDetails.type + '/' + this.loginDetails._id + '/' + this.adminFilter + '/' +  Globals.itemsPerPage + '/' + newPageNumber;
      } else {
        url = Globals.urls.getAdmin + '/' + selectedValue + '/' + Globals.itemsPerPage + '/' + newPageNumber;
      }
    } else {
      if (this.loginDetails.accounts.length > 0) {
        // tslint:disable-next-line:max-line-length
        url = Globals.urls.getUser + '/' + this.page + '/' + this.search + '/' + this.loginDetails.accounts[0]._id + '/' +  this.loginDetails.type + '/' + this.loginDetails._id + '/' + this.adminFilter + '/'  + Globals.itemsPerPage + '/' + newPageNumber;

      } else {
        url = Globals.urls.getAdmin + '/' + null + '/' + Globals.itemsPerPage + '/' + newPageNumber;

      }
    }

    this.services.getAdmins(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.Admins = res.data.docs;
            this.tempAdminsList = res.data.docs;
            this.totalCount = res.data.total; // total data count.
            this.limit = res.data.limit; // Total Limit to show
            this.pageNumber = res.data.page;
          } else if (res.status === 204) {
            this.Admins = [];
          }

        } else {
          this.Admins = [];
        }
      }
    );
  }

  setColor(type) {
    switch (type) {
      case 'Group Administrator':
        return '2px solid #31CE36';
      case 'Account Administrator':
        return '2px solid #FFAD46';
      case 'Moderator':
        return '2px solid grey';
    }
  }

  getColor(type) {
    switch (type) {
      case 'Group Administrator':
        return '#31CE36';
      case 'Account Administrator':
        return '#FFAD46';
      case 'Moderator':
        return 'grey';
    }
  }

  editAdministrator(admin: Object) {
    this.services.editUrl(admin);
  }

  onDeleteItem(message: any): void {
    if (message === '1') {
      this.getAdmins(1, 'All');
    }
  }
  checkType(type, index) {
    this.selectedRow = index;
    if (type === 'All') {
      this.adminFilter = 'All';
    } else if (type === 'Moderator') {
      this.adminFilter = 'Mod';
    } else if (type === 'Group Administrator') {
      this.adminFilter = 3;
    } else if (type === 'Account Administrator') {
      this.adminFilter = 1;
    }
    this.adminType = type;
    this.getAdmins(1, 'All');
   
  }
  getAdminType(adminType: any) {
    switch (adminType) {
      case 'Group Administrator':
        return '3px solid #31ce36';
      case 'Account Administrator':
        return '3px solid #ffad46';
      case 'null':
        return '3px solid #97a2b1';
    }
  }
  unlockUser(info){
    let url = Globals.urls.unlockUser + '/' + info._id;
    this.services.unlock(url,{}).subscribe(
      (res:any) => {
          if(res.status == 200){
            let index = this.Admins.findIndex(obj=>obj._id ==  info._id);
            this.Admins[index].isAccountLocked = false;
            this.toastr.success(res.message);
         //  let index = this.tableData.find()
          }
          else{
              //swal(res.data.message);
          }
      }
    );
  }

  errorHandler(event: any) {
    event.target.src = this.imageSrc;
  }

  ngOnInit() {
    if (this.loginDetails.type === 0) {
      this.adminTypes = ['All', 'Moderator', 'Group Administrator', 'Account Administrator'];
    } else {
      this.adminTypes = ['All', 'Moderator', 'Group Administrator'];
    }
    let filterbyDept = this.commonservice.callGetForms.subscribe(
      (res: any) => {
        if (res !== undefined) {
          this.deptName = res.name;
          this.accountId = res._id;
          this.getAdmins(1, 'All');
        }
      }
    );
    this.getAdmins(1, 'All');
    if (this.loginDetails.type === 1) {
      this.editTitle = 'Preview';
    } else {
      this.editTitle = 'Edit';
    }
    let search = this.commonservice.search.subscribe(
      (data: any) => {
        this.search = data.search;
        this.getAdmins(1, 'All');
      }
    );
    this.subscription.push(filterbyDept);
    this.subscription.push(search);
    if(this.loginDetails.privilege[Globals.Privileges['admins']] == 0){
      this.editAdmin = false; 
    }
  }
  deleteAdministrator1(adminId) {
    this.services.adminId = adminId;
    this.commonservice.delete.next(true);
  }
  confirmDelete(action:string) {
    if(action == 'Yes'){
      const url: string = Globals.urls.deleteAdmin + '/' +  this.services.adminId;
      this.services.deleteAdministrator(url).subscribe(
      (res: any) => {
        if ( res.status === 200) {
          this.toastr.success(res.message);
          this.notifyParentOnUpdate.emit('1');
          this.getAdmins(1, 'All');
        } else {
          this.toastr.error(res.message);
          this.notifyParentOnUpdate.emit('0');
        }
      });
    }   
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
  ngOnDestroy(){
    this.subscription.forEach((subscription) => subscription.unsubscribe())  

  }

}
