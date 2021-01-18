import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsServicesService } from '../forms-services.service';
import * as Globals from '../../../globals';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-version-history',
  templateUrl: './version-history.component.html',
  styleUrls: ['./version-history.component.css']
})
export class VersionHistoryComponent implements OnInit {
  formId: string;
  versionsList: any[];
  Imgsrc = Globals.noDataFound;
  versionBasicInfo: object;
  Object = Object;
  constants = Globals.allConstants.constantKeys;
  actions = ['Added', 'Updated', 'Deleted'];
  constructor(
    private services: FormsServicesService,
    private commonservice: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    public ngxSmartModalService: NgxSmartModalService,

  ) { }

  goBackToForms() {
    this.router.navigate(['/mainLayout', 'forms']);
  }


  getVersionsList(formId) {
    const url = Globals.urls.getFormVersions + '/' + formId;
    this.services.getFormVersions(url).subscribe(
      (res: any) => {
          if (res) {
           if (res.status === 200) {
            this.versionsList = res.data;

           } else {
            this.versionsList = [];
           }
          } else {
            this.versionsList = [];
          }
        }
      );
  }

  versionDetails(data) {
    this.versionBasicInfo  = {};
    if (data.formSkeletonLevelChanges !== undefined) {
      this.versionBasicInfo['Added'] = data.formSkeletonLevelChanges.added;
      // this.versionBasicInfo['Updated'] = [{Name1: {label: "Name Changed to Name1"}}];
      this.versionBasicInfo['Deleted'] = data.formSkeletonLevelChanges.deleted || [];
    } else {
      this.versionBasicInfo['Added'] =  [];
      this.versionBasicInfo['Deleted'] = [];
    }
    if (data.updatedData !== undefined) {
      this.versionBasicInfo['Updated'] = data.updatedData;
    } else {
      this.versionBasicInfo['Updated'] = [];
    }
    // this.versionBasicInfo['added'] = versionInfo.name;
    // this.versionBasicInfo['createdTime'] = form.createdTime;
    this.ngxSmartModalService.getModal('versionInfo').open();
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formId = params['formId'];
      this.getVersionsList(this.formId);
    });
    this.commonservice.hideCreate.next(true);
  }



}
