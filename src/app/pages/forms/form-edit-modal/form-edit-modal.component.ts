import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray,FormGroup, Validators, FormControl,  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { FormsServicesService } from '../forms-services.service';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-form-edit-modal',
  templateUrl: './form-edit-modal.component.html',
  styleUrls: ['./form-edit-modal.component.css']
})
export class FormEditModalComponent implements OnInit {
  updateForm: FormGroup;
  formId: string;
  dropdownSettings: object;
  dropdownSettings3: object;
  categoriesList = [];
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  usersListForMap = [];
  submitted = false;
  isErr = false;
  formSkeleton: any;
  workflowList: any[];
  formSubmitted = false;
  formKeys;
  constructor(
    private services: FormsServicesService,
    private commonservice: CommonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,

  ) {this.formKeys = Globals.allConstants.constantKeys; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formId = params['formId'];
      });
    this.dropdownSettings = this.services.dropdownSettings;
    this.dropdownSettings3 = this.services.dropdownSettings3;
    this.getCategories();
    this.getUsersList();
    this.getWorkflowList();
    this.updateForm = this.formBuilder.group({
      name: ['', Validators.required],
      createdBy: [''],
      category: [''],
      department: [''],
      alternativeMailid: [''],
      allocatedUsers: [[]],
      formzCategory: ['', Validators.required],
      workflowName:[''],
      workInstruction: [''],
      description: [''],
      isAllowMap: [false]
  });
    this.editForm();
  }
  editForm() {
    this.commonservice.editActivated.next(true);
    // if (this.services.formBack) {
    //   // this.commonservice.editActivated.next(true);
    // } else {
    //   this.commonservice.editActivated.next(true);
    // }
    this.services.formID(this.formId);
    const url = Globals.urls.getform + '/' + this.formId;
    this.services.editForm(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.services.saveFormDateBeforeUpdate(res.data.formData);
          this.formSkeleton = Object.assign([], res.data.formSkeleton);
          this.updateForm.patchValue(res.data.formData);
          this.updateForm.patchValue({
            department: this.loginDetails.accounts[0].name
          });
          if(res.data.formData.workflowName && res.data.formData.workflowName !=''){
            this.updateForm.get('workflowName').disable();
          }
          this.services.saveFormSkeleton(res.data.formSkeleton, this.formSkeleton);
        } else {
        }
      });
  }
  getCategories() {
    const url = Globals.urls.getFormsCategoryForAccount + '/'+ this.loginDetails.accounts[0]._id;
    this.services.getCategoriesUsers(url).subscribe(
      (res: any) => {
          if (res) {
           if (res.status === 200) {
            this.categoriesList = res.data;

           } else {
            this.categoriesList = [];
           }
          } else {
            this.categoriesList = [];
          }
        }
      );
  }
  getWorkflowList() {
    const url: string = Globals.urls.deptWiseWorkFlowNames + '/' + this.loginDetails.accounts[0]._id;
    this.services.getWorkflowNames(url,this.loginDetails.accounts[0]._id).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.workflowList = res.data;
        } else {
          this.workflowList = [];
        }
      }
    );
  }
  get f() { return this.updateForm.controls; }
  getUsersList() {
      const url = Globals.urls.getUsersList + '/' + this.loginDetails.accounts[0]._id;
      this.services.getCategoriesUsers(url).subscribe(
        (res: any) => {
            if (res) {
              if (res.status === 200) {
                this.usersListForMap = res.data;

              } else {
                this.usersListForMap = [];
              }
            } else {
              this.usersListForMap = [];
            }
          }
      );
  }
  goToFormBuildArea() {
    this.submitted = true;
    if (this.updateForm.value.category === 'Private') {
      if (this.updateForm.value.allocatedUsers.length === 0) {
        this.isErr = true;
      } else {
        this.isErr = false;
      }
    } else {
      this.isErr = false;
    }
    if (this.isErr) {
      return;
    } else {
      if (this.updateForm.invalid) {
        return;
      } else {
        this.updateForm.value['formType'] = 'form';
        if(this.updateForm.value.workflowName && this.updateForm.value.workflowName !=''){
          this.updateForm.value['workflowLevel'] = 1;
        }
        this.updateForm.value['accountId'] = this.loginDetails.accounts[0]._id;
        this.services.saveFormData(this.updateForm.value, 'edit');
        this.formSubmitted = true;
        this.router.navigate(['mainLayout/forms/formbuilder']);
      }
    }
  }
  canDeactivate() {
    if (!this.formSubmitted && this.updateForm.dirty) {
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
