import { Component, OnInit } from '@angular/core';
import { settingsConstansts } from '../settings-constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as Globals from '../../../globals';
import { SettingsService } from '../settings.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  security:FormGroup;
  constants = Globals.allConstants.constantKeys;
  labels = {on:'On',off:'Off'};
  disableList = [];
  settingsInfo: any;
  updateIndex: any;
  disable: boolean;
  constructor(private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private location: Location,
    public services: SettingsService) { }

  ngOnInit() {
    this.security = this.formBuilder.group({
      accountLock: ['', Validators.required],
      lockInterval:['', Validators.required],
      maxFilesAllowedPerRecord:['', Validators.required],
      maxSizeOfEachFileAllowedPerRecord:['', Validators.required]
    });
    this.getListOfSettings();
  }
  get f() { return this.security.controls; }
  getListOfSettings() {
   
      let url;
    if(this.loginDetails.type == 0){
       url = Globals.urls.getAppSettings + '/adminLevel/null';

    }else if(this.loginDetails.type == 1){
       url = Globals.urls.getAppSettings + '/accountLevel' + '/' + this.loginDetails.accounts[0]._id;
    }
    this.services.getSettingsInfo(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.settingsInfo = res.settings[0];
          this.security.patchValue( res.settings[0]);
          this.disable = !this.settingsInfo.isAccountLockEnabled;
        } else {
          this.settingsInfo = [];
        }
      }
    );
    
    
  }
  toggleValue(object){
    this.settingsInfo[object.id] = object.value;
    this.disable = !object.value;
    let data ={ isAccountLockEnabled : this.settingsInfo.isAccountLockEnabled
    }
    let url;
    if(this.loginDetails.type == 0){
      url = Globals.urls.updateVerionSetting;
      data['accountId'] = null;
      data['type'] = 'adminLevel';
   }else{
      url = Globals.urls.updateVerionSetting;
      data['accountId'] = this.loginDetails.accounts[0]._id;
      data['type'] = 'accountLevel';

   }
    this.services.updateSetting(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.toastr.success(res.message);
          this.updateIndex = null;
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.error(this.constants.serverErrMsg);
        }
      }
    );
  }
  cancel() {
    this.location.back();
  }
  editSetting(index) {
    this.updateIndex = index;
  }

  cancelChange(value) {
    this.security.get(value).reset(this.settingsInfo[value]);
    this.updateIndex = null;
  }
 
  reset(value) {
    let url =Globals.urls.resetSetting;
    let data = { };
    if(this.loginDetails.type == 0){
      data['type'] = 'adminLevel';
      data['accountId'] = null;
   }else{
    data['type'] = 'accountLevel';
    data['accountId'] = this.loginDetails.accounts[0]._id;
   }
    data['toReset'] = value;
       
    this.services.updateSetting(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.security.get(value).reset(res.defaultValues[value]);
          this.toastr.success(res.message);
          this.updateIndex = null;
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.error(this.constants.serverErrMsg);
        }
      }
    );
  }
  updateSecurity() {
    if(this.security.invalid){
      this.toastr.warning(this.constants.emptyValuesMsg)
      return;
    }else{
      let url;
      const data = this.security.value;
      if(this.loginDetails.type == 0){
        url = Globals.urls.updateVerionSetting;
        data['accountId'] = null;
        data['type'] = 'adminLevel';
     }else{
        url = Globals.urls.updateVerionSetting ;
        data['accountId'] = this.loginDetails.accounts[0]._id;
        data['type'] = 'accountLevel';
     }
      this.services.updateSetting(url, data).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.toastr.success(res.message);
            this.updateIndex = null;
          } else if (res.status === 204) {
            this.toastr.info(res.message);
          } else {
            this.toastr.error(this.constants.serverErrMsg);
          }
        }
      );
    }
    
  }

}
