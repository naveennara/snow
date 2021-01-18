import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import * as Globals from '../../../globals';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

  updateuser: FormGroup;
  userId: string;
  imgURL: any;
  imageUploaded: boolean = false;
  imgUrldataUser = Globals.urls.Global_imagePath;
  dropdownSettings: object;
  accounts: any;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  showButton = true;
  departmentList: any[]=[];
  submitted = false;
  selectedDepartments: any;
  userkeys: any;
  imageChange = false;
  image: any;
  formSubmitted = false;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;

  constructor(private formBuilder: FormBuilder,
    private services: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private commonservice: CommonService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { this.userkeys = Globals.allConstants.constantKeys; }
  // Function Code: U-10
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params[this.userkeys.userId];
    });
    this.dropdownSettings = this.services.dropdownSettings;
    this.updateuser = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.minLength(10),
      Validators.maxLength(12),
      Validators.pattern('^[0-9]*$')]],
      imageurl: [''],
      accounts: [[]]
    });
    if (this.loginDetails.privilege[Globals.Privileges['users']] == 0) {
      this.updateuser.disable();
      this.showButton = false;
    }
    this.edituser();
  }
  back() {
    this.router.navigate(['mainLayout/users']);
  }
  // Function Code: U-11
  getDepartments() {
    let url: string;
    url = Globals.urls.getAllListOfDepartments + '/' + null;
    this.services.getDepartments(url).subscribe(
      (res: any) => {
        if (res) {
          this.departmentList = res.data;
          const result = this.accounts.filter(obj => {
            const result2 = this.departmentList.findIndex(obj1 => obj1._id === obj._id);
            if (result2 !== -1) {
              this.departmentList[result2]['disabled'] = true;
            } else {
            }
          });
          this.selectedDepartments = this.departmentList;
        } else {
          this.departmentList = [];
        }
      }
    );
  }
  get f() { return this.updateuser.controls; }
  // Function Code: U-12
  edituser() {
    if (this.loginDetails['type'] === 3) {
      this.commonservice.editActivated.next(false);
    } else {
      this.commonservice.editActivated.next(true);
    }
    const url = Globals.urls.editUser + '/' + this.userId;
    this.services.editUser(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
              this.getDepartments();
              this.accounts = res.data.accounts;     
              this.updateuser.patchValue(res.data);
          } else {

          }
         
        }
      });
  }
  // Function Code: U-13
  onFileChange(event) {
    this.authService.fileUploadCheck('image', 'png|jpeg|pjpeg|jff|jpg', event.target.files[0], valid => {
      if (!valid) {
        this.toastr.info(this.userkeys.fileFormatMsg);
      } else {
        this.imageChange = true;
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
  // Function Code: U-14
  updateUser(valid) {
    let url: string;
    this.submitted = true;
    if (!valid) {
      return;
    } else {
      this.updateuser.value.accounts.map(obj => {
        if (obj.disabled) {
        } else {
          obj['disabled'] = true;
        }
      });
      this.updateuser.value['createdByMailID'] = this.loginDetails.email;
      this.updateuser.value['createdBy'] = this.loginDetails.username;
      this.updateuser.value['type'] = [2];
      const formdata = new FormData();
      if (this.imgURL) {
        formdata.append('img', this.image);
      }
      formdata.append('data', JSON.stringify(this.updateuser.value));
      url = Globals.urls.updateUser + '/' + this.userId;
      this.services.updateUser(url, formdata).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.formSubmitted = true;
            this.toastr.success(res.message);
            this.router.navigate(['mainLayout/users']);
          } else {
            this.toastr.info(res.message);
          }
        }
      );
    }
  }
  canDeactivate() {
    if (!this.formSubmitted && this.updateuser.dirty) {
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
