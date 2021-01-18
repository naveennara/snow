import { Component, OnInit, Input } from '@angular/core';
import {CategoriesService} from '../categories.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list-view',
  templateUrl: './category-list-view.component.html',
  styleUrls: ['./category-list-view.component.css'],
  providers: [CategoriesService]
})

export class CategoryListViewComponent implements OnInit {
  categoriesList: any[];
  imageSrc = Globals.noDataFound;
  search: string;
  page: string;
  limit: number;
  pageNumber: number = 1;
  totalCount: number;
  showButtons = true;
  accountId;
  categoryKeys = Globals.allConstants.constantKeys; 
  subscriptions: Subscription[]=[];
  constructor(private service: CategoriesService, private commonservice: CommonService) { }
  ngOnInit() {
    this.getListOfCategory(1, 'All');
    let search = this.commonservice.search.subscribe(
      (data: any) => {
        this.search = data.search;
        this.page = data.page;
        this.getListOfCategory(1, 'All');
      }
    );
    this.subscriptions.push(search);
    if(JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).privilege[Globals.Privileges['category']] == 0){
      this.commonservice.hideCreate.next(true);
      this.showButtons = false; 
    }
  }

  getListOfCategory(newPageNumber, selectedValue) {
    this.commonservice.showCreate.next(true);
    const globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    let dept: any;
    if (globalInfo.type === 0) {
      dept = globalInfo.username;
    } else {
      dept = globalInfo.accounts[0]._id;
    }
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    if (globalInfo.type === 1) {
      var url = Globals.urls.getCategoriesByView + '/' + this.search + '/' + dept + '/' + globalInfo.type + '/' + Globals.itemsPerPage + '/' + newPageNumber;
    } else {
      var url = Globals.urls.getCategoriesByView + '/' + this.search + '/All/' + globalInfo.type + '/' + Globals.itemsPerPage + '/' + newPageNumber;
    }
    this.service.getCategories(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.categoriesList = res.data.docs;
          this.totalCount = res.data.total;
          this.limit = res.data.limit;
        } else {
          this.categoriesList = [];
        }
      }
    );
  }

  editCategory(req: any) {
    this.commonservice.editActivated.next(true);
    this.service.editCategory(req);
  }

  onDeleteItem(message: string): void {
      this.getListOfCategory(1, 'All');
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
  }
}
