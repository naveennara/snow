import { Component, EventEmitter, Input, OnChanges, OnInit, Output, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn, AbstractControl  } from '@angular/forms';

import { FieldConfig } from '../../models/field-config.interface';
import {widgetKeys} from '../../object-keys-constants';

import { FormDataDistributionService } from '../../form-data-distribution.service';

@Component({
  exportAs: 'dynamicForm',
  // tslint:disable-next-line:component-selector
  selector: 'dynamic-form',
  styleUrls: ['dynamic-form.component.scss'],
  template: `
    <form
      class="dynamic-form"
      [formGroup]="form">
      <ng-container
        *ngFor="let field of config;"
        dynamicField
        [config]="field"
        [group]="form"
        [data] ="recordData"
        [isHistoryView]="isHistoryView"
        [derivedFields]="derivedFields"
        >
      </ng-container>
    </form>
  `
})
export class DynamicFormComponent implements  OnInit, OnChanges, OnDestroy {

  @Input()
  config: FieldConfig[] = [];

  @Input()
  recordData: any;

  @Input()
  recordStatus: number;

  @Input()
  isHistoryView:boolean;

  @Input()
  derivedFields:any;
  
  form: FormGroup;
  widgetKey: any;
  tableWidgetStart = false;
  tableWidgetId: any;
  tableWidgetControls: any = {};
  tableWidgetData: Array<any> = [];
  get controls() { return this.config.filter(({type}) => type !== 'button'); }

  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }
  get formArray() {
    return this.form.get(this.tableWidgetId) as FormArray;
  }
 
  constructor(
    private fb: FormBuilder,
    private formDataDistributionService: FormDataDistributionService,
  ) {
    this.widgetKey = widgetKeys.keys;

  }

  ngOnInit() {
    this.form = this.createGroup();

    if (this.isHistoryView === true ) {
      // this.statusReadonly=true
    } else {
     // this.statusReadonly=false
    }

  }

  ngOnDestroy(){
    this.formDataDistributionService.derivedField("");
    this.formDataDistributionService.setTableWidgets([]);
    this.formDataDistributionService.setTableWidgetsControllers([]);
  }

  ngOnChanges() {

    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item[widgetKeys.keys._id]);
      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));
      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const configIndex = this.config.findIndex(record => record[widgetKeys.keys._id] === name);
          const config = this.config[configIndex];
          if (config[widgetKeys.keys.type] === widgetKeys.fieldTypes.heading && config[widgetKeys.keys.isTable] === true) {
            this.tableWidgetStart = true;
            this.tableWidgetId = config[widgetKeys.keys._id];
            if (config[widgetKeys.keys.isRequired] === true) {
              const requiredTBIds = this.formDataDistributionService.getMandatoryTWIds();
              requiredTBIds.push(config[widgetKeys.keys._id]);
              this.formDataDistributionService.setMandatoryTWIds(requiredTBIds);
            }
          } else if (this.tableWidgetStart) {
            if (config[widgetKeys.keys.type] === widgetKeys.fieldTypes.break) {

              // this.tableWidgetData.push(config)
              const getTableWidgeet = this.formDataDistributionService.getTableWidgets();
              getTableWidgeet[this.tableWidgetId] = this.tableWidgetData;
              this.formDataDistributionService.setTableWidgets(getTableWidgeet);
              const getTableWidgetControllers = this.formDataDistributionService.getTableWidgetsControllers();
              getTableWidgetControllers[this.tableWidgetId] = this.tableWidgetControls;
              this.formDataDistributionService.setTableWidgetsControllers(getTableWidgetControllers);
              this.form.addControl(this.tableWidgetId, this.fb.array([this.returnItem()]));
              if (this.recordData[this.tableWidgetId] && Object.keys(this.recordData[this.tableWidgetId]).length > 1) {
                if (typeof this.recordData[this.tableWidgetId] === widgetKeys.dataTypes.string) {
                  this.recordData[this.tableWidgetId] = JSON.parse(this.recordData[this.tableWidgetId]);
                }
                this.pushItems(Object.keys(this.recordData[this.tableWidgetId]).length);
              }
              this.tableWidgetData = [];
              this.tableWidgetControls = {};
              this.tableWidgetStart = false;
              this.tableWidgetId = '';
            } else {
              this.tableWidgetControls[config[widgetKeys.keys._id]] = ['', this.createControl(config)];
              this.tableWidgetData.push(config);
            }
            this.config.splice(configIndex, 1);
          } else {
            this.form.addControl(name, this.createControl(config));
          }
        });
    }

    // if (this.form) {
    //   const controls = Object.keys(this.form.controls);
    //   const configControls = this.controls.map((item) => item[widgetKeys.keys._id]);

    //   controls
    //     .filter((control) => !configControls.includes(control))
    //     .forEach((control) => this.form.removeControl(control));

    //   configControls
    //     .filter((control) => !controls.includes(control))
    //     .forEach((name) => {
    //       const config = this.config.find((control) => control[widgetKeys.keys._id] === name);
    //       this.form.addControl(name, this.createControl(config));
    //     });

    // }
  }

  returnItem() {
    return this.fb.group(this.tableWidgetControls);
  }
  pushItems(length) {
    const subTables = this.formArray;
    for (let i = 0; i < length - 1; i++) {
      subTables.push(this.returnItem());
    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control[widgetKeys.keys._id], this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    const validationList: any  = [];
    if (config[this.widgetKey.isRequired] && config[this.widgetKey.isRequired] === true && config[this.widgetKey.type] !='map' ) {
      validationList.push(Validators.required);
    }

    if (config[this.widgetKey.minLength]) {
      validationList.push(Validators.minLength(config[this.widgetKey.minLength]));
    }

    if (config[this.widgetKey.maxLength]) {
      validationList.push(Validators.maxLength(config[this.widgetKey.maxLength]));
    }

    if (config[this.widgetKey.minTime]) {
      validationList.push(this.minimumTime(config, this.widgetKey));
    }

    if (config[this.widgetKey.maxTime]) {
      validationList.push(this.maximumTime(config, this.widgetKey));
    }
   // [attr.disabled]="{{config[widgetKey.typeOfDateSelected] === 'SystemDate' }}"
    return this.fb.control({value: config[this.widgetKey.defaultValue], disabled: config[this.widgetKey.disabled]},
       Validators.compose(validationList));
  }


  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }

  minimumTime(config: any, widgetKey: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value.slice(0, control.value.indexOf(':')) === '') {
        return { minHour: true };
      } else {
        // tslint:disable-next-line:radix
        const hours = parseInt(control.value.slice(0, control.value.indexOf(':')));

        if (hours < parseInt(config[widgetKey.minTime]) || hours === NaN) {
          return { minHour: true };
        } else {
          return null;
        }
      }


    };
  }

  maximumTime(config: any, widgetKey: any): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      var hours = parseInt(control.value.slice(0, control.value.indexOf(":")));
      let minutes = parseInt(control.value.slice(control.value.indexOf(':') + 1));
      if (hours > parseInt(config[widgetKey.maxTime]) || (hours == parseInt(config[widgetKey.maxTime]) && minutes != 0)) {
        return { maxHour: true }
      } else {
        return null;
      }
    };
  }

  public getFormFilledData() {
    return this.form.value;
  }

}
