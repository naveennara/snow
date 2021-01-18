import { Component, OnInit } from '@angular/core';
import * as Globals from '../../globals';
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';

@Component({
  selector: 'app-license-management',
  templateUrl: './license-management.component.html',
  styleUrls: ['./license-management.component.css']
})
export class LicenseManagementComponent implements OnInit {
  pageDetails = {pageName : 'License Management', pageIcon: Globals.headerIcons.licenseGrey};
  ellipseList: any;
  headerInputs: any;
  constructor() { }

  ngOnInit() {
    this.ellipseList = ['Create'];
    this.headerInputs = [HeaderInputs.keys.licenses];
  }

}
