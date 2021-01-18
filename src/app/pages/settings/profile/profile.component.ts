import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { settingsConstansts } from '../settings-constants';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import * as Globals from '../../../globals';
import { SettingsService } from '../settings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constants = Globals.allConstants.constantKeys;
  profile: FormGroup;
  submitted: boolean = false;
  imageUploaded: boolean = false;
  imgURL: any;
  image:any;
  viewAdminData;
  imgUrldataAdmin = Globals.urls.Global_imagePath;
  // loginDetails = JSON.parse(sessionStorage.getItem('LoginDetails'));
  @ViewChild('configRecordsFile') fileRef: ElementRef;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  formSubmitted = false;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  
  constructor(private formBuilder: FormBuilder,
              public service: SettingsService,
              private router: Router,
              private location: Location,
              private authService: AuthService,
              public toastr: ToastrService,
              public commonservice: CommonService) { }

  ngOnInit() {
    this.profile = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      imageurl: [''],
      type: [''],
      lastname: ['',Validators.required],
      phone: ['', [Validators.required, Validators.minLength(10),
      Validators.maxLength(12),
      Validators.pattern('^[0-9]*$')]]
    });
    this.viewProfile();
  }
  get f() { return this.profile.controls; }
  viewProfile() {
   // this.commonservice.editActivated.next(true);
  
    const url = Globals.urls.editAdministrator + '/' + this.loginDetails._id;
    this.service.viewProfile(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status == 200) {
            this.viewAdminData = res.data;
            this.profile.patchValue(res.data);

          }
          else if (res.status == 204) {

          }
        } else {
          this.toastr.info(res.data.message);
        }
      });
  }
  onUpdate() {
    this.submitted = true;
    if (this.profile.invalid) {
      return;
    } else {
      const data = Object.assign({}, this.profile.value);     
      let formdata = new FormData();
      if (this.imgURL) {
          formdata.append('img', this.image);
        }
      formdata.append('data', JSON.stringify(data));
      let url = Globals.urls.updateProfile + '/' + this.loginDetails._id;

      this.service.updateProfile(url, formdata).subscribe(
          (res: any) => {
            if (res.status == 200) {
              this.formSubmitted = true;
              this.router.navigate(['mainLayout/settings']);
              this.toastr.success(res.message);
              sessionStorage.setItem('LoginDetails',
            CryptoJS.AES.encrypt(JSON.stringify(res.data).trim(), Globals.secretKey).toString());
            this.commonservice.configSettings.next('profile');
            } else {
              this.toastr.info(res.message);
            }
          }
        );
      }
    }
    cancel() {
      this.location.back();
    }

    keyPress(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode !== 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
    onFileChange(event) {
    this.authService.fileUploadCheck('image', 'png|jpeg|pjpeg|jff|jpg', event.target.files[0], valid => {
      if (!valid) {
        this.toastr.info(this.constants.fileFormatMsg);
        this.authService.resetFile(this.fileRef);
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
    canDeactivate() {
      if (!this.formSubmitted && this.profile.dirty) {
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
