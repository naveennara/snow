import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { ChangepasswordServiceService } from './changepassword-service.service';
import { PasswordValidation } from '../login/confirmPassword';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';  
import { Location } from '@angular/common';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  @Output() setStatus: EventEmitter<any> = new EventEmitter<any>();
  changePWDForm: FormGroup;
  imageSrc = Globals.imageSrc1;
  // sliderImg1 = Globals.sliderImg1;
  // sliderImg2 = Globals.sliderImg2;
  // sliderImg3 = Globals.sliderImg3;

  myInterval = 5000;
  activeSlideIndex = 0;
  showIndicators = false;
  noWrap = false;
  carousal = [];
  loginInfo: any;
  cPWD_errMsg: string;
  cPWD_Err = false;
  errMsg: string;
  oldpassword: string;
  newpassword: string;
  confirmnewpassword: string;
  isValidFormSubmitted = false;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  constants = Globals.allConstants.constantKeys;
  tempPassword: string;
  currentPwdValid = true;
  pwdPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$@$!%*?&].{8,15}';
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private service: ChangepasswordServiceService,
              private toastr: ToastrService,
              private location: Location,
              private auth: AuthService) { }

  ngOnInit() {
    this.carousal = [
      {image: Globals.carousal_Slides.slide001},
      {image: Globals.carousal_Slides.slide002},
      {image: Globals.carousal_Slides.slide003},
      {image: Globals.carousal_Slides.slide004},
      {image: Globals.carousal_Slides.slide005},
      {image: Globals.carousal_Slides.slide006},
      {image: Globals.carousal_Slides.slide007},
      {image: Globals.carousal_Slides.slide008}
    ];

    this.changePWDForm = this.formBuilder.group({
      oldpassword: ['', [Validators.required]],
      newpassword: ['',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$@$!%*?&].{8,15}')
        ]
      ],
      confirmnewpassword: ['', [Validators.required, Validators.pattern(this.pwdPattern)]]
    },
    {
      validator: PasswordValidation.MatchPassword // your validation method
    }
  );
  }

  get f() {
    return this.changePWDForm.controls;
   }

  loginBlock() {
    if (sessionStorage.getItem('navigateToLogin') === 'true') {
      this.location.back();
      // switch(this.loginDetails.type){
      //   case 0:  this.router.navigate(['mainLayout/dashboard']);
      //   break;
      //   case 1: this.router.navigate(['mainLayout/administrators']);
      //   break;
      //   case 3: this.router.navigate(['mainLayout/users']);
      //   break;
      //   case 4: this.router.navigate(['mainLayout/approvals']);
      //   break;
      //   case 5: this.router.navigate(['mainLayout/approvals']);
      //   break;
       
      // }
    } else {
      this.setStatus.emit();
    }
  }
  onChangePWD() {
    this.isValidFormSubmitted = true;
    if (this.changePWDForm.invalid) {

    } else {
      this.loginInfo = this.loginDetails;
      this.changePWDForm.value["userId"] = this.loginInfo._id;
      this.changePWDForm.value["type"] = this.loginInfo.type;
      this.changePWDForm.value["oldpassword"] =  CryptoJS.AES.encrypt(this.changePWDForm.value["oldpassword"].trim(), 'F!3LD0N:M@G!KM!ND$').toString();
      this.changePWDForm.value["newpassword"] =  CryptoJS.AES.encrypt(this.changePWDForm.value["newpassword"].trim(), 'F!3LD0N:M@G!KM!ND$').toString();
      this.changePWDForm.value["confirmnewpassword"] =  CryptoJS.AES.encrypt(this.changePWDForm.value["confirmnewpassword"].trim(), 'F!3LD0N:M@G!KM!ND$').toString();
      this.service.changePWD(this.changePWDForm.value).subscribe(
        (res: any) => {
            switch (res.status) {
              case 200:
                // alert(res.message);
                this.toastr.success(res.message);
                this.setStatus.emit();
                this.auth.logout();
                this.router.navigate(['/login']);
                break;
              case 204:
                this.cPWD_Err = true;
                this.cPWD_errMsg = res.message;
                this.toastr.error(res.message);
                break;
              default:
                this.errMsg = 'something went wrong';
                this.toastr.error(res.message);
            }
        });
    }
  }
  verifyPassword(event) {
    this.tempPassword =  this.changePWDForm.value.oldpassword;
    const data = {};
    data['username'] = this.loginDetails.username;
    data['type'] = this.loginDetails.type;
    data['password'] = CryptoJS.AES.encrypt(this.tempPassword.trim(), 'F!3LD0N:M@G!KM!ND$').toString();
    this.service.pwdCheckforChangePassword(data).subscribe(
      (res: any) => {
        if (event.returnValue === true && res.status === false) {
          this.currentPwdValid = false;
        } else {
          this.currentPwdValid = true;
        }
      }
    );
  }
  changeCurrentPwd() {
    this.currentPwdValid = true;
  }
}
