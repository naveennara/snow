import { Component, OnInit } from '@angular/core';
import { settingsConstansts } from '../settings-constants';
import { Router } from '@angular/router';
import * as Globals from '../../../globals';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent implements OnInit {
  widgetIcons = Globals.svgIcons;
  contants = Globals.allConstants.constantKeys;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).type;
  settingsList = [
    { loginType:[0,1],url:'mainLayout/settings/profile', displayText: this.contants.profile, displayIcon: this.widgetIcons.profile },
    { loginType:[0,1],url: 'mainLayout/settings/privileges', displayText: this.contants.privileges, displayIcon: this.widgetIcons.privileges },
    { loginType:[0],url: 'mainLayout/settings/map', displayText: this.contants.mapConfiguration, displayIcon: this.widgetIcons.mapConfig },
    { loginType:[1],url: 'mainLayout/settings/configurations', displayText: this.contants.configurations, displayIcon: this.widgetIcons.configurations },
    { loginType:[1],url: 'mainLayout/settings/dropdown', displayText: this.contants.dropdown, displayIcon: this.widgetIcons.dynamicDropdown },
    { loginType:[0,1],url: 'mainLayout/settings/security', displayText: this.contants.security, displayIcon: this.widgetIcons.applicationSettings },
    { loginType:[0],url: 'mainLayout/settings/accountSettings', displayText: this.contants.accountSettings, displayIcon: this.widgetIcons.accountSettings },
    { loginType:[1],url: 'mainLayout/settings/layerConf', displayText: this.contants.layerConfiguration, displayIcon: this.widgetIcons.mapLayer },
  ];
  constructor(private router: Router,public commonservice: CommonService) { }
  ngOnInit() {
    this.commonservice.editActivated.next('');
  }
  navigate(item){
    this.commonservice.editActivated.next(item.displayText);
    this.router.navigate([item.url]);
  }

}
