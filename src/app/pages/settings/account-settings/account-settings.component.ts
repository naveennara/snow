import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as Globals from '../../../globals';
import { SettingsService } from '../settings.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {
  constants = Globals.allConstants.constantKeys;
  accountsList:any[];
  labels = {on:'On',off:'Off'}
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  disableList = [];
  settingsList = {};
  account: any[];
  constructor(private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private location: Location,
    public services: SettingsService) { }

  ngOnInit() {
    this.getALLDepartments();
  }
  getALLDepartments() {
    const url = Globals.urls.getAllListOfDepartments + '/'+null;
    this.services.getDepartments(url).subscribe((deptList: any[]) => {
      this.accountsList = deptList;
    });
  }
  getSettings(value){
    this.account = this.accountsList.filter(object=>object._id == value);
    this.settingsList = this.account[0].settings;
  }
  toggleValue(object){
    this.settingsList[object.id] = object.value;//(object.value==true)?1:0;
  }
  cancel() {
    this.location.back();
  }
  updateSettings(){
   
      let url = Globals.urls.updateVerionSetting ;
      let data = Object.assign({},this.settingsList);
      data['accountId'] = this.account[0]._id;
      data['type'] = 'accountLevel';
    this.services.updateSetting(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.toastr.success(res.message);
          this.cancel();
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.error(Globals.allConstants.constantKeys.serverErrMsg);
        }
      }
    );
  }
}
