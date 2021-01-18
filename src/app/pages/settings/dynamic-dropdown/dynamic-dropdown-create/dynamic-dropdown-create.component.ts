import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { settingsConstansts } from '../../settings-constants';
import * as Globals from '../../../../globals';
import { SettingsService } from '../../settings.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-dynamic-dropdown-create',
  templateUrl: './dynamic-dropdown-create.component.html',
  styleUrls: ['./dynamic-dropdown-create.component.css']
})
export class DynamicDropdownCreateComponent implements OnInit {
  dropdownCreate: FormGroup;
  constants = Globals.allConstants.constantKeys;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  file: any;
  isUploadFile: boolean;
  tableData: any;
  action = this.constants.create;
  submitted: boolean;
  @ViewChild('dynamicDropDownFile') fileRef: ElementRef;
  formSubmitted = false;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  
  constructor(private formBuilder: FormBuilder,
              public toastr: ToastrService,
              private location: Location,
              private authService: AuthService,
              public services: SettingsService) { }

  ngOnInit() {
    this.dropdownCreate = this.formBuilder.group({
      collectionName : ['', Validators.required]
    });
  }
  get f() {
    return this.dropdownCreate.controls;
   }
  onFileChange(event) {
    this.authService.fileUploadCheck('excel', 'xlsx', event.target.files[0], valid => {
      if (!valid) {
        this.toastr.info(this.constants.excelFormatMsg);
        this.authService.resetFile(this.fileRef);
       } else {
        const url = Globals.urls.excelDropdown;
        this.file = event.target.files[0];
        if (this.file.name.indexOf('xlsx') !== -1) {
          const formdata = new FormData();
          formdata.append('file', this.file);
          //this.uploadFileInfo = [];
          this.services.xlsxtojsonuser(url, formdata).subscribe(
            (res: any) => {
              if (res.status === 200) {
                this.tableData = res.data;
                this.isUploadFile = true;
                } else {
                    this.toastr.info(res.message);
                }
            }
          );
        } else {
          this.toastr.info(this.constants.xlsxformat);
        }
       }
    });  
  }
  submit(data){
    this.submitted = true;
    if(this.dropdownCreate.valid){
      const url = Globals.urls.createDropdown + '/' + this.dropdownCreate.value.collectionName + '/' + this.loginDetails.accounts[0]._id;
      this.services.createdropDownFromFile(url,data).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.formSubmitted = true;
            this.toastr.success(res.message);
            this.cancel();
            } else {
                this.toastr.warning(res.message);
            }
        }
      );
    }else{
      this.toastr.error(this.constants.mandatoryFillMsg);
    }

  
  }
  canDeactivate() {
    if (!this.formSubmitted && this.dropdownCreate.dirty) {
      if (confirm(Globals.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }
  cancel() {
    this.location.back();
  }

}
