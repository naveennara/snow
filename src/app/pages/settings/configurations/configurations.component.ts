import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as Globals from '../../../globals';
import { SettingsService } from '../settings.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.css']
})
export class ConfigurationsComponent implements OnInit {
  constants = Globals.allConstants.constantKeys;
  Config: FormGroup;
  departmentList: any[];
  orgImage = Globals.sliderImg1;
  submitted = false;
  image:any;
  imageUploaded = false;
  imgURL:any;
  imgUrldataAdmin = Globals.urls.Global_imagePath;
  configDetails = JSON.parse(sessionStorage.getItem('Config'));
  // loginDetails = JSON.parse(sessionStorage.getItem('LoginDetails'));
  @ViewChild('configRecordsFile') fileRef: ElementRef;
  
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  formSubmitted = false;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  
  constructor(private formBuilder: FormBuilder,
              public toastr: ToastrService,
              private location: Location,
              private authService: AuthService,
              public services: SettingsService) { }

  get f() { return this.Config.controls; }
  onUpdate() {
    this.submitted = true;
    const url = Globals.urls.setConfig;
    const data = Object.assign({}, this.Config.value);
    data['accountId'] = this.loginDetails.accounts[0]._id;
    const formdata = new FormData();
    if (this.imgURL) {
      formdata.append('img', this.image);
    }
    formdata.append('data', JSON.stringify(data));
    this.services.updateConfig(url, formdata).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.formSubmitted = true;
          this.toastr.success(res.message);
          this.location.back();
          // this.router.navigate(['mainLayout/categories']);
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.error(Globals.allConstants.constantKeys.serverErrMsg);
        }
      }
    );
  }
  onFileChange(event) {
    this.authService.fileUploadCheck('image', 'png|jpeg|pjpeg|jff|jpg', event.target.files[0], valid => {
      if (!valid) {
        this.toastr.info(this.constants.excelFormatMsg);
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
  cancel() {
    this.location.back();
  }
  getConfig(){
    let url = Globals.urls.getConfig + '/'+ this.loginDetails._id;
    this.services.getConfig(url).subscribe(
      (res: any) =>{
        this.Config.patchValue(res[0]);
        // if (res.status === 200) {
          
        // } else if (res.status === 204) {
        //   this.toastr.info(res.message);
        // } else {
        //   this.toastr.error('Something went wrong');
        // }
    })
  }
  ngOnInit() {
    this.Config = this.formBuilder.group({
      logo:[''],
      organisationName: ['', Validators.required],
      theme:[],
      autoApproveDevice:[]
    });
    /// this.Config.patchValue(this.configDetails);
    this.getConfig();
  }
  canDeactivate() {
    if (!this.formSubmitted && this.Config.dirty) {
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
