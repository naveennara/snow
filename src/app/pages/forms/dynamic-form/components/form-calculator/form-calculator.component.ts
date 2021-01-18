import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../objcet-keys-constants';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-calculator',
  templateUrl: './form-calculator.component.html',
  styleUrls: ['./form-calculator.component.css']
})
export class FormCalculatorComponent implements Field, OnInit {

  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  bgColor: boolean = false;
  WidgetInfo = { displayText: 'Calculator', displayIcon: Globals.svgIcons.calculator };


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
        }else {
          this.bgColor = false;
        }
      });
  }


}
