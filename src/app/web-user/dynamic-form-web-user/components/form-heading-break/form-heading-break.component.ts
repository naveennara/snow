import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import {widgetKeys} from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';
@Component({
  selector: 'app-form-heading-break',
  templateUrl: './form-heading-break.component.html',
  styleUrls: ['./form-heading-break.component.scss'],
})
export class FormHeadingBreakComponent implements OnInit, Field {

  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  widgetKey: any;
  expendedHeaderId: any;
  constructor(private formDataDistributionService: FormDataDistributionService) {
    this.widgetKey = widgetKeys.keys;
   }

   ngOnInit() {
    this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
   }
}

