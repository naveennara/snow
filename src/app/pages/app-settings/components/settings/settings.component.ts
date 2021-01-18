import { Constants } from './../../../../sharing/shared-records/records-constants';
import { SettingsService } from './../../../settings/settings.service';
import { AppsettingsComponent } from './../../appsettings/appsettings.component';
import { LicenseManagementService } from './../../../license-management/license-management.service';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../globals';
import { AppsettingsConstansts } from '../../app-settings-constants';
import { AppSettingService } from '../../app-setting.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settingsInfo: any;
  constants = Globals.allConstants.constantKeys;
  generalConstants = AppsettingsConstansts.general;
  imgIcons = Globals.svgIcons;
  updateIndex: number;
  updateAppVesrion: any;
  androidUpdateAppVesrion: any;
  iosUpdateAppVesrion: any;
  updateAccountLock: any;
  updateLockInterval: any;
  constructor(private commonservice: CommonService,
    private toastr: ToastrService,
    private appSettingService: AppSettingService) { }
  ngOnInit() {
    this.getListOfSettings();
  }
  getListOfSettings() {
    const url = Globals.urls.getAppSettings + '/applicationLevel/null';
    this.appSettingService.getSettingsInfo(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.settingsInfo = res.settings[0];
          this.androidUpdateAppVesrion = this.settingsInfo.androidAppVersion;
          this.iosUpdateAppVesrion = this.settingsInfo.iOSAppVersion;
          this.updateAccountLock = this.settingsInfo.accountLock;
          this.updateLockInterval = this.settingsInfo.lockInterval;
        } else {
          this.settingsInfo = [];
        }
      }
    );
  }

  editSetting(index) {
    this.updateIndex = index;
  }
  cancelUpdateVersion() {
    this.updateAppVesrion = this.settingsInfo.appVersion;
    this.updateIndex = null;
  }
  cancelUpdateLock() {
    this.updateAccountLock = this.settingsInfo.accountLock;
    this.updateIndex = null;
  }
  cancelUpdateInterval() {
    this.updateLockInterval = this.settingsInfo.lockInterval;
    this.updateIndex = null;
  }
  reset(value) {
    let url =Globals.urls.resetSetting;
    let data = {
      type:this.generalConstants.applicationLevel,
      accountId:null
    };
    if(value == 2){
       data['toReset'] = 'accountLock'
    }
    else if(value == 3){
      data['toReset'] = 'lockInterval'

    }
    
    this.appSettingService.updateSetting(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          if(value == 2){
            this.settingsInfo.accountLock = res.defaultValues.accountLock;
          }
         else if(value == 3){
          this.settingsInfo.lockInterval = res.defaultValues.lockInterval;
     
         }
          this.toastr.success(res.message);
          this.updateIndex = null;
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.error(this.constants.serverErrMsg);
        }
      }
    );
  }
  addOrViewDetails(osType) {
    this.commonservice.appVersionHistory.next({platform: osType});

  }
  updateVersion( index) {
    const url = Globals.urls.updateVerionSetting ;
    const data = {
      accountLock: this.updateAccountLock,
      lockInterval: this.updateLockInterval,
      type:this.generalConstants.applicationLevel
    };
    if ( index === 1 ) {
      if (this.settingsInfo.androidAppVersion !== this.androidUpdateAppVesrion) {
        data['androidAppVersion'] = this.androidUpdateAppVesrion;
      }
    } else {
      if (this.settingsInfo.iOSAppVersion !== this.iosUpdateAppVesrion) {
        data['iOSAppVersion'] = this.iosUpdateAppVesrion;
      }
    }
    if(this.updateAccountLock == 0 || this.updateLockInterval == 0){
      this.toastr.info(this.constants.appSettingsErrMsg);
      return; 
    }else{
      this.appSettingService.updateSetting(url, data).subscribe(
        (res: any) => {
          if (res.status === 200) {
            
            const obj = {updatedOn: new Date(), version: this.androidUpdateAppVesrion};
            this.settingsInfo.versionHistory.push(obj);
            
            this.settingsInfo.accountLock = this.updateAccountLock;
            this.settingsInfo.lockInterval = this.updateLockInterval;
            if ( index === 1 ) {
              this.settingsInfo.androidAppVersion = this.androidUpdateAppVesrion;
            } else {
              this.settingsInfo.iOSAppVersion = this.iosUpdateAppVesrion;
            }
            this.toastr.success(res.message);
            this.updateIndex = null;
          } else if (res.status === 204) {
            this.toastr.info(res.message);
          } else {
            this.toastr.error(this.constants.serverErrMsg);
          }
        }, () => {
            this.toastr.error(this.constants.serverErrMsg);
        }
      );
    }
    
  }
 
}

