import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { webUserConstants} from '../../../webuser-constant';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import {widgetKeys} from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-form-user-properties',
  templateUrl: './form-user-properties.component.html',
  styleUrls: ['./form-user-properties.component.css']
})
export class FormUserPropertiesComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  widgetKey: any;
  groupName: any;
  expendedHeaderId: any;
  isTable: any;
 constructor(private formDataDistributionService: FormDataDistributionService) {
  this.widgetKey = widgetKeys.keys;
 }
 ngOnInit() {
  const loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), 'F!3LD0N:M@G!KM!ND$').toString(CryptoJS.enc.Utf8));;
  switch (this.config[this.widgetKey.label]) {
    case widgetKeys.userproperties.divisionCode : {
      this.group.get(this.config[this.widgetKey._id]).setValue(loginDetails.divisioncode || '');
      break;
    }
    case  widgetKeys.userproperties.number : {
      this.group.get(this.config[this.widgetKey._id]).setValue(loginDetails.phone || '');
      break;
    }
    case  widgetKeys.userproperties.email : {
      this.group.get(this.config[this.widgetKey._id]).setValue(loginDetails.email || '');
      break;
    }
    case  widgetKeys.userproperties.name : {
      this.group.get(this.config[this.widgetKey._id]).setValue(loginDetails.username || '');
      break;
    }
    default : {
      break;
    }
  }
  this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
    this.expendedHeaderId = expendedHeaderId;
  });
 }


}
