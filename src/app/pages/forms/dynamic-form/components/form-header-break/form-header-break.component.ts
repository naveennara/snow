import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import {widgetKeys} from '../../objcet-keys-constants';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-header-break',
  templateUrl: './form-header-break.component.html',
  styleUrls: ['./form-header-break.component.css']
})
export class FormHeaderBreakComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  displayLabel = "HEADER BREAK"
  widgetIcon = Globals.svgIcons;
  constructor() { this.widgetKey = Globals.widgetKeys.keys; }

  ngOnInit() {
    if(this.config.isTable == true){
      this.displayLabel = "TABLE BREAK";
    }
  }

}
