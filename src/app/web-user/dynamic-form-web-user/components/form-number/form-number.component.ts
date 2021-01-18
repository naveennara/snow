import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import {widgetKeys} from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';


@Component({
  selector: 'app-form-number',
  templateUrl: './form-number.component.html',
  styleUrls: ['./form-number.component.css']
})
export class FormNumberComponent implements Field, OnInit {
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
    this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
   }
}
