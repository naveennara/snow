import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Globals from '../../../globals';
import { DepartmentsService } from '../departments.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit,OnDestroy  {
  imageSrc = Globals.noDataFound;
  departmentList: any[];
  total_count: number;
  limit: number;
  pageNumber = 1;
  search: string;
  page: string;
  deptKeys:any;
  subscriptions: Subscription[]=[];
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  icons = Globals.svgIcons.SecurityIconGrey;
  constructor(private services: DepartmentsService,private toastr: ToastrService, private commonservice:CommonService) {  this.deptKeys = Globals.allConstants.constantKeys;}
  getDepartments(newPageNumber) {
   this.commonservice.showCreate.next(true);
   if (this.search === undefined || this.search === '') {
    this.search = null;
  }
   const url = Globals.urls.getDepartments + '/' + this.search +  '/' +this.loginDetails.type + '/' + Globals.itemsPerPage + '/' + newPageNumber;
   this.services.getDepartments(url).subscribe(
    (res: any) => {
        if (res) {
          switch (res.status) {
            case 200:
            this.departmentList = res.data.docs;
            this.total_count = res.data.total;
            this.limit = res.data.limit;
            break;
            case 204:
            this.departmentList =[];
          }
        } else {
          this.toastr.info(res.data.message);
        }
    }
    );
  }
  editDepartment(department: Object){
    this.commonservice.editActivated.next(true);
    this.services.editUrl(department);
  }
  removeAdmins(department: Object){
    this.commonservice.editActivated.next('Disassociation');
    this.services.removeAdminsUrl(department);
  }
  
  
  ngOnInit() {
    this.getDepartments(1);
    let search = this.commonservice.search.subscribe(
      (data: any) => {
        this.search = data.search;
        this.page = data.page;
        this.getDepartments(1);
      }
    );
    this.subscriptions.push(search);
  }
  onDeleteItem(message: String): void {
    if(message === '1') {
      this .getDepartments(1);
    }
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe()) 
   }
}
