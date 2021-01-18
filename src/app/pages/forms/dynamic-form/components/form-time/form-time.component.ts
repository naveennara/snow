import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import * as Globals from '../../../../../globals';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-time',
  templateUrl: './form-time.component.html',
  styleUrls: ['./form-time.component.css']
})
export class FormTimeComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  bgColor: boolean = false;
  hours: any;
  mins: any;
  constructor(private commonService: CommonService,private toastr: ToastrService,
  ) {
  this.widgetKey = Globals.widgetKeys.keys;
  }

  getMin() {
    if(this.group.value[this.config['id']]){
      let value = this.group.value[this.config['id']].split(':');
      this.hours = value[0];
      this.mins = value[1];
    }
    
  }
  add() {
    let value = this.group.value[this.config['id']].split(':');
    if (!value[1]) {
      value[1] = this.mins
    }
    let tt = (+value[0]) * 60 + (+value[1]); // start time
    tt = tt + Number(this.config['timePeriod']);
    let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    let mm = (tt % 60); // getting minutes of the hour in 0-55 format
    if (Number(value[0]) < Number(this.config['maxTime'])) {
      this.group.patchValue({ [this.config['id']]: ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) });
      this.getMin();
      this.group.markAsDirty();
    }else{
      this.toastr.info(Globals.allConstants.constantKeys.maxtimeLimitMsg);
    }
  }
  sub() {
    let value = this.group.value[this.config['id']].split(':');
    if (!value[1]) {
      value[1] = this.mins
    }
    let tt = (+value[0]) * 60 + (+value[1]); // start time
    tt = tt - Number(this.config['timePeriod']);
    let hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    let mm = (tt % 60); // getting minutes of the hour in 0-55 format
    if (Number(value[0]) > Number(this.config['minTime'])) {
      this.group.patchValue({ [this.config['id']]: ("0" + (hh % 24)).slice(-2) + ':' + ("0" + mm).slice(-2) });
      this.getMin();
      this.group.markAsDirty();
    }else{
      this.toastr.info(Globals.allConstants.constantKeys.minTimeLimitMsg);
    }
  }
  hrsChanged() {
    if (Number(this.hours) >= Number(this.config['minTime']) && Number(this.hours) <= Number(this.config['maxTime'])) {
      this.group.patchValue({ [this.config['id']]: (this.hours + ':' + this.mins) });
      this.group.markAsDirty();
    } else {
      this.group.get(this.config['id']).setErrors({ 'invalid': true });
    }
  }

  setColor() {
    if (this.bgColor === true) {
      return 'rgb(169, 195, 229)';
    }
  }
  ngOnInit() {
    if(this.config['_id']){
      this.getMin();
    }
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
