import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../objcet-keys-constants';
import { FormsServicesService } from '../../../forms-services.service';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-reference-list',
  templateUrl: './form-reference-list.component.html',
  styleUrls: ['./form-reference-list.component.css']
})
export class FormReferenceListComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  ispreview:string;
  widgetKey: any;
  bgColor: boolean = false;
  constructor(private commonService: CommonService,private services:FormsServicesService) {
    this.widgetKey = Globals.widgetKeys.keys;

   }
  setColor() {
    if (this.bgColor === true) {
      return 'rgb(169, 195, 229)';
    }
  }
  dynamicDropDownOptionSetter() {
    // Demo data
     const checkUrl = Globals.urls.getDynamicFormData + '/'
                       + this.config[this.widgetKey.dynamicDropdownTable] + '/' +
                       this.config[this.widgetKey.columnName];
     this.services.getFormsList(checkUrl).subscribe((res: any) => {
       if (res.status === 200) {
        // this.isDynamicDropDownCallFail = false;
         const obj = res.data.map ((item) => {
           const emptyObj = {};
           emptyObj['displayValue'] = item ;
           emptyObj['value'] = item ;
           return emptyObj;
         });
         this.config[this.widgetKey.options] = obj;
       } else if (res.status === 500) {
         //this.isDynamicDropDownCallFail = true;
       } else if (res.status === 204) {
         //this.isDynamicDropDownCallFail = true;
       }
     });
   // This is the "conversion" part
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
