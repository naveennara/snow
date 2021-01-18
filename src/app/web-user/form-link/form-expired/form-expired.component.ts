import { Component, OnInit } from '@angular/core';
import { webUserConstants } from '../../webuser-constant';

@Component({
  selector: 'app-form-expired',
  templateUrl: './form-expired.component.html',
  styleUrls: ['./form-expired.component.css']
})
export class FormExpiredComponent implements OnInit {
  constants = webUserConstants;

  constructor() { }

  ngOnInit() {
  }
  canDeactivate() {
   return false;
  }

}
