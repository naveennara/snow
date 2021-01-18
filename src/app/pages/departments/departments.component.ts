import { Component, OnInit } from '@angular/core';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  pageDetails = {pageName : 'Accounts', pageIcon: Globals.headerIcons.departmentsGrey};
  ellipseList: any;
  loginDetails: any;
  headerInputs: any;
  constructor() { }

  ngOnInit() {
    this.loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    if (this.loginDetails['type']==0) {
      this.ellipseList = ['Create']
    } else {
      this.ellipseList = [];
    }
    this.headerInputs = [HeaderInputs.keys.accounts];
  }

}
