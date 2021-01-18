
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { CommonService } from '../../sharing/sharing-module/common.service';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})

export class MainLayoutComponent implements OnInit {
  windowScrolled: boolean;
  sidebarIcons = Globals.sidebarIcons;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  constructor(@Inject(DOCUMENT) private document: Document, protected commonService: CommonService) { }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 100) {
      this.windowScrolled = true;
    } else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.windowScrolled = false;
    }
  }
  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }
  openDashboard() {
    this.commonService.dashboard.next(1);
  }
  ngOnInit() {
    let count = JSON.parse(sessionStorage.getItem('Count'));
    if (count == null|| count < 1) {
      count = 1;
    } else {
      count = count + 1;
    }
    sessionStorage.setItem('Count', JSON.stringify(count));
   
  }
  
}


