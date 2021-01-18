import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { TemplatesService } from '../templates.service';
import * as Globals from '../../../globals';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { WindowRef } from '../../../sharing/sharing-module/WindowRef';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.css']
})

export class TemplatesListComponent implements OnInit {

  isCollapsed = true;
  Imgsrc = Globals.noDataFound;
  formsList: any;
  total_count: number;
  selectedRow: number;
  selectedindex: number;
  isOPen: false;
  pageNumber = 1;
  limit: number;
  search: string;
  page: string;
  workflowDirectionalIcons = Globals.svgIcons;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  finalData = {};
  categories: any;
  showme = false;
  searchPagination = false;
  recordsIcons = Globals.svgIcons;
  templateType: string;
  filtersList: any[];
  widgets = [];
  ispreview = '';
  formInfo = [];
  categoriesLimit = 5;
  categoryPageNumber = 1;
  totalCategories;
  myInnerHeight: any;
  myInnerComponentHeight: any;
  clickedItem = false;
  showButtons = true;
  templateKeys;
  subscriptions: Subscription[]=[];
  constructor(
    private commonservice: CommonService,
    private services: TemplatesService,
    public ngxSmartModalService: NgxSmartModalService,
    private winRef: WindowRef
  ) {
    this.myInnerHeight = winRef.nativeWindow.innerHeight;
    this.myInnerComponentHeight = winRef.nativeWindow.innerHeight - 5;
    this.templateKeys = Globals.allConstants.constantKeys;
  }

  ngOnInit() {
    this.commonservice.showCreate.next(true);
    this.filtersList = ['All', 'Public', 'Private'];
    this.services.formData = [];
    this.services.formTemplate = '';
    this.services.skeletonchanges = [];
    this.services.Modifiedwidgets = [];
    this.services.formSkeleton = [];
    this.templateType = 'All';
    this.getTemplates(1);
    let search = this.commonservice.search.subscribe((data: any) => {
      this.search = data.search;
      this.page = data.page;
      this.getTemplates(1);
    });
    this.subscriptions.push(search);
    // if(this.loginDetails.privileg[Globals.Privileges['templates']] == 0){
    //   this.commonservice.hideCreate.next(true);
    //   this.showButtons = false; 
    // }
  }


  filterTemplates(filterType, index) {
    this.selectedRow = index;
    this.templateType = filterType;
    this.getTemplates(1);
  }



  toggleAccordion(index) {
    this.selectedindex = index;
    this.clickedItem = !this.clickedItem;
  }

  previewForm(form) {
    const url = Globals.urls.getform + '/' + form._id;
    this.services.editTemplate(url).subscribe(
      (res: any) => {
        this.ngxSmartModalService.getModal('previewTemplate').open();
        this.widgets = res.data.formSkeleton;
        this.formInfo = res.data.formData;
        this.ispreview = 'preview';
      });
  }
  getTemplates(newPageNumber) {
    // this.commonservice.showCreate.next(true);
    let url: string;
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    if (this.page === undefined) {
      this.page = 'templates';
    }

    if (this.loginDetails.type === 0) {
      url =
      Globals.urls.getformszlists + '/' + this.page +
      '/' + this.search +
      '/' + 'All' +
      '/' + this.loginDetails.type +
      '/' + this.loginDetails._id +
      '/' + this.templateType +
      '/' + Globals.itemsPerPage +
      '/' + newPageNumber;
    } else {
      url =
      Globals.urls.getformszlists + '/' + this.page +
      '/' + this.search +
      '/' + this.loginDetails.accounts[0]._id +
      '/' + this.loginDetails.type +
      '/' + this.loginDetails._id +
      '/' + this.templateType +
      '/' + Globals.itemsPerPage +
      '/' + newPageNumber;
    }

    this.services.getFormsList(url).subscribe((res: any) => {
      if (res) {
        if (res.status === 200) {
          this.formsList = res.data.docs;
          this.total_count = res.data.total;
          this.limit = res.data.limit;
          this.pageNumber = res.data.page;
        } else {
          this.formsList = [];
        }
      } else {
      }
    });
  }
  sort() {
    this.showme = true;
    this.commonservice.configSettings.next('hideTemplatesSearch');
    let j = 0;
    let name = 'Others';
    this.finalData = {};
    this.formsList.map(obj => {
      const catNames = obj.formzCategory;
      let i = 0;
      catNames.forEach(obj1 => {
        if (catNames[i].name !== undefined) {
          name = catNames[i].name;
        }
        let valueArray = this.finalData[name];
        if (valueArray === undefined) {
          valueArray = new Array();
        }
        valueArray.push(this.formsList[j]);
        this.finalData[name] = valueArray;
        i++;
      });
      j++;
    });
    this.categories = Object.keys(this.finalData);
    this.totalCategories = this.categories.length;
  }

  showAllForms() {
    this.showme = false;
    this.commonservice.configSettings.next('showTemplatesSearch');
  }

  editTemplate(template) {
    this.services.editUrl(template);
  }

  importTemplate(template) {
    this.commonservice.editActivated.next('Import template as form');
    this.services.importTemplate(template);
  }

  onDeleteItem(message: any): void {
    this.getTemplates(1);
  }
  getFormType(formType: any) {
    switch (formType) {
      case 'Public':
        return '3px solid #6861ce';
      case 'Private':
        return '3px solid #ffad46';
      case 'default':
        return '3px solid #eeeee';
    }
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
  }
}

