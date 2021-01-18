import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { LicenseManagementService } from '../license-management.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';
@Component({
  selector: 'app-license-management-renew',
  templateUrl: './license-management-renew.component.html',
  styleUrls: ['./license-management-renew.component.css']
})
export class LicenseManagementRenewComponent implements OnInit {
  editLicenses: FormGroup;
  constants  = Globals.allConstants.constantKeys;
  departmentList:any[];
  submitted = false;
  formSubmitted = false; 
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: LicenseManagementService,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.editLicenses = this.formBuilder.group({
      account: ['', Validators.required],
      // webLicenses:['',Validators.required],
      licenses:['',Validators.required],
      validity:['',Validators.required]
    });
    this.editLicenses.patchValue(this.service.renewLicense);
    this.getALLDepartments();
  }
  
  getALLDepartments() {
    let url: string;
    url = Globals.urls.getAllListOfDepartments + '/'+null;
    this.service.getDepartments(url).subscribe((deptList: any[]) => {
      this.departmentList = deptList;
    });
  }
  get f() { return this.editLicenses.controls; }
  onRenew() {
    this.submitted = true;
    const url = Globals.urls.renewLicense;
    let data = this.editLicenses.value;
    if(this.editLicenses.value[this.constants['licenses']]==0){
      this.toastr.info(this.constants.licenseErrMsg);
      return; 
    }else if(this.editLicenses.value[this.constants['validity']]==0){
      this.toastr.info(this.constants.monthsErrMsg);
      return; 
    }else{
      //data['webLicenses']  = [this.editLicenses.value[this.constants['webLicenses']]];
      data['licenses']  = [this.editLicenses.value[this.constants['licenses']]];
      this.service.renewLicenses(url, data).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.formSubmitted = true;
            this.toastr.success( res.message);
            this.router.navigate(['mainLayout/licenses']);
          } else if (res.status === 204) {
            this.toastr.info(res.message);
          } else {
            this.toastr.error(this.constants.serverErrMsg);
          }
        }
      );
    }
    
  }
  cancel() {
    this.location.back();
  }
  canDeactivate() {
    if (!this.formSubmitted && this.editLicenses.dirty) {
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
