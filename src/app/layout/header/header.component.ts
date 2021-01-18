import { Component, HostListener,OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { headerServices } from './header.service';
import * as Globals from '../../globals';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AuthService } from '../../auth.service';
import { ChangepasswordServiceService } from '../../pages/changepassword/changepassword-service.service';
import * as $ from 'jquery';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CommonService } from '../../sharing/sharing-module/common.service';
import { TabsetComponent } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserIdleService } from 'angular-user-idle';
import * as CryptoJS from 'crypto-js';
import { DeviceManagementServiceService } from '../../pages/device-management/device-management-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [headerServices]
})
export class HeaderComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  selectUser: FormGroup;
  headerInfo: any;
  imagePath: any;
  imageIcons = Globals.svgIcons;
  //storedValue: any;
  deviceInfo = null;
  showMenu: boolean = false;
  require: any;
  filtersList: any[];
  imageSrc = Globals.imageSrc;
  orgImage = Globals.sliderImg1;
  currentRoute: Router;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  configDetails = JSON.parse(sessionStorage.getItem('Config'));
  headerTexts = [];
  closeResult: any;
  icon;
  headerText;
  isTrue = false;
  users = [];
  isUsers = false;
  setOfPreviliges = [];
  roleType: number;
  Previlieges = [];
  previlegesValues = [];
  enable = false;
  change = false;
  uncheckedLabel = 'view';
  checkedLabel;
  approvalsCount = {};
  privileges = this.loginDetails.privilege.privilegeList;
  imgUrldataAdmin = Globals.urls.Global_imagePath;
  profileData;
  timeout;
  constants = Globals.allConstants.constantKeys;
  subscriptions: Subscription[]=[];
  //@HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    let countValue = JSON.parse(sessionStorage.getItem('Count'));
      if(Number(countValue) == 1){
        this.logOut(this.headerInfo);
        $event.returnValue = "Are you sure you want close?)";

      }else{
        countValue = countValue- 1;
        sessionStorage.setItem('Count', JSON.stringify(countValue));
      }
  }
  constructor(
    private formBuilder: FormBuilder,
    private service: headerServices,
    private router: Router,
    private deviceService: DeviceDetectorService,
    private auth: AuthService,
    private changePasswordService: ChangepasswordServiceService,
    public ngxSmartModalService: NgxSmartModalService,
    private commonservice: CommonService,
    private userIdle: UserIdleService,
    private deviceManagementService: DeviceManagementServiceService
    // private location: PlatformLocation
  ) {
    this.currentRoute = router;
  }
 
  setradio(type) {
    this.isUsers = true;
    if (type === 'DA') {
      this.roleType = 1;
      this.Previlieges = [
        'Administrators',
        'Accounts',
        'Users',
        'Categories',
        'Device Management',
        'Templates',
        'Forms',
        'Tasks',
        'Projects',
        'Worlflow Management'
      ];
    } else if (type === 'GA') {
      this.roleType = 3;
      // this.users = ['Account Admin', 'Moderator'];
    } else {
      this.roleType = 4;
    }
    const url = Globals.urls.getUsersByType + '/' + this.roleType;
    this.service.getListOfUsers(url).subscribe((res: any) => {
      if (res.status === 200) {
        this.users = res.data;
      } else {
      }
    });
  }
  onChange(value: boolean) {
    this.change = value;
    if (this.change === true) {
      this.uncheckedLabel = 'view';
    } else {
      this.checkedLabel = 'edit';
    }
  }
  togglePreviliege() {
  }
  redirect(key) {
    if (key == 0) {
      this.deviceManagementService.pendingDevices = true;
      this.router.navigate(['mainLayout/deviceManagement']);
      this.commonservice.devicesPending.next('devices');
      //this.approvalsCount['pendingDevicesCount'] = 0;
    } else if (key == 1) {
      this.router.navigate(['mainLayout/approvals']);
      // this.approvalsCount['pendingTasksCount'] = 0;
    }
  }
  onCheck(list) {
    // this.previlegesValues[list] = {isShow: 'true', toggleValue: ''};
  }
  showOrHide(key) {
    if (this.privileges.includes(key)) {
      return true;
    } else {
      return false;
    }
  }
  ngOnInit() {
    let that = this;
    // window.addEventListener('beforeunload', function (e) {
    //   let countValue = JSON.parse(sessionStorage.getItem('Count'));
    //   if(Number(countValue) == 1){
    //     that.logOut(that.headerInfo);
    //     e.returnValue='';

    //   }else{
    //     countValue = countValue- 1;
    //     sessionStorage.setItem('Count', JSON.stringify(countValue));
    //   }
      
    // }); 
    this.selectUser = this.formBuilder.group({
      role: ['', Validators.required]
    });
    if(this.loginDetails.type == 0 ||this.loginDetails.type == 3 ){
      if (this.privileges.includes(Globals.Privileges.devices) || this.privileges.includes(Globals.Privileges.tasks) || this.privileges.includes(Globals.Privileges.projects)) {
        this.getDepartments();
      }
    }
   
    let approvalsCount = this.commonservice.approvalsCount.subscribe((enabled: object) => {
      if (enabled) {
        this.getApprovalsCount();
      }
    })
    this.getApprovalsCount();
    let configSettings = this.commonservice.configSettings.subscribe(res =>{
      if(res == 'config'){
       // this.accountDetails = JSON.parse(sessionStorage.getItem('subdomain'));
      }else if(res =='profile'){
        this.headerInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
        this.imagePath = Globals.urls.Global_imagePath + this.headerInfo['imageurl']; 
      }
    });
    this.subscriptions.push(configSettings);
    this.subscriptions.push(approvalsCount);
    jQuery(function () {

      // Customization
      $('.changeBackgroundColor').on('click', function () {
        $('body').removeAttr('data-background-color');
        $('body').attr('data-background-color', $(this).attr('data-color'));
        $(this).parent().find('.changeBackgroundColor').removeClass("selected");
        $(this).addClass("selected");
      });

      $('.changeTopBarColor').on('click', function () {
        if ($(this).attr('data-color') === 'default') {
          $('.main-header .navbar-header').removeAttr('data-background-color');
        } else {
          $('.main-header .navbar-header').attr('data-background-color', $(this).attr('data-color'));
        }
        $(this).parent().find('.changeTopBarColor').removeClass("selected");
        $(this).addClass("selected");
      });

      $('.changeSideBarColor').on('click', function () {
        if ($(this).attr('data-color') === 'default') {
          $('.sidebar').removeAttr('data-background-color');
        } else {
          $('.sidebar').attr('data-background-color', $(this).attr('data-color'));
        }
        $(this).parent().find('.changeSideBarColor').removeClass("selected");
        $(this).addClass("selected");
      });

      let toggle_sidebar = false;
      let nav_open = 0;
      let minimize_sidebar = false;
      let mini_sidebar = 0;
      let toggle_topbar = false;
      let topbar_open = 0;
      // Set toogle for minsize screen
      if (!toggle_topbar) {
        const topbar = $('.topbar-toggler');
        topbar.on('click', function () {
          if (topbar_open === 1) {
            $('html').removeClass('topbar_open');
            topbar.removeClass('toggled');
            topbar_open = 0;
          } else {
            $('html').addClass('topbar_open');
            topbar.addClass('toggled');
            topbar_open = 1;
          }
        });
        toggle_topbar = true;
      }

      if (!toggle_sidebar) {
        const toggle = $('.sidenav-toggler');

        toggle.on('click', function () {
          if (nav_open === 1) {
            $('html').removeClass('nav_open');
            toggle.removeClass('toggled');
            nav_open = 0;
          } else {
            $('html').addClass('nav_open');
            toggle.addClass('toggled');
            nav_open = 1;
          }
        });
        toggle_sidebar = true;
      }

      if (!minimize_sidebar) {
        const minibutton = $('.toggle-sidebar');
        if ($('.wrapper').hasClass('sidebar_minimize')) {
          mini_sidebar = 1;
          minibutton.addClass('toggled');
          minibutton.html('<i class="icon-options-vertical"></i>');
        }

        minibutton.on('click', function () {
          if (mini_sidebar === 1) {
            $('.wrapper').removeClass('sidebar_minimize');
            minibutton.removeClass('toggled');
            minibutton.html('<i class="icon-menu"></i>');
            mini_sidebar = 0;
          } else {
            $('.wrapper').addClass('sidebar_minimize');
            minibutton.addClass('toggled');
            minibutton.html('<i class="icon-options-vertical"></i>');
            mini_sidebar = 1;
          }
          $(window).resize();
        });
        minimize_sidebar = true;
      }

    });

    //this.storedValue = sessionStorage.getItem('LoginDetails');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.headerInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    this.headerInfo['browser'] = this.deviceInfo.browser;
    this.headerInfo['loginType'] = Globals.loginTypes[this.headerInfo.type];
    this.imagePath = Globals.urls.Global_imagePath + this.headerInfo['imageurl'];
    //Start watching for user inactivity.
    this.userIdle.startWatching();
    // Start watching when user idle is starting and reset if user action is there.
    this.userIdle.onTimerStart().subscribe(count => {
      var eventList = ["click", "mouseover", "keydown", "DOMMouseScroll", "mousewheel",
        "mousedown", "touchstart", "touchmove", "scroll", "keyup"];
      for (let event of eventList) {
        document.body.addEventListener(event, () => 
          this.userIdle.resetTimer()
        
        );
      }
    });
    // Start watch when time is up.
    this.timeout = this.userIdle.onTimeout().subscribe(count => {
      this.logOut(this.headerInfo)    
    })
  }

  openPrevilieges() {
    this.isTrue = true;
  }
  closeSidebar() {
    this.isTrue = false;
  }
  HeaderInfo() {
    switch (this.currentRoute.url) {
      
    }
  }


  getDepartments() {
    let url: string;
    if (this.loginDetails['type'] === 0) {
      url = Globals.urls.getAllListOfDepartments + '/'+null;
    } else if (this.loginDetails['type'] === 3) {
      url = Globals.urls.getDeptsForGA + '/' + this.loginDetails._id;
    }
    this.service.getDepartments(url).subscribe((res: any) => {
      if (res.status === 200) {
        this.filtersList = res.data;
        this.filtersList.unshift({ name: 'All', _id: 'All' });
      } else {
        // toast message
      }
    });
  }
  getApprovalsCount() {
    let url: string;
    if (this.loginDetails['type'] === 1) {
      url = Globals.urls.getApprovalsCount + '/' + this.loginDetails._id + '/' + this.loginDetails.accounts[0]._id;
    } else if (this.loginDetails['type'] === 3) {
      url = Globals.urls.getApprovalsCount + '/' + this.loginDetails._id + '/' + 'all';
    }
    else if (this.loginDetails['type'] === 0) {
      url = Globals.urls.getApprovalsCount + '/' + this.loginDetails._id + '/' + null;
    }else{
      return;
    }
    this.service.getDepartments(url).subscribe((res: any) => {
      if (res.status === 200) {
        this.approvalsCount = res.data;
      } else {
        this.approvalsCount = '';
        // toast message
      }
    });
  }
  errorHandler(event) {
    event.target.src = this.imageSrc;
  }

  logOut(data) {
    const req = {};
    req['username'] = data.username;
    req['browser'] = data.browser;
    req['userId'] = data._id;
    this.userIdle.stopTimer();
    this.userIdle.stopWatching();
    this.timeout.unsubscribe();
    this.service.LogoutFromWeb(req).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.router.navigate(['/login']);
          sessionStorage.clear();
          this.auth.logout();
          document.getElementById('sidebarAnchorClose').click();
        } else if (res.status === 204) {
          this.router.navigate(['/login']);
          sessionStorage.clear();
          this.auth.logout();
          alert(res.message);
        } else {
          alert('something went wrong');
        }
      }
    );
  }

  profileInfo(data) {
    const url = Globals.urls.editAdministrator + '/' + this.loginDetails._id;
    this.service.getDepartments(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status == 200) {
            this.profileData = res.data;
            this.ngxSmartModalService.setModalData(res.data, 'newModal');
            this.ngxSmartModalService.getModal('newModal').open();
          }
          else if (res.status == 204) {

          }
        }
        else {
          //this.toastr.info(res.data.message);
        }
      });
  }

  filterOptionSelected(selectedOption) {
    this.commonservice.callGetForms.next(selectedOption);
  }

  changePassword(data) {
    sessionStorage.setItem('navigateToLogin', 'true');
    this.changePasswordService.setVariable(true);
    this.router.navigate(['changepassword']);
  }
  ngOnDestroy(){
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
  }
}
