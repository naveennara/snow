import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-form-rating',
  templateUrl: './form-rating.component.html',
  styleUrls: ['./form-rating.component.scss'],
})
export class FormRatingComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  rating: number;
  widgetKey: any;
  historyView: boolean;
  expendedHeaderId: any;
  isTable: any;
  groupName: any;
  options: Options = {
  };
  constructor(private formDataDistributionService: FormDataDistributionService) {   this.widgetKey = widgetKeys.keys;
       
  }
  ngOnInit() {
     this.options = {   floor: this.config[this.widgetKey.minimum],
       ceil: this.config[this.widgetKey.maximum]};
       this.group.get(this.config[this.widgetKey._id]).setValue(0);
    this.getRatingValue(this.config[this.widgetKey._id]);
    this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
   }
  getRatingValue(formcontrolNameRef: any) {
    this.group.get(formcontrolNameRef).setValue(this.group.get(formcontrolNameRef).value);
    this.rating = 100 * this.group.get(formcontrolNameRef).value / this.config[this.widgetKey.maximum];
     // this.rating gives the value user selected
  }

}
