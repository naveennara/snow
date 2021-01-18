import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormArray} from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

import {widgetKeys} from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';

@Component({
  selector: 'app-form-radio-button',
  templateUrl: './form-radio-button.component.html',
  styleUrls: ['./form-radio-button.component.scss'],
})
export class FormRadioButtonComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  widgetKey: any;
  historyView: boolean;
  expendedHeaderId: any;
  isTable: any;
  data: any;

  constructor(private formDataDistributionService: FormDataDistributionService) {
    this.widgetKey = widgetKeys.keys;
   }
   tableWidgetArray(tableWidgetId) {
    return this.group.get(tableWidgetId) as FormArray;
  }
   ngOnInit() {
    this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
   }
   selectValueChanged(event, config) {
    if(event!=undefined){
     let selectedOption = event;
   if(selectedOption.length){
     this.hideWidgets(selectedOption);
     selectedOption.forEach(option => {
       this.showOrHideWidgets(config,option.value)
     });
   }    
   else
     this.showOrHideWidgets(config,event.value)  
    }
   
 }

 hideWidgets(selectedOption){
   let getTypeList = this.formDataDistributionService.getTypeList();
   this.config.options.forEach(value => {
     for (var index in value['dependFields']) {
       if (index == widgetKeys.dependFields.Hide || index == widgetKeys.dependFields.Show) {
         value['dependFields'][index].forEach(element => {
           const derivedFieldIndex = this.derivedFields.indexOf(element[widgetKeys.keys._id]);
           if(derivedFieldIndex == -1){
             this.derivedFields.push(element[widgetKeys.keys._id]);
             if(getTypeList[element[widgetKeys.keys._id]] == widgetKeys.fieldTypes.table){
               for(let i=1;i<this.group.get(this.config[widgetKeys.keys._id]).value.length;i++){
                 this.tableWidgetArray(element[widgetKeys.keys._id]).removeAt(i)
               }
             }
             else
               this.group.get(element[widgetKeys.keys._id]).reset();
           }
         });
       }
     }
   });
 }

 showOrHideWidgets(config,selectedValue){
   let selectedOptionIndex = config.options.findIndex(record => record.value == selectedValue);  
   if(selectedOptionIndex == -1){
     return;
   }  
   let dependFields = config.options[selectedOptionIndex][widgetKeys.dependFields.dependFields];
   if (dependFields) {
     let getTypeList = this.formDataDistributionService.getTypeList();
     for (var index in dependFields) {       
       if (index == widgetKeys.dependFields.Show) {
         dependFields[index].forEach(element => {
           const derivedFieldIndex = this.derivedFields.indexOf(element[widgetKeys.keys._id]);
           if(derivedFieldIndex > -1){
             this.derivedFields.splice(derivedFieldIndex, 1);             
             if(getTypeList[element[widgetKeys.keys._id]] == widgetKeys.fieldTypes.rating){
               this.group.get(element[widgetKeys.keys._id]).setValue(this.data[element[widgetKeys.keys._id]] ? this.data[element[widgetKeys.keys._id]] : 1);
             }
             else if (this.data && this.data.length > 0) {               
               this.group.get(element[widgetKeys.keys._id]).setValue(this.data[element[widgetKeys.keys._id]]);
             }
           }
         });
       }
       else if (index == widgetKeys.dependFields.Hide) {
         dependFields[index].forEach(element => {
           const derivedFieldIndex = this.derivedFields.indexOf(element[widgetKeys.keys._id]);
           if (derivedFieldIndex == -1) {
             this.derivedFields.push(element[widgetKeys.keys._id]);
             
             if(getTypeList[element[widgetKeys.keys._id]] == widgetKeys.fieldTypes.table){
               for(let i=1;i<this.group.get(this.config[widgetKeys.keys._id]).value.length;i++){
                 this.tableWidgetArray(element[widgetKeys.keys._id]).removeAt(i)
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
