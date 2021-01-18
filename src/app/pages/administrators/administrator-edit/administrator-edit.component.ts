import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl, } from '@angular/forms';
import { AdministratorServiceService } from '../administrator-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as Globals from '../../../globals';
import { TabsetComponent } from 'ngx-bootstrap';
import { Administrators } from '../administrators';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-administrator-edit',
  templateUrl: './administrator-edit.component.html',
  styleUrls: ['./administrator-edit.component.css']
})
export class AdministratorEditComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  adminId: string;
  editAdmin: FormGroup;
  dropdownSettings: object;
  dropdownSettings1: object;
  deptList: any[];
  submitted: boolean = false;
  imgURL: any;
  imageUploaded: boolean = false;
  singleSelection: boolean;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  roleChecked: number[] = [];
  editAdminData: Administrators;
  imgUrldataAdmin = Globals.urls.Global_imagePath;
  dropdownDisabled: boolean;
  deptErrMsg = false;
  accounts: any;
  adminKeys: any;
  preview = false;
  formSubmitted = false;
  image:any;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8))
  constructor(private formBuilder: FormBuilder,
              private services: AdministratorServiceService,
              private router: Router, private route: ActivatedRoute,
              private toastr: ToastrService,
              private authService: AuthService,
              private commonservice: CommonService) {
    this.adminKeys =  Globals.allConstants.constantKeys;

  }
  UpdateAdministrator() {
    this.submitted = true;
    if (this.editAdmin.invalid) {
      return;
    } else {
      this.editAdmin.value.accounts.map(obj => {
        if (obj.disabled) {
        } else {
          obj['disabled'] = true;
        }
      });
      if (this.roleChecked.length!=0 && this.editAdmin.value.accounts[0] === undefined) {
        this.deptErrMsg = true;
        return;
      } else {
        this.deptErrMsg = false;
        const data = Object.assign({}, this.editAdmin.value);
      
        if (this.roleChecked.length > 0) {

          data[this.adminKeys['type']] = this.roleChecked
        }
        else {
          data[this.adminKeys['type']] = [this.editAdminData[this.adminKeys['type']]]
        }
        let formdata = new FormData();
        if (this.imgURL) {
          formdata.append('img', this.image);

        }
        formdata.append('data', JSON.stringify(data));
        let url = Globals.urls.updateAdministrator + '/' + this.adminId;

        this.services.updateAdministrator(url, formdata).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formSubmitted = true;
              this.router.navigate(['mainLayout/administrators'])
              this.toastr.success(res.message);
            }
            else {
              this.toastr.info(res.message);
            }
          }
        );
      }
    }
  }
  onFileChange(event) {
    this.authService.fileUploadCheck('image', 'png|jpeg|pjpeg|jff|jpg', event.target.files[0], valid => {
      if (!valid) {
        this.toastr.info(this.adminKeys.fileFormatMsg);
       } else {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
          this.imageUploaded = true;
          const [file] = event.target.files;
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imgURL = reader.result;
            this.image = file;
          };
        }
    
       }
    });
    
      }
  getALLDepartments() {
    const url = Globals.urls.getAllListOfDepartments + '/'+null;
    this.services.getDepartments(url).subscribe((deptList: any[]) => {
      this.deptList = deptList;
      if (this.accounts !== undefined && this.deptList.length > 0) {
        this.accounts.filter(obj => {
          const result2 = this.deptList.findIndex(obj1 => obj1._id === obj._id);
          if (result2 !== -1) {
            this.deptList[result2]['disabled'] = true;
          }
        });
      }
    });

  }
  editAdministrator() {
   
    const url = Globals.urls.editAdministrator + '/' + this.adminId;
    this.services.editAdministrator(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status == 200) {
            this.editAdminData = res.data;
            this.editAdmin.patchValue(this.editAdminData);
            if(this.loginDetails.type ==1 && this.editAdminData['createdBy'] != this.loginDetails._id){
              this.preview = true;
            }
            if (!this.preview) {
              this.commonservice.editActivated.next(true);
            } else {
              this.commonservice.editActivated.next(false);
            }
            if (this.editAdminData[this.adminKeys['accounts']].length > 0) {
              this.dropdownDisabled = true;
            } else {
              //this.staticTabs.tabs[2].disabled = true;
            }
            if (this.editAdminData[this.adminKeys['type']] == 1) {
              this.getDepartments();
              this.singleSelection = true;
              //this.staticTabs.tabs[2].disabled = true;

            } else if (this.editAdminData[this.adminKeys['type']] == 3) {
              this.getALLDepartments();
              this.accounts = this.editAdminData.accounts;
              this.singleSelection = false;
              // this.staticTabs.tabs[2].disabled = true;
            } else {
              this.getALLDepartments();
              this.singleSelection = false;
            }

          }
          else if (res.status == 204) {

          }
        }
        else {
          this.toastr.info(res.data.message);
        }
      });
  }
  roleType(option, event) {
    let index = this.roleChecked.indexOf(option);
    if (event.target.checked) {
      if (index === -1) {
        this.roleChecked.push(option);
      }
    } else {

      if (index !== -1) {
        this.roleChecked.splice(index, 1);
      }
    }
    if (this.roleChecked.length > 0) {
      // this.staticTabs.tabs[2].disabled = true;
      if(this.loginDetails.type == 0){
        this.editAdmin.patchValue({
          accounts: []
        });
      }
     
      if (this.editAdmin.value[this.adminKeys['accounts']][0] && this.editAdmin.value[this.adminKeys['accounts']][0].length > 0) {
        this.deptErrMsg = false;

      } else {
        this.deptErrMsg = true;
        this.dropdownDisabled = false;
      }
      if (this.roleChecked.length > 1 || this.roleChecked[0] == 1) {
        this.getDepartments();
        this.singleSelection = true;
      } else if (this.roleChecked[0] == 3) {
        this.getALLDepartments();
        this.singleSelection = false;
      }
    }
    else if (this.roleChecked.length == 0 && this.editAdmin.value[this.adminKeys['accounts']].length > 0) {
      // this.staticTabs.tabs[2].disabled = false;
      this.singleSelection = false;
      this.getALLDepartments();
    }
    else {
      this.deptErrMsg = false;
    }

  }
  addCheckboxes(option) {
    if (this.editAdminData) {
      if (this.editAdminData[this.adminKeys['privilege']].length > 0 && this.editAdminData[this.adminKeys['privilege']].indexOf(option) !== -1) {
        return true;
      }
      else {
        return false;
      }
    }
  }
  checkedType(type) {
    if (this.editAdminData) {

      if (this.editAdminData[this.adminKeys['type']] == type) {
        return true;
      }
      else {
        return false;
      }

    }
  }
  checkValidations(tabId) {


    if (this.editAdmin.invalid) {

      this.staticTabs.tabs[tabId].active = false;
      this.staticTabs.tabs[tabId - 1].active = true;
      return;

    } else {
    }
  }
  getDepartments() {
    const url = Globals.urls.getUnMappedDept;
    this.services.getDepartments(url).subscribe((deptList: any[]) => {
      this.deptList = deptList;
    });

  }

 
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  get f() { return this.editAdmin.controls; }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.adminId = params['adminId'];
    });
   
    this.dropdownSettings = this.services.dropdownSettings;
    this.dropdownSettings1 = this.services.dropdownSettings1;
   // const formControls = this.privilege.map(control => new FormControl(false));

    this.editAdmin = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      accounts: [''],
      imageurl: [''],
      // privilege: new FormArray(formControls),
      type: [''],
      lastname: ['', Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10),
      Validators.maxLength(12),
      Validators.pattern('^[0-9]*$')]]
    });
    this.editAdministrator();
    if (this.loginDetails['privilege'][Globals.Privileges.admins] === 0) {
      this.preview = true;
    }
    else {
      this.preview = false;
    }
  }
  canDeactivate() {
    if (!this.formSubmitted && this.editAdmin.dirty) {
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
