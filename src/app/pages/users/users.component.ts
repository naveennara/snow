import { Component, OnInit } from '@angular/core';
import { HeaderInputs } from '../../../app/sharing/page-header/headerInputs';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';
import { CommonService } from '../../sharing/sharing-module/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  pageDetails = {pageName : 'Users', pageIcon: Globals.headerIcons.usersGrey};
  loginDetails: any;
  ellipseList: any;
  headerInputs: any;
  subscriptions: Subscription[] = [];
  constructor(    private commonservice: CommonService,
    ) { }
  ngOnInit() {
    this.loginDetails=JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    if (this.loginDetails['type'] !== 1) {
      this.ellipseList = [];
    } else if (this.loginDetails['type'] === 1) {
      this.ellipseList = ['Create', 'Import'];
    }
    this.headerInputs = [HeaderInputs.keys.users];
    let pageChanges = this.commonservice.configSettings.subscribe(res =>{
      if(res == 'hideUserSearch'){
        this.pageDetails['hideSearch']=true;
        this.pageDetails['hideCreate'] = true;
      }else if(res == 'showUserSearch'){
        this.pageDetails['hideSearch']=false;
        this.pageDetails['hideCreate'] = false;
      }
    })
    this.subscriptions.push(pageChanges);
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }
}

