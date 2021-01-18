import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-calendar',
  templateUrl: './form-calendar.component.html',
  styleUrls: ['./form-calendar.component.css']
})
export class FormCalendarComponent implements Field, OnInit {

  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  bgColor: boolean = false;
  WidgetInfo = { displayText: 'Calendar', displayIcon: Globals.svgIcons.calendar };
  dateFormat  = Globals.dateFormats;

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
