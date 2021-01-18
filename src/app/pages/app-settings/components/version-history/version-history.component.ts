import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AppSettingService } from '../../app-setting.service';
import * as Globals from '../../../../globals';
import { CommonService } from '../../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-version-history',
  templateUrl: './version-history.component.html',
  styleUrls: ['./version-history.component.css']
})
export class VersionHistoryComponent implements OnInit, OnChanges {

 
  constructor( private appSettingService: AppSettingService,
               private commonService: CommonService,
               private toastr: ToastrService
    ) { }

  @Input() osType;
  addVersionIndex;
  bugVersionIndex;
  viewVersionIndex;
  featureText;
  bugText;
  storeURL;
  isVersionToolEnable;
  versionList = [ ];
  versionFeatureList = [];
  bugsList = [];
  editIndex;
  editMode;
  constants = Globals.allConstants.constantKeys;
  ngOnInit() {
    this.commonService.appVersionHistory.subscribe(
      (data: any) => {
        this.osType =  data.platform;
        this.getAppversionHistory();

      });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getAppversionHistory();
  }
  
  getAppversionHistory() {
    const url = Globals.urls.getVersionHistory + '/' + this.osType;
    this.appSettingService.getSettingsInfo(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
           this.versionList = res.data;
        } else if (res.status === 204) {
          this.versionList = [];
        } 
      }
    );
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.versionFeatureList.push(this.featureText);
      this.featureText = '';
    }
  }

  updateItem(event, featureText, itemIndex, mode) {
    if (event.key === 'Enter') { 
      if (mode === 'functional') {
        this.versionFeatureList.splice(itemIndex , 1, featureText);
        this.editIndex = null;
        this.editMode = null;
      }
    }
  }
  addBugInList(event) {
    if (event.key === 'Enter') {
        this.bugsList.push(this.bugText);
        this.bugText = '';
    }
  }
  addVersion(index, featureText) {
    if (this.versionList[index]['functionalList']) {
      this.versionFeatureList  = this.versionList[index]['functionalList']['newFeatures'];
      this.bugsList  = this.versionList[index]['functionalList']['bugFixes'];
      this.storeURL  = this.versionList[index]['functionalList']['storeLink'];
    }
    this.viewVersionIndex = null;
    if (this.addVersionIndex !== index) {
      this.addVersionIndex = index;
      this.isVersionToolEnable = true;
    } else {
      this.resetVariables();
      // this.addVersionIndex  = null;
      // this.isVersionToolEnable = false;
    }

  }

  viewVersion(index) {
    this.addVersionIndex = null;
    if (this.viewVersionIndex !== index) {
      this.viewVersionIndex = index;
      this.isVersionToolEnable = true;
      this.versionFeatureList  = this.versionList[index]['functionalList']['newFeatures'];
      this.bugsList  = this.versionList[index]['functionalList']['bugFixes'];
      this.storeURL  = this.versionList[index]['functionalList']['storeLink'];
    } else {
      this.resetVariables();
      // this.viewVersionIndex  = null;
      // this.isVersionToolEnable = false;
    }
  }
  cancelViewVersion() {
    this.resetVariables();
    // this.viewVersionIndex = null;
    // this.isVersionToolEnable = false;
  }
  cancelAddVersion() {
    // this.addVersionIndex = null;
    // this.isVersionToolEnable = false;
    this.resetVariables();
  }

  deleteFeatureItem(index) {
    this.versionFeatureList.splice(index, 1);
  }
  deleteBugItem(index) {
    this.bugsList.splice(index, 1);
  }

  addVersionHistory(version) {
   if (this.versionFeatureList.length > 0 || this.bugsList.length > 0) {
    const data = {
      versionCode : version,
      functionalList  : {
        newFeatures: this.versionFeatureList,
        bugFixes: this.bugsList,
        storeLink: this.storeURL
      },
      platform: this.osType
    };
    // api call
    const url = Globals.urls.updateAppVersionDetails + '/' + data.platform + '/' + data.versionCode;
    this.appSettingService.addFunctionalHistoryToVersion(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {
        //  this.addVersionIndex = null;
        //  this.isVersionToolEnable = false;
         this.resetVariables();
        } else if (res.status === 204) {
        } else {
          // this.toastr.error('Something went wrong');
        }
      }
    );
   } else {
    this.toastr.info(this.constants.versionHistoryMsg);
   }
  }

  editRecord(index, type) {
    this.editIndex = index;
    this.editMode = type;
  }
  resetVariables() {
    this.editIndex = null;
    this.editMode = null;
    this.viewVersionIndex = null;
    this.addVersionIndex  = null;
    this.isVersionToolEnable = false;
  }
}
