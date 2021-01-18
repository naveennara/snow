import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';
import { FormsServicesService } from '../forms-services.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form-import-as-template',
  templateUrl: './form-import-as-template.component.html',
  styleUrls: ['./form-import-as-template.component.css']
})
export class FormImportAsTemplateComponent implements OnInit {
  @Input() formId: string;
  importForm: FormGroup;
  categoriesList = [];
  dropdownSettings: object;
  submitted = false;
  constantKeys;
  constructor(
     private services: FormsServicesService,
     private toastr: ToastrService,
     private commonservice: CommonService,
     public ngxSmartModalService: NgxSmartModalService,
     private formBuilder: FormBuilder,
     private router: Router
  ) {
    this.constantKeys = Globals.allConstants.constantKeys;
   }

  ngOnInit() {
    this.importForm = this.formBuilder.group({
      formname: ['', Validators.required],
      categories: [[], Validators.required]
    });
    
    // this.getCategories();
    this.dropdownSettings = this.services.dropdownSettings;
    if (this.services.categoriesList !== undefined) {
      this.categoriesList = this.services.categoriesList;
  }
}
  createFormAsTemplate() {
      this.services.importFormId = this.formId;
      // this.importForm.reset();
      this.ngxSmartModalService.getModal('importAsTemplatePopup').open();

}
  // getCategories() {
  //   const url = Globals.urls.getFormCategory + '/getFormszCategory/' + 'root';
  //   this.services.getCategoriesUsers(url).subscribe(
  //     (res: any) => {
  //         if (res) {
  //          if (res.status === 200) {
  //           this.categoriesList = res.data;
  //          } else {
  //           this.categoriesList = [];
  //           this.toastr.warning(res.message);
  //          }
  //         } else {
  //           this.toastr.error(res.message);
  //           this.categoriesList = [];
  //         }
  //       }
  //     );
  // }
  CreateTemplate() {
    this.submitted = true;
    if (this.importForm.valid) {
      const templateData = {};
      templateData['formId'] = this.services.importFormId;
      templateData['formName'] = this.importForm.value.formname;
      templateData['categories'] = this.importForm.value.categories;
      const url = Globals.urls.importFormAsTemplate;
      this.services.importFormAsTemplate(url, templateData).subscribe(
        (res: any) => {
        if(res.status === 200) {
          this.ngxSmartModalService.getModal('importAsTemplatePopup').close();
          this.toastr.success(res.message);
          this.router.navigate(['mainLayout/templates']);
        } else {
          this.toastr.error(res.message);
        }
      });
    }
  }
}
