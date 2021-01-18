import { Component, OnInit } from '@angular/core';
import * as Globals from '../../../globals';
import { ProjectServiceService } from '../project-service.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { ProjectConstants } from '../project-constants';
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  projectsList: any;
  limit: number;
  pageNumber = 1;
  totalCount: number;
  noDataImg = Globals.noDataFound;
  innerHeight: any;
  innerWidth: any;
  search: string;
  page: string;
  show = true;
  accountId;
  deptName = '';
  showButtons = true;
  projectKeys: any;
  subscriptions: Subscription[]=[];

  constructor(
    private services: ProjectServiceService,
    private commonservice: CommonService
  ) {
    this.projectKeys = Globals.allConstants.constantKeys;
  }
// Function Code: P-1
  ngOnInit() {
    let filterbyDept = this.commonservice.callGetForms.subscribe(
      (res: any) => {
        if (res !== undefined) {
          this.deptName = res.name;
          this.accountId = res._id;
          this.getProjects(1);
        }
      }
    );
    this.getProjects(1);
    let search = this.commonservice.search.subscribe(
      (data: any) => {
        this.search = data.search;
        this.getProjects(1);
      }
    );
    this.subscriptions.push(filterbyDept);
    this.subscriptions.push(search);
    this.innerHeight = (window.screen.height) + 'px';
    this.innerWidth = (window.screen.width) + 'px';
    if(this.loginDetails.privilege[Globals.Privileges['projects']] == 0){
      this.commonservice.hideCreate.next(true);
      this.showButtons = false; 
    }
  }

  toggle() {
    this.show = !this.show;
    this.services.gridView = !this.show;
  }
  goToProjectTasks(projectId) {
    this.commonservice.updateBreadCrumb.next({breadcrumbText: 'Tasks'});
    this.services.getProjectTasks(projectId);
  }
  // Function Code: P-2
  getProjects(newPageNumber) {
    this.commonservice.showCreate.next(true);
    this.loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    let url: string;
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    if (this.loginDetails['type'] === 3) {
      let deptFilter: string;
      if (this.accountId !== undefined) {
        deptFilter = this.accountId;
      } else {
        deptFilter = 'All';
      }
      url = Globals.urls.getProjects + '/' + this.search + '/' + deptFilter+ '/' + this.loginDetails.type + '/' + this.loginDetails._id + '/' + Globals.itemsPerPage + '/' + newPageNumber;
    } else {
      url = Globals.urls.getProjects + '/' + this.search + '/' + this.loginDetails.accounts[0]._id + '/' + this.loginDetails.type + '/' + this.loginDetails._id + '/' + Globals.itemsPerPage + '/' + newPageNumber;
    }
    this.services.getProjects(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.projectsList = res.data.docs;
          this.totalCount = res.data.total;
          this.limit = res.data.limit;
        } else {
          this.projectsList = [];
        }
      });
  }
  // Function Code: P-3
  editProject(project) {
    this.services.editURL(project);
  }
  // Function Code: P-4
  onDeleteItem(message: any): void {
    if (message === this.projectKeys['success']) {
      this.getProjects(1);
    }
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  

  }
}
