import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';
import { CommonService } from '../../sharing/sharing-module/common.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  pageDetails = {pageName : 'Forms', pageIcon: Globals.headerIcons.formsGrey};
  loginDetails:any;
  ellipseList :any;
  headerInputs: any;
  subscriptions: Subscription[] = [];
  constructor( private commonservice: CommonService,) { }

  ngOnInit() {
      this.loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
      if (this.loginDetails['type'] === 1) {
        this.ellipseList = ['Create'];
      } else {
        this.ellipseList = [];
      }
      this.headerInputs = [HeaderInputs.keys.forms];
      let pageChanges = this.commonservice.configSettings.subscribe(res =>{
        if(res == 'hideFormsSearch'){
          this.pageDetails['hideSearch']=true;
          this.pageDetails['hideCreate'] = true;
        }else if(res == 'showFormsSearch'){
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
