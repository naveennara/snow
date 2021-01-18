import { Component, OnInit } from '@angular/core';
import * as Globals from '../../globals';
import { Router } from '@angular/router';
import { layoutConstansts } from '../layout-constants';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  tabs = layoutConstansts.layoutkeys;
  myarray: string;
  textParsed: any[];
  headerInfo; storedValue;
  sidebarIcons = Globals.sidebarIcons;
  // sidebarIcons = [
  //   { displayIcon: Globals.sidebarIcons.administrator}
  // ];
  constructor(private router: Router) { }
  constants = Globals.allConstants.constantKeys;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  ngOnInit() {
   // this.storedValue = sessionStorage.getItem('LoginDetails');
    this.headerInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  }

  parseText() {
    this.textParsed = this.myarray.split('\n');
  }
  showOrHide(tabValue) {
   // let loginTypes = this.tabs.sideBar[tabValue];
    if (this.loginDetails.privilege.privilegeList.includes(tabValue)) {
      return true;
    } else {
      return false;
    }
  }

}
