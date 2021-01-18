import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as Globals from '../../../globals';
import { SettingsService } from '../settings.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dynamic-dropdown',
  templateUrl: './dynamic-dropdown.component.html',
  styleUrls: ['./dynamic-dropdown.component.css']
})
export class DynamicDropdownComponent implements OnInit {

  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  constants = Globals.allConstants.constantKeys;
  dynamicDropdown: FormGroup;
  collectionList: any[];
  action = this.constants.edit;
  tableData: any[];
  isUploadFile: any = false;
  collectionName: any;
  dynamicWidth: number = 100;
  placeholder;
  formSubmitted = false;
  constructor(private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private location: Location,
    private router: Router,
    public commonservice: CommonService,
    public services: SettingsService) { }

  ngOnInit() {
    this.dynamicDropdown = this.formBuilder.group({
      collectionName: ['', Validators.required]
    });
    this.getCollections();
  }
  getCollections() {
    this.placeholder = 'Loading..';
    let url = Globals.urls.fetchDropdownCollections + '/' + this.loginDetails.accounts[0]._id;
    this.services.getCollections(url).subscribe((collections: any[]) => {
      this.collectionList = collections;
      if(this.collectionList.length){
        this.placeholder = '';
      }else{
        this.toastr.info(this.constants.noReferenceList);
        this.placeholder = 'No data found';
      }
    });
  }
  getColumns(value){
    let url = Globals.urls.fetchDropdownCollectionData + '/' + value + '/' +  this.loginDetails.accounts[0]._id;
    this.services.getCollections(url).subscribe((columns: any[]) => {
      this.collectionName = value;
      this.isUploadFile = true;
      this.tableData = columns;
    });
  }
  submit(data){
    const url = Globals.urls.editDropdownCollectionRecord + '/' + this.collectionName + '/' + this.loginDetails.accounts[0]._id;
    this.services.createdropDownFromFile(url,data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          //this.tableData = res.data;
          //this.isUploadFile = true;
          this.formSubmitted = true;
          this.toastr.success(res.message);
          } else {
              this.toastr.info(res.message);
          }
      }
    );
    

  }
  create() {
    //this.commonservice.editActivated.next('Dropdown Create');
    this.router.navigate(['mainLayout/settings/dropdownCreate']);
  }
  cancel() {
    this.location.back();
  }
  canDeactivate() {
    if (!this.formSubmitted && this.services.editedTable) {
      if (confirm(Globals.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }
}
