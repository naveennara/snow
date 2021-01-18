import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl, } from '@angular/forms';
import { AdministratorServiceService } from '../administrator-service.service';
import { Router } from '@angular/router';
import * as Globals from '../../../globals';
import { TabsetComponent } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-administrator-create',
  templateUrl: './administrator-create.component.html',
  styleUrls: ['./administrator-create.component.css']
})
export class AdministratorCreateComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  dropdownSettings: object;
  createAdmin: FormGroup;
  deptList: any[];
  submitted = false;
  formSubmitted = false;
  imgURL: any;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  //privilege = Globals.sidebarPrivileges;
  singleSelection: boolean = false;
  dropdownSettings1: object;
  roleChecked: number[] = [];
  deptErrMsg = false;
  adminKeys: any;
  image: any;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));

  constructor(private formBuilder: FormBuilder,
    private services: AdministratorServiceService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.adminKeys =  Globals.allConstants.constantKeys;
  }
  createAdministrator() {
    this.submitted = true;
    if (this.createAdmin.invalid) {
      return;

    } else {
      if (this.deptErrMsg && this.createAdmin.value.accounts[0] === undefined) {
        return;
      } else {
        const url = Globals.urls.createAdmin;
        const data = Object.assign({}, this.createAdmin.value);
        if (this.loginDetails.type == 0) {
          if (this.roleChecked.length == 0 && this.createAdmin.value[this.adminKeys['accounts']].length == 0) {
            data[this.adminKeys['type']] = [4];
          } else if (this.roleChecked.length == 0 && this.createAdmin.value[this.adminKeys['accounts']].length > 0) {
            data[this.adminKeys['type']] = [5];
          }
          else {
            data[this.adminKeys['type']] = this.roleChecked;
          }
        } else {
          if (this.roleChecked.length == 0) {
            data[this.adminKeys['type']] = [5];
          } else {
            data[this.adminKeys['type']] = this.roleChecked;
          }
        }
        data['createdBy'] = this.loginDetails._id;

        const formdata = new FormData();
        formdata.append('img', this.image);
        formdata.append('data', JSON.stringify(data));
        this.services.createAdministrator(url, formdata).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formSubmitted = true;
              this.router.navigate(['mainLayout/administrators']);
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
  clearImg(event, element) {
    this.imgURL = "";
    this.image = '';
    element.value = "";
    // this.createAdmin.value.nativeElement.reset()
  }

  checkValidations(tabId) {

    if (this.createAdmin.invalid) {
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
  getALLDepartments() {

    const url = Globals.urls.getAllListOfDepartments + '/'+null;
    this.services.getDepartments(url).subscribe((deptList: any[]) => {
      this.deptList = deptList;
    });
  }
  get f() { return this.createAdmin.controls; }

  onFileChange(event) {
    this.authService.fileUploadCheck('image', 'png|jpeg|pjpeg|jff|jpg', event.target.files[0], valid => {
      if (!valid) {
        this.toastr.info(this.adminKeys.fileFormatMsg);
      } else {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.imgURL = reader.result;
            this.image = file;
          };
        }
      }
    })
  }
  enableCreate() {
    if (this.roleChecked.length > 0) {
      return true;
    } else if (this.roleChecked.length === 0 && this.createAdmin.value.accounts.length > 0) {
      return false;
    } else {
      return true;
    }
  }

  roleType(option, event) {

    const index = this.roleChecked.indexOf(option);
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
      //  this.staticTabs.tabs[2].disabled = true;
      if (this.loginDetails.type == 0) {
        this.createAdmin.patchValue({
          accounts: []
        });
      }

      if (this.roleChecked.length > 1 || this.roleChecked[0] === 1) {
        this.getDepartments();
        this.singleSelection = true;
      } else if (this.roleChecked[0] === 3) {
        this.getALLDepartments();
        this.singleSelection = false;
      }
      if (this.createAdmin.value.accounts[0] && this.createAdmin.value.accounts[0].length > 0) {
        this.deptErrMsg = false;
      } else {
        this.deptErrMsg = true;
      }
    } else {
      this.singleSelection = false;
      this.getALLDepartments();
      this.deptErrMsg = false;
    }

  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode !== 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
    this.getALLDepartments();
    this.dropdownSettings = this.services.dropdownSettings;
    this.dropdownSettings1 = this.services.dropdownSettings1;
    this.createAdmin = this.formBuilder.group({
      //username: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['',Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      accounts: [[]],
      img: [''],
      // privilege: new FormArray(formControls),
      type: [''],
      phone: ['', [Validators.required, Validators.minLength(10),
      Validators.maxLength(12),
      Validators.pattern('^[0-9]*$')]]
    });
    if (this.loginDetails.type != 0) {
      this.createAdmin.patchValue({ accounts: this.loginDetails.accounts });
    }
  }
  canDeactivate() {

    if (!this.formSubmitted && this.createAdmin.dirty) {
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
