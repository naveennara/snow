import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderInputs } from '../../../app/sharing/page-header/headerInputs';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  pageDetails = {pageName : 'Projects', pageIcon: Globals.headerIcons.projectsGrey};
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  ellipseList: any;
  headerInputs: any;
  constructor(private router: Router) { }

  ngOnInit() {
    if (this.loginDetails['type'] !== 1) {
      this.ellipseList = [];
    } else if (this.loginDetails['type'] === 1) {
      this.ellipseList = ['Create'];
    }
    this.headerInputs = [HeaderInputs.keys.projects];
  }

}
