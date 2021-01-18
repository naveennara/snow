import { Component, OnInit , EventEmitter, Output, Input, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../sharing-module/common.service';
import { HeaderInputs } from './headerInputs';
import { PageHeaderService } from './page-header.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit, OnDestroy  {
  @Output()  searchEvent: EventEmitter< any> = new EventEmitter< any>();
  @Input()  headerInputs: HeaderInputs;
  @ Output() notifyParentOnUpdate: EventEmitter< any> = new EventEmitter< any>();
  @ Input() pageDetails: object;
  @ Input() BreadCrumb: any[];
  @ Input() createEllipseRouting: any[];
  @ Input() importEllipseRouting: any[];
  @ Input() ellipseList;
  
  showCreateButton: boolean  = true;
  showSearchBar = true;
  breadcrumbs: string [] = [];
  settings = false;
  subscriptions: Subscription[]=[];
 // editActivated = false;
  constructor(private router: Router,private location: Location,
    private CommonService : CommonService, private services: PageHeaderService) { 
    let updateBreadCrumb = this.CommonService.updateBreadCrumb.subscribe(
      (data: any) => {
        if(!sessionStorage.getItem('LoginDetails')){
          this.logOut();
        }
        if (data.breadcrumbText !== {} && data.breadcrumbText !== undefined) {
          if (data.breadcrumbText !== '') {
            if(this.breadcrumbs.indexOf(data.breadcrumbText) == -1){
              this.breadcrumbs.push(data.breadcrumbText);
            }
          }
        }
      }
    );
    let updateBreadCrumbOnBack = this.CommonService.updateBreadCrumbOnBack.subscribe(
      (data: any) => {
        if(!sessionStorage.getItem('LoginDetails')){
          this.logOut();
        }
        if (data.breadcrumbText !== undefined) {
          if (this.breadcrumbs.length) {
            // const array = this.breadcrumbs.splice(this.breadcrumbs.length - 1 , 1);
            const arr = this.breadcrumbs.filter(val => (val !== data.breadcrumbText));
            if(arr.length>2){
              arr.splice(2, arr.length);
            }
            this.breadcrumbs = arr;
          }
        }
      }
    );
    this.subscriptions.push(updateBreadCrumb);
    this.subscriptions.push(updateBreadCrumbOnBack);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  

  }

  ngOnInit() {
    let editClicked = this.CommonService.editActivated.subscribe(
      (enabled: any) => {
        if(!sessionStorage.getItem('LoginDetails')){
          this.logOut();
        }
        this.showSearchBar = true;
       if (enabled === true) {
        this.showCreateButton = false;
        this.settings = false;

        this.breadcrumbs.push('Edit');
       } else if (enabled === false) {
        this.showCreateButton = false;
        this.settings = false;
        this.breadcrumbs.push('Preview');
       } else if (enabled.length > 0 && enabled !== undefined) {
        this.showCreateButton = false;
        this.settings = true;
        this.breadcrumbs.push(enabled);
       }else if(enabled == ''){
        //this.breadcrumbs = [];
        this.breadcrumbs.splice(0, 1);
        this.breadcrumbs.splice(0, 1);
        this.showCreateButton = false;
        this.settings = false;
       }else{
        this.settings = true;
        this.breadcrumbs = [enabled];
       }
      }
    );
    let recordsView = this.CommonService.recordsView.subscribe(
      (enabled: object) => {
        this.showCreateButton = false;
        this.settings = false;
        this.breadcrumbs.push(enabled['name']);
        if(!sessionStorage.getItem('LoginDetails')){
          this.logOut();
        }
      }
    );
    let hideCreate = this.CommonService.hideCreate.subscribe(
      (enabled: boolean) => {
       if (enabled === true) {
        this.showCreateButton = false;
       }
      }
    );

   let showCreate =  this.CommonService.showCreate.subscribe(
      (enabled: boolean) => {
        this.showCreateButton = enabled;
        this.breadcrumbs.splice(0, 1);
        this.breadcrumbs.splice(0, 1);
        if(!sessionStorage.getItem('LoginDetails')){
          this.logOut();
        }
      }
    );
    this.subscriptions.push(showCreate);
    this.subscriptions.push(hideCreate);
    this.subscriptions.push(recordsView);
    this.subscriptions.push(editClicked);
    
  }
  home() {
    if(!sessionStorage.getItem('LoginDetails')){
      this.logOut();
    }
    this.showCreateButton = true;
    this.showSearchBar = true;
    const homeRoute = Object.assign([], this.createEllipseRouting);
    this.breadcrumbs=[];
    if (this.createEllipseRouting && this.createEllipseRouting.includes('projectsTab')) {
      this.router.navigate(['mainLayout', 'projectsTab', 'projects']);
    } else if(this.settings == true){
      this.location.back();
    }else{
      //this.location.back();
      this.router.navigate(homeRoute.splice(0, 2));
    }
  }
  create(list) {
    if(!sessionStorage.getItem('LoginDetails')){
     this.logOut();
    }
    if (list === 'Create') {
      this.router.navigate( this.createEllipseRouting);
      this.breadcrumbs.push('Create');
    } else if (list === 'Import') {
      this.router.navigate( this.importEllipseRouting);
      this.breadcrumbs.push('Import');
    }
    this.showCreateButton = false;
    this.showSearchBar = false;
  }
  callMe(event) {
    this.searchEvent.emit(event);
  }
 logOut(){
  this.router.navigate(['/login']); 
  sessionStorage.clear();

 }

}
