import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import * as Globals from '../../../globals';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {

  createuser: FormGroup;
  submitted = false;
  imgURL: any;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  userkeys: any;
  image: any;
  formSubmitted = false;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  
  constructor(private formBuilder: FormBuilder,
              private services: UsersService,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) {
                this.userkeys = Globals.allConstants.constantKeys;
               }


// Function Code: U-7
  ngOnInit() {
    this.createuser = this.formBuilder.group({
     // username: ['', Validators.required],
      name: ['', Validators.required],
      lastname:['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.minLength(10),
        Validators.maxLength(12),
        Validators.pattern('^[0-9]*$')]],
      img: ['']
    });
  }
  // Function Code: U-8
  createUser(valid) {
    this.submitted = true;
    if (!valid) {
      return;
    } else {
      this.createuser.value['accounts'] = this.loginDetails.accounts;
      this.createuser.value['createdByMailID'] = this.loginDetails.email;
      this.createuser.value['createdBy'] = this.loginDetails.username;
      this.createuser.value['type'] = [2];
      const formdata = new FormData();
      formdata.append('img', this.image);
      formdata.append('data', JSON.stringify(this.createuser.value));
      const url = Globals.urls.createUser;
      this.services.createUser(url, formdata).subscribe(
        (res: any) => {
            if (res.status === 200) {
              this.formSubmitted = true;
              this.toastr.success(res.message);
              this.router.navigate(['mainLayout/users']);
            } else {
              this.toastr.info(res.message);
            }
        });
    }
  }
  get f() {
    return this.createuser.controls;
   }
  // Function Code: U-9
    onFileChange(event) {
      this.authService.fileUploadCheck('image', 'png|jpeg|pjpeg|jff|jpg', event.target.files[0], valid => {
        if (!valid) {
           this.toastr.info('Please attach JPEG and PNG formatted image file only');
          } else {
            const reader = new FileReader();
            if (event.target.files && event.target.files.length) {
              const [file] = event.target.files;
              reader.readAsDataURL(file);
              reader.onload = () => {
                this.imgURL =  reader.result;
                this.image = file;
              };
            }
          }
      });
    }
    clearImg(event,element){
      this.imgURL = "";
      this.image  = '';
      element.value = "";

    }
    canDeactivate() {
      if (!this.formSubmitted && this.createuser.dirty) {
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
