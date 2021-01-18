import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { widgetKeys } from '../../objcet-keys-constants'
import { FormDataDistributionService } from '../../form-data-distribution.service';
import * as Globals from '../../../../../globals';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';

//import { Constants } from '../../../constants/constants';
//import { CommonService } from '../../../sharedServices/commonServices/common.service';
//import { FormModuleconstants } from '../../form-module-constants';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css']
})
export class FormTableComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  isCollapsed = true;
  widgetKey: any;
  ispreview: string;
  widgetIcon = Globals.svgIcons;
  tableWidgetData: Array<any> = [];
  tableWidgetDataCopy: Array<any> = [];
  isTableStatus: boolean = true;
  systemGeneratedEntry: string;
  thisTableWidgetId: any;
  expendedHeaderId: any;
  text: string;
  header: any;
  configTable: any;
  recordData: any;
  index: number;
  clickedItem = false;
  selectedindex: number;
  constants = Globals.allConstants.constantKeys;
  constructor(
    private formDataDistributionService: FormDataDistributionService,
    private fb: FormBuilder,
    private CommonService: CommonService) {
      this.widgetKey = Globals.widgetKeys.keys;
    }

  ngOnInit() {
    this.CommonService.headerSelection.subscribe(
      (header: object) => {
        this.header = header;
      });
    //this.systemGeneratedEntry = FormModuleconstants.systemGeneratedEntry;
    this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
    let getTableWidgeet = this.formDataDistributionService.getTableWidgets()[this.config[Globals.widgetKeys.keys._id]]
    //this.prepareTableWidgetView(getTableWidgeet,this.tableWidgetArray.length)
    this.tableWidgetDataCopy.push(getTableWidgeet);
    this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
    this.thisTableWidgetId = this.config[Globals.widgetKeys.keys._id];
  }
  get tableWidgetArray() {
    return this.group.get(this.config[Globals.widgetKeys.keys._id]) as FormArray;
  }
  submitted(event){
    this.tableWidgetArray.at(this.selectedindex).patchValue(event);
    this.tableWidgetArray.value[this.selectedindex] = event;
    this.openTableWidget(this.tableWidgetDataCopy[0], this.tableWidgetArray.value[this.selectedindex]);
  }
  async showRowData(index) {
    const data =  this.openTableWidget(this.tableWidgetDataCopy[0], this.tableWidgetArray.value[index]);
    this.tableWidgetArray.at(index).patchValue(data);
    this.index = index;
    this.selectedindex = index;
    this.clickedItem = !this.clickedItem;
  }
  async openTableWidget(config, recordData?) {
        this.configTable = config;
        this.recordData = recordData;
  }
  clicked(index) {
    if ( this.index === index) {
      // this.clickedItem = true;
      return true;
    } else {
      // this.clickedItem = false;
      return false;
    }
  }
  getColor() {
    this.text = '';
    if (this.header != null) {
      if (this.header['id'] === this.config['id']) {
        // this.color = '#6861ce';
        // if (this.config.isTable === true) {
        //   this.text = 'Drag Widgets to the Table';
        // } else {
        //   this.text = 'Drag Widgets to the Header';
        // }
        return '#6861ce';
        // return 'bg-primary';
      } else {
        // if (this.config.isTable === true){
        //   this.text = 'Table Deselected';
        // } else {
        //   this.text = 'Header Deselected';
        // }
      }
    } else {
      // if (this.config.isTable === true) {
      //   this.text = 'Table Deselected';
      // } else {
      //   this.text = 'Header Deselected';
      // }
      // return 'bg-warning';
      return '#FFAD46 ';
    }
  }

}
