import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { webUserConstants} from '../../webuser-constant';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-side-bar-menu',
  templateUrl: './side-bar-menu.component.html',
  styleUrls: ['./side-bar-menu.component.css']
})
export class SideBarMenuComponent implements OnInit {
  @Output() closeOverLay = new EventEmitter();
  myarray: string;
  textParsed: any[];
  headerInfo; storedValue;
  sidebarIcons = webUserConstants;
  // sidebarIcons = [
  //   { displayIcon: Globals.sidebarIcons.administrator}
  // ];
  constructor(private router: Router
  ) { }
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));
  ngOnInit() {
    this.storedValue = sessionStorage.getItem('LoginDetails');
    this.headerInfo = this.loginDetails;

  }

  parseText() {
    this.textParsed = this.myarray.split('\n');
  }
  gotoAssignmnet() {
    this.closeOverLay.next();
    this.router.navigate(['webuser/assignments']);
  }
  gotoForms() {
    this.closeOverLay.next();
    this.router.navigate(['webuser/assignments/forms']);
  }
}
