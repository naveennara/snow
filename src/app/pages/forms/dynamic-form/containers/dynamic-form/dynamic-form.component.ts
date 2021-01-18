import { Component, EventEmitter,ElementRef, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../objcet-keys-constants';
import { WindowRef } from '../../../../../sharing/sharing-module/WindowRef';
import * as Globals from '../../../../../globals';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import { FormsServicesService } from '../../../forms-services.service';
import { ToastrService } from 'ngx-toastr';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormDataDistributionService } from '../../form-data-distribution.service';

@Component({
  exportAs: 'dynamicForm',
  selector: 'dynamic-form',
  template: `
  <div [style.height.px]="myInnerComponentHeight" >
    <form class="dynamic-form" [formGroup]="form" >
      <div cdkDropList (cdkDropListDropped)="drop($event)" #droplist="cdkDropList" *ngIf="ispreview !=='Edit' && ispreview !=='preview'">
        <div class="dropzone" *ngIf="!config.length">
          <div class="dz-message">
            <div class="icon"><i class="flaticon-file"></i></div>
            <h4 class="message">Drag and Drop widgets from the pallate</h4>
            <div class="note">(The dragged widgets will be shown here)</div>
          </div>
        </div>
        <section class="container p-5">
          <div class="row col p-5 m-l-0 m-r-0">
            <div class="col m-l-0 m-r-0 p-5">
            <div *ngIf="ispreview !=='Edit' && ispreview !=='preview'">
            
              <div *ngFor="let field of config;let fieldIndex = index; trackBy: trackByIndex" cdkDrag [cdkDragDisabled]="field.type == 'break'">
                <span dynamicField [config]="field" [group]="form" [ispreview]="ispreview"></span>
              </div>
              </div>
            </div>            
          </div>
        </section>
      </div>
      <div  *ngIf="ispreview =='Edit' || ispreview =='preview'">
      <div class="dropzone" *ngIf="!config.length">
        <div class="dz-message">
          <div class="icon"><i class="flaticon-file"></i></div>
          <h4 class="message">Drag and Drop widgets from the pallate</h4>
          <div class="note">(The dragged widgets will be shown here)</div>
        </div>
      </div>
      <section class="container p-5">
        <div class="row col p-5 m-l-0 m-r-0">
          <div class="col m-l-0 m-r-0 p-5">
            <div *ngIf="ispreview=='Edit' || ispreview=='preview'"> 
            <div *ngFor="let field of config;let fieldIndex = index; trackBy: trackByIndex">
              <span dynamicField [config]="field" [group]="form" [ispreview]="ispreview"></span>
            </div>
            </div>
          </div>            
        </div>
      </section>
    </div>
    </form>
   
    <div class="btn-group d-flex justify-content-center" *ngIf="editForm && ispreview=='Edit'">
      <button type="button" class="btn btn-sm btn-round btn-primary mr-2 buttonBorder" (click)="submitForm()" [disabled]="!this.form.dirty">
        Update
      </button>
      <button type="button" class="btn btn-sm btn-round btn-danger mr-2 buttonBorder" (click)="closeForm()">
        Cancel
      </button>
    </div>
    </div>
    `
})
export class DynamicFormComponent implements OnInit {
  @Output() updateDroppedItem: EventEmitter<any> = new EventEmitter<any>();
  @Output() workFlowSubmit : EventEmitter<any> = new EventEmitter<any>();
  @Output() closeSideBar: EventEmitter<number> = new EventEmitter();
  @Input()
  config: FieldConfig[] = [];
  @Input()
  data: any;
  @Input()
  ispreview;
  @Input()
  editForm;
  @Input()
  isWorkFlow;
  form: FormGroup;
  widgetKey: any;
  myInnerHeight: any;
  myInnerComponentHeight: any;
  tableWidgetStart: boolean = false;
  tableWidgetId: any;
  tableWidgetData: Array<any> = [];
  tableWidgetControls: any = {};

