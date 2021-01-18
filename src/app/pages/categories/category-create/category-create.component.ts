import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import {CategoriesService} from '.././categories.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoriesService]
})
export class CategoryCreateComponent implements OnInit {
  createCategory: FormGroup;
  categoryKeys: any;
  submitted = false;
  formSubmitted = false;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: CategoriesService,
    private router: Router
  ) {
    this.categoryKeys = Globals.allConstants.constantKeys;
  }

  ngOnInit() {
    this.createCategory = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    });
  }
  get f() { return this.createCategory.controls; }
  onCreate(data) {
    this.submitted = true;
    if (this.createCategory.invalid) {
      return ;
    }
   
    const globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    data['createdBy'] = globalInfo.username;
    if (globalInfo.type === 0) {
      data['accountId'] = globalInfo.username;
    } else {
      data['accountId'] = globalInfo.accounts[0]._id;
    }
    const url = Globals.urls.createCategory;
    this.service.createCategory(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.formSubmitted = true;
          this.toastr.success( res.message);
          this.router.navigate(['mainLayout/categories']);
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.error(this.categoryKeys.serverErrMsg);
        }
      }
    );
  }
  canDeactivate() {
    if (!this.formSubmitted && this.createCategory.dirty) {
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
