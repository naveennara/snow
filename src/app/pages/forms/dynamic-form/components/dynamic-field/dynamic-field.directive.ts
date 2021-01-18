import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { FormInputComponent } from '../form-input/form-input.component';
import {FormCheckBoxComponent} from '../form-check-box/form-check-box.component';
import {FormTextAreaComponent} from '../form-text-area/form-text-area.component';
import {FormDropDownComponent} from '../form-drop-down/form-drop-down.component';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormCameraComponent } from '../form-camera/form-camera.component';
import { FormBarcodeComponent } from '../form-barcode/form-barcode.component';
import { FormSignatureComponent } from '../form-signature/form-signature.component';
import { FormRadioButtonComponent} from '../form-radio-button/form-radio-button.component';
import { FormVideoComponent } from '../form-video/form-video.component';
import { FormRatingComponent } from '../form-rating/form-rating.component';
import { FormMapComponent } from '../form-map/form-map.component';
import { FormCalendarComponent } from '../form-calendar/form-calendar.component';
import { FormCalculatorComponent } from '../form-calculator/form-calculator.component';
import { FormNumberComponent } from '../form-number/form-number.component';
import { FormHeaderComponent } from '../form-header/form-header.component';
import { FormHeaderBreakComponent } from '../form-header-break/form-header-break.component';
import * as Globals from '../../../../../globals';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import { FormTableComponent } from '../form-table/form-table.component';
import { FormTimeComponent } from '../form-time/form-time.component';
import { FormUserPropertiesComponent } from '../form-user-properties/form-user-properties.component';
import { FormReferenceListComponent } from '../form-reference-list/form-reference-list.component';

const components: {[type: string]: Type<Field>} = {
  textBox: FormInputComponent,
  checkBox: FormCheckBoxComponent,
  textArea: FormTextAreaComponent,
  select: FormDropDownComponent,
  camera: FormCameraComponent,
  barcode: FormBarcodeComponent,
  signature: FormSignatureComponent,
  radio: FormRadioButtonComponent,
  video : FormVideoComponent,
  rating : FormRatingComponent,
  map: FormMapComponent,
  calendar: FormCalendarComponent,
  calculation: FormCalculatorComponent,
  number: FormNumberComponent,
  heading : FormHeaderComponent,
  break : FormHeaderBreakComponent,
  time : FormTimeComponent,
  properties : FormUserPropertiesComponent,
  referenceList:FormReferenceListComponent
};

@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  config: FieldConfig;
  @Input()
  group: FormGroup;
  @Input()
  ispreview: string;
  @Input()
  isTable:any;
  @Input()
  tableWidgetIndex:any;
  @Input()
  data:any;
  component: ComponentRef<Field>;
  tableWidgetId:any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private formDataDistributionService: FormDataDistributionService,
    private fb: FormBuilder
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
      this.component.instance.ispreview = this.ispreview;
    }
    }
    get tableWidgetArray() {
      return this.group.get(this.config[Globals.widgetKeys.keys._id]) as FormArray;
    }
  
    prepareArrayItem(length){
      for(let i=1; i<=length;i++){
        this.tableWidgetArray.push(this.fb.group(this.formDataDistributionService.getTableWidgetsControllers()[this.config[Globals.widgetKeys.keys._id]]));
      }    
    }
  
  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    
    let component;
    if(this.config[Globals.widgetKeys.keys.type] == Globals.widgetKeys.fieldTypes.heading && this.config[Globals.widgetKeys.keys.isTable] == true && (this.ispreview == 'Edit'||this.ispreview =='preview')){
      component = this.resolver.resolveComponentFactory<Field>(FormTableComponent);
    }
    else{
      let tableIds:any[] = Object.keys(this.formDataDistributionService.getTableWidgetsControllers());
      if(tableIds.length && !this.data){
        if(tableIds.includes(this.config['isUnderHeading'])){
          return;
        }else{
          component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
        }
        // tableIds.forEach(table => {
        //   if(table ==  this.config['isUnderHeading']) {
        //     return;
        //   }else{
        //     component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
        //   }
        // });
      }else
      component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    }    
   // const component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
   if(component){
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.ispreview = this.ispreview;
    this.component.instance.isTable=this.isTable;
    this.component.instance.tableWidgetId=this.tableWidgetId; 
    this.component.instance.tableWidgetIndex=this.tableWidgetIndex;  
     if(this.config[Globals.widgetKeys.keys.isTable] && (this.ispreview == 'Edit'||this.ispreview =='preview') && this.group.value[this.config[Globals.widgetKeys.keys._id]]){
        if(this.group.value[this.config[Globals.widgetKeys.keys._id]].length > this.tableWidgetArray.length){
          this.prepareArrayItem(this.group.value[this.config[Globals.widgetKeys.keys._id]].length-1);
        }
      }
      if((this.ispreview == 'Edit'||this.ispreview =='preview') && this.data){
        this.group.get(this.config[Globals.widgetKeys.keys._id]).setValue(this.data[this.config[Globals.widgetKeys.keys._id]]); 
      }
   }
   
  }
}
