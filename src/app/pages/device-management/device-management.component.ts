import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Globals from '../../globals';
import { CommonService } from '../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.css'],
})
export class DeviceManagementComponent implements OnInit {
  pageDetails = { pageName: 'Device Management', pageIcon: Globals.headerIcons.deviceManagementGrey };
  subscriptions: Subscription[] = [];
  constructor(private commonService: CommonService){}
  ngOnInit() {
    let pageChanges = this.commonService.configSettings.subscribe(res =>{
      if(res == 'hideDeviceSearch'){
        this.pageDetails['hideSearch']=true;
      }else if(res == 'showDeviceSearch'){
        this.pageDetails['hideSearch']=false;
      }
    })
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

