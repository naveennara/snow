import { Component, OnInit } from '@angular/core';
import * as Globals from '../../globals';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  pageDetails = {pageName : 'Settings', pageIcon: Globals.headerIcons.settingsGrey,hideSearch:true };
  constructor() { }
  ngOnInit() {
    
  }

}
