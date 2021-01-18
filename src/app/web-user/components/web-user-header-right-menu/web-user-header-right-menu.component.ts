import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-web-user-header-right-menu',
  templateUrl: './web-user-header-right-menu.component.html',
  styleUrls: ['./web-user-header-right-menu.component.css']
})
export class WebUserHeaderRightMenuComponent implements OnInit {

  constructor() { }
  @Output() closeOverLay = new EventEmitter();
  @Output() profileInfo = new EventEmitter();
  @Output() changePassword = new EventEmitter();
  @Output() logOut = new EventEmitter();
  @Input() userObjcet ;
  ngOnInit() {
  }
  profileInfoCall() {
    this.profileInfo.next(this.userObjcet);
    this.closeOverLay.next();
  }
  changePasswordCall() {
    this.changePassword.next(this.userObjcet);
    this.closeOverLay.next();
  }
  logOutCall() {
    this.logOut.next(this.userObjcet);
    this.closeOverLay.next();
  }
}
