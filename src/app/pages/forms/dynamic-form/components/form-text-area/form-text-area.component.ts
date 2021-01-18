import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import {widgetKeys} from '../../objcet-keys-constants';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-text-area',
  templateUrl: './form-text-area.component.html'
})
export class FormTextAreaComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  str;
  about;
  bgColor: boolean = false;
  WidgetInfo = { displayText: 'TextArea', displayIcon: Globals.svgIcons.textArea };

  constructor(private commonService: CommonService) {
    this.widgetKey = Globals.widgetKeys.keys;
  }
 
   setColor() {
    if (this.bgColor === true) {
      return 'rgb(169, 195, 229)';
    }
  }
   // tslint:disable-next-line:use-life-cycle-interface
   ngOnInit() {
    // TO highlight selected Widget
    this.commonService.editProperties.subscribe(
      (enabled) => {
        if (enabled['id'] === this.config['id']) {
          this.bgColor = true;
        } else {
          this.bgColor = false;
        }
      });
   }
   // tslint:disable-next-line:use-life-cycle-interface
   ngOnChanges() {

   }
   

}
