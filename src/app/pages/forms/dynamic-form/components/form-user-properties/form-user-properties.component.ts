import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import * as Globals from '../../../../../globals';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
@Component({
  selector: 'app-form-user-properties',
  templateUrl: './form-user-properties.component.html',
  styleUrls: ['./form-user-properties.component.css']
})
export class FormUserPropertiesComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  bgColor: boolean = false;
  constructor(private commonService: CommonService) { this.widgetKey = Globals.widgetKeys.keys;}
  setColor() {
    if (this.bgColor === true) {
      return 'rgb(169, 195, 229)';
    }
  }
  ngOnInit() {
    this.commonService.editProperties.subscribe(
      (enabled) => {
        if (enabled['id'] === this.config['id']) {
          this.bgColor = true;
        } else {
          this.bgColor = false;
        }
      });
  }

}
