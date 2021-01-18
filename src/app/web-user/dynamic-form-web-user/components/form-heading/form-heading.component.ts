import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import { widgetKeys } from '../../object-keys-constants';
import { FormDataDistributionService} from '../../form-data-distribution.service';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-heading.component.html',
  styleUrls: ['./form-heading.component.scss'],
})
export class FormHeaderComponent implements OnInit, Field {

  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  widgetKey: any;
  openGroupId: any;
  expendedHeaderId: any;

 constructor(private formDataDistributionService: FormDataDistributionService) {
  this.widgetKey = widgetKeys.keys;
 }

 ngOnInit() {

  this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
    this.expendedHeaderId = expendedHeaderId;
  });
 }

  expendingWidgets(widget) {
    if (this.expendedHeaderId === widget[this.widgetKey._id]) {
      this.formDataDistributionService.headerOpend('');
    } else {
      this.formDataDistributionService.headerOpend(widget[this.widgetKey._id]);
    }
  }
}
