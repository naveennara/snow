import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { ResizeEvent } from 'angular-resizable-element';
import { CommonService } from '../../../../sharing/sharing-module/common.service';
import { WindowRef } from '../../../../sharing/sharing-module/WindowRef';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { FormsServicesService } from '../../forms-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl, } from '@angular/forms';
import * as Globals from '../../../../globals';
import * as CryptoJS from 'crypto-js';

// import { AComponent } from './AComponent';
@Component({
  selector: 'app-form-builder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {
  isCollapsed = true;
  derivedForm: FormGroup;
  formData: any[];
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  // divToScroll: any;
  direction: string = 'horizontal';
  myInnerHeight: any;
  myInnerComponentHeight: any;
  action = {
    a1s: 25,
    a2s: 30,
    a3s: 45,
    useTransition: true,
    isVisibleA: true,
    isVisibleB: true,
    isVisibleC: true,
    isPresentA: true,
    isPresentB: true,
    isPresentC: true,
    isDisabled: true,
    logs: ''
  };
  modalPopupObject: any;
  display: boolean = false;
  droppedwidgets = [];
  droppedItems = [];
  test: string = '';
  currentDraggedItem: any;
  config = {};
  requiredFields = [];
  header: object;
  showWidgets: boolean;
  deletedWidgets = [];
  formId: any;
  updateType: string;
  derivedLabels: any;
  isTrue = false;
  options = [];
  target = [];
  conditionLogicArray = [];
  allFields: any;
  isDerivedFieldPresent = false;
  selectDerivedCondition = false;
  derivedConditions = [];
  showTableValues = [];
  // enable and disable dropdowns when add
  show = true;
  show1 = false;
  show2 = false;
  show3 = false;
  show4 = false;
  multipleConditions = [];
  enableApply = false;
  enableCancel = true;
  conditionLogicArr = [];
  noDataImg = Globals.noDataFound;
  obj = {};
  selectedFields = [];
  dependentFields = [];
  headerCount = 0;
  breakCount = 0;
  headerTotal = 0;
  breakTotal = 0;
  setConditionData = [];
  allHeaders = [];
  dynamicDropdown: boolean;
  formName;
  formKeys;
  onResizeEnd(event: ResizeEvent): void {
  }
  constructor(
    private CommonService: CommonService,
    private toastr: ToastrService,
    private winRef: WindowRef,
    public ngxSmartModalService: NgxSmartModalService,
    private services: FormsServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _el: ElementRef
  ) {
    this.myInnerHeight = winRef.nativeWindow.innerHeight;
    this.myInnerComponentHeight = winRef.nativeWindow.innerHeight - 5;
    this.formKeys = Globals.allConstants.constantKeys;
  }

  updateDroppedItem(event: object): void {
    this.CommonService.editPropertiesWithTypeChange.next(false);
    this.currentDraggedItem = event;
    const fieldId = Math.floor(Math.random() * 9000000000) + 1000000000;
    if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['textBox']) {
      const input = {
        id: '',
        label: '',
        isRequired: '',
        placeholder: '',
        size: 50,
        defaultValue: '',
        minLength: '',
        maxLength: '',
        type: Globals.widgetTypes.widgets['textBox']
      };
      const textBoxLabel = 'Id';
      input.id = textBoxLabel.replace(' ', '__');
      input.id = input.id + '_' + fieldId;
      this.checkHeaderWidgets(input, this.currentDraggedItem.currentIndex);
    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['number']) {
      const input = {
        id: '',
        label: '',
        isRequired: '',
        placeholder: '',
        size: 50,
        defaultValue: '',
        minLength: '',
        maxLength: '',
        isInptAllowDecimals: false,
        type: Globals.widgetTypes.widgets['number']
      };
      const numberLabel = 'Id';
      input.id = numberLabel.replace(' ', '__');
      input.id = input.id + '_' + fieldId;
      this.checkHeaderWidgets(input, this.currentDraggedItem.currentIndex);
    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['rating']) {
      const rating = {
        id: '',
        label: '',
        minimum: 1,
        maximum: 5,
        minLable: 'Poor',
        maxLable: 'Excellent',
        isRequired: '',
        defaultValue: 1,
        type: Globals.widgetTypes.widgets['rating']
      };
      let ratingLabel = "Id";
      rating.id = ratingLabel.replace(" ", "__");
      rating.id = rating.id + "_" + fieldId;
      this.checkHeaderWidgets(rating, this.currentDraggedItem.currentIndex);

    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['calculation']) {
      const calci = {
        id: '',
        label: '',
        formula: '',
        type: Globals.widgetTypes.widgets['calculation']
      };
      let calculationLabel = "Id";
      calci.id = calculationLabel.replace(" ", "__");
      calci.id = calci.id + "_" + fieldId;
      this.checkHeaderWidgets(calci, this.currentDraggedItem.currentIndex);
    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['signature']) {
      const sign = {
        id: '',
        label: '',
        isRequired: '',
        type: Globals.widgetTypes.widgets['signature']
      };
      let signatureLabel = "Id";
      sign.id = signatureLabel.replace(" ", "__");
      sign.id = sign.id + "_" + fieldId;
      this.checkHeaderWidgets(sign, this.currentDraggedItem.currentIndex);

    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['map']) {
      const map = {
        id: "",
        label: '',
        isRequired: '',
        type: Globals.widgetTypes.widgets['map']
      };
      let mapLabel = "Location";
      map.id = mapLabel.replace(" ", "__");
      map.id = map.id + "_" + fieldId;

      // this is added by venkatesh bendi.
      this.checkHeaderWidgets(map, this.currentDraggedItem.currentIndex);
      // this commented by venki bendi , it should allow the multi locatipn widgets
      // const index = this.droppedItems.findIndex((widget) => widget.type == Globals.widgetTypes.widgets['map'])
      // if (index == -1) {
      //   this.checkHeaderWidgets(map, this.currentDraggedItem.currentIndex);

      // } else {
      //   this.toastr.info("Form should contain only one map field");
      //   return
      // }

    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['barcode']) {
      const barcode = {
        id: "",
        label: '',
        isRequired: '',
        placeholder: '',
        type: Globals.widgetTypes.widgets['barcode']
      };
      let barcodeLabel = "Id";
      barcode.id = barcodeLabel.replace(" ", "__");
      barcode.id = barcode.id + "_" + fieldId;
      this.checkHeaderWidgets(barcode, this.currentDraggedItem.currentIndex);
    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['calendar']) {
      const calendar = {
        id: '',
        label: '',
        defaultValue: '',
        minDate: '',
        maxDate: '',
        typeOfDateSelected: 'ManualEntry',
        placeholder: 'Enter date',
        type: Globals.widgetTypes.widgets['calendar']
      };
      let calenderDate = "Id";
      calendar.id = calenderDate.replace(" ", "__");
      calendar.id = calendar.id + "_" + fieldId;
      this.checkHeaderWidgets(calendar, this.currentDraggedItem.currentIndex);

    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['camera']) {
      const camera = {
        id: '',
        label: '',
        isRequired: '',
        imageSize: '',
        isGeotagginEnable: false,
        type: Globals.widgetTypes.widgets['camera']
      };
      let cameraLabel = "Id";
      camera.id = cameraLabel.replace(" ", "__");
      camera.id = camera.id + "_" + fieldId;
      this.checkHeaderWidgets(camera, this.currentDraggedItem.currentIndex);

    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['video']) {
      const video = {
        id: '',
        label: '',
        isRequired: '',
        // videoSize: "",
        videoDuration: '20',
        type: Globals.widgetTypes.widgets['video']
      };
      let videoLabel = "Id";
      video.id = videoLabel.replace(" ", "__");
      video.id = video.id + "_" + fieldId;
      this.checkHeaderWidgets(video, this.currentDraggedItem.currentIndex);

    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['textArea']) {
      const textArea = {
        id: '',
        label: '',
        isRequired: '',
        placeholder: '',
        isPrimary: '',
        minInputVal: '',
        maxInputVal: 1500,
        defaultValue: '',
        type: Globals.widgetTypes.widgets['textArea']
      };
      let textAreaLabel = "Id";
      textArea.id = textAreaLabel.replace(" ", "__");
      textArea.id = textArea.id + "_" + fieldId;
      this.checkHeaderWidgets(textArea, this.currentDraggedItem.currentIndex);

    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['header'] || this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['table']) {
      const header = {
        id: '',
        label: '',
        isTable: false,
        isRequired:'',
        type: Globals.widgetTypes.widgets['header']
      };
      let headerLabel = 'Id';
      header.id = headerLabel.replace(" ", "__");
      header.id = header.id + "_" + fieldId;
     
      const breakObj = {
        id:'',
        type: Globals.widgetTypes.widgets['break'],
        isTable: false,
        breakOf: header.id
      };
      let breakLabel = 'Id';
      breakObj.id = breakLabel.replace(" ", "__");
      breakObj.id =  breakObj.id + "_" + Math.floor(Math.random() * 9000000000) + 1000000000;
      if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['table']) {
        header.isTable = true;
        breakObj.isTable = true;
      }

      this.checkHeaderWidgets(header, this.currentDraggedItem.currentIndex);
      this.checkHeaderWidgets(breakObj, this.currentDraggedItem.currentIndex + 1);

    }
    else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['checkBox']) {
      const checkBox = {
        id: '',
        label: '',
        isPrimary: '',
        defaultValue: '',
        isRequired: '',
        type: Globals.widgetTypes.widgets['checkBox'],
        options: []
        // options: [{

        //   displayValue: 'Display name',
        //   value: 'Display value',
        //   dependFields: {}
        // }]

      };
      let checkBoxLabel = "Id";
      checkBox.id = checkBoxLabel.replace(" ", "__");
      checkBox.id = checkBox.id + "_" + fieldId;
      this.checkHeaderWidgets(checkBox, this.currentDraggedItem.currentIndex);

    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['radio']) {
      const radio = {
        id: '',
        label: '',
        defaultValue: '',
        isRequired: '',
        type: Globals.widgetTypes.widgets['radio'],
        options: []
        // options: [{
        //   displayValue: 'Display name',
        //   value: 'Display value',
        //   dependFields: {}
        // }]
      };
      let radioLabel = "Id";
      radio.id = radioLabel.replace(" ", "__");
      radio.id = radio.id + "_" + fieldId;
      this.checkHeaderWidgets(radio, this.currentDraggedItem.currentIndex);

    } else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['select']) {
      const dropdown = {
        id: "",
        label: "",
        isRequired: "",
        placeholder: '',
        defaultValue: '',
        isAllowMultiselection: false,
        type: Globals.widgetTypes.widgets['select'],
        derivedFields: [],
        options: [],
        // options: [{
        //   displayValue: 'Display name',
        //   value: 'Display value',
        //   dependFields: {}
        // }]
      };
      let dropdownLabel = "Id";
      dropdown.id = dropdownLabel.replace(" ", "__");
      dropdown.id = dropdown.id + "_" + fieldId;
      this.checkHeaderWidgets(dropdown, this.currentDraggedItem.currentIndex);

    }
    else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['referenceList']) {
      const dropdown = {
        id: "",
        label: "",
        isRequired: "",
        placeholder: '',
        defaultValue: '',
        isAllowMultiselection: false,
        type: Globals.widgetTypes.widgets['referenceList'],
        dynamicDropdownTable:'',
        columnName:'',
        derivedFields: [],
        options: [{
          displayValue: "",
        }]
      };
      let dropdownLabel = "Id";
      dropdown.id = dropdownLabel.replace(" ", "__");
      dropdown.id = dropdown.id + "_" + fieldId;
      this.checkHeaderWidgets(dropdown, this.currentDraggedItem.currentIndex);

    }
    else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['time']) {
      const time = {
        id: "",
        label: "",
        isRequired: "",
        placeholder: 'In Minutes',
        timePeriod:"15",
        minTime:'',
        maxTime:'',
        defaultValue: '0:00',
        isAllowMultiselection: false,
        type: Globals.widgetTypes.widgets['time'],
      };
      let timeLabel = "Id";
      time.id = timeLabel.replace(" ", "__");
      time.id = time.id + "_" + fieldId;
      this.checkHeaderWidgets(time, this.currentDraggedItem.currentIndex);

    }
    else if (this.currentDraggedItem.item.data.type === Globals.widgetTypes.widgets['properties']) {
      const userProperties = {
        id: "",
        label: "",
        type: Globals.widgetTypes.widgets['properties'],
      };
      let userPropertiesLabel = "Id";
      userProperties.id = userPropertiesLabel.replace(" ", "__");
      userProperties.id = userProperties.id + "_" + fieldId;
      this.checkHeaderWidgets(userProperties, this.currentDraggedItem.currentIndex);

    }
  }
  checkHeaderWidgets(widget: object, index: number) {
    if (widget['type'] !== Globals.widgetTypes.widgets['break']) {
      if (this.droppedItems[index - 1] && (this.droppedItems[index - 1].type === Globals.widgetTypes.widgets['header'] || this.droppedItems[index - 1].isUnderHeading !== '')) {
        if (widget['type'] == Globals.widgetTypes.widgets['header']) {
          this.toastr.info(this.formKeys.headerErrMsg);
          return;
        } else {
          if (this.droppedItems[index - 1].type == Globals.widgetTypes.widgets['header']) {
            widget['isUnderHeading'] = this.droppedItems[index - 1]['id'];
          } else {
            widget['isUnderHeading'] = this.droppedItems[index - 1].isUnderHeading;
          }
          widget['isDependentField'] = true;
          this.droppedItems.splice(index, 0, widget);
        }
      } else {
        widget['isUnderHeading'] = "";
        widget['isDependentField'] = false;
        this.droppedItems.splice(index, 0, widget);
      }
      this.config = widget;
      this.action.isVisibleC = true;
      this.CommonService.editProperties.next(this.config);

    } else {
      if (this.droppedItems[index-1] &&  (this.droppedItems[index-1].type === Globals.widgetTypes.widgets['break'] || this.droppedItems[index-1].isUnderHeading !== '')) {
      } else {
        widget['isUnderHeading'] = "";
        widget['isDependentField'] = false;
        this.droppedItems.splice(index, 0, widget);
      }
    }
  }
  saveForm() {
    this.selectedFields = this.droppedItems.filter((control) => (control.type === 'radio' || control.type === 'select'  || control.type === 'checkBox' ||control.type === Globals.widgetTypes.widgets['referenceList'] ));
    this.selectedFields.filter(widget => {
      widget.options.filter(option => {
        if (option['dependFields'] !== undefined) {
          Object.keys(option.dependFields).filter(condition => {
            option.dependFields[condition].filter(field => {
              if (this.dependentFields.includes(field.id)) {

              } else {
                this.dependentFields.push(field.id);
              }
            });
          });
        }
      });
    });
    this.formData = this.droppedItems;
    this.requiredFields = this.formData.filter((control) => control.isRequired === true && control.type !== Globals.widgetTypes.widgets['header'])
    const labels = this.formData.findIndex((control) => control.label === '');
    let errorHeaderWidgets = false;
    for(let i in this.formData){
      if(this.formData[i].type == Globals.widgetTypes.widgets['header'] && this.formData[Number(i)+1].type == Globals.widgetTypes.widgets['break']){
        errorHeaderWidgets = true;
      }
    }
    if (this.requiredFields.length > 0 && labels === -1 && !errorHeaderWidgets) {
      this.ngxSmartModalService.getModal('savePopup').open();

    } else if (labels !== -1) {
      this.toastr.warning(this.formKeys.formPropErrMsg + (labels + 1));
    } else if(errorHeaderWidgets){
      this.toastr.warning(this.formKeys.headerEmpMsg);
    }else {
      this.toastr.warning(this.formKeys.requiredFieldMsg);
    }
  }
  onclick(event) {
    this.action.isVisibleC = false;
  }
  getDropdownTables(){
    if(this.loginDetails.type != 0){
      let url = Globals.urls.fetchDropdownCollections + '/' + this.loginDetails.accounts[0]._id;
      this.services.getCollections(url).subscribe((collections: any[]) => {
        //this.collectionList = collections;
      });
    }  }
  updateForm() {
    if (this.isDerivedFieldPresent) {
      this.isDerivedFieldPresent = true;
    } else {
      this.isDerivedFieldPresent = false;
    }
    this.selectedFields = this.droppedItems.filter((control) => (control.type === 'radio' || control.type === 'select' || control.type === 'checkBox' || control.type === Globals.widgetTypes.widgets['referenceList']));
    this.selectedFields.filter(widget => {
      widget.options.filter(option => {
        if (option['dependFields'] !== undefined) {
          Object.keys(option.dependFields).filter(condition => {
            option.dependFields[condition].filter(field => {
              if (this.dependentFields.includes(field.id)) {

              } else {
                this.dependentFields.push(field.id);
              }
            });
          });
        }
      });
    });
    this.formData = this.droppedItems;
    if (this.deletedWidgets.length > 0) {
      this.deletedWidgets.filter(obj => {
        const check = this.services.Modifiedwidgets.findIndex(obj2 => obj2.id === obj.id);
        if (check !== -1) {
          this.services.Modifiedwidgets.splice(check, 1);
        } else {
        }
      });
    }
    this.requiredFields = this.formData.filter((control) => control.isRequired === true && control.type !== Globals.widgetTypes.widgets['header']);
    const labels = this.formData.findIndex((control) => control.label === '');
    let errorHeaderWidgets = false;
    for(let i in this.formData){
      if(this.formData[i].type == Globals.widgetTypes.widgets['header'] && this.formData[Number(i)+1].type == Globals.widgetTypes.widgets['break']){
        errorHeaderWidgets = true;
      }
    }
    if (this.requiredFields.length > 0 && labels === -1 && !errorHeaderWidgets) {
      const formSkeletonChanges = {};
      formSkeletonChanges['update'] = this.services.Modifiedwidgets;
      formSkeletonChanges['deleted'] = this.deletedWidgets;
      if (this.deletedWidgets.length > 0) {
        this.updateType = 'hard';
        this.services.checkSoftorHardChange(formSkeletonChanges);
      } else if (this.services.Modifiedwidgets.length > 0) {
        this.updateType = 'soft';
        this.services.checkSoftorHardChange(formSkeletonChanges);
      } else {
        this.updateType = 'soft';
        this.services.checkSoftorHardChange(formSkeletonChanges);
      }
      this.ngxSmartModalService.getModal('savePopup').open();
      this.ngxSmartModalService.setModalData(this.deletedWidgets, 'savePopup');
    } else if (labels !== -1) {
      this.toastr.warning(this.formKeys.formPropErrMsg + (labels + 1));
    }else if(errorHeaderWidgets){
      this.toastr.warning(this.formKeys.headerEmpMsg);
    } else {
      this.toastr.warning(this.formKeys.requiredFieldMsg);
    }
  }
  closeSidebar() {
    this.isTrue = false;
    this.derivedForm.reset();
    this.selectDerivedCondition = false;
    this.conditionLogicArray = ['Show', 'Hide', 'Readonly'];
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
  }
  updateDervied() {
    this.closeSidebar();
    this.isDerivedFieldPresent = true;
    if (this.services.formTemplate === 'edit') {
      this.updateForm();
    } else {
      this.saveForm();
    }
  }
  enableSidebar() {
    this.show = true;
    this.derivedConditions = [];
    this.isTrue = false;
    this.formData = this.droppedItems;
    this.requiredFields = this.formData.filter((control) => control.isRequired === true);
    this.derivedLabels = this.formData.filter((control) => (control.type === 'radio' || control.type === 'select' || control.type === 'checkBox' || control.type === Globals.widgetTypes.widgets['referenceList']));
    const labels = this.formData.findIndex((control) => control.label === '');
    let errorHeaderWidgets = false;
    for(let i in this.formData){
      if(this.formData[i].type == Globals.widgetTypes.widgets['header'] && this.formData[Number(i)+1].type == Globals.widgetTypes.widgets['break']){
        errorHeaderWidgets = true;
      }
    }
    if (this.derivedLabels.length > 0) {
      if (this.requiredFields.length > 0 && labels === -1 && !errorHeaderWidgets) {
        this.isTrue = true;
        this.derivedLabels.filter(widget => {
          widget['disabled'] = false;
            const derivedConditions = widget.options.filter(option => option.dependFields !== undefined)
            if (derivedConditions.length > 0) {
              this.derivedConditions.push(widget);
              // this.showTableValues.push(widget);
            }
         
        });
      } else if (labels !== -1) {
        this.toastr.warning(this.formKeys.formPropErrMsg + (labels + 1));
      }else if(errorHeaderWidgets){
        this.toastr.warning(this.formKeys.headerEmpMsg);
      } else {
        this.toastr.warning(this.formKeys.requiredFieldMsg);
      }
    } else {
      this.toastr.warning(this.formKeys.derivedFieldsMsg);
  }
  }
  onSelectField(event) {
    this.allFields = [];
    this.derivedForm.patchValue({
      fieldOption: []
    });
    this.show2 = true;
    if (event !== undefined) {
      

      if( event.type != Globals.widgetTypes.widgets['referenceList']){
        this.dynamicDropdown = false;
      }else{
        this.dynamicDropdown = true;
      }
        this.options = event.options;
      if (event['isUnderHeading'] !== '') {
        this.formData.filter(obj => {
          if (obj.id === event.id) {
          } else if (obj.isUnderHeading === event.isUnderHeading) {
            this.allFields.push(obj);
          }
        });
      } else {
        this.formData.filter(obj => {
          if (obj.id === event.id) {
          } else if ((obj['type'] === Globals.widgetTypes.widgets['header'] || obj['isUnderHeading'] === '') && obj['breakOf'] === undefined) {
            this.allFields.push(obj);
          }
        });
      }
     
    } else {
      this.allFields = [];
      this.options = [];
    }
  }
  onSelectFieldState(event) {
    this.show3 = true;
  }
  onSelectTarget(event) {
    this.show2 = true;
  }
  onSelectCondition(event) {
    this.show4 = true;
  }
  deleteDerivedCondition(widget, option) {
    this.formData.filter(obj => {
      if (obj.id === widget.id) {
        obj.options.filter(widgetOption => {
          if (option.displayValue === widgetOption.displayValue) {
            delete widgetOption['dependFields'];
          }
        });
      }
    });
  }
  applyDerivedField(derivedField1) {
   
    // if (this.derivedForm.valid) {
    this.multipleConditions.filter(derivedField => {
      this.formData.filter(widget => {
        if (widget.id === derivedField.dependField.id) {
          
            widget.options.filter(option => {
              if (option.displayValue === derivedField.fieldOption.displayValue) {
                if (option.dependFields !== undefined) {
                  Object.keys(option.dependFields).filter(condition => {
                    if (condition === derivedField.conditionLogic) {
                      option['dependFields'][derivedField.conditionLogic] = derivedField.selectedDependentFields;
                    }
                  });
                }
                if (option.dependFields === undefined) {
                  option['dependFields'] = {};
                }
                // dependFields[derivedField.conditionLogic] = derivedField.selectedDependentFields;
              } else {
              }
            });
          
         
        } else { }
      });
    });
    this.enableSidebar();
    this.toastr.success(this.formKeys.derivedConditionApplyMsg);
    this.selectDerivedCondition = false;
    this.conditionLogicArr = [];
    this.conditionLogicArray = ['Show', 'Hide', 'Readonly'];
    this.obj = {};
    this.show = true;
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
    this.multipleConditions = [];
    this.enableApply = false;
  }

  setDerivedField(derivedField) {
    if(typeof(derivedField.fieldOption) == 'string'){
      derivedField.fieldOption = { displayValue : derivedField.fieldOption,dependFields:{}}
    }
    derivedField.selectedDependentFields.filter(obj => {
      const index = this.allFields.findIndex(obj1 => obj1.id === obj.id);
      if (index !== -1) {
        this.allFields.splice(index, 1);
      }
    });
   
    this.allFields = Object.assign([], this.allFields);
    if (this.conditionLogicArray.includes(derivedField.conditionLogic)) {
      this.conditionLogicArray.splice(this.conditionLogicArray.indexOf(derivedField.conditionLogic), 1);
    } else {
      this.conditionLogicArr.push(derivedField.conditionLogic);
    }
    // this.obj = {};
    this.obj[derivedField.conditionLogic] = derivedField.selectedDependentFields;
   
    derivedField.fieldOption.dependFields = this.obj;
    if( derivedField.dependField.type == 'referenceList'){
      let index = derivedField.dependField.options.findIndex(option => option.displayValue == derivedField.fieldOption.displayValue);
      if(index != -1){
        derivedField.dependField.options.splice(index,1,derivedField.fieldOption);
      }else{
        derivedField.dependField.options.push(derivedField.fieldOption);
      }
    }
    this.conditionLogicArray = Object.assign([], this.conditionLogicArray);
    this.multipleConditions.push(derivedField);
    this.show = false;
    this.show1 = false;
    this.show2 = false;
    this.enableApply = true;
    this.enableCancel = false;
    this.derivedForm.patchValue({
      conditionLogic: [],
      selectedDependentFields: []
    });
    //  -------------------------------------------------------


    // --------------------------------------------------------
    this.toastr.success(this.formKeys.derivedConditionSetMsg);
  }
  terminateDerivedFieldCondition() {
    this.derivedForm.reset();
    this.selectDerivedCondition = false;
    this.conditionLogicArray = ['Show', 'Hide', 'Readonly'];
    this.multipleConditions = [];
    this.enableApply = false;
    this.show = true;
    this.show1 = false;
    this.show2 = false;
    this.show3 = false;
    this.show4 = false;
  }
  addDerivedCondition() {
    if (this.selectDerivedCondition === true) {
      this.toastr.warning(this.formKeys.derivedIncompleteMsg);
    } else {
      this.derivedForm.reset();
      this.selectDerivedCondition = true;
      this.enableApply = false;
      this.enableCancel = true;
    }
  }
  Back() {
    this.services.formBack = true;
   
    if (this.loginDetails['type'] !== 0) {
      this.router.navigate(['/mainLayout/forms']);
    } else {
      this.router.navigate(['/mainLayout/templates']);
    }  
  }
  canDeactivate() {
    if (!this.services.formSubmitted) {
      if (confirm(Globals.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }
  ngOnInit() {
    this.formName = this.services.formData[this.formKeys['name']]
    //  attachmnets subsciber start 
    this.target = ['is'];
    this.conditionLogicArray = ['Show', 'Hide', 'Readonly'];
    this.services.formSubmitted = false;
    this.getDropdownTables();
    this.derivedForm = this.formBuilder.group({
      dependField: [[], Validators.required],
      // condition: [[], Validators.required],
      fieldOption: [[], Validators.required],
      conditionLogic: [[], Validators.required],
      selectedDependentFields: [[], Validators.required]
    });
    this.headerCount = 0;
    this.breakCount = 0;
    // when file is attached
    if (this.services.isFileUploaded) {
      this.services.excelFormSkeleton.filter(obj => {
        if (obj.type === Globals.widgetTypes.widgets['header']) {
          this.headerTotal++;
        } else if (obj.type === Globals.widgetTypes.widgets['break']) {
          this.breakTotal++;
        }
      });
      this.services.excelFormSkeleton.filter(obj => {

        if (obj.type === Globals.widgetTypes.widgets['header']) {
          if (this.headerCount === 0) {
            this.headerCount++;
            if (this.headerCount <= this.breakTotal) {
                this.allHeaders.push(obj);
                this.droppedItems.push(obj);
            }
          } else {
            if (this.headerCount + 1 <= this.breakTotal) {
              if (this.headerCount === this.breakCount) {
                this.headerCount++;
                this.allHeaders.push(obj);
                this.droppedItems.push(obj);
              }
            }
          }
        } else if (obj.type === Globals.widgetTypes.widgets['break']) {
          if (this.allHeaders.length) {
            this.allHeaders.filter(obj1 => {
              if (obj.breakOf === obj1.id) {
                this.breakCount++;
                this.droppedItems.push(obj);
              }
            });
            
          }
        
        }  else {
          this.droppedItems.push(obj);
      }
     
      });
      // have to handle for page widget also
      this.services.isFileUploaded = false;
    }
    if (this.services.formTemplate === 'edit') {
      if (this.services.formSkeleton.length > 0) {
        this.droppedItems = this.services.formSkeleton;
        this.showWidgets = true;
      } else {
        this.droppedItems = [];
        this.showWidgets = false;
      }
    } else {
      this.showWidgets = false;
    }
    this.CommonService.editProperties.subscribe(
      (enabled) => {
        this.config = enabled;
        this.action.isVisibleC = true;
      }
    )
    this.CommonService.headerSelection.subscribe(
      (header: object) => {
        this.header = header;
      }
    )
    this.CommonService.deleteWidget.subscribe(
      (enabled) => {
        const index = this.droppedItems.findIndex(widget => widget.id === enabled['id']);
        if (this.showWidgets) {
          if (enabled['_id'] !== undefined) {
            this.deletedWidgets.push(enabled);
          } else {
          }
        }
        this.droppedItems.splice(index, 1);
        if (this.config['id'] == enabled['id']) {
          this.action.isVisibleC = false;
        }
        if (enabled['type'] == Globals.widgetTypes.widgets['header']) {
          if (this.header && enabled['id'] == this.header['id']) {
            this.header = null;
          }
          this.droppedItems = this.droppedItems.filter(widget => widget.isUnderHeading !== enabled['id'] && widget.breakOf !== enabled['id'])

        }
      }
    )
  }
}
