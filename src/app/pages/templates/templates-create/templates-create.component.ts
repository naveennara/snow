import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { FormsServicesService } from '../../forms/forms-services.service';
import * as Globals from '../../../globals';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl,  } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-templates-create',
  templateUrl: './templates-create.component.html',
  styleUrls: ['./templates-create.component.css']
})
export class TemplatesCreateComponent implements OnInit {

  categoriesList = [];
  submitted: boolean = false;
  isFromExist: boolean = false;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  dropdownSettings: object;
  dropdownSettings3: object;
  createTemplate: FormGroup;
  deptsListForMap = [];
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  formSubmitted = false;
  isErr = false;
  templateKeys;
  constructor(
    private services: TemplatesService,
    private formServices: FormsServicesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { this.templateKeys = Globals.allConstants.constantKeys; }
  getCategories() {
    const url = Globals.urls.getFormsCategoryForAccount +'/'+ 'root';
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

  get f() { return this.createTemplate.controls; }
  goToFormBuildArea() {
    this.submitted = true;
    if (this.createTemplate.value.category === 'Private') {
      if (this.createTemplate.value.allocatedDepartments.length === 0) {
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
      const url = Globals.urls.isFormExists + '/' + this.createTemplate.value.name;
      this.services.CheckFormExists(url).subscribe(
        (res: any) => {
          if (res) {
            if (res.status === 204) {
              this.isFromExist = false;
            } else if (res.status === 208) {
              this.isFromExist = true;
            }
            if (this.createTemplate.invalid || this.isFromExist) {
              return;
            } else {
              this.formSubmitted = true;
              this.createTemplate.value['formType'] = 'template';
              this.createTemplate.value['accountId'] = null;

              this.formServices.saveFormData(this.createTemplate.value, 'create');
              // this.router.navigate(['mainLayout/forms/formbuilder']);
              this.router.navigate(['mainLayout/templates/formbuilder']);
            }
          } else {
            //swal(CONSTANTS.serverProblem);
          }
        }
      );
    }
  }
  canDeactivate() {
    if (!this.formSubmitted && this.createTemplate.dirty) {
      if (confirm(Globals.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }

  ngOnInit() {
    this.createTemplate = this.formBuilder.group({
      name: ['', Validators.required],
      createdBy: [''],
      category: [''],
      allocatedDepartments: [[]],
      formzCategory: ['', Validators.required],
    });
    this.dropdownSettings = this.services.dropdownSettings;
    this.dropdownSettings3 = this.services.dropdownSettings3;
    this.getDeptList();
    this.getCategories();
    
    this.createTemplate.patchValue({
      category: 'Public',
      // alternativeMailid : this.loginDetails.email,
      // department : this.loginDetails.accounts[0].name,
      createdBy : this.loginDetails.username
    });
  }
}

