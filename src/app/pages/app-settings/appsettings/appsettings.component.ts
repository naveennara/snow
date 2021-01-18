import { Component, OnInit } from '@angular/core';
import * as Globals from '../../../globals';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-appsettings',
  templateUrl: './appsettings.component.html',
  styleUrls: ['./appsettings.component.css']
})
export class AppsettingsComponent implements OnInit {

  constructor() { }
  
  pageDetails = {pageName : 'Application Settings', pageIcon: Globals.headerIcons.settingsGrey , hideSearch:true};
  loginDetails: any;
  ellipseList: any;
  headerInputs: any;
  ngOnInit() {
    this.loginDetails = JSON.parse(CryptoJS.AES.
      decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    this.headerInputs = [HeaderInputs.keys.appSettings];
  }

}
