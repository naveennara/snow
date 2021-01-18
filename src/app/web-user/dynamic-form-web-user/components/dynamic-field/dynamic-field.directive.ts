import { FormUserPropertiesComponent } from './../form-user-properties/form-user-properties.component';
import { FormTableComponent } from './../form-table/form-table.component';
import { FormCalculationComponent } from './../form-calculation/form-calculation.component';
import { FormNumberComponent } from './../form-number/form-number.component';
import { FormTimeComponent } from './../form-time/form-time.component';
import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';

import { FormInputComponent } from '../form-input/form-input.component';
import {FormCheckBoxComponent} from '../form-check-box/form-check-box.component';
import {FormTextAreaComponent} from '../form-text-area/form-text-area.component';
import {FormDropDownComponent} from '../form-drop-down/form-drop-down.component';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormRadioButtonComponent} from '../form-radio-button/form-radio-button.component';
import { FormRatingComponent } from '../form-rating/form-rating.component';
import { FormHeaderComponent} from '../form-heading/form-heading.component';
import { FormHeadingBreakComponent} from '../form-heading-break/form-heading-break.component';
import { widgetKeys } from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import { FormGroup, FormArray, FormBuilder} from '@angular/forms';
import { FormFileUploadComponent } from '../form-file-upload/form-file-upload.component';
import { FormDateComponent } from '../form-date/form-date.component';
import { FormVideoComponent } from '../form-video/form-video.component';
import { FormImageComponent } from '../form-image/form-image.component'
import { FormReferenceListComponent } from '../form-reference-list/form-reference-list.component';

const components: {[type: string]: Type<Field>} = {
  textBox: FormInputComponent,
  checkBox: FormCheckBoxComponent,
  textArea: FormTextAreaComponent,
  select: FormDropDownComponent,
  radio: FormRadioButtonComponent,
  rating: FormRatingComponent,
  heading: FormHeaderComponent,
  break: FormHeadingBreakComponent,
  time: FormTimeComponent,
  number: FormNumberComponent,
  calculation: FormCalculationComponent,
  signature: FormFileUploadComponent,
  calendar: FormDateComponent,
  properties: FormUserPropertiesComponent,
  video: FormVideoComponent,
  camera: FormImageComponent,
  referenceList: FormReferenceListComponent
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dynamicField]'
})
export class DynamicFieldDirective implements Field, OnChanges, OnInit {
  @Input()
  config: FieldConfig;

  @Input()
  group: FormGroup;

  @Input()
  data: any;

  @Input()
  isHistoryView: boolean;
	
  @Input()
  derivedFields:any;
  derivedFieldsCopy: any;
  @Input()
  isTable: any;
  @Input()
  tableWidgetId: any;
  @Input()
  tableWidgetIndex: any;

  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef,
    private formDataDistributionService: FormDataDistributionService,
    private fb: FormBuilder,
  ) {

  }

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }

    if (this.config[widgetKeys.keys.isTable]) {
        if (this.data[this.config[widgetKeys.keys._id]].length > this.tableWidgetArray.length) {
          this.prepareArrayItem(this.data[this.config[widgetKeys.keys._id]].length - 1);
        }
    }
    // this.group.get(this.config[widgetKeys.keys._id]).setValue(this.data[this.config[widgetKeys.keys._id]]);
  }
  prepareArrayItem(length) {
    for (let i = 1; i <= length; i++) {
      this.tableWidgetArray.push(this.fb.group(this.formDataDistributionService.getTableWidgetsControllers()
      [this.config[widgetKeys.keys._id]]));
    }
  }
  get tableWidgetArray() {
    return this.group.get(this.config[widgetKeys.keys._id]) as FormArray;
  }
  ngOnInit() {
    if (this.isHistoryView === true ) {
      this.group.disable();
    }
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      this.config[widgetKeys.keys.isRequired] = false;
      throw new Error(
        `Custom Error:Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    // assign the data/field values to form
    try {
      this.group.patchValue(this.data);
    } catch (err) {

    }

    let component ;
    if (this.config[widgetKeys.keys.type] === widgetKeys.fieldTypes.heading && this.config[widgetKeys.keys.isTable] == true){
      component = this.resolver.resolveComponentFactory<Field>(FormTableComponent);
    } else {
      component = this.resolver.resolveComponentFactory<Field>(components[this.config.type]);
    }
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.data = this.data;
    this.component.instance.derivedFields = this.derivedFields  ? this.derivedFields : [];
    this.component.instance.derivedFieldsCopy = JSON.parse(JSON.stringify(this.component.instance.derivedFields)); 
    this.component.instance.historyView = this.isHistoryView;
    this.component.instance.isTable = this.isTable;
    this.component.instance.tableWidgetId = this.tableWidgetId;
    this.component.instance.tableWidgetIndex = this.tableWidgetIndex;
  }
}
