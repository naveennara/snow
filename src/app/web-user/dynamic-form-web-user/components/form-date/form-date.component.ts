import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { webUserConstants } from '../../../webuser-constant';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import {widgetKeys} from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.css']
})
export class FormDateComponent implements Field, OnInit  {

  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  widgetKey: any;
  groupName: any;
  expendedHeaderId: any;
  historyView: boolean;
  isTable: any;
  dateFormat  = webUserConstants.dateFormats;
 constructor(private formDataDistributionService: FormDataDistributionService) {
  this.widgetKey = widgetKeys.keys;
 }
 ngOnInit() {

   if (this.config[this.widgetKey.typeOfDateSelected] === 'SystemDate') {
    // this.group.get(this.config[this.widgetKey._id]).disable();
    this.group.get(this.config[this.widgetKey._id]).patchValue(new Date());
  } else {
    if ( this.group.get(this.config[this.widgetKey._id]).value) {
       const dateRef = new Date( this.group.get(this.config[this.widgetKey._id]).value);
      //  const finalDate = new Date(Date.UTC(dateRef.getFullYear(), (dateRef.getMonth() + 1),  dateRef.getDate()));
       this.group.get(this.config[this.widgetKey._id]).setValue(dateRef);
    }
  }
   this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
 }


}

