import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-administrators',
  templateUrl: './administrators.component.html',
  styleUrls: ['./administrators.component.css']
})
export class AdministratorsComponent implements OnInit {
  pageDetails = {pageName : 'Administrators', pageIcon: Globals.headerIcons.administratorsGrey };
  loginDetails: any;
  ellipseList: any;
  headerInputs: any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    if (this.loginDetails['privilege'][Globals.Privileges.admins] === 1) {
      this.ellipseList = ['Create'];
    } else {
      this.ellipseList = [];
    }
    this.headerInputs = [HeaderInputs.keys.administrators];
  }

}
