import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup, FormArray } from '@angular/forms';
import { widgetKeys } from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import { webUserConstants } from './../../../webuser-constant';
import { RestAPICallsService } from '../../../rest-apicalls.service';

@Component({
  selector: 'app-form-reference-list',
  templateUrl: './form-reference-list.component.html',
  styleUrls: ['./form-reference-list.component.css']
})
export class FormReferenceListComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  widgetKey: any;
  expendedHeaderId: any;
  isTable: any;
  historyView: boolean;
  selectedValues: any;
  data: any;
  isDerivedField: boolean = false;
  bOSubscribe: any;
  tableWidgetId: any;
  tableWidgetIndex: any;
  isDynamicDropDownCallFail = false;
  optionsDerived: any;
  constructor(private formDataDistributionService: FormDataDistributionService,
    private restAPICallsService: RestAPICallsService) {
    this.widgetKey = widgetKeys.keys;
  }
  tableWidgetArray(tableWidgetId) {
    return this.group.get(tableWidgetId) as FormArray;
  }
  ngOnInit() {
    this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
    if (this.historyView) {
      if (typeof this.group.get(this.config[this.widgetKey._id]).value === 'string') {
        this.selectedValues = this.group.get(this.config[this.widgetKey._id]).value.replace('[', '').replace("]", "").split(",");
      } else {
        this.selectedValues = this.group.get(this.config[this.widgetKey._id]).value;
      }
    }
    this.optionsDerived = this.config[this.widgetKey.options];

    // static drop derived conditonss
    this.dynamicDropDownOptionSetter();
  }

  dynamicDropDownOptionSetter() {
    // Demo data
    const checkUrl = webUserConstants.apis.getDyanmicFormData + '/'
      + this.config[this.widgetKey.dynamicDropdownTable] + '/' +
      this.config[this.widgetKey.columnName];
    this.restAPICallsService.getForm(checkUrl).subscribe((res: any) => {
      if (res[webUserConstants.standardKeys.status] === 200) {
        this.isDynamicDropDownCallFail = false;
        const obj = res[webUserConstants.standardKeys.data].map((item) => {
          const emptyObj = {};
          emptyObj['displayValue'] = item;
          emptyObj['value'] = item;
          let deptFields = this.optionsDerived.filter(value => value.displayValue.toLowerCase() == item.toLowerCase()).map(val => val.dependFields);
          emptyObj['dependFields'] = deptFields[0];
          return emptyObj;
        });
        this.config[this.widgetKey.options] = obj;
        this.dropwDownDerviedSetter();
      } else if (res[webUserConstants.standardKeys.status] === 500) {
        this.isDynamicDropDownCallFail = true;
      } else if (res[webUserConstants.standardKeys.status] === 204) {
        this.isDynamicDropDownCallFail = true;
      }
    });
    // This is the "conversion" part
  }
  dropwDownDerviedSetter() {
    if (this.data[this.config[widgetKeys.keys._id]]) {
      if (this.data[this.config[widgetKeys.keys._id]].indexOf('[') !== -1) {
        const selectedOption = this.data[this.config[widgetKeys.keys._id]].replace('[', '').replace(']', '').split(',');
        this.hideWidgets(selectedOption);
        selectedOption.forEach(option => {
          this.showOrHideWidgets(this.config, option.trim());
        });
      } else if (typeof this.data[this.config[widgetKeys.keys._id]] == widgetKeys.dataTypes.object) {
        this.hideWidgets(this.data[this.config[widgetKeys.keys._id]]);
        this.data[this.config[widgetKeys.keys._id]].forEach(option => {
          this.showOrHideWidgets(this.config, option)
        });
      } else {
        if (this.data[this.config[widgetKeys.keys._id]].indexOf(',') !== -1) {
          this.group.get(this.config[widgetKeys.keys._id]).setValue(this.data[this.config[widgetKeys.keys._id]].split(","));
          this.group.get(this.config[widgetKeys.keys._id]).value.forEach(option => {
            this.showOrHideWidgets(this.config, option);
          });
        } else {
          this.showOrHideWidgets(this.config, this.data[this.config[widgetKeys.keys._id]]);
        }
      }
    }
  }

  selectValueChanged(event, config) {
    if (event != undefined) {
      let selectedOption = event;
      if (selectedOption.length) {
        this.hideWidgets(selectedOption);
        selectedOption.forEach(option => {
          this.showOrHideWidgets(config, option.value)
        });
      }
      else {
        this.showOrHideWidgets(config, event.value)
      }
    }

  }

  hideWidgets(selectedOption) {
    let getTypeList = this.formDataDistributionService.getTypeList();
    this.config.options.forEach(value => {
      for (let index in value['dependFields']) {
        if (index == widgetKeys.dependFields.Hide || index == widgetKeys.dependFields.Show) {
          value['dependFields'][index].forEach(element => {
            const derivedFieldIndex = this.derivedFields.indexOf(element[widgetKeys.keys._id]);
            if (derivedFieldIndex == -1) {
              this.derivedFields.push(element[widgetKeys.keys._id]);
              if (getTypeList[element[widgetKeys.keys._id]] == widgetKeys.fieldTypes.table) {
                for (let i = 1; i < this.group.get(this.config[widgetKeys.keys._id]).value.length; i++) {
                  this.tableWidgetArray(element[widgetKeys.keys._id]).removeAt(i)
                }
              }
              else {
                this.group.get(element[widgetKeys.keys._id]).reset();
              }
            }
          });
        }
      }
    });
  }

  showOrHideWidgets(config, selectedValue) {
    let selectedOptionIndex = config.options.findIndex(record => record.value == selectedValue);
    if (selectedOptionIndex == -1) {
      return;
    }
    let dependFields = config.options[selectedOptionIndex][widgetKeys.dependFields.dependFields];
    if (dependFields) {
      let getTypeList = this.formDataDistributionService.getTypeList();
      for (let index in dependFields) {
        if (index == widgetKeys.dependFields.Show) {
          dependFields[index].forEach(element => {
            const derivedFieldIndex = this.derivedFields.indexOf(element[widgetKeys.keys._id]);
            if (derivedFieldIndex > -1) {
              this.derivedFields.splice(derivedFieldIndex, 1);
              if (getTypeList[element[widgetKeys.keys._id]] == widgetKeys.fieldTypes.rating) {
                this.group.get(element[widgetKeys.keys._id]).setValue(this.data[element[widgetKeys.keys._id]] ? this.data[element[widgetKeys.keys._id]] : 1);
              }
              else if (this.data && this.data.length > 0) {
                this.group.get(element[widgetKeys.keys._id]).setValue(this.data[element[widgetKeys.keys._id]]);
              }
            }
          });
        } else if (index === widgetKeys.dependFields.Hide) {
          dependFields[index].forEach(element => {
            const derivedFieldIndex = this.derivedFields.indexOf(element[widgetKeys.keys._id]);
            if (derivedFieldIndex === -1) {
              this.derivedFields.push(element[widgetKeys.keys._id]);

              if (getTypeList[element[widgetKeys.keys._id]] === widgetKeys.fieldTypes.table) {
                for (let i = 1; i < this.group.get(this.config[widgetKeys.keys._id]).value.length; i++) {
                  this.tableWidgetArray(element[widgetKeys.keys._id]).removeAt(i);
                }
              }
              this.group.get(element[widgetKeys.keys._id]).reset();
            }
          });
        }
      }
    }
  }
}
