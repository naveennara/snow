import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../objcet-keys-constants';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-check-box',
  templateUrl: './form-check-box.component.html',
  styleUrls: ['./form-check-box.component.css']
})
export class FormCheckBoxComponent implements Field, OnInit  {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  bgColor: boolean = false;
  data;
  WidgetInfo = { displayText: 'Checkbox', displayIcon: Globals.svgIcons.checkBox };
  constructor(private commonService: CommonService) {
    this.widgetKey = Globals.widgetKeys.keys;
  }

  getSelectedCheckBoxValue(formcontrolNameRef: any, value: any) {
    if (this.group.get(formcontrolNameRef).value) {
      var list = this.group.get(formcontrolNameRef).value.split(',');
      if (list.indexOf(value) == -1) {
        let valuesStr = this.group.get(formcontrolNameRef).value + ',' + value;
        this.group.get(formcontrolNameRef).setValue(valuesStr);
        this.data[formcontrolNameRef] = valuesStr;
      }
      else {
        list.splice(list.indexOf(value), 1);
        this.group.get(formcontrolNameRef).setValue(list.toString());
        this.data[formcontrolNameRef] = list.toString();
      }

    }
    else {
      this.group.get(formcontrolNameRef).setValue(value);
      this.data[formcontrolNameRef] = value;
    }
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
      if(this.config['_id'] && this.ispreview != ''){
        this.data = this.group.value;
      }
  }
  
  

}
