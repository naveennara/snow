import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as Globals from '../../../globals';
import { headerServices } from '../header.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-header-filter',
  templateUrl: './header-filter.component.html',
  styleUrls: ['./header-filter.component.css']
})
export class HeaderFilterComponent implements OnInit {
  selectedRow: number;
  @Input() FiltersList;
  @Output() optionSelected: EventEmitter<number> = new EventEmitter();
  searchDept;
  filteredItems = [];
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  currentRoute: Router;
  constructor(private services: headerServices, private router: Router) {
    this.currentRoute = router;
    this.currentRoute.events.subscribe((val) => {
      this.selectedRow = 0;
    });
  }

  ngOnInit() {
  }
  onKey(event) {
    this.searchDept = event.target.value;
  }
  checkPreviliege() {
    if (this.loginDetails['type'] === 0) {
      if (this.currentRoute.url === '/mainLayout/administrators' ||
        this.currentRoute.url === '/mainLayout/users' ||
        this.currentRoute.url === '/mainLayout/forms' ||
        this.currentRoute.url === '/mainLayout/deviceManagement'
      ) {
        return true;
      } else {
        return false;
      }
    } else if (this.loginDetails['type'] === 3) {
      if (
        this.currentRoute.url === '/mainLayout/users' ||
        this.currentRoute.url === '/mainLayout/forms' ||
        this.currentRoute.url === '/mainLayout/tasks' ||
        this.currentRoute.url === '/mainLayout/projectsTab/projects'
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
  filterForms(selectedOption, index) {
    this.selectedRow = index;
    this.optionSelected.emit(selectedOption);
  }
}
