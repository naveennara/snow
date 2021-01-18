import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray,FormGroup, Validators, FormControl,  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { TemplatesService } from '../templates.service';
import { FormsServicesService } from '../../forms/forms-services.service';
import * as Globals from '../../../globals';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-templates-import',
  templateUrl: './templates-import.component.html',
  styleUrls: ['./templates-import.component.css']
})
export class TemplatesImportComponent implements OnInit {
  categoriesList = [];
  submitted: boolean = false;
  isFromExist: boolean = false;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  dropdownSettings: object;
  dropdownSettings3: object;
  importFormfromTemplate: FormGroup;
  templateData: any;
  usersListForMap = [];
  isErr = false;
  formId: string;
  formSkeleton: any;
  formKeys;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  constructor(
    private commonservice: CommonService,
    private route: ActivatedRoute,
    private services: TemplatesService,
    private formServices: FormsServicesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
  ) { this.formKeys = Globals.allConstants.constantKeys;}

  fetchTemplateData() {
    // this.commonservice.editActivated.next(true);
    // this.formServices.formID(this.formId);
    const url = Globals.urls.getform + '/' + this.formId;
    this.services.editTemplate(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.templateData = res.data;
          this.importFormfromTemplate.patchValue({name: res.data.formData.name});
          // this.formServices.saveFormDateBeforeUpdate(res.data.formData);
          // this.formSkeleton = Object.assign([], res.data.formSkeleton);
          // this.formServices.saveFormSkeleton(res.data.formSkeleton, this.formSkeleton);
        } else {
        }
      });
  }

  getCategories() {
    const url = Globals.urls.getFormsCategoryForAccount +'/'+  this.loginDetails.accounts[0]._id;
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

  getUsersList() {
    const url = Globals.urls.getUsersList + '/' + this.loginDetails.accounts[0]._id;
    this.services.getCategoriesUsers(url).subscribe(
      (res: any) => {
          if (res) {
            if (res.status == 200) {
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

  importTemplate() {
    this.submitted = true;
    if (this.importFormfromTemplate.value.category === 'Private') {
      if (this.importFormfromTemplate.value.allocatedUsers.length === 0) {
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
      const url = Globals.urls.isFormExists + '/' + this.importFormfromTemplate.value.name;
      this.services.CheckFormExists(url).subscribe(
        (res: any) => {
            if (res) {
              if (res.status == 204) {
                this.isFromExist = false;
              } else if (res.status == 208) {
                this.isFromExist = true;
              }
              if (this.importFormfromTemplate.invalid || this.isFromExist) {
                return;
              } else {
                this.importFormfromTemplate.value['formType'] = 'form';
                this.importFormfromTemplate.value['accountId'] = this.loginDetails.accounts[0]._id;

                this.services.saveFormData(this.importFormfromTemplate.value, 'create');
                const FinalObject = this.services.formData;
                // FinalObject['formType'] = "form";
                // FinalObject['accountId'] = this.loginDetails.accounts[0]._id;
                FinalObject['formSkeleton'] = this.templateData.formSkeleton;
                FinalObject['displayField'] = this.templateData.formData.displayField;
                FinalObject['isCreateNewForm'] = false;
                // FinalObject['dependentFields'] = this.dependentFields;
                // let mapObject = this.formData.filter(widget => widget.type === Globals.widgetTypes.widgets['map'])
                // if(mapObject.length>0){
                FinalObject['locationField'] = this.templateData.formData.locationField;

                // }else{
                //   FinalObject['locationField'] = []
                // }
                const url1 = Globals.urls.createForm;
                this.services.createFrom(url1, FinalObject).subscribe(
                  (res1: any) => {
                      if (res1.status === 200) {
                        this.toastr.success(this.formKeys.templateImportMsg);
                        // if (FinalObject.formType === 'form') {
                        this.router.navigate(['mainLayout/forms']);
                        // } else {
                        //   this.router.navigate(['mainLayout/templates']);
                        // }
                        
                      } else {
                        this.toastr.info(res1.message);
                      }
                  });
              }
            } else {
              //swal(CONSTANTS.serverProblem);
            }
          }
        );
    }
  }

  get f() { return this.importFormfromTemplate.controls; }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formId = params['templateId'];
    });
   // this.commonservice.editActivated.next('Create');
    this.dropdownSettings = this.services.dropdownSettings;
    this.dropdownSettings3 = this.services.dropdownSettings3;
    this.getCategories();
    this.getUsersList();
    this.importFormfromTemplate = this.formBuilder.group({
      name: ['', Validators.required],
      createdBy: [''],
      category: [''],
      department: [''],
      alternativeMailid: [''],
      allocatedUsers: [[]],
      formzCategory: ['', Validators.required],
      workInstruction: [''],
      description: [''],
      isAllowMap: [false]
    });
    this.importFormfromTemplate.patchValue({
      category: 'Public',
      alternativeMailid : this.loginDetails.email,
      department : this.loginDetails.accounts[0].name,
      createdBy : this.loginDetails.username
    });
    this.fetchTemplateData();
  }

}
