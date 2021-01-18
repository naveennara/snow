import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import { widgetKeys } from '../../objcet-keys-constants';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.css']
})
export class FormHeaderComponent implements OnInit, Field {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  selected: boolean = false;
  widgetIcon = Globals.svgIcons;
  text = '';
  icon = '';
  color = '';
  header = {};
  displayLabel = "HEADER";
  constants = Globals.allConstants.constantKeys;
  constructor(private CommonService: CommonService) {
    this.widgetKey = Globals.widgetKeys.keys;
    if(this.ispreview == 'preview'){
      const toogle = document.querySelector('#headingOne');
      toogle.addEventListener('click', () => {
  
      })
    }
   
    
  }

  addWidgetsHeader() {
    this.selected = !this.selected;
    if (this.selected) {
      this.CommonService.headerSelection.next(this.config);
      // this.icon = "icon-plus";
      // this.text = "Drag Widgets to the Header";
    } else {
      this.CommonService.headerSelection.next(null);
      // this.icon = "icon-close";
      // this.text = "Header Deselected";
    }
  }


  getColor() {
    this.text = '';
    if (this.header != null) {
      if (this.header['id'] === this.config['id']) {
        // this.color = '#6861ce';
        // if(this.config.isTable == true){
        //   this.text = "Drag Widgets to the Table";
        // }else{
        //   this.text = "Drag Widgets to the Header";
        // }
        return '#6861ce';
        // return 'bg-primary';
      }else{
        // if(this.config.isTable == true){
        //   this.text = "Table Deselected";
        // }else{
        //   this.text = "Header Deselected";
        // }
      }
    }else{
      // if(this.config.isTable == true){
      //   this.text = "Table Deselected";
      // }else{
      //   this.text = "Header Deselected";
      // }
      // return 'bg-warning';
      return '#FFAD46 ';
    }
  }

  ngOnInit() {
    
    this.CommonService.headerSelection.subscribe(
      (header: object) => {
        this.header = header;
      }
    )
    if(this.config.isTable == true){
      this.displayLabel = "TABLE";
    }
  }

}
