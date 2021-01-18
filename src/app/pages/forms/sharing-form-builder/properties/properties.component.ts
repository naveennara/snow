import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
import { widgetKeys } from '../../dynamic-form/objcet-keys-constants';
import { FieldConfig } from '../../dynamic-form/models/field-config.interface';
import { ToastrService } from 'ngx-toastr';
import { FormsServicesService } from '../../forms-services.service';
import { CommonService } from '../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../globals';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  config: FieldConfig;
  @Input()
  widgetsList: any[];
  widgetKey: any;
  form: FormGroup;
  options: FormArray;
  requiredProperties = ['label', 'minimum', 'maximum', 'minTime', 'maxTime'];
  userPropLabels = ["Requestor Name", "Email", "Phone Number"];
  timePeriodIntervals = [15, 30, 45, 60];
  validateTB = false;
  isFormulaEditableModeEnabled = false;
  calculationsOperators = [];
  formula = "";
  selectedOpe: object = {};
  selectedParaOperator: object = {};
  addedNumericOperands = [];
  selectedFieldId = ""
  selectedNumber = "";
  removeElements = [];
  modifiedFields = [];
  numericFields = {};
  groupOperatorsInFormula = [];
  mainIndex: number;
  isEditGroup: any;
  isEditType: any;
  editField: any;
  editOperatorType: any;
  editFieldIndex: any;
  editcalculationFields: any;
  alertMessage: string;
  ImageConfig: string;
  typeChangeOptions = [];
  dropdownSettings: object;
  orginalWidget = {};
  invalidFormulaCount = 0;
  typeChangeValue = '';
  selectedtype = null;
  typeChangeValues = {
    textBox: [{ id: 'number', name: 'Number' }, { id: 'textArea', name: 'TextArea' }, { id: 'rating', name: 'Rating' }, { id: 'checkBox', name: 'Checkbox' }, { id: 'radio', name: 'Radio' }, { id: 'select', name: 'Dropdown' }, { id: 'calendar', name: 'Calendar' }],
    number: [{ id: 'radio', name: 'Radio' }],
    textArea: [{ id: 'textBox', name: 'Input' }, { id: 'number', name: 'Number' }, { id: 'rating', name: 'Rating' }, { id: 'checkBox', name: 'Checkbox' }, { id: 'radio', name: 'Radio' }, { id: 'select', name: 'Dropdown' }, { id: 'calendar', name: 'Calendar' }],
    rating: [{ id: 'number', name: 'Number' }],
    checkBox: [{ id: 'textBox', name: 'Input' }, { id: 'number', name: 'Number' }, { id: 'textArea', name: 'TextArea' }, { id: 'rating', name: 'Rating' }, { id: 'radio', name: 'Radio' }, { id: 'select', name: 'Dropdown' }, { id: 'calendar', name: 'Calendar' }],
    radio: [{ id: 'textBox', name: 'Input' }, { id: 'number', name: 'Number' }, { id: 'textArea', name: 'TextArea' }, { id: 'rating', name: 'Rating' }, { id: 'checkBox', name: 'Checkbox' }, { id: 'select', name: 'Dropdown' }, { id: 'calendar', name: 'Calendar' }],
    select: [{ id: 'textBox', name: 'Input' }, { id: 'number', name: 'Number' }, { id: 'textArea', name: 'TextArea' }, { id: 'rating', name: 'Rating' }, { id: 'radio', name: 'Radio' }, { id: 'checkBox', name: 'Checkbox' }, { id: 'calendar', name: 'Calendar' }],
    referenceList: [{ id: 'textBox', name: 'Input' }, { id: 'number', name: 'Number' }, { id: 'textArea', name: 'TextArea' },{ id: 'radio', name: 'Radio' }, { id: 'checkBox', name: 'Checkbox' }, { id: 'select', name: 'Dropdown' }],
    calendar: [{ id: 'textBox', name: 'Input' }, { id: 'textArea', name: 'TextArea' }]
  }
  collectionList: any[];
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  columnsList: any[];
  dropdownMsg: string;
  coldropdownMsg: string;
  formCtrlSub: Subscription;
  defaultValueMessage: string = '';
  dateFormat  = Globals.dateFormats;
  changeType = false;
  autoCompleteField = Globals.autoCompleteFbField;
  autoCompleteForm = Globals.autoCompleteFbForm;
  constants;
  isChangeTypeEnable = false;
  changeTypeName: string;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private services: FormsServicesService,
    private commonService: CommonService
  ) {
    this.widgetKey = Globals.widgetKeys.keys;
    this.constants = Globals.allConstants.constantKeys;
  }

  ngOnInit() {
    this.fieldTypeChangeSubscriber();
    if (this.loginDetails.type != 0) {
      this.requiredProperties.push('dynamicDropdownTable', 'columnName');

    }
    this.commonService.editProperties.next(this.config);
    this.dropdownSettings = this.services.dropdownSettings4;
    jQuery(function () {
      //form-group-default active if input focus
      $(".form-group-default .form-control").focus(function () {
        $(this).parent().addClass("active");
      }).blur(function () {
        $(this).parent().removeClass("active");
      })
    });
    this.form = this.createGroup();
    this.selectedtype = null;
    if (Globals.widgetProperties.widgets[this.config.type].includes('options') || Globals.widgetProperties.widgets[this.config.type].includes('maxLength')) {
      this.defaultValueCheck();

    }
   
    if (Globals.widgetProperties.widgets[this.config.type].includes('options')) {
      this.form.controls.options = this.fb.array([this.createItem()])
      if (this.config.options.length > 1) {
        for (let i = 0; i < this.config.options.length - 1; i++) {
          this.add();
        }
      }
    }
    else if (Globals.widgetProperties.widgets[this.config.type].includes('dynamicDropdownTable')) {
      this.getDropdownTables();
      if (this.config['dynamicDropdownTable'] != '') {
        this.dropdownTable(this.config['dynamicDropdownTable']);
      }
    }
    this.form.patchValue(this.config);
    if (this.config.type == Globals.widgetTypes.widgets['calendar'] && this.config.defaultValue) {
      this.form.patchValue({
        defaultValue:new Date(this.config.defaultValue)
      })
    }
    if (this.config.type == Globals.widgetTypes.widgets['calculation']) {
      if (this.form.value.formula) {
        this.calculationsOperators = this.form.value.formula;
      } else {
        this.calculationsOperators = [];
      }
      const numericFields = this.widgetsList.filter(value => (value.type === Globals.widgetTypes.widgets['number']) || (value.type === Globals.widgetTypes.widgets['calculation'] && value.id != this.config.id));
      let tableWidgetIds = this.widgetsList.filter(value => (value.isTable === true)).map(value => value.id);
      numericFields.forEach((value, key) => {
        if (value.label != '') {
          if (this.config['isUnderHeading'] !== '') {
            if (this.config['isUnderHeading'] == value.isUnderHeading) {
              this.numericFields[value.id] = value.label;
            }
          } else {
            if (tableWidgetIds.includes(value.isUnderHeading)) {

            } else {
              this.numericFields[value.id] = value.label;
            }
          }
        }
      })
      // const numericFields = this.widgetsList.filter(value => value.type === Globals.widgetTypes.widgets['number'] || value.type === Globals.widgetTypes.widgets['calculation'])
      //   numericFields.forEach((value,key)=>{
      //     if(this.config.isTable == true) {
      //       if(this.config.id== value.isUnderHeading){
      //         this.numericFields[value.id] = value.label;
      //       }
      //     }else{
      //       this.numericFields[value.id] = value.label;
      //     }
      // })
    }

    this.selectedOpe['ope'] = "";
  }
  fieldTypeChangeSubscriber(){
    this.commonService.editPropertiesWithTypeChange.subscribe((status)=>{
      this.isChangeTypeEnable = status?true:false;
      this.changeTypeName = this.config.type;
    })
  }
  createItem(): FormGroup {
    return this.fb.group({
      displayValue: '',
      value: ''
    });


  }
  defaultValueCheck() {
    this.formCtrlSub = this.form.get('defaultValue').valueChanges
      .debounceTime(1000)
      .subscribe((value: any) => {
        this.checkingDefaultValue();
      }
      );
  }
  labelCaseCheck() {
    // this.formCtrlSub = this.form.get(this.widgetKey.label).valueChanges
    //   .subscribe((value: any) => {
        let str = this.form.get(this.widgetKey.label).value;
        if ((str===null) || (str===''))
                return false;
            else
            str = str.toString();

        str = str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}).trim();
        this.form.get(this.widgetKey.label).patchValue(str);
        this.labelValidator(this.form.get(this.widgetKey.label).value);
     // }
      //);
  }
    
  defaultCalendar(value) {
    if (value == 'ManualEntry') {
      this.form.addControl(this.widgetKey.defaultValue, this.createControl(this.widgetKey.defaultValue));

    } else {
      this.form.removeControl(this.widgetKey.defaultValue);

    }
  }
  checkingDefaultValue() {
    if (this.form.value[this.widgetKey.maxLength] && (this.form.get('defaultValue').value.length > this.form.value[this.widgetKey.maxLength])) {
      this.defaultValueMessage = 'Value length should be less than Maximum';
      return true;
    } else if (this.form.get('options') && Globals.widgetProperties.widgets[this.config.type].includes('options')) {
      let check = this.form.get('options').value.filter(object => object[this.widgetKey.optionDisplayValue] === this.form.get('defaultValue').value);
      if (!check.length && this.form.get('defaultValue').value !=='') {
        this.defaultValueMessage = 'Value should be part of created values';
        return true;

      } else {
        this.defaultValueMessage = '';
        return false;

      }
    } else {
      this.defaultValueMessage = '';
      return false;
    }
  }
  labelValidator(label: string) {
    let LabelCheck;
    if (this.config['isDependentField'] == true) {
      LabelCheck = this.widgetsList.filter(value => value.label === label && value.isUnderHeading === this.config['isUnderHeading'])

    } else {
      LabelCheck = this.widgetsList.filter(value => value.label === label)

    }
    if (LabelCheck.length > 0 && LabelCheck[0].id != this.config.id) {
      this.validateTB = true;
      return true;
    }
    else {
      this.validateTB = false;
      return false;
    }
  }
  getDropdownTables() {
    this.collectionList = this.services.dropdownTables;
    if (this.collectionList.length == 0) {
      this.dropdownMsg = 'No data found';
    }
    else {
      this.dropdownMsg = '';

    }
    // let url = Globals.urls.fetchDropdownCollections + '/' + this.loginDetails.accounts[0]._id;
    // this.services.getCollections(url).subscribe((collections: any[]) => {
    //   this.collectionList = collections;
    // });
  }
  dropdownTable(collectionName) {
    this.coldropdownMsg = 'Loading...'
    this.form.patchValue({
      columnName: ''
    });
    let url = Globals.urls.fetchColumns + '/' + collectionName;
    this.services.getColumns(url).subscribe((columns: any[]) => {
      this.columnsList = columns;
      if (columns && columns.length) {
        this.coldropdownMsg = null;
        // this.form.patchValue({
        //   columnName:this.config['columnName']
        // });
      } else {
        this.coldropdownMsg = 'No data Found'

      }
    });
  }

  ngOnChanges() {
    this.selectedtype = null;
    this.commonService.editProperties.next(this.config);
    if (this.form) {
      this.typeChangeValue = '';
      const controls = Object.keys(this.form.controls);
      const configControls = Globals.widgetProperties.widgets[this.config.type];

      controls
        .forEach((control) => this.form.removeControl(control));

      configControls
        .forEach((name) => {
          this.form.addControl(name, this.createControl(name));
        });
      if (Globals.widgetProperties.widgets[this.config.type].includes('options') || Globals.widgetProperties.widgets[this.config.type].includes('maxLength')) {
        this.defaultValueCheck();

      }
     
      if (Globals.widgetProperties.widgets[this.config.type].includes('options')) {
        this.form.controls.options = this.fb.array([this.createItem()])
        if (this.config.options.length > 1) {
          for (let i = 0; i < this.config.options.length - 1; i++) {
            this.add();
          }
        }

      }
      else if (Globals.widgetProperties.widgets[this.config.type].includes('dynamicDropdownTable')) {
        this.getDropdownTables();
        if (this.config['dynamicDropdownTable'] != '') {
          this.dropdownTable(this.config['dynamicDropdownTable']);
        }

      }

      this.form.patchValue(this.config);
      if (this.config.type == Globals.widgetTypes.widgets['calendar'] && this.config.defaultValue) {
        this.form.patchValue({
          defaultValue:new Date(this.config.defaultValue)
        })
      }

      if (this.config.type == Globals.widgetTypes.widgets['calculation']) {
        if (this.form.value.formula) {
          this.calculationsOperators = this.form.value.formula;
        } else {
          this.calculationsOperators = [];
        }
        this.numericFields = {};
        const numericFields = this.widgetsList.filter(value => (value.type === Globals.widgetTypes.widgets['number']) || (value.type === Globals.widgetTypes.widgets['calculation'] && value.id != this.config.id))
        let tableWidgetIds = this.widgetsList.filter(value => (value.isTable === true)).map(value => value.id);
        numericFields.forEach((value, key) => {
          if (value.label != '') {
            if (this.config['isUnderHeading'] !== '') {
              if (this.config['isUnderHeading'] == value.isUnderHeading) {
                this.numericFields[value.id] = value.label;
              }
            } else {
              if (tableWidgetIds.includes(value.isUnderHeading)) {

              } else {
                this.numericFields[value.id] = value.label;
              }
            }
          }

        })
      }
      this.selectedOpe['ope'] = "";
    }
  }

  createGroup() {
    const group = this.fb.group({});
    const widgetprop = Globals.widgetProperties.widgets[this.config.type];
    if (widgetprop !== undefined) {
      widgetprop.forEach(property => group.addControl(property, this.createControl(property)));
      return group;
    } else {
      return;
    }

  }

  checkProperty(property: string) {
    let widgetprop = [];
    this.typeChangeOptions = [];
    if (this.typeChangeValue === undefined) {
      widgetprop = Globals.widgetProperties.widgets[this.config.type];
      const controls = Object.keys(this.form.controls);
      const configControls = Globals.widgetProperties.widgets[this.config.type];
      controls
        .forEach((control) => this.form.removeControl(control));
      configControls
        .forEach((name) => {
          this.form.addControl(name, this.createControl(name));
        });
      if (Globals.widgetProperties.widgets[this.config.type].includes('options')) {
        this.form.controls.options = this.fb.array([this.createItem()])
      }
      this.form.patchValue(this.config);
    } else if (this.typeChangeValue !== '') {
      widgetprop = Globals.widgetProperties.widgets[this.typeChangeValue];
    } else {
      widgetprop = Globals.widgetProperties.widgets[this.config.type];
    }
   
    if (widgetprop.includes(property)) {
      if (property === 'typeChange') {
        this.typeChangeOptions = [];
        this.typeChangeOptions = this.typeChangeValues[this.config.type];
      } else {
        this.typeChangeOptions = [];
      }
      if (property == 'isRequired' && this.config.type == Globals.widgetTypes.widgets['header']) {
        if (this.config.isTable == true) {
          return true;

        } else {
          return false;
        }

      } else {
        return true;
      }
    } else {
      // this.typeChangeOptions = [];
      return false;
    }
  }


  createControl(config) {
    let validationList: any = [];
    if (this.requiredProperties.includes(config)) {
      validationList.push(Validators.required)
    }
    return this.fb.control('', validationList);
  }

  add() {
    this.options = this.form.get('options') as FormArray;
    this.options.push(this.createItem());
  }

  removeIndex(index) {
    this.options.controls.splice(index, 1);
    this.options.value.splice(index, 1);
  }
  //  setCurrentCalId(calId) {
  //     this.currentCal.id = calId;
  //   }

  showCalculatorWarning() {
    //$mdDialog.show($mdDialog.alert().parent(angular.element(document.querySelector('#popupContainer'))).clickOutsideToClose(true).title('Warning?').textContent('This field is already used in one of the calculation field so you can not Change/Delete this field').ariaLabel('Warning Dialog').ok('Ok'));
  }

  formulaUndo() {
    this.isFormulaEditableModeEnabled = false;
    this.formula = "";
    let removeElement = this.calculationsOperators.splice(this.calculationsOperators.length - 1, 1);
    removeElement.filter((calElemnt) => {
      Object.entries(calElemnt).forEach(([key, operatorTypeEle]) => {
        operatorTypeEle['fieldList'].filter((operatorObj) => {
          let index = this.addedNumericOperands.indexOf(operatorObj.id);
          if (index != -1) this.addedNumericOperands.splice(index, 1);
        })
      })
    })
    this.removeElements.push(removeElement);
    this.selectedOpe['ope'] = "";
    this.formulaFormat(this.calculationsOperators);
  }

  formulaClear() {
    this.isFormulaEditableModeEnabled = false;
    this.calculationsOperators = [];
    this.formula = "";
    this.selectedOpe['ope'] = "";
    this.addedNumericOperands = [];
    this.selectedFieldId = ""
    this.addedNumericOperands = [];
    this.selectedNumber = "";
    this.invalidFormulaCount = 0;
  }

  formulaFormat(formula) {
    formula.forEach((field, key) => {
      field.forEach((val, operatorType) => {
        val.forEach((value, key) => {
          if (key == "fieldList") {
            let formulaStr = "";
            let groupFieldListCount = 0;
            let groupFieldListStr = "";
            value.forEach((v, k) => {
              if (operatorType === "singleOperator") {
                formulaStr = formulaStr + v.name;
                if (this.addedNumericOperands.indexOf(v.id) == -1) this.addedNumericOperands.push(v.id)
              } else {
                if (this.addedNumericOperands.indexOf(v.id) == -1) this.addedNumericOperands.push(v.id)
                groupFieldListCount++;
                if (value.length == groupFieldListCount) {
                  groupFieldListStr = groupFieldListStr + v.name;
                  if (operatorType === "add") formulaStr = formulaStr + "add(" + groupFieldListStr + ")";
                  else if (operatorType === "sub") formulaStr = formulaStr + "sub(" + groupFieldListStr + ")";
                  else if (operatorType === "mul") formulaStr = formulaStr + "mul(" + groupFieldListStr + ")";
                  else if (operatorType === "div") formulaStr = formulaStr + "div(" + groupFieldListStr + ")";
                  else if (operatorType === "avg") formulaStr = formulaStr + "avg(" + groupFieldListStr + ")";
                } else {
                  groupFieldListStr = groupFieldListStr + v.name + ",";
                }
              }
            })
            this.formula = this.formula + formulaStr;
          } else this.formula = this.formula + value;
        })
      })
    })
  }

  saveCalculationPro(data) {
    let validatorresults = this.formulaValidator();
    if (validatorresults[1] >= 1) {
      this.toastr.info(this.constants.invalidFormulaMsg);
      return false;
    }
    //second level validaton and porocess
    this.calculationsOperators = Object.assign([], this.calculationsOperators);
    let lastOperator = "";
    if (this.calculationsOperators.length != 0) {
      let lastKey = Object.keys(this.calculationsOperators[this.calculationsOperators.length - 1]);
      lastOperator = this.calculationsOperators[this.calculationsOperators.length - 1][lastKey[0]].operator;
      let fieldListlen: number;
      if (lastKey[0] !== "singleOperator") {
        fieldListlen = this.calculationsOperators[this.calculationsOperators.length - 1][lastKey[0]].fieldList.length;
        if (fieldListlen < 1) {
          this.toastr.info(this.constants.invalidFormulaMsg);
          return false;
        }
      }
    } else {
      this.toastr.info(this.constants.formulaEmptyMsg);
      return false;
    }
    if (lastOperator === "" || lastOperator === "%") {
      if (this.numericFields[data.id] == undefined || this.numericFields[data.id] == "") {
        this.saveCalculatorProcess(lastOperator);
      } else if (this.addedNumericOperands.indexOf(data.id) >= 0) {
        if (this.numericFields[data.id] != data.label) {
          this.showCalculatorWarning();
        } else {
          this.numericFields[data.id] = data.label;
          this.saveCalculatorProcess(lastOperator);
          return true;
        }
      } else {
        this.numericFields[data.id] = data.label;
        this.saveCalculatorProcess(lastOperator);
        return true;
      }
    } else {
      this.toastr.info(this.constants.invalidFormulaMsg);
      return false;
    }

  }
  saveCalculatorProcess(lastOperator) {
    if (lastOperator === "" || lastOperator === "%") {
      this.form.value.formula = this.calculationsOperators;
      this.form.value.formulaString = this.formula;
      this.clearFormula()
    }
  }

  clearFormula() {
    //this.calculationsOperators = [];
    this.formula = "";
    this.selectedOpe['ope'] = "";
    this.selectedParaOperator['ope'] = "";
    this.selectedNumber = "";
    this.isFormulaEditableModeEnabled = false;
    this.invalidFormulaCount = 0;
  }

  setOperatorType(eachOperatorKey, eachOperator) {
    if (eachOperatorKey == "operator") {
      //this.operatorType = eachOperator;
    }
  }

  operatorFun(currentOperator) {
    if (!this.isFormulaEditableModeEnabled) {
      this.calculationsOperators = Object.assign([], this.calculationsOperators);
      if (this.calculationsOperators.length != 0) {
        for (let val in this.calculationsOperators[this.calculationsOperators.length - 1]) {
          if (currentOperator === "inv" || currentOperator === "sqrt" || currentOperator === "add" || currentOperator === "sub" || currentOperator === "mul" || currentOperator === "div" || currentOperator === "avg" || currentOperator === "(") {
            this.currentOpeGroupTypeProcess(val, currentOperator);
          } else if (currentOperator === "+" || currentOperator === "-" || currentOperator === "*" || currentOperator === "%" || currentOperator === "/") {
            this.currentOpeSingleTypeProcess(val, currentOperator);
          } else if (currentOperator === ")") {


            if (!this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].isParaObjClosed) this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].isParaObjClosed = true;
            if (!this.groupOperatorsInFormula[this.groupOperatorsInFormula.length - 1][this.calculationsOperators.length - 1]) this.groupOperatorsInFormula[this.groupOperatorsInFormula.length - 1][this.calculationsOperators.length - 1] = true;

          }
        }
      } else {
        if (currentOperator === "+" || currentOperator === "-" || currentOperator === "*" || currentOperator === "%" || currentOperator === "/") {
          this.selectedOpe['ope'] = "";
          this.toastr.info(this.constants.addOperatorMsg);
        } else if (currentOperator === '(') {
          this.selectedOpe['ope'] = currentOperator;
          let operator = {};
          operator[currentOperator] = {};
          operator[currentOperator].fieldList = [];
          operator[currentOperator].operator = "";
          operator[currentOperator].isParaObjClosed = false;
          this.calculationsOperators.push(operator);
          let groupOpeObj = {};
          let index = this.calculationsOperators.length - 1;
          groupOpeObj[index] = false;
          this.groupOperatorsInFormula.push(groupOpeObj);
          this.formula = this.formula + "" + currentOperator + "(" + operator[currentOperator].fieldList + ")";
        } else {
          this.selectedOpe['ope'] = currentOperator;
          let operator = {};
          operator[currentOperator] = {};
          operator[currentOperator].fieldList = [];
          operator[currentOperator].operator = "";
          this.calculationsOperators.push(operator);
          this.formula = this.formula + "" + currentOperator + "(" + operator[currentOperator].fieldList + ")";
        }
      }
    } else {
      if (currentOperator == "+" || currentOperator == "-" || currentOperator == "%" || currentOperator == "/" || currentOperator == "*") {
        let tt = {};
        Object.assign(tt, this.editcalculationFields[this.mainIndex])
        let keys = Object.keys(tt)
        let ope = keys[0];
        this.editcalculationFields[this.mainIndex][ope].operator = currentOperator;
      } else {
        this.toastr.info(this.constants.groupOperatorErrMSg);
      }
    }
  }

  editFormula(event, index, type, listLevelIndex, mathematicalObject, isGroupType, calculationsOperators) {
    if (event.keyCode == 8) {
      if (type == "operand") {
        if (!isGroupType) {
          if (typeof mathematicalObject.fieldList == 'string') {
            mathematicalObject.fieldList = "";
          } else {
            let tt = mathematicalObject.fieldList.splice(listLevelIndex, 1);
            const index = this.addedNumericOperands.indexOf(tt[0].id)
            if (index >= 0) this.addedNumericOperands.splice(index, 1)
          }
          if (mathematicalObject.operator == '') {
            calculationsOperators.splice(index, 1);
          }
        } else calculationsOperators.splice(index, 1);
      } else {
        if (mathematicalObject.fieldList == '' || mathematicalObject.fieldList.length == 0) {
          calculationsOperators.splice(index, 1);
        }
        mathematicalObject.operator = "";
      }
    } else {
      event.preventDefault();
      return false;
    }
  }

  backToNormalView() {
    this.isFormulaEditableModeEnabled = false;
  }

  clickedText(index, type, listLevelIndex, mathematicalObject, isGroupType, operatorType, mainObjectList) {
    this.mainIndex = index;
    this.isFormulaEditableModeEnabled = true;
    this.isEditGroup = isGroupType;
    this.isEditType = type;
    this.editField = mathematicalObject;
    this.editOperatorType = operatorType;
    this.editFieldIndex = listLevelIndex;
    this.editcalculationFields = mainObjectList;
  }

  numericFun(number) {
    if (!this.isFormulaEditableModeEnabled) {

      this.selectedFieldId = "";
      this.selectedNumber = number;
      if (this.calculationsOperators.length != 0) {
        let haskeyRemmoveCaluculationsOperators = {};
        Object.assign(haskeyRemmoveCaluculationsOperators, this.calculationsOperators[this.calculationsOperators.length - 1])
        if (Object.keys(haskeyRemmoveCaluculationsOperators).indexOf("numeric") != -1) {
          this.selectedOpe['ope'] = "";
          if (this.calculationsOperators[this.calculationsOperators.length - 1]['numeric'].operator == "") {
            let existsString = this.calculationsOperators[this.calculationsOperators.length - 1]['numeric'].fieldList;
            this.calculationsOperators[this.calculationsOperators.length - 1]['numeric'].fieldList = existsString + "" + number;
          } else {
            let operator = {};
            operator["numeric"] = {};
            operator["numeric"].fieldList = number;
            operator["numeric"].operator = "";
            this.calculationsOperators.push(operator);
          }
        }

        else if (Object.keys(haskeyRemmoveCaluculationsOperators).indexOf("numeric") == -1) {
          if (Object.keys(haskeyRemmoveCaluculationsOperators).map(key => haskeyRemmoveCaluculationsOperators[key])[0].operator !== "") {
            this.selectedOpe['ope'] = "";
            let operator = {};
            operator["numeric"] = {};
            operator["numeric"].fieldList = number;
            operator["numeric"].operator = "";
            this.calculationsOperators.push(operator);
          } else if (Object.keys(haskeyRemmoveCaluculationsOperators)[0] == '(' || Object.keys(haskeyRemmoveCaluculationsOperators)[0] == 'sub' || Object.keys(haskeyRemmoveCaluculationsOperators)[0] == 'mul' || Object.keys(haskeyRemmoveCaluculationsOperators)[0] == 'div' || Object.keys(haskeyRemmoveCaluculationsOperators)[0] == 'avg' || Object.keys(haskeyRemmoveCaluculationsOperators)[0] == 'add' || Object.keys(haskeyRemmoveCaluculationsOperators)[0] == 'sqrt' || Object.keys(haskeyRemmoveCaluculationsOperators)[0] == 'inv') {
            this.toastr.info(this.constants.groupOperatorNumberMsg);
          } else {
            this.toastr.info(this.constants.addOperatorMsg);
          }
        } else { this.selectedOpe['ope'] = ""; }
      } else {
        this.selectedOpe['ope'] = "";
        let operator = {};
        operator["numeric"] = {};
        operator["numeric"].fieldList = number;
        operator["numeric"].operator = "";
        this.calculationsOperators.push(operator);
        this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"].fieldList[0].name;
      }
    } else {
      if (!this.isEditGroup) {
        if (this.isEditType == 'operand') {
          let keys = Object.keys(this.editcalculationFields[this.mainIndex])
          if (keys[0] == 'numeric') {
            let values = Object.keys(this.editcalculationFields[this.mainIndex]).map(key => this.editcalculationFields[this.mainIndex][key])
            values[0].fieldList = values[0].fieldList + "" + number;
          }

        } else {
          let keys = Object.keys(this.editcalculationFields[this.mainIndex + 1])
          if (this.editcalculationFields[this.mainIndex + 1][keys[0]].fieldList.length > 0) {
            let operator = {};
            operator["numeric"] = {};
            operator["numeric"].fieldList = number;
            operator["numeric"].operator = "";
            this.editcalculationFields.splice(this.mainIndex + 1, 0, operator);
          } else if (this.editcalculationFields[this.mainIndex + 1][keys[0]].fieldList.length <= 0) {
            if (keys[0] == 'singleOperator' || keys[0] == 'numeric') {
              if (keys[0] == 'numeric') {
                this.editcalculationFields[this.mainIndex + 1].singleOperator.fieldList = this.editcalculationFields[this.mainIndex + 1].singleOperator.fieldList + "" + number;
              } else {
                let operator = {};
                operator["numeric"] = {};
                operator["numeric"].fieldList = number;
                operator["numeric"].operator = "";
                this.editcalculationFields[this.mainIndex + 1] = operator;
              }
            }
          }

        }
      }
    }
  }

  formulaValidator() {
    this.invalidFormulaCount = 0;
    let str = "";
    let validatorResult = this.formulaStringPreparation(this.calculationsOperators)
    str = str + validatorResult[0];
    return [str, validatorResult[1]]
  }

  formulaStringPreparation(calculationsOperators) {
    let str = "";
    calculationsOperators.forEach((partOfFormula, index) => {
      let partOfFormulaType = Object.keys(partOfFormula);
      let partOfFormulaObject = Object.keys(partOfFormula).map(key => partOfFormula[key]);
      if (partOfFormulaType[0] == 'singleOperator') {
        if (index != calculationsOperators.length - 1) {
          if (partOfFormulaObject[0].fieldList.length == 0 || partOfFormulaObject[0].operator == "") {
            if (partOfFormulaObject[0].fieldList.length == 0 && partOfFormulaObject[0].operator == "") {
            } else {
              this.invalidFormulaCount++;
            }
          } else if (partOfFormulaObject[0].fieldList.length != 0 && partOfFormulaObject[0].operator != "") {
            partOfFormulaObject[0].fieldList.forEach((object, key) => {
              str = str + "" + object.name;
            })
            str = str + partOfFormulaObject[0].operator;
          }
        } else {
          partOfFormulaObject[0].fieldList.forEach((object, key) => {
            str = str + "" + object.name;
          })
          if (partOfFormulaObject[0].operator != "") {
            this.invalidFormulaCount++;
          }
        }
      } else if (partOfFormulaType[0] == '(') {
        str = str + "("
        let returnResults = this.formulaStringPreparation(partOfFormulaObject[0].fieldList);
        str = str + returnResults[0];
        str = str + ")"
        str = str + partOfFormulaObject[0].operator;
        this.invalidFormulaCount = +returnResults[1]
      } else if (partOfFormulaType[0] == 'numeric') {
        if (index != calculationsOperators.length - 1) {
          if (partOfFormulaObject[0].fieldList.length == 0 || partOfFormulaObject[0].operator == "") {
            this.invalidFormulaCount++;
          } else if (partOfFormulaObject[0].fieldList.length != 0 && partOfFormulaObject[0].operator != "") {
            str = str + "" + partOfFormulaObject[0].fieldList;
            str = str + partOfFormulaObject[0].operator;
          }
        } else {
          str = str + "" + partOfFormulaObject[0].fieldList;
          if (partOfFormulaObject[0].operator != "") {
            this.invalidFormulaCount++;
          }
        }
      } else if (partOfFormulaType[0] == 'add' || partOfFormulaType[0] == 'sub' || partOfFormulaType[0] == 'mul' || partOfFormulaType[0] == 'div' || partOfFormulaType[0] == 'avg' || partOfFormulaType[0] == 'sqrt' || partOfFormulaType[0] == 'inv') {
        if (index != calculationsOperators.length - 1) {
          if (partOfFormulaObject[0].fieldList.length == 0 || partOfFormulaObject[0].operator == "") {
            if (partOfFormulaObject[0].fieldList.length == 0 && partOfFormulaObject[0].operator == "") {
            } else {
              this.invalidFormulaCount++;
            }
          } else if (partOfFormulaObject[0].fieldList.length != 0 && partOfFormulaObject[0].operator != "") {
            str = partOfFormulaType[0] + "(";
            partOfFormulaObject[0].fieldList.forEach((object, key) => {
              str = str + " " + object.name;
            })
            str = str + ")";
            str = str + partOfFormulaObject[0].operator;
          }
        } else {
          str = partOfFormulaType[0] + "(";
          partOfFormulaObject[0].fieldList.forEach((object, key) => {
            str = str + " " + object.name;
          })
          str = str + ")";
          if (partOfFormulaObject[0].operator != "") {
            this.invalidFormulaCount++;
          }
        }
      }
    })
    return [str, this.invalidFormulaCount];
  }

  pushOperator(currentOperator) {
    let operator = {};
    operator[currentOperator] = {};
    operator[currentOperator].fieldList = [];
    operator[currentOperator].operator = "";
    this.calculationsOperators.push(operator);
    this.formula = this.formula + "" + currentOperator + "(" + operator[currentOperator].fieldList + ")";
  }

  currentOpeGroupTypeProcess(val, currentOperator) {
    if (val === "add" || val === "sub" || val === "mul" || val === "div" || val === "avg" || val === "sqrt" || val === "inv") {
      let ope = this.calculationsOperators[this.calculationsOperators.length - 1][val].operator;
      if (ope === "+" || ope === "-" || ope === "*" || ope === "/" || ope === "%" || ope === "()") {
        this.selectedOpe['ope'] = currentOperator;
        this.pushOperator(currentOperator);
      } else {
        this.selectedOpe['ope'] = val;
        this.toastr.info(this.constants.addOperandsErrMsg + val + this.constants.groupOperatorMsg);
      }
    } else if (val == "(") {
      this.selectedParaOperator['ope'] = currentOperator;
      this.paraFormulaCreator(val, currentOperator);
    } else if (val === "+" || val === "-" || val === "*" || val === "/" || val === "%") {
      this.selectedOpe['ope'] = currentOperator;
      this.pushOperator(currentOperator);
      //this.formula = this.formula + "" + currentOperator + "(" + operator[currentOperator].fieldList + ")";
    } else {
      let ope = this.calculationsOperators[this.calculationsOperators.length - 1][val].operator;
      if (ope === "+" || ope === "-" || ope === "*" || ope === "/" || ope === "%") {
        this.selectedOpe['ope'] = currentOperator;
        let operator = {};
        operator[currentOperator] = {};
        operator[currentOperator].fieldList = [];
        operator[currentOperator].operator = "";
        this.calculationsOperators.push(operator);
        this.formula = this.formula + "" + currentOperator + "(" + operator[currentOperator].fieldList + ")";
      } else {
        this.toastr.info(this.constants.addOperatorMsg);
      }
    }
  }

  currentOpeSingleTypeProcess(val, currentOperator) {
    if (val === "+" || val === "-" || val === "*" || val === "%" || val === "/") {
      alert(this.constants.addFieldPrevious)
    } else if (val == "numeric") {
      this.selectedOpe['ope'] = currentOperator;
      this.calculationsOperators[this.calculationsOperators.length - 1][val].operator = currentOperator;
    } else if (val == "(") {
      let groupOpeObj = {};
      let index = this.calculationsOperators.length - 1;
      groupOpeObj[index] = false;
      this.groupOperatorsInFormula.push(groupOpeObj);
      let paraStaus = this.calculationsOperators[this.calculationsOperators.length - 1][val].isParaObjClosed;
      if (paraStaus) {
        this.selectedParaOperator['ope'] = "";
        this.selectedOpe['ope'] = currentOperator;
        this.calculationsOperators[this.calculationsOperators.length - 1][val].operator = currentOperator;
      } else {
        this.selectedParaOperator['ope'] = currentOperator;
        this.paraFormulaCreator(val, currentOperator);
      }
    } else if (val == "add" || val === "avg") {
      if (this.calculationsOperators[this.calculationsOperators.length - 1][val].fieldList.length >= 1) {
        this.selectedOpe['ope'] = currentOperator;
        this.calculationsOperators[this.calculationsOperators.length - 1][val].operator = currentOperator;
        let lastChar = this.formula.substr(this.formula.length - 1);
        if (lastChar != ")") {
          this.formula = this.formula.replace(/.$/, "");
        }
        this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1][val].operator
      } else {
        this.toastr.info(val + this.constants.groupOperatorMinErr);
      }
    } else if (val == 'sub' || val == 'div') {
      if (this.calculationsOperators[this.calculationsOperators.length - 1][val].fieldList.length == 2) {
        this.selectedOpe['ope'] = currentOperator;
        this.calculationsOperators[this.calculationsOperators.length - 1][val].operator = currentOperator;
        let lastChar = this.formula.substr(this.formula.length - 1);
        if (lastChar != ")") {
          this.formula = this.formula.replace(/.$/, "");
        }
        this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1][val].operator
      } else {
        this.toastr.info(val + this.constants.groupOperatorMaxErr);
      }
    } else if (val == 'sqrt' || val == 'inv') {
      if (this.calculationsOperators[this.calculationsOperators.length - 1][val].fieldList.length <= 1) {
        this.selectedOpe['ope'] = currentOperator;
        this.calculationsOperators[this.calculationsOperators.length - 1][val].operator = currentOperator;
        let lastChar = this.formula.substr(this.formula.length - 1);
        if (lastChar != ")") {
          this.formula = this.formula.replace(/.$/, "");
        }
        this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1][val].operator
      } else {
        this.toastr.info(val + this.constants.oneOperandErrMsg);
      }
    } else if (val == 'mul') {
      if (this.calculationsOperators[this.calculationsOperators.length - 1][val].fieldList.length >= 2) {
        this.selectedOpe['ope'] = currentOperator;
        this.calculationsOperators[this.calculationsOperators.length - 1][val].operator = currentOperator;
        let lastChar = this.formula.substr(this.formula.length - 1);
        if (lastChar != ")") {
          this.formula = this.formula.replace(/.$/, "");
        }
        this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1][val].operator
      } else {
        this.toastr.info(val + this.constants.twoOperandsErrMsg);
      }
    } else {
      this.selectedOpe['ope'] = currentOperator;
      if (this.formula.length > 0) {
        let ope = this.calculationsOperators[this.calculationsOperators.length - 1][val].operator;
        if (this.formula.charAt(this.formula.length - 1) !== val) {
          if (ope !== "") this.formula = this.formula.replace(/.$/, "");
          this.calculationsOperators[this.calculationsOperators.length - 1][val].operator = currentOperator;
          this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1][val].operator;
        }
      }
    }
  }

  paraFormulaCreator(val, currentOperator) {
    if (this.calculationsOperators[this.calculationsOperators.length - 1][val].fieldList.length != 0) {
      if (currentOperator === "+" || currentOperator === "-" || currentOperator === "*" || currentOperator === "%" || currentOperator === "/") {
        let paraObjLen = this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.length;
        Object.entries(this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList[paraObjLen - 1]).forEach(([key, paraObj]) => {
          if (key !== 'singleOperator' && key !== '(') {
            if (paraObj['fieldList'].length > 0) {
              paraObj['operator'] = currentOperator;
            } else {
              this.toastr.info(this.constants.addOperandsMsg);
            }
          } else if (key == "(") {
            alert("operaoreeeeeeeee");

          } else {
            paraObj['operator'] = currentOperator;
          }
        });
      } else if (currentOperator == 'add' || currentOperator == 'sub' || currentOperator == 'mul' || currentOperator == 'div' || currentOperator == 'avg' || currentOperator == 'sqrt' || currentOperator == 'inv') {
        let paraObjLen = this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.length;
        Object.entries(this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList[paraObjLen - 1]).forEach(([key, paraObj]) => {
          if (key != '(') {
            if (paraObj['operator'] != "") {
              this.selectedParaOperator['ope'] = currentOperator;
              let operator = {};
              operator[currentOperator] = {};
              operator[currentOperator].fieldList = [];
              operator[currentOperator].operator = "";
              this.calculationsOperators[this.calculationsOperators.length - 1][val].fieldList.push(operator);
            } else {
              this.toastr.info(this.constants.addOperandErrMsg);
            }
          } else {
            alert("1222222");
          }
        });
      }
    } else {
      if (currentOperator == 'add' || currentOperator == 'sub' || currentOperator == 'mul' || currentOperator == 'div' || currentOperator == 'avg' || currentOperator == 'sqrt' || currentOperator == 'inv') {
        this.selectedParaOperator['ope'] = currentOperator;
        let operator = {};
        operator[currentOperator] = {};
        operator[currentOperator].fieldList = [];
        operator[currentOperator].operator = "";
        this.calculationsOperators[this.calculationsOperators.length - 1][val].fieldList.push(operator);
        this.formula = this.formula + "" + currentOperator + "(" + operator[currentOperator].fieldList + ")";
      } else if (currentOperator === "+" || currentOperator === "-" || currentOperator === "*" || currentOperator === "%" || currentOperator === "/") {
        this.selectedParaOperator['ope'] = "";
        this.toastr.info(this.constants.addOperatorMsg);
      } else if (currentOperator === "(") {
        alert("still pending");
      }
    }
  }

  numericFieldsOperandsFun(currentNumericFields) {
    if (!this.isFormulaEditableModeEnabled) {
      let currentNumericField = {};
      currentNumericField['id'] = currentNumericFields[0];
      currentNumericField['name'] = currentNumericFields[1];
      if (this.selectedOpe['ope'] !== "") {
        this.operatorNotSelectedProcess(currentNumericFields, currentNumericField);
      } else {
        if (this.calculationsOperators.length >= 1) {
          if (this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"] !== undefined) {
            let ope = this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"].operator;
            if (ope === "+" || ope === "-" || ope === "*" || ope === "/" || ope === "%") {
              this.addedNumericOperands.push(currentNumericFields[0])
              this.selectedFieldId = currentNumericFields[0];
              let operator = {};
              operator['singleOperator'] = {}
              operator["singleOperator"].fieldList = [];
              operator["singleOperator"].fieldList.push(currentNumericField);
              operator["singleOperator"].operator = "";
              this.calculationsOperators.push(operator);
              this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"].fieldList[0].name;
            } else {
              this.toastr.info(this.constants.addOperatorMsg);
            }
          } else {
            this.addedNumericOperands.push(currentNumericFields[0])
            let operator = {};
            operator['singleOperator'] = {}
            operator["singleOperator"].fieldList = [];
            operator["singleOperator"].fieldList.push(currentNumericField);
            operator["singleOperator"].operator = "";
            this.calculationsOperators.push(operator);
          }
        } else {
          this.addedNumericOperands.push(currentNumericFields[0])
          this.selectedFieldId = currentNumericFields[0];
          let operator = {};
          operator['singleOperator'] = {}
          operator["singleOperator"].fieldList = [];
          operator["singleOperator"].fieldList.push(currentNumericField);
          operator["singleOperator"].operator = "";
          this.calculationsOperators.push(operator);
          this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"].fieldList[0].name;
        }
      }
    } else {
      if (!this.isEditGroup) {
        if (this.isEditType == 'operand') {
          if (this.editOperatorType == 'singleOperator') {
            if (this.editField.fieldList.length == 0) {
              let currentNumericField = {};
              currentNumericField['id'] = currentNumericFields[0];
              currentNumericField['name'] = currentNumericFields[1];
              this.editField.fieldList.push(currentNumericField)
            } else {
              this.toastr.info(this.constants.invalidEntryMsg);
            }
          } else {
            let currentNumericField = {};
            currentNumericField['id'] = currentNumericFields[0];
            currentNumericField['name'] = currentNumericFields[1];
            this.editField.fieldList.splice(this.editFieldIndex + 1, 0, currentNumericField);
          }
        } else {
          let keys = Object.keys(this.editcalculationFields[this.mainIndex + 1])
          if (this.editcalculationFields[this.mainIndex + 1][keys[0]].fieldList.length > 0) {
            let operator = {};
            operator['singleOperator'] = {}
            let currentNumericField = {};
            currentNumericField['id'] = currentNumericFields[0];
            currentNumericField['name'] = currentNumericFields[1];
            operator["singleOperator"].fieldList = [];
            operator["singleOperator"].fieldList.push(currentNumericField);
            operator["singleOperator"].operator = "";
            this.editcalculationFields.splice(this.mainIndex + 1, 0, operator);
          } else if (this.editcalculationFields[this.mainIndex + 1][keys[0]].fieldList.length <= 0) {
            if (keys[0] == 'singleOperator' || keys[0] == 'numeric') {
              if (keys[0] == 'singleOperator') {
                let currentNumericField = {};
                currentNumericField['id'] = currentNumericFields[0];
                currentNumericField['name'] = currentNumericFields[1];
                this.editcalculationFields[this.mainIndex + 1].singleOperator.fieldList.push(currentNumericField)
              } else {
                let operator = {};
                operator['singleOperator'] = {}
                let currentNumericField = {};
                currentNumericField['id'] = currentNumericFields[0];
                currentNumericField['name'] = currentNumericFields[1];
                operator["singleOperator"].fieldList = [];
                operator["singleOperator"].fieldList.push(currentNumericField);
                operator["singleOperator"].operator = this.editcalculationFields[this.mainIndex + 1][keys[0]].operator;
                this.editcalculationFields[this.mainIndex + 1] = operator;
              }
            }
          }
        }
      }
    }
  }

  operatorNotSelectedProcess(currentNumericFields, currentNumericField) {
    if (this.selectedOpe['ope'] === "add" || this.selectedOpe['ope'] === "sub" || this.selectedOpe['ope'] === "mul" || this.selectedOpe['ope'] === "div" || this.selectedOpe['ope'] === "avg" || this.selectedOpe['ope'] === "sqrt" || this.selectedOpe['ope'] === "inv") {
      this.addedNumericOperands.push(currentNumericFields[0]);
      this.selectedFieldId = currentNumericFields[0];
      this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.push(currentNumericField);
      if (this.formula.length > 0) {
        let endIndex = this.formula.lastIndexOf("(");
        if (endIndex != -1) {
          let str = "";
          this.formula = this.formula.substring(0, endIndex);
          this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.forEach((value, key) => {
            str = str + "," + value.name;
          })
          this.formula = this.formula + "(" + str.substring(1) + ")";
        }
      }
    } else if (this.selectedOpe['ope'] === "+" || this.selectedOpe['ope'] === "-" || this.selectedOpe['ope'] === "*" || this.selectedOpe['ope'] === "%" || this.selectedOpe['ope'] === "/") {
      if (this.calculationsOperators.length > 0) {
        this.addedNumericOperands.push(currentNumericFields[0])
        let lastOperator = Object.keys(this.calculationsOperators[this.calculationsOperators.length - 1])[0];
        if (lastOperator === "singleOperator") {
          let ope = this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"].operator;
          if (ope === "+" || ope === "-" || ope === "*" || ope === "/" || ope === "%") {
            this.selectedFieldId = currentNumericFields[0];
            let operator = {};
            operator['singleOperator'] = {};
            operator["singleOperator"].fieldList = [];
            operator["singleOperator"].fieldList.push(currentNumericField);
            operator["singleOperator"].operator = "";
            this.calculationsOperators.push(operator);
            this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"].fieldList[0].name;
          } else {
            this.toastr.info(this.constants.addOperatorMsg);
          }
        } else {
          this.addedNumericOperands.push(currentNumericFields[0])
          this.selectedFieldId = currentNumericFields[0];
          let operator = {};
          operator['singleOperator'] = {}
          operator["singleOperator"].fieldList = [];
          operator["singleOperator"].fieldList.push(currentNumericField);
          operator["singleOperator"].operator = "";
          this.calculationsOperators.push(operator);
          this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"].fieldList[0].name;
        }
      }
    } else if (this.selectedOpe['ope'] === "(") {
      this.addedNumericOperands.push(currentNumericFields[0]);
      this.selectedFieldId = currentNumericFields[0];
      this.paraFormulaOperators(currentNumericField);
    }
  }

  paraFormulaOperators(currentNumericFields) {
    let lastOperator = this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList;
    if (lastOperator.length > 0) {
      let lastOperatorObj = Object.assign(lastOperator[lastOperator.length - 1])

      Object.entries(lastOperatorObj).forEach(([val, key]) => {
        if (val == "singleOperator") {
          if (key['operator'] !== "" && key['operator'] != undefined) {
            if (key['operator'] === "add" || key['operator'] === "sub" || key['operator'] === "mul" || key['operator'] === "div" || key['operator'] === "avg" || key['operator'] === "sqrt" || key['operator'] === "inv") {
              this.addedNumericOperands.push(currentNumericFields[0]);
              this.selectedFieldId = currentNumericFields[0];
              let paraObjLen = this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.length;
              this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList[paraObjLen - 1][key['operator']].fieldList.push(currentNumericFields);
            } else if (key['operator'] === "+" || key['operator'] === "-" || key['operator'] === "*" || key['operator'] === "/" || key['operator'] === "%" || key['operator'] === "+") {
              this.addedNumericOperands.push(currentNumericFields[0])
              let lastOperator = Object.keys(this.calculationsOperators[this.calculationsOperators.length - 1])[0];
              if (lastOperator === "singleOperator") {
                let ope = this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"].operator;
                if (ope === "+" || ope === "-" || ope === "*" || ope === "/" || ope === "%") {
                  this.selectedFieldId = currentNumericFields[0];
                  let operator = {};
                  operator['singleOperator'] = {};
                  operator["singleOperator"].fieldList = [];
                  operator["singleOperator"].fieldList.push(currentNumericFields);
                  operator["singleOperator"].operator = "";
                  this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.push(operator);
                  this.formula = this.formula + "" + this.calculationsOperators[this.calculationsOperators.length - 1]["singleOperator"].fieldList[0].name;
                } else {
                  // $('.error').stop().fadeIn(400).delay(2000).fadeOut(400);
                  this.toastr.info(this.constants.addOperatorMsg);
                }
              } else {
                this.addedNumericOperands.push(currentNumericFields[0])
                this.selectedFieldId = currentNumericFields[0];
                let operator = {};
                operator['singleOperator'] = {}
                operator["singleOperator"].fieldList = [];
                operator["singleOperator"].fieldList.push(currentNumericFields);
                operator["singleOperator"].operator = "";
                this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.push(operator);
              }
            }
          } else {
            //$('.error').stop().fadeIn(400).delay(2000).fadeOut(400);
            this.toastr.info(this.constants.addOperatorMsg);
          }
        } else if (val == 'add' || val == 'sub' || val == 'mul' || val == "div" || val == "avg" || val == "sqrt" || val == "inv") {
          if (key['operator'] == '') {
            this.addedNumericOperands.push(currentNumericFields[0]);
            this.selectedFieldId = currentNumericFields[0];
            let paraObjLen = this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.length;
            this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList[paraObjLen - 1][val].fieldList.push(currentNumericFields);
          } else {
            this.selectedFieldId = currentNumericFields[0];
            let operator = {};
            operator['singleOperator'] = {}
            operator["singleOperator"].fieldList = [];
            operator["singleOperator"].fieldList.push(currentNumericFields);
            operator["singleOperator"].operator = "";
            this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.push(operator);
          }
        } else if (val == "(") {

        }
      })
    } else {
      this.addedNumericOperands.push(currentNumericFields[0])
      this.selectedFieldId = currentNumericFields[0];
      let operator = {};
      operator['singleOperator'] = {}
      operator["singleOperator"].fieldList = [];
      operator["singleOperator"].fieldList.push(currentNumericFields);
      operator["singleOperator"].operator = "";
      this.calculationsOperators[this.calculationsOperators.length - 1][this.selectedOpe['ope']].fieldList.push(operator);
    }
  }

  getImageCOnfig(value: string) {
    this.ImageConfig = value;
  }
  onItemSelect(event) {

    if (event !== undefined && event !== '') {
      this.typeChangeValue = event.id;
      const controls = Object.keys(this.form.controls);
      const configControls = Globals.widgetProperties.widgets[event.id];
      controls
        .forEach((control) => this.form.removeControl(control));
      configControls
        .forEach((name) => {
          this.form.addControl(name, this.createControl(name));
        });
      if (Globals.widgetProperties.widgets[event.id].includes('options')) {
        this.form.controls.options = this.fb.array([this.createItem()])
      }
      this.form.patchValue(this.config);
    }
  }
  saveProperties() {
    if (this.typeChangeValue.length) {
      this.config.type = this.typeChangeValue;
    }
    if (this.services.formTemplate === 'edit') {
      if (this.form.valid) {
        if (this.config['_id'] !== undefined) {
          if (this.services.Modifiedwidgets.length > 0) {
            const result2 = this.services.Modifiedwidgets.findIndex(obj1 => obj1.id === this.config.id);
            if (result2 !== -1) {
              this.services.storeModifiedWidgets(this.config, result2);
              this.services.storeModifiedWidgets(this.config, 'push');
            } else {
              this.services.storeModifiedWidgets(this.config, 'push');
            }
          } else {
            this.services.storeModifiedWidgets(this.config, 'push');
          }
        } else { }
      }
    }
    if (this.options && Globals.widgetProperties.widgets[this.config.type].includes('options')) {
      const emptyFields = this.options.value.filter(value => value[this.widgetKey['optionDisplayName']] === "" || value[this.widgetKey['optionDisplayValue']] === "")
      if (emptyFields.length > 0) {
        this.toastr.info(this.constants.emptyFieldsErrMsg);
        return;
      }
      this.form.value.options = this.options.value;

    } else if (this.config.type == Globals.widgetTypes.widgets['calculation']) {
      if (this.formula || this.calculationsOperators) {
        this.form.value['id'] = this.config[this.widgetKey._id]
        if (this.saveCalculationPro(this.form.value) == false) {
          return;
        }
      }
    }
    else if (this.config.type == Globals.widgetTypes.widgets['camera']) {
      if (this.form.value.imageSize) {
        this.form.value.imageSize = this.form.value.imageSize + this.ImageConfig;
      }
    }
    if (this.form.value['minimum'] && this.form.value['maximum']) {
      if (this.checkMaxValidation(this.form.value['minimum'], this.form.value['maximum']) == true) {
        return;

      }

    }
    else if (this.form.value['minLength'] && this.form.value['maxLength']) {
      if (this.checkMaxValidation(this.form.value['minLength'], this.form.value['maxLength']) == true) {
        return;
      }
    }
    else if(this.defaultValueMessage.length ){
      return;
    }
    // else if(this.form.value[this.widgetKey['defaultValue']] && this.config.type == Globals.widgetTypes.widgets['calendar']){
    //   this.dateValueChange(this.form.value[this.widgetKey['defaultValue']]);
    // }

    Object.assign(this.config, this.form.value);
    this.notifyParentOnUpdate.emit('success');
  }

  dateValueChange(value){
    if(typeof(value) != 'string'){
      // const finalDate = new Date(Date.UTC(value.getFullYear(), (value.getMonth() + 1), value.getDate()));
      // this.form.get(this.widgetKey['defaultValue']).setValue(finalDate);
        }
 
  }
  cancel() {
    //this.form.reset();
    this.notifyParentOnUpdate.emit('cancel');
  }
  maxValidation(max) {
    if (Number(max) <= 30) {
      return false;

    } else {
      return true;
    }
  }
  checkMaxValidation(min, max) {
    if (Number(min) >= Number(max)) {
      return true;
    } else {
      return false;
    }
  }

}
