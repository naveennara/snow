import { Component, OnInit, Input, OnDestroy, OnChanges, Output, EventEmitter } from '@angular/core';
import { FieldConfig } from '../../../models/field-config.interface';
import {widgetKeys} from '../../../object-keys-constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormDataDistributionService } from '../../../form-data-distribution.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-table-add-row',
  templateUrl: './form-table-add-row.component.html',
  styleUrls: ['./form-table-add-row.component.css']
})
export class FormTableAddRowComponent implements OnInit, OnChanges {
  @Input()
  config: FieldConfig[] = [];

  @Input()
  tableWidgetId: any;

  @Input()
  isHistoryView: boolean;

  @Input()
  name: any;
  @Input()
  modalRef: any;

  @Output()
  addTableRecord: EventEmitter<any> = new EventEmitter();

  @Input()
  recordData: any;

  @Input()
  tableLable: any;
  @Input()
  derivedFields:any;
  form: FormGroup;
  widgetKey: any;

  get controls() { return this.config.filter(({type}) => type !== 'button'); }


  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }


  constructor(
    private fb: FormBuilder,
    private formDataDistributionService: FormDataDistributionService,
    public activatedRoute: ActivatedRoute
  ) {
    this.widgetKey = widgetKeys.keys;
  }
  ngOnInit() {
   this.form = this.createGroup();
   if (this.activatedRoute.snapshot.params.actionType === 'view') {
    this.isHistoryView = true;
  } else {
    this.isHistoryView = false;
  }

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
          const config = this.config.find((control) => control[widgetKeys.keys._id] === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control[widgetKeys.keys._id], this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    const validationList: any  = [];
    if (config[this.widgetKey.isRequired] && config[this.widgetKey.isRequired] === true) {
      validationList.push(Validators.required);
    }
    if (config[this.widgetKey.minLength]) {
      validationList.push(Validators.minLength(config[this.widgetKey.minLength]));
    }
    if (config[this.widgetKey.maxLength]) {
      validationList.push(Validators.maxLength(config[this.widgetKey.maxLength]));
    }
    return this.fb.control({value: config[this.widgetKey.defaultValue], disabled: config[this.widgetKey.disabled]}, Validators.
      compose(validationList));
  }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }

  public getFormFilledData() {
    if (this.form.invalid) {
      this.form.markAsDirty();
      // this.toastService.showToast(Constants.invalidFormEntry);
      // tslint:disable-next-line:forin
      for (const control in this.form.controls) {
        this.form.controls[control].markAsDirty();
      }
    } else {
      const requiredTBIds = this.formDataDistributionService.getMandatoryTWIds();
      const index = requiredTBIds.indexOf(this.tableWidgetId);
      if (index > -1) {
        requiredTBIds.splice(index, 1);
        this.formDataDistributionService.setMandatoryTWIds(requiredTBIds);
      }
      this.addTableRecord.emit( this.form.getRawValue());
      this.modalRef.hide();
    }
  }


}
