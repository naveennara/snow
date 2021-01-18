import { Component, OnInit } from '@angular/core';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dataloader',
  templateUrl: './dataloader.component.html',
  styleUrls: ['./dataloader.component.css']
})
export class DataLoaderComponent implements OnInit {
  pageDetails = {pageName : 'Data Loader', pageIcon: Globals.headerIcons.workflowGrey};
  loginDetails: any;
  ellipseList: any;
  headerInputs: any;
  constructor() { }

  ngOnInit() {
    this.loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    if (this.loginDetails['type'] === 1) {
    this.ellipseList = ['Create'];
    } else {
    this.ellipseList = [];
    }
    this.headerInputs = [HeaderInputs.keys.workflow];
  }

}
