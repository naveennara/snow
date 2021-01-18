import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { LicenseManagementService } from '../license-management.service';
import * as Globals from '../../../globals';
import { licensesConstansts } from '../license-management-constant';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-license-management-list',
  templateUrl: './license-management-list.component.html',
  styleUrls: ['./license-management-list.component.css']
})
export class LicenseManagementListComponent implements OnInit {
  licenseList: any[];
  Imgsrc = Globals.noDataFound;
  imgIcons = Globals.svgIcons;
  search: string;
  page: string;
  limit: number = 10;
  pageNumber: number = 1;
  showButtons = true;
  isDesc: boolean = false;
  column: string = 'CategoryName';
  direction: number;
  constants = Globals.allConstants.constantKeys;
  subscriptions: Subscription[]=[];
  constructor(private service: LicenseManagementService, private commonservice: CommonService) { }
  ngOnInit() {
    this.getListOfLicense(1, 'All');
    let search = this.commonservice.search.subscribe(
      (data: any) => {
        this.search = data.search;
        this.page = data.page;
        this.getListOfLicense(1, 'All');
      }
    );
    this.subscriptions.push(search);
    if(JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).privilege[Globals.Privileges['licenses']] == 0){
      this.commonservice.hideCreate.next(true);
      this.showButtons = false; 
    }
  }

  getListOfLicense(newPageNumber, selectedValue) {
    this.commonservice.showCreate.next(true);
    let dept: any;
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    let url = Globals.urls.getLicenses + '/' + this.search ;
    this.service.getLicenses(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.licenseList = res.data;
        } else {
          this.licenseList = [];
        }
      }
    );
  }

  editLicense(req: any) {
    this.commonservice.editActivated.next(true);
    this.service.renewLicense = req;
    this.service.editLicense(req);
  }

  onDeleteItem(message: string): void {
      this.getListOfLicense(1, 'All');
  }
  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
  }
}
