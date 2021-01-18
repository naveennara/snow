import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../object-keys-constants';
import { CommonService } from '../../../../../app/sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import { CalculationService } from '../../calculation.service';
import { webUserConstants } from '../../../webuser-constant';


@Component({
  selector: 'app-form-calculation',
  templateUrl: './form-calculation.component.html',
  styleUrls: ['./form-calculation.component.css']
})
export class FormCalculationComponent implements OnInit, OnDestroy, Field {
  config: FieldConfig;
  group: FormGroup;
  
  ispreview: string;
  widgetKey: any;
  bOSubscribe: any;
  expendedHeaderId: any;
 derivedFields: any;
  derivedFieldsCopy: any;
  isDerivedField: boolean = false;
  historyView: boolean;
  isTable: any;
  constructor(public formDataDistributionService: FormDataDistributionService,
              public calculationService: CalculationService,
              public toastr: ToastrService
  ) {
    this.widgetKey = widgetKeys.keys;
  }
  ngOnInit() {
    this.bOSubscribe = this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
  }

  executeFormula(calData) {
    this.executeFormulaForNumeric(calData);
    // if (this.config['isSelectTimeWidget'] === 'numeric') {
    //   this.executeFormulaForNumeric(calData);
    // } else {
    //   this.executeFormulaForTime(calData);
    // }

  }
  executeFormulaForTime(calData) {
    let solvedFormula = '';
    let emptyFieldsCount = 0;
    calData[widgetKeys.calculationKeys.formula].forEach(formulaObjcet => {
      const result = this.calculationService.formulaValidatore(formulaObjcet, this.group);
      if (result === undefined || result['emptyFields']) {
        this.toastr.info(webUserConstants.constantKeys.calculationErrMsg);
        emptyFieldsCount++;
        return;
      } else {
        solvedFormula += result['formula'].replace(':', '.');
        if (this.getCalculatedValue(solvedFormula)) {
          solvedFormula = this.getCalculatedValue(solvedFormula) + "+";
        }
      }
    });

    if (emptyFieldsCount === 0) {
       this.group.get(calData[this.widgetKey._id]).setValue(solvedFormula.replace('+', ''));
    }
  }
  executeFormulaForNumeric(calData) {
    let solvedFormula = '';
    let emptyFieldsCount = 0;
    calData[widgetKeys.calculationKeys.formula].forEach(formulaObjcet => {
      const result = this.calculationService.formulaValidatore(formulaObjcet, this.group);
      if (result === undefined || result['emptyFields']) {
        this.toastr.info(webUserConstants.constantKeys.calculationErrMsg);
        emptyFieldsCount++;
        return;
      } else {
        solvedFormula += result['formula'];
      }
    });
    if (emptyFieldsCount === 0) {
      // tslint:disable-next-line:no-eval
      const calculationValue = parseFloat(eval(solvedFormula).toFixed(5));
      this.group.get(calData[this.widgetKey._id]).setValue(calculationValue);
    }
  }

  ngOnDestroy() {
    if (this.bOSubscribe) {
      this.bOSubscribe.unsubscribe();
    }
  }

  getCalculatedValue(formula) {
    let formulaArray = [];
    let opereatorType ;

    if (formula.indexOf('+') > -1 ) {
      formulaArray = formula.trim(' ').split('+');
      opereatorType = '+';
    } else if (formula.indexOf('-') > -1) {
       formulaArray = formula.split('-');
       opereatorType = '-';
    }

    let count ;
    if (formulaArray[1] !== '' ) {
      const minsValue = this.getMins(formulaArray[0])
                        + this.getMins(formulaArray[1]);
      count = this.time_convert(minsValue);
    } else {
      const minsValue = this.getMins(formulaArray[0]);
      count = this.time_convert(minsValue);
    }
    return count;

    // let tt = (+value[0]) * 60 + (+value[1]);
    // tt = tt + Number(this.config['timePeriod']);
    // const hh = Math.floor(tt / 60);
    // const mm = (tt % 60);
    // return ('0' + (hh % 24)).slice(-2) + ':' + ('0' + mm).slice(-2);
  }

  time_convert(num) {
    const hours1 = Math.floor(num / 60);
    const  minutes1 = num % 60;
    return hours1 + '.' + minutes1;
  }
  getMins(num) {
    const timeRange = num.split('.');
    // tslint:disable-next-line:radix
    return parseInt ( timeRange[0] ) * 60 + parseInt(timeRange[1]);
  }


}
