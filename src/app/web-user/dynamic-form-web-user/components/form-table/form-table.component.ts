import { Component, ViewContainerRef, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import {widgetKeys} from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import { FormModuleconstants } from '../../form-module-constants';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.css']
})
export class FormTableComponent implements OnInit, Field, OnDestroy {
  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  widgetKey: any;
  groupName: any;
  expendedHeaderId: any;
  bOSubscribe: any;
  requiredSubscribe: any;
  systemGeneratedEntry: string;
  requiredFieldsFillded = false;
  thisTableWidgetId: any;
  tableWidgetDataCopy: Array<any> = [];
  modalRef: BsModalRef;
  isHistoryView = false;
  showTableRows = false;
  firstRowFilled = false;
  recordData: any = {};
  viewRecordIndex: number;
  historyView: boolean;
  modalconfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };
  constructor(private formDataDistributionService: FormDataDistributionService,
              private modalService: BsModalService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute
  ) {
    this.widgetKey = widgetKeys.keys;
  }

  ngOnInit() {
    if ( (this.historyView && this.group.get(this.config[this.widgetKey._id]).value)
        || (this.activatedRoute.snapshot.params.actionType === 'reassign' && this.group.get(this.config[this.widgetKey._id]).value)
    ) {
      this.firstRowFilled = true;
    }
    this.bOSubscribe = this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });

    this.systemGeneratedEntry = FormModuleconstants.systemGeneratedEntry;

    this.requiredSubscribe = this.formDataDistributionService.requireTWIds.subscribe(thisTableWidgetId => {
      if (thisTableWidgetId.length &&  this.formDataDistributionService.getMandatoryTWIds().indexOf(this.thisTableWidgetId) > -1) {
        this.requiredFieldsFillded = true;
      } else {
        this.requiredFieldsFillded = false;
      }
    });

    const getTableWidgeet = this.formDataDistributionService.getTableWidgets()[this.config[widgetKeys.keys._id]];
    this.tableWidgetDataCopy.push(getTableWidgeet);
    this.thisTableWidgetId = this.config[widgetKeys.keys._id];
    const getTypeList = this.formDataDistributionService.getTypeList();
    getTypeList[this.config[widgetKeys.keys._id]] = widgetKeys.fieldTypes.table;
    this.formDataDistributionService.setTypeList(getTypeList);

  }
  ngOnDestroy() {
    if (this.bOSubscribe) {
      this.bOSubscribe.unsubscribe();
    }
    if (this.requiredSubscribe) {
      this.requiredSubscribe.unsubscribe();
    }
  }

  get tableWidgetArray() {
    return this.group.get(this.config[widgetKeys.keys._id]) as FormArray;
  }
  expendingWidgets(widget) {
    if (this.expendedHeaderId === widget[this.widgetKey._id]) {
      this.formDataDistributionService.headerOpend('');
    } else {
      this.formDataDistributionService.headerOpend(widget[this.widgetKey._id]);
    }
  }

  addRowInTable(rowFormTemplate) {
    this.viewRecordIndex = undefined;
    this.recordData = {};
    this.modalRef = this.modalService.show(rowFormTemplate, this.modalconfig);

  }
  showOrHideTable() {
    this.showTableRows = !this.showTableRows;
  }
  addTableRecordEntry(tableRowRecord) {
  this.recordData = {};
  if (this.viewRecordIndex !== undefined) {
      this.tableWidgetArray.at(this.viewRecordIndex).patchValue(tableRowRecord);
  } else if (!this.firstRowFilled ) {
        this.tableWidgetArray.at(0).patchValue(tableRowRecord);
        this.firstRowFilled = true;
    } else {
      this.tableWidgetArray.push(this.fb.group(tableRowRecord));
    }
  }

  showRowData(index, rowFormTemplate) {
    this.viewRecordIndex = index;
    this.modalRef = this.modalService.show(rowFormTemplate, this.modalconfig);
    this.recordData = this.tableWidgetArray.value[index];

    // const data = await this.openTableWidget(this.tableWidgetDataCopy[0], this.tableWidgetArray.value[index]);
    // if (index === 0) {
    //   this.firstRowFilled = false;
    // }
    // this.tableWidgetArray.at(index).patchValue(data);
  }


}
