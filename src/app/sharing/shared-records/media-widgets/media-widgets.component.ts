import { Component, OnInit } from '@angular/core';
import { SharedRecordsService } from '../shared-records.service';
import * as Globals from '../../../globals';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as CryptoJS from 'crypto-js';
import { CommonService } from '../../sharing-module/common.service';

@Component({
  selector: 'app-media-widgets',
  templateUrl: './media-widgets.component.html',
  styleUrls: ['./media-widgets.component.css']
})
export class MediaWidgetsComponent implements OnInit {
  public params: any;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));

  constructor(private commonService: CommonService,public ngxSmartModalService: NgxSmartModalService) { }

    agInit(params: any): void {
        this.params = params;
    }
    showLocation(){
      this.commonService.locations.next({recordInfo:this.params.data,location:this.params.value});
           // window.open("http://www.google.com/maps/place/" + this.params.value);
    }
    checkWorkFlow(){
      if(this.loginDetails.type != 1 && this.params.data.workFlowAssignedTo._id == this.loginDetails._id){
        return true;
      }else{
        return false;
      }
    }
    
  ngOnInit() {
  }

}
