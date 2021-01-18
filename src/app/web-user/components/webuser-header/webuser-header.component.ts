import { Component,HostListener, OnInit } from '@angular/core';
import * as Globals from '../../../globals';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';
import { RestAPICallsService } from '../../rest-apicalls.service';
import { webUserConstants } from './../../webuser-constant';
import { DeviceDetectorService } from 'ngx-device-detector';
import * as CryptoJS from 'crypto-js';
import { UserIdleService } from 'angular-user-idle';

@Component({
  selector: 'app-webuser-header',
  templateUrl: './webuser-header.component.html',
  styleUrls: ['./webuser-header.component.css']
})
export class WebuserHeaderComponent implements OnInit {
  imageSrc = Globals.imageSrc;
  orgImage = Globals.sliderImg1;
  headerInfo: any;
  imagePath: any;
  constants =webUserConstants.constantKeys;
  timeout: any;
  // @HostListener('window:beforeunload', ['$event'])
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
  constructor(public ngxSmartModalService: NgxSmartModalService,
              public router: Router,
              public restAPICallsService: RestAPICallsService,
              public deviceService: DeviceDetectorService,
              private userIdle: UserIdleService

  ) {
    this.headerInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
    this.headerInfo['browser'] = this.deviceService.getDeviceInfo();

   }

  ngOnInit() {
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

  errorHandler(event) {
    event.target.src = this.imageSrc;
  }
  profileInfo(data) {
    this.ngxSmartModalService.setModalData(data, 'newModal');
    this.ngxSmartModalService.getModal('newModal').open();
  }
  changePassword(data) {
    sessionStorage.setItem('navigateToLogin', 'true');
    // this.changePasswordService.setVariable(true);
    this.router.navigate(['changepassword']);
  }
  logOut(data) {
    const req = {};
    req['username'] = data.username;
    req['browser'] = data.browser;
    req['userId'] = data._id;
    this.userIdle.stopTimer();
    this.userIdle.stopWatching();
    this.timeout.unsubscribe();
    const url = webUserConstants.apis.logout;
    this.restAPICallsService.LogoutFromWeb(url, req).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.router.navigate(['']);
          sessionStorage.clear();
        } else if (res.status === 204) {
          alert(res.message);
        } else {
          alert('something went wrong');
        }
      }
    );
    // this.service.LogoutFromWeb()
  }

  openNav() {
    this.closeHeaderRightMenu();
    document.getElementById('myNav').style.width = '100%';
  }
  closeNav() {
    document.getElementById('myNav').style.width = '0%';
  }
  openHeaderRightMenu() {
    this.closeNav();
    document.getElementById('headerRightMenu').style.width = '100%';
  }
  closeHeaderRightMenu() {
    document.getElementById('headerRightMenu').style.width = '0%';
  }
  closeOverLay() {
    this.closeNav();
  }
  profileInfoEvent(data) {
    this.profileInfo(data);
  }
  changePasswordEvent(data) {
    this.changePassword(data);
  }
  logOutEvent(data) {
    this.logOut(data);
  }

}
