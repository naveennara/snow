import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray,FormGroup, Validators, FormControl,  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { TemplatesService } from '../templates.service';
import { FormsServicesService } from '../../forms/forms-services.service';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-templates-edit',
  templateUrl: './templates-edit.component.html',
  styleUrls: ['./templates-edit.component.css']
})
export class TemplatesEditComponent implements OnInit {

  updateTemplate: FormGroup;
  formId: string;
  dropdownSettings: object;
  dropdownSettings3: object;
  categoriesList = [];
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  deptsListForMap = [];
  submitted = false;
  isErr = false;
  formSkeleton: any;
  formSubmitted = false;
  templateKeys;
  constructor(
    private commonservice: CommonService,
    private route: ActivatedRoute,
    private services: TemplatesService,
    private formServices: FormsServicesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { this.templateKeys = Globals.allConstants.constantKeys; }

  ngOnInit() {
    this.updateTemplate = this.formBuilder.group({
      name: ['', Validators.required],
      createdBy: [''],
      category: [''],
      allocatedDepartments: [[]],
      formzCategory: ['', Validators.required],
    });
    this.route.params.subscribe(params => {
      this.formId = params['templateId'];
      });
    this.dropdownSettings = this.services.dropdownSettings;
    this.dropdownSettings3 = this.services.dropdownSettings3;
    this.getDeptList();
    this.getCategories();
    this.editTemplate();
  }
  editTemplate() {
    this.commonservice.editActivated.next(true);
    this.formServices.formID(this.formId);
    const url = Globals.urls.getform + '/' + this.formId;
    this.services.editTemplate(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.formServices.saveFormDateBeforeUpdate(res.data.formData);
          this.formSkeleton = Object.assign([], res.data.formSkeleton);
          this.updateTemplate.patchValue(res.data.formData);
         
          this.formServices.saveFormSkeleton(res.data.formSkeleton, this.formSkeleton);
        } else {
        }
      });
  }
  getCategories() {
    const url = Globals.urls.getFormsCategoryForAccount + '/'+ 'root';
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
  get f() { return this.updateTemplate.controls; }

  getDeptList() {
    const url =  Globals.urls.getAllListOfDepartments + '/'+null;
    this.services.getDepartmentsList(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.deptsListForMap = res.data;

          } else {
            this.deptsListForMap = [];
          }
        } else {
          this.deptsListForMap = [];
        }
      }
    );
  }

  goToFormBuildArea() {
    this.submitted = true;
    if (this.updateTemplate.value.category === 'Private') {
      if (this.updateTemplate.value.allocatedDepartments.length === 0) {
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
      if (this.updateTemplate.invalid) {
        return;
      } else {
        this.formSubmitted = true;
        this.updateTemplate.value['formType'] = 'template';
        this.updateTemplate.value['accountId'] = null;

        this.formServices.saveFormData(this.updateTemplate.value, 'edit');
        // this.router.navigate(['mainLayout/forms/formbuilder']);
        this.router.navigate(['mainLayout/templates/formbuilder']);
      }
    }
  }
  canDeactivate() {
    if (!this.formSubmitted && this.updateTemplate.dirty) {
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

