import { Component, OnInit } from '@angular/core';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
import * as Globals from '../../globals';
import { WindowRef } from '../../sharing/sharing-module/WindowRef';
import * as CryptoJS from 'crypto-js';
import { CommonService } from '../../sharing/sharing-module/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  pageDetails = {pageName : 'Templates', pageIcon: Globals.headerIcons.templatesGrey};
  loginDetails: any;
  ellipseList: any;
  headerInputs: any;
  myInnerHeight: any;
  myInnerComponentHeight: any;
  subscriptions: Subscription[] = [];
  constructor(    private winRef: WindowRef,private commonservice: CommonService
  ) { this.myInnerHeight = winRef.nativeWindow.innerHeight;
    this.myInnerComponentHeight = winRef.nativeWindow.innerHeight - 5;
   }

  ngOnInit() {
    this.loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    if (this.loginDetails['type'] === 0) {
      this.ellipseList = ['Create'];
    } else {
      this.ellipseList = [];
    }
    this.headerInputs = [HeaderInputs.keys.forms];
    let pageChanges = this.commonservice.configSettings.subscribe(res =>{
      if(res == 'hideTemplatesSearch'){
        this.pageDetails['hideSearch']=true;
        this.pageDetails['hideCreate'] = true;
      }else if(res == 'showTemplatesSearch'){
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
