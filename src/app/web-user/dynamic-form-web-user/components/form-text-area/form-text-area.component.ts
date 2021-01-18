import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import {widgetKeys} from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';
// import { Constants } from '../../../constants/constants';

@Component({
  selector: 'app-form-text-area',
  templateUrl: './form-text-area.component.html',
  styleUrls: ['./form-text-area.component.scss'],
})
export class FormTextAreaComponent implements OnInit, Field {
  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  widgetKey: any;
  expendedHeaderId: any = null;
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
