import { Component, OnInit, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config.interface';
import * as Globals from '../../../../../../globals';
import { FormDataDistributionService } from '../../../form-data-distribution.service';
import { ToastrService } from 'ngx-toastr';
//import { Constants } from '../../../../constants/constants';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.css']
})




export class TableModalComponent implements OnInit {
  @Output() submit : EventEmitter<any> = new EventEmitter<any>();
  @Input()
  config: FieldConfig[] = [];

  @Input()
  recordData: any;

  @Input()
  recordStatus: number;
  @Input()
  ispreview:any;

  form: FormGroup;
  widgetKey: any;
  constants = Globals.allConstants.constantKeys;
  get controls() { return this.config.filter(({type}) => type !== 'button'); }

  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

 
  constructor(
    private fb: FormBuilder,
    private formDataDistributionService: FormDataDistributionService,
    private toastService: ToastrService,
  ) {
    this.widgetKey = Globals.widgetKeys.keys;
   
  }

  ngOnInit() {
    this.form = this.createGroup();
   
  }

  ngOnDestroy(){
    this.formDataDistributionService.derivedField("");
  }

  ngOnChanges() {
    if (this.form) {
      const controls = Object.keys(this.form.controls);
      const configControls = this.controls.map((item) => item[Globals.widgetKeys.keys._id]);

      controls
        .filter((control) => !configControls.includes(control))
        .forEach((control) => this.form.removeControl(control));

      configControls
        .filter((control) => !controls.includes(control))
        .forEach((name) => {
          const config = this.config.find((control) => control[Globals.widgetKeys.keys._id] === name);
          this.form.addControl(name, this.createControl(config));
        });

    }
  }

  createGroup() {
    const group = this.fb.group({});
    this.controls.forEach(control => group.addControl(control[Globals.widgetKeys.keys._id], this.createControl(control)));
    return group;
  }

  createControl(config: FieldConfig) {
    let validationList:any  =[];
    if(config[this.widgetKey.isRequired] && config[this.widgetKey.isRequired] == true){
      validationList.push(Validators.required)
    }
    
    if(config[this.widgetKey.minLength]){
      validationList.push(Validators.minLength(config[this.widgetKey.minLength]));
    }
    
    if(config[this.widgetKey.maxLength]){
      validationList.push(Validators.maxLength(config[this.widgetKey.maxLength]));
    }
    return this.fb.control({value:config[this.widgetKey.defaultValue],disabled:config[this.widgetKey.disabled]},Validators.compose(validationList));
  }


  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, {emitEvent: true});
  }

  public getFormFilledData(){
    if (this.form.invalid) {
      this.form.markAsDirty();
     // this.toastService.info(Constants.invalidFormEntry);
      for (let control in this.form.controls) {
        this.form.controls[control].markAsDirty();
      };
    }
    else{
      this.submit.emit(this.form.value);
      // this.modalController.dismiss({
      //   'data': this.form.value
      // });
    }
  }
}
