import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as Globals from '../../../../../globals';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import { widgetKeys } from '../../objcet-keys-constants';

@Component({
  selector: 'form-radio-button',
  templateUrl: './form-radio-button.component.html',
  styleUrls: ['./form-radio-button.component.css']
})
export class FormRadioButtonComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  bgColor: boolean = false;
  WidgetInfo = { displayText: 'Radio', displayIcon: Globals.svgIcons.radio };

  constructor(private commonService: CommonService) {
    this.widgetKey = Globals.widgetKeys.keys;
  }

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
