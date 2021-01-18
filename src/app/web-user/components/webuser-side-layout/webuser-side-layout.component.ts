import { Component, OnInit } from '@angular/core';
import { webUserConstants} from '../../webuser-constant';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-webuser-side-layout',
  templateUrl: './webuser-side-layout.component.html',
  styleUrls: ['./webuser-side-layout.component.css']
})
export class WebuserSideLayoutComponent implements OnInit {

  myarray: string;
  textParsed: any[];
  headerInfo; storedValue;
  sidebarIcons = webUserConstants;
  activeIcon = 'assignmnet';
  constants = webUserConstants.constantKeys;
  // sidebarIcons = [
  //   { displayIcon: Globals.sidebarIcons.administrator}
  // ];
  constructor(private router: Router
  ) { }
  loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;
  ngOnInit() {
    this.storedValue = sessionStorage.getItem('LoginDetails');
    this.headerInfo = this.loginDetails;

  }

  parseText() {
    this.textParsed = this.myarray.split('\n');
  }
  gotoAssignmnet() {
    this.router.navigate(['webuser/assignments']);
    this.activeIcon = 'assignmnet';
  }
  gotoForms() {
    this.activeIcon = 'forms';
    this.router.navigate(['webuser/assignments/forms']);
  }

}
