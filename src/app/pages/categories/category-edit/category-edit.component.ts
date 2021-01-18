import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';
import * as CryptoJS from 'crypto-js';
import { Location } from '@angular/common';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css'],
  providers: [CategoriesService]
})
export class CategoryEditComponent implements OnInit , OnDestroy  {

  selectedCategory: any;
  id: number;
  private sub: any;
  catObj: any;
  categoryEditForm: FormGroup;
  categoryKeys: any;
  formSubmitted = false;

  constructor(
    private service: CategoriesService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,

  ) {
    this.categoryKeys = Globals.allConstants.constantKeys;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['categoryId']; // (+) converts string 'id' to a number
      this.selectedCategory = this.id;
      this.categoryEditForm = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['']
      });
      this.previewCategory(this.selectedCategory);
    });
    if(JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).privilege[Globals.Privileges['category']] == 0){
      this.categoryEditForm.disable();
    }
  }

  previewCategory(selectedCategory) {
    const url: string = Globals.urls.viewCategory + '/' + selectedCategory;
    this.service.viewCategory(url, selectedCategory).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.catObj = res.data;
          this.categoryEditForm.patchValue(this.catObj);
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.info(this.categoryKeys.serverErrMsg);
        }
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  back() {
    this.location.back();
  }
  onSubmit() {
    const globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    this.categoryEditForm.value['createdBy'] = globalInfo.username;
    if (globalInfo.type === 0) {
      this.categoryEditForm.value['department'] = globalInfo.username;
    } else {
      this.categoryEditForm.value['department'] = globalInfo.accounts[0]._id;
    }
    // let niceCleanProfileData = Object.assign({},this.myDataObject,this.myForm.value);
    const url = Globals.urls.editCategory + '/' + this.catObj['_id'];
    this.service.updateCategory(url, this.categoryEditForm.value).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.formSubmitted  = true;
          this.toastr.success(res.message);
          this.router.navigate(['mainLayout/categories']);
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.info(this.categoryKeys.serverErrMsg);
        }
      }
    );
  }
  canDeactivate() {
    if (!this.formSubmitted && this.categoryEditForm.dirty) {
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
