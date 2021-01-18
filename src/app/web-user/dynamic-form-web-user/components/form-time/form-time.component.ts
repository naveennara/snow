import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../object-keys-constants';
import { CommonService } from '../../../../../app/sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { webUserConstants } from '../../../webuser-constant';

@Component({
  selector: 'app-form-time',
  templateUrl: './form-time.component.html',
  styleUrls: ['./form-time.component.css']
})
export class FormTimeComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  ispreview: string;
  widgetKey: any;
  bgColor = false;
  hours: any;
  mins: any;
  bOSubscribe: any;
  expendedHeaderId: any;
  historyView: boolean;
  isTable: any;
  constructor(private commonService: CommonService,
              private toastr: ToastrService,
              public formDataDistributionService: FormDataDistributionService
  ) {
  this.widgetKey = widgetKeys.keys;
  }
  ngOnInit() {
    const elmentId = this.config[this.widgetKey._id];
    const input = document.getElementById('Id_6331411822');
    fromEvent(input , 'input')
    .throttleTime(300)
    .pluck('target', 'value')
    .subscribe((value) => {
    });
    this.bOSubscribe = this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
        this.expendedHeaderId = expendedHeaderId;
    });
  }
  getMin() {
    const value = this.group.value[this.config['id']].split(':');
    this.hours = value[0];
    this.mins = value[1];
  }

  incrementTimeRange( ) {
    if (this.group.value[this.config['id']].indexOf(':') === -1) {
      this.group.value[this.config['id']] = this.group.value[this.config['id']] + ':00';
    }
    const value = this.group.value[this.config['id']].split(':');
    if (!value[1]) {
      value[1] = this.mins;
    }
    let tt = (+value[0]) * 60 + (+value[1]); // start time
    tt = tt + Number(this.config['timePeriod']);
    const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    const mm = (tt % 60); // getting minutes of the hour in 0-55 format
    if (Number(value[0]) < Number(this.config['maxTime'])) {
      this.group.patchValue({ [this.config['id']]: ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2) });
      this.getMin();
      this.group.markAsDirty();
    } else {
      this.toastr.info(webUserConstants.constantKeys.maxTimeLimitMsg);
    }


  }

  decrementTimeRange() {
    if (this.group.value[this.config['id']].indexOf(':') === -1) {
      this.group.value[this.config['id']] = this.group.value[this.config['id']] + ':00';
    }
    const value = this.group.value[this.config['id']].split(':');
    if (!value[1]) {
      value[1] = this.mins;
    }
    let tt = (+value[0]) * 60 + (+value[1]); // start time
    tt = tt - Number(this.config['timePeriod']);
    const hh = Math.floor(tt / 60); // getting hours of day in 0-24 format
    const mm = (tt % 60); // getting minutes of the hour in 0-55 format
    if (Number(value[0]) > Number(this.config['minTime'])) {
      this.group.patchValue({ [this.config['id']]: ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2) });
      this.getMin();
      this.group.markAsDirty();
    } else if (Number(value[1]) > 0) {
      this.group.patchValue({ [this.config['id']]: ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2) });
      this.getMin();
      this.group.markAsDirty();
    } else {
      this.toastr.info(webUserConstants.constantKeys.minTimeLimitMsg);
    }
  }
  // isNumberKey(evt) {
  //   const charCode = (evt.which) ? evt.which : evt.keyCode;
  //   if (charCode !== 46 && charCode > 31
  //   && (charCode < 48 || charCode > 59)) {
  //   return false;
  //   }

  //   return true;
  //   }
  isNumberKey(evt) {
    evt.target.value = evt.target.value.trim();
    const mergVlaue = evt.target.value + '' + String.fromCharCode(evt.which) ;
    if ( Number(mergVlaue) < Number(this.config['maxTime'] ) ) {
      const value = evt.target.value + '' + String.fromCharCode(evt.which) + ':' +  this.group.value[this.config['id']].split(':')[1];
      this.group.get(this.config[this.widgetKey._id]).setValue(value);
    } else if (Number(mergVlaue) === Number(this.config['maxTime'] ) && Number (this.group.value[this.config['id']].split(':')[1]) === 0 ) {
      const value = evt.target.value + '' + String.fromCharCode(evt.which) + ':' +  this.group.value[this.config['id']].split(':')[1];
      this.group.get(this.config[this.widgetKey._id]).setValue(value);
    } else {
      this.toastr.info('You can enter the time  between ' + this.config['minTime'] + ' to ' + this.config['maxTime'] + 'Hours'  );
    }
    return false;
  }



  // from mobileee

}