  get controls() { return this.config.filter(({ type }) => type !== 'button'); }
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }
  get formArray() {
    return this.form.get(this.tableWidgetId) as FormArray;
  }
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private services: FormsServicesService,
    private toastr: ToastrService,
    private formDataDistributionService: FormDataDistributionService,
    public elRef: ElementRef,
    private winRef: WindowRef) {
    this.widgetKey = Globals.widgetKeys.keys;
    this.myInnerHeight = winRef.nativeWindow.innerHeight;
    this.myInnerComponentHeight = winRef.nativeWindow.innerHeight - 5;
  }

  ngOnInit() {
    this.form = this.createGroup();
    this.getFormFilledData();
  }
  closeForm() {
      this.closeSideBar.emit();
  }
  drop(event: CdkDragDrop<string[]>) {
    
    this.services.dragAndDrop = true;
    if (event.previousContainer === event.container) {
      let index = event.currentIndex;
      if (this.config[event.previousIndex].type == Globals.widgetTypes.widgets['header']) {
        let breakIndex = this.config.findIndex((widget) => widget['breakOf'] == this.config[event.previousIndex].id);
        if(breakIndex <= index){
          return;
        }
        else if(this.config[index]['isUnderHeading']!=='' && this.config[index]['isUnderHeading']!== this.config[event.previousIndex].id){
           return;
        }else if(this.config[index]['breakOf'] && this.config[index]['breakOf']!== this.config[event.previousIndex].id){
          return;
        }else if(this.config[index].type == Globals.widgetTypes.widgets['header']){
          return;
        }
        else{
          for(let i=index;i<breakIndex;i++){
            if(this.config[i].type == Globals.widgetTypes.widgets['header'] && this.config[i].id != this.config[event.previousIndex].id){
              return;
            }
          }
          moveItemInArray(this.config, event.previousIndex, event.currentIndex);
          let headerWidgets = this.config.filter(widget => widget['isUnderHeading'] == this.config[index].id);
          headerWidgets.forEach(headerwidget =>{
            let widgetIndex = this.config.findIndex((widget) => widget.id == headerwidget.id);
            this.config[widgetIndex]['isUnderHeading'] = "";
            this.config[widgetIndex]['isDependentField'] = false;
          })
          let breakIndex1 = this.config.findIndex((widget) => widget['breakOf'] == this.config[index].id);
          for(let i= index +1;i<breakIndex1;i++){
            this.config[i]['isUnderHeading'] = this.config[index]['id'];
            this.config[i]['isDependentField'] = true;
          }
        }
       
      } else {
        moveItemInArray(this.config, event.previousIndex, event.currentIndex);
        if (this.config[index - 1] && (this.config[index - 1].type == Globals.widgetTypes.widgets['header'] || this.config[index - 1]['isUnderHeading'] != '')) {
          if (this.config[index - 1].type == Globals.widgetTypes.widgets['header']) {
            this.config[index]['isUnderHeading'] = this.config[index - 1]['id'];
          } else {
            this.config[index]['isUnderHeading'] = this.config[index - 1]['isUnderHeading'];
          }
          this.config[index]['isDependentField'] = true;
        } else {
          this.config[index]['isUnderHeading'] = "";
          this.config[index]['isDependentField'] = false;
        }
      }

    } else {
      this.updateDroppedItem.emit(event);
    }
  }
  submitForm() {
    if (this.form.valid && this.form.dirty) {
      const recordInfo = this.form.value;
      if(!this.isWorkFlow){
        if(this.data.formId){
          recordInfo['formId'] = this.data.formId;
          const url = Globals.urls.editSubmittedRecordWeb + '/' + this.data._id;
          this.services.editRecordSubmit(url, recordInfo).subscribe(
            (res) => {
              if (res['status'] === 200) {
                this.toastr.success(res['message']);
                this.closeForm();
                recordInfo['isEdit'] = true;
                this.commonService.formEdit.next(recordInfo);
              } else {
                this.toastr.error(res['message']);
              }
            }
          )
        }else{
          this.toastr.success(Globals.allConstants.constantKeys.recordUpdateMsg);
          this.closeForm();
          recordInfo['isEdit'] = true;
          this.commonService.formEdit.next(recordInfo);
        }
       
      }else{
        this.workFlowSubmit.emit(recordInfo);
      }
     
    } else {
      this.toastr.error(Globals.allConstants.constantKeys.mandatoryFieldsMsg);
    }

  }
  ngOnChanges() {
    if (this.form) {
      // const controls = Object.keys(this.form.controls);
      // const configControls = this.controls.map((item) => item.id);

      // controls
      //   .filter((control) => !configControls.includes(control))
      //   .forEach((control) => this.form.removeControl(control));

      // configControls
      //   .filter((control) => !controls.includes(control))
      //   .forEach((name) => {
      //     const config = this.config.find((control) => control.id === name);
      //     this.form.addControl(name, this.createControl(config));

      //   });
      this.form = this.createGroup();
        this.form.reset();
    } else {
      this.form = this.createGroup();
    }
    this.getFormFilledData();
  }
  returnItem() {
    return this.fb.group(this.tableWidgetControls);
  }

  pushItems(length, control) {
    let subTables = control.get(this.tableWidgetId) as FormArray;
    //let subTables = this.formArray;
    for (let i = 0; i < length - 1; i++) {
      subTables.push(this.returnItem());
    }
  }

  createGroup() {
    const group = this.fb.group({});
    //this.controls.forEach(control => group.addControl(control[Globals.widgetKeys.keys._id], this.createControl(control)));

    if (this.ispreview == 'Edit' || this.ispreview == 'preview') {
      this.controls.forEach(control => {
        if (control[Globals.widgetKeys.keys.type] == Globals.widgetKeys.fieldTypes.heading && control[Globals.widgetKeys.keys.isTable] == true) {
          this.tableWidgetStart = true;
          this.tableWidgetId = control[Globals.widgetKeys.keys._id];
          //this.tableWidgetData.push(config)         
        }
        else if (this.tableWidgetStart) {
          if (control[Globals.widgetKeys.keys.type] == Globals.widgetKeys.fieldTypes.break) {
            let getTableWidgeet = this.formDataDistributionService.getTableWidgets();
            getTableWidgeet[this.tableWidgetId] = this.tableWidgetData;
            this.formDataDistributionService.setTableWidgets(getTableWidgeet);
            let getTableWidgetControllers = this.formDataDistributionService.getTableWidgetsControllers();
            getTableWidgetControllers[this.tableWidgetId] = this.tableWidgetControls;
            this.formDataDistributionService.setTableWidgetsControllers(getTableWidgetControllers);
            group.addControl(this.tableWidgetId, this.fb.array([this.returnItem()]));
            if (this.data[this.tableWidgetId] && Object.keys(this.data[this.tableWidgetId]).length > 1) {
              if (typeof this.data[this.tableWidgetId] == Globals.widgetKeys.dataTypes.string)
                this.data[this.tableWidgetId] = JSON.parse(this.data[this.tableWidgetId]);
              this.pushItems(Object.keys(this.data[this.tableWidgetId]).length, group)
            }
            this.tableWidgetData = [];
            this.tableWidgetControls = {};
            this.tableWidgetStart = false;
            this.tableWidgetId = "";
          }
          else {
            let index = this.config.findIndex(widget => widget.id == control[Globals.widgetKeys.keys._id]);
            if(index!= -1){
              //this.config.splice(index,1);
            }
            this.tableWidgetControls[control[Globals.widgetKeys.keys._id]] = ["", this.createControl(control)]
            this.tableWidgetData.push(control)
          }
        } else
          group.addControl(control[Globals.widgetKeys.keys._id], this.createControl(control))
      }
      );

    } else {
      this.controls.forEach(control => group.addControl(control[Globals.widgetKeys.keys._id], this.createControl(control)));
    }
    return group;
  }

  createControl(config: FieldConfig) {
    // const { disabled, validation, value } = config;
    let validationList: any = [];
    if (config[this.widgetKey.isRequired] && config[this.widgetKey.isRequired] == true) {
      validationList.push(Validators.required)
    }
    if(config[this.widgetKey.minLength]){
      validationList.push(Validators.minLength(config[this.widgetKey.minLength]));
    }
    
    if(config[this.widgetKey.maxLength]){
      validationList.push(Validators.maxLength(config[this.widgetKey.maxLength]));
    }
    
    return this.fb.control({value:config[this.widgetKey.defaultValue],disabled:config[this.widgetKey.disabled]},Validators.compose(validationList));

  //  return this.fb.control('', validationList);
  }


  ngOnDestroy() {
    this.formDataDistributionService.derivedField("");
    this.formDataDistributionService.setTableWidgets([]);
    this.formDataDistributionService.setTableWidgetsControllers([]);
  }
  // setDisabled(name: string, disable: boolean) {
  //   if (this.form.controls[name]) {
  //     const method = disable ? 'disable': 'enable';
  //     this.form.controls[name][method]();
  //     return;
  //   }

  //   this.config = this.config.map((item) => {
  //     if (item.label === name) {
  //       item.disabled = disable;
  //     }
  //     return item;
  //   });
  // }

  setValue(name: string, value: any) {
    this.form.controls[name].setValue(value, { emitEvent: true });
  }

  public getFormFilledData() {
    if (this.data) {
      this.form.patchValue(this.data);
      this.services.recordId = this.data['recordId'];
    }
  }

}
