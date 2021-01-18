import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { loginServices } from './login.service';
import * as Globals from '../../globals';
import { DeviceDetectorService } from 'ngx-device-detector';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ToastrService } from 'ngx-toastr';
import { ChangepasswordServiceService } from '../../pages/changepassword/changepassword-service.service';
import * as CryptoJS from 'crypto-js';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [loginServices]
})

export class LoginComponent implements OnInit {

  imageSrc = Globals.imageSrc1;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  myInterval = 8000;
  activeSlideIndex = 0;
  showIndicators = false;
  noWrap = false;

  // Set the type based on login
  Login: boolean = true;
  ForgotPassword: boolean = false;
  DualRole: boolean = false;
  changePwd: boolean = false;
  carousal = [];
  hours: any;
  static_Carousal = [];
  errMsg: string;
  loginInfo: any;
  isErr: boolean;
  forgotErr: any;
  forgotPwdMsg: any;
  selectedRole: any;
  dualRoleParams: Object = {};
  LoggedINType: any;
  deviceInfo = null;
  cPWD_errMsg: string;
  cPWD_Err: boolean = false;

  oldpassword: string;
  newpassword: string;
  confirmnewpassword: string;
  // changePWDForm: FormGroup;
  userlogin: FormGroup;
  forgotpassword: FormGroup;
  dualUserlogin: FormGroup;
  constants = Globals.allConstants.constantKeys;
  // pattern check validations
  pwdPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$@$!%*?&].{8,10}';
  isValidFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: loginServices,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private auth: AuthService,
    public ngxSmartModalService: NgxSmartModalService,
    private changePasswordService: ChangepasswordServiceService,
    private toastr: ToastrService
  ) { }
  @Output() setStatus: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit() {
    
  
    const today = new Date();
    const curHr = today.getHours();
    this.hours = curHr;

    this.carousal = [
      { image: Globals.carousal_Slides.slide001 },
      { image: Globals.carousal_Slides.slide002 },
      { image: Globals.carousal_Slides.slide003 },
      { image: Globals.carousal_Slides.slide004 },
      { image: Globals.carousal_Slides.slide005 },
      { image: Globals.carousal_Slides.slide006 },
      { image: Globals.carousal_Slides.slide007 },
      { image: Globals.carousal_Slides.slide008 }
    ];

    this.static_Carousal = [
      {
        title: 'Photo Capture',
        displayIcon: Globals.Icons.camera,
        description: 'Easily capture explicate image data with any smart device. Real-time accessing and storing of data is a cake walk with photo capture.'
      }, {
        title: 'GPS & Bar Code',
        displayIcon: Globals.Icons.map,
        description: 'Supervisors can control the field from multiple locations with user tracking and real time data . Scan QR and barcodes from your device into the forms.'
      }, {
        title: 'Digital Signature',
        displayIcon: Globals.Icons.digitalSignature,
        description: 'Expedite client approvals, sign contracts and agreements on time.Notify your team once work is completed and send work order copy on-the-fly.'
      }, {
        title: 'Time Stamps',
        displayIcon: Globals.Icons.timeStamp,
        description: 'Use timestamp features to show when work was performed, how long it took and when it was completed. Get all the history you need to manage assets and report time and work accurately.'
      }, {
        title: 'Flexible Dashboards',
        displayIcon: Globals.Icons.dashboard,
        description: 'Customise your forms to suit your business type using our administrative dashboards. Export, evaluate and review collected data and make timely, informed decisions.'
      }, {
        title: 'Multiple User Facility',
        displayIcon: Globals.Icons.multipleUserFacility,
        description: 'Enable your users to access data across accounts with admins and sub-admins. Empower users to create and customise their forms and improve functionality with user-groups for different accounts.'
      }, {
        title: 'Design Custom Forms',
        displayIcon: Globals.Icons.form,
        description: 'Create forms from scratch according to your needs or use standard templates designed for diverse business types. Launch and assign tasks using our forms, in real-time.'
      }, {
        title: 'Built-in Services Integration',
        displayIcon: Globals.Icons.builtinServices,
        description: 'Enhance, data storage, security and authorisation by integrating your forms with any existing system, like, SAP, Oracle, CIS etc.Automate processes and integrate collected information with any system.'
      },{
        title: 'Dataloader',
        displayIcon: Globals.Icons.dataloader,
        description: 'Bring your own industrial format GIS data.'
      },{
        title: 'GSA Lite',
        displayIcon: Globals.Icons.gsalite,
        description: 'Powerful geospatial business intelligence solution. GeoSpatial Analysis makes it possible to optimize the enterprise-wide usage of data.'
      },{
        title: 'Visualization',
        displayIcon: Globals.Icons.preview,
        description: 'Preview your GIS data on map.'
      }
    ];

    if (curHr < 12) {
      this.carousal.splice(0, 0, { image: Globals.greetings.GM });
      this.static_Carousal.splice(0, 0,
        {
          title: 'Welcome to Spatial Now',
          subtitle: 'Unlock your industrial data - A single solution for all your GIS operations',
          displayIcon: Globals.Icons.GM,
          greetings: 'Good Morning!'
        });
    } else if (curHr < 18) {
      this.carousal.splice(0, 0, { image: Globals.greetings.GA });
      this.static_Carousal.splice(0, 0,
        {
          title: 'Welcome to Spatial Now',
          subtitle: 'Unlock your industrial data - A single solution for all your GIS operations',
          displayIcon: Globals.Icons.GA,
          greetings: 'Good Afternoon!'
        });
    } else {
      this.carousal.splice(0, 0, { image: Globals.greetings.GE });
      this.static_Carousal.splice(0, 0,
        {
          title: 'Welcome to Spatial Now',
          subtitle: 'Unlock your industrial data - A single solution for all your GIS operations',
          displayIcon: Globals.Icons.GE,
          greetings: 'Good Evening!'
        });
    }

    this.userlogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.forgotpassword = this.formBuilder.group({
      username: ['', [Validators.required]]
    });

    this.dualUserlogin = this.formBuilder.group({
      DARole: [''],
      GARole: ['']
    });

    this.isErr = false;
    this.deviceInfo = this.deviceService.getDeviceInfo();
  }

  gotoCommon() {
    this.router.navigate(['mainLayout/dashboard']);
  }

  loginBlock() {
    this.Login = true;
    this.ForgotPassword = false;
    this.DualRole = false;
    this.changePwd = false;
    this.userlogin.reset();
    this.isErr = false;
  }

  forgotPwd() {
    this.Login = false;
    this.ForgotPassword = true;
    this.DualRole = false;
    this.changePwd = false;
  }

  dualRole() {
    this.Login = false;
    this.ForgotPassword = false;
    this.DualRole = true;
    this.changePwd = false;
  }

  firstLogin() {
    this.Login = false;
    this.ForgotPassword = false;
    this.DualRole = false;
    this.changePwd = true;
    sessionStorage.setItem('navigateToLogin', 'false');
    this.changePasswordService.setVariable(false);
  }

  // @PK => Dual Role Logins
  setRole(type) {
    this.selectedRole = type;
    this.dualRoleParams["type"] = this.selectedRole;
    this.dualRoleParams["browser"] = this.deviceInfo.browser;
    this.service.DualLogin(this.dualRoleParams).subscribe(
      (res: any) => {
        switch (res.status) {
          case 200:
            this.loginInfo = res.user[0];
            sessionStorage.setItem('Token',CryptoJS.AES.encrypt(res.token.trim(), Globals.secretKey).toString());
            sessionStorage.setItem('Config', JSON.stringify(res.configuration[0]));
            sessionStorage.setItem('LoginDetails', CryptoJS.AES.encrypt(JSON.stringify(this.loginInfo).trim(), Globals.secretKey).toString());
            this.LoggedINType = res.user[0].type;
            if (this.LoggedINType === 1 || this.LoggedINType === 3) {
              if (this.loginInfo.isFirstLogin === true) {
                this.firstLogin();
              }
              else {
                let routes = Globals.routes;
                for (const key of Object.keys(routes)) {
                  if (this.loginInfo.privilege.privilegeList.includes(key)) {
                    this.router.navigate([routes[key]]);
                    this.auth.sendToken(CryptoJS.AES.encrypt(res.token.trim(), Globals.secretKey).toString());
                    this.toastr.success(Globals.allConstants.constantKeys.welcomeMsg + ' ' + this.loginInfo.name + ' ' +this.loginInfo.lastname);
                    return true;
                  }
                }
              }
            }

            else {
              this.router.navigate(['mainLayout/dashboard']);
              this.auth.sendToken(CryptoJS.AES.encrypt(res.token.trim(), Globals.secretKey).toString());
              // Toast.fire({
              //   type: 'success',
              //   title: 'Welcome' + ' ' + this.loginInfo.username
              // });
            }
            break;

          case 204:
            this.isErr = true;
            this.errMsg = res.message;
            break;
          case 208:
          this.ngxSmartModalService.getModal('concurrentModel').open();
          break;
          default:
            this.errMsg = 'something went wrong';

        }

      }
    );
  }

  // Logins
  onLoginSubmit(info) {
    let data = Object.assign({},info);
    data["browser"] = this.deviceInfo.browser;
    this.dualRoleParams = data;
    this.isErr = false;
    // sessionStorage.setItem('Token', 'asfsf');
    data.username = data.username.trim();
    data.password = CryptoJS.AES.encrypt(data.password.trim(), 'F!3LD0N:M@G!KM!ND$').toString();
    this.service.Login(data).subscribe(
      (res: any) => {
        this.afterLogin(res);
      }
    );
  }
  afterLogin(res) {
    switch (res.status) {
      case 200:
        this.loginInfo = res.user[0];
        sessionStorage.setItem('Token',CryptoJS.AES.encrypt(res.token.trim(), Globals.secretKey).toString());
        sessionStorage.setItem('Config', JSON.stringify(res.configuration[0]));
        sessionStorage.setItem('LoginDetails', CryptoJS.AES.encrypt(JSON.stringify(this.loginInfo).trim(), Globals.secretKey).toString());
        if (this.loginInfo.type.toString() == '2') {
          // webuser acess
          if (this.loginInfo.isFirstLogin === true) {
            this.firstLogin();
            return;
          }
          this.router.navigate(['webuser/assignments']);
          this.auth.sendToken(CryptoJS.AES.encrypt(res.token.trim(), Globals.secretKey).toString());
          this.toastr.success(Globals.allConstants.constantKeys.welcomeMsg + ' ' + this.loginInfo.name + ' ' +this.loginInfo.lastname);

        }
        else if (this.loginInfo.type == 4) {
          if (this.loginInfo.isFirstLogin == true) {
            this.firstLogin();
          }
          else {
            this.router.navigate(['mainLayout/approvals']);
            this.auth.sendToken(CryptoJS.AES.encrypt(res.token.trim(), Globals.secretKey).toString());
            this.toastr.success(Globals.allConstants.constantKeys.welcomeMsg + ' ' + this.loginInfo.name + ' ' +this.loginInfo.lastname);
          }
        }

        else {
          if (this.loginInfo.isFirstLogin == true) {
            this.firstLogin();
          } else {
            let routes = Globals.routes;
            for (const key of Object.keys(routes)) {
              if (this.loginInfo.privilege.privilegeList.includes(key)) {
                this.router.navigate([routes[key]]);
                this.auth.sendToken(CryptoJS.AES.encrypt(res.token.trim(), Globals.secretKey).toString());
                this.toastr.success(Globals.allConstants.constantKeys.welcomeMsg + ' ' + this.loginInfo.name + ' ' +this.loginInfo.lastname);
                return true;
              }
            }

          }
        }
        break;
      // DualRole
      case 202:
        // Invoke dualRole UI Card
        this.dualRole();
        break;
      // ======== //
      case 204:
        this.isErr = true;
        this.errMsg = res.message;
        break;
        case 207:
        this.isErr = true;
        this.errMsg = res.message;
        break;
        case 408:
        this.isErr = true;
        this.errMsg = res.message;
        break;
        case 208:
          this.ngxSmartModalService.getModal('concurrentModel').open();
          break;
      default:
        this.errMsg = 'something went wrong';
    }
  }
  onForgotPWD(data) {
    this.service.resetPWD(data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.forgotErr = false;
          this.toastr.success(res.message);
        } else if (res.status === 204) {
          this.forgotErr = true;
          this.forgotPwdMsg = res.message;
          this.toastr.success(res.message);
        } else {
          this.toastr.success(Globals.allConstants.constantKeys.serverErrMsg);
        }
      }
    );
  }
  continue(){
    let url = Globals.urls.licenseReleaseForExistinglogin;
    let data = { };
     data['username'] = this.userlogin.value.username;
     if(this.DualRole == true){
      data['type']= this.selectedRole;
     }
    this.service.concurrent(url,data).subscribe(
      (res: any) => {
        this.afterLogin(res);
        this.ngxSmartModalService.getModal('concurrentModel').close();
      }
      );
  }
  loginVariable() {
    this.Login = true;
    this.changePwd = false;
    this.ForgotPassword = false;
    this.DualRole = false;
    this.userlogin.reset();
  }
  changeCredentials() {
    this.isErr = false;
  }
}
