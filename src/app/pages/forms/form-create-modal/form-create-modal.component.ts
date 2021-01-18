import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsServicesService } from '../forms-services.service';
import * as Globals  from  '../../../globals';
import { FormBuilder, FormArray,FormGroup, Validators, FormControl,  } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-form-create-modal',
  templateUrl: './form-create-modal.component.html',
  styleUrls: ['./form-create-modal.component.css']
})
export class FormCreateModalComponent implements OnInit {
  categoriesList = [];
  submitted:boolean = false;
  isFromExist:boolean = false;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  dropdownSettings:object;
  dropdownSettings3:object;
  createForm:FormGroup;
  usersListForMap = [];
  isErr = false;
  isFileUploaded = false;
  excelFormData: any;
  formSubmitted = false;
  @ViewChild('formBuilderFile') fileRef: ElementRef;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  formKeys;
  constructor(
      private services: FormsServicesService,
      private commonService: CommonService,
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private router: Router,
      private toastr: ToastrService
  ) {this.formKeys = Globals.allConstants.constantKeys;
  }
  getCategories(){
    const url = Globals.urls.getFormsCategoryForAccount +'/'+ this.loginDetails.accounts[0]._id;
    this.services.getCategoriesUsers(url).subscribe(
      (res: any) => {
          if (res) {
           if(res.status==200){
            this.categoriesList = res.data;

           }else{
            this.categoriesList =[];
           }
          } else {
            this.categoriesList =[];
          }
        }
      );
  }
  getUsersList() {
		var url = Globals.urls.getUsersList + "/" + this.loginDetails.accounts[0]._id
		this.services.getCategoriesUsers(url).subscribe(
      (res: any) => {
          if (res) {
            if(res.status==200){
              this.usersListForMap = res.data;

            }else{
              this.usersListForMap =[];
            }
          } else {
            this.usersListForMap =[];
          }
        }
      );
	}
  get f() { return this.createForm.controls; }
  goToFormBuildArea(){
    this.submitted = true;
    if (this.createForm.value.category === 'Private') {
      if (this.createForm.value.allocatedUsers.length === 0) {
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
      if ( this.isFileUploaded) {
        // save skeleton in services
        this.services.excelFormSkeleton = this.excelFormData;
        this.services.isFileUploaded = this.isFileUploaded;
      }
      var url = Globals.urls.isFormExists + "/" +this.createForm.value.name;
      this.services.CheckFormExists(url).subscribe(
        (res: any) => {
            if (res) {
              if(res.status == 204) {
                this.isFromExist = false;
              } else if(res.status == 208) {
                this.isFromExist = true;
              }
              if (this.createForm.invalid || this.isFromExist) {
                return;
              }else{
                this.createForm.value['formType'] = 'form';
                this.createForm.value['accountId'] = this.loginDetails.accounts[0]._id;
                
                this.services.saveFormData(this.createForm.value, 'create');
                this.formSubmitted = true;
                this.router.navigate(['mainLayout/forms/formbuilder'])
              }
            } else {
              //swal(CONSTANTS.serverProblem);
            }
          }
        );
    }
  }
  onFileChange(event) {
    this.authService.fileUploadCheck('excel', 'xlsx', event.target.files[0], valid => {
      if (!valid) {
        // alert('Not a valid image file.');`
         this.toastr.info(this.formKeys.excelFormatMsg);
         this.authService.resetFile(this.fileRef);
          // return false;
        } else {
        this.isFileUploaded = true;
        const url = Globals.urls.formcreationusingexcel;
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        this.services.formCreationThroughExcel(url, formData).subscribe(
          (res: any) => {
            if (res.status === 200) {
              if (res.data) {
                this.excelFormData = res.data;
              }
            } else {
              this.toastr.warning(res.message);
            }
          });
        }
    });
  }
  excelTemplate(){
    const url = Globals.urls.downloadFile+ '/' + 'formCreationTemplate.xlsx' ;
    this.services.getUserTemplate(url).subscribe(
      (res: any) => {
      if (res) {
       
      } else {
        //swal(CONSTANTS.serverProblem);
      }
    });
}
  // ngAfterViewInit() {
  //   this.ngxSmartModalService.getModal('myModal').open();
  // }
  ngOnInit() {
    this.dropdownSettings = this.services.dropdownSettings;
    this.dropdownSettings3 = this.services.dropdownSettings3;
    this.getCategories();
    this.getUsersList();
    this.createForm = this.formBuilder.group({
      name:['', Validators.required],
      createdBy:[''],
      category:[''],  
      department:[''],  
      alternativeMailid: [''],
      allocatedUsers:[[]],
      formzCategory:['',Validators.required],
      workInstruction:[''],
      description:[''],
      isAllowMap:[false]
     
  });
  this.createForm.patchValue({
    category:'Public',
    alternativeMailid : this.loginDetails.email,
    department : this.loginDetails.accounts[0].name,
    createdBy : this.loginDetails.username
  })
  }
  canDeactivate() {
    if (!this.formSubmitted && this.createForm.dirty) {
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
