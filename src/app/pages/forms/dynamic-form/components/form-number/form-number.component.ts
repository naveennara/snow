import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../objcet-keys-constants';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-number',
  templateUrl: './form-number.component.html',
  styleUrls: ['./form-number.component.css']
})

export class FormNumberComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  bgColor: boolean = false;
  WidgetInfo = { displayText: 'Number', displayIcon: Globals.svgIcons.number };
  
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
