import { Component, OnInit } from '@angular/core';
import { settingsConstansts } from '../settings-constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as Globals from '../../../globals';
import { SettingsService } from '../settings.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-privileges',
  templateUrl: './privileges.component.html',
  styleUrls: ['./privileges.component.css']
})
export class PrivilegesComponent implements OnInit {
  constants = Globals.allConstants.constantKeys;
  adminsList:any[];
  privilegeList = {};
  privilegeTabs:any[];
  privileges:FormGroup;
  GAMods:any[];
  labels = {on:'Edit',off:'View'}
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  disableList = {1:['downloads','dataloader','gsalite'],3:['forms','tasks','users','projects','downloads','dataloader','gsalite'],5:['approvals','forms','users','downloads','dataloader','gsalite']};
  type;
  constructor(private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private location: Location,
    public services: SettingsService) { }

  ngOnInit() {
    if(this.loginDetails.type == 0){
      this.getAdminsList();
      this.type = 1;
    }else if(this.loginDetails.type == 1){
      this.getGAMods();
    }
    this.privileges = this.formBuilder.group({
      adminId: ['', Validators.required]
    });
  }
  getSelectedCheckBoxValue(tab,value){
      if(value == true){
        this.privilegeTabs.push(tab.key);
      }else if(value == false){
        this.privilegeTabs = this.privilegeTabs.filter((tabs) => tabs !== tab.key);
      }
  }
  getAdminsList(){
  let url = Globals.urls.getadminslist;
   this.services.getAdmins(url).subscribe((admins: any[]) => {
    this.adminsList = admins;
  });
  }
  changeType(type){
    if(type == 3){
      this.adminsList = this.GAMods['groupadminList'];
      this.type = 3;
    }else if(type == 5){
      this.adminsList = this.GAMods['moderatorsList'];
      this.type = 5;
    }
    this.privileges.reset();
    this.privilegeList = {};
    this.privilegeTabs =[];
  }
  getGAMods(){
    const url = Globals.urls.deptAdminsList + '/' + this.loginDetails.accounts[0]._id ;
    this.services.getAdmins(url).subscribe((admins: any[]) => {
      this.GAMods = admins;
    });
    }
  updatePrivileges(){
    let url =  Globals.urls.setPrivileges  + '/' + this.privileges.value.adminId;
    let data =  Object.assign({},this.privilegeList);
    data['privilegeList'] = this.privilegeTabs;
    this.services.setPrivileges(url,data).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.toastr.success(res.message);
            this.cancel();
          } else if (res.status === 204) {
            this.toastr.info(res.message);
          } else {
            this.toastr.error(this.constants.serverErrMsg);
          }
        } else {
          this.toastr.error(this.constants.serverErrMsg);
        }
      }
    );
  }
  toggleValue(object){
    this.privilegeList[object.id] = (object.value==true)?1:0;
  }
  getPrivileges(adminid){
    let url = Globals.urls.getPrivileges + '/' + adminid;
    this.services.getPrivileges(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.privilegeList = res.data.privilege;
            this.privilegeTabs = Object.assign([],res.data.privilege.privilegeList);
             delete this.privilegeList['privilegeList'];
          } else if (res.status === 204) {
            this.privilegeList = {};
            this.privilegeTabs =[];
          }
        } else {
          this.toastr.error(res.data);
        }
      }
    );
  }
  cancel() {
    this.location.back();
  }
}
