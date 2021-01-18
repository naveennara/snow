import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataDistributionService {
  hederOpen = new BehaviorSubject('');
  hederOpenRef = this.hederOpen.asObservable();
  derivedFieldBO = new BehaviorSubject('');
  derivedFieldRef = this.derivedFieldBO.asObservable();
  headersList = [];
  derivedFields = [];
  // this lines for tablewidget
  requireTWIds = new BehaviorSubject('');
  requireTWIdsBBO = this.requireTWIds.asObservable();
  tableWidgetIds = [];
  tableWidgetFieldsControllers = {};
  tableWidgetFields = {};
  fieldTypeList = {};
  formdata = new FormData();
  attachments = [];
  removeUploadedFilesList = [];
  totalAttachmentsCount = [];
  
  constructor() { }

  headerOpend(headerId: string) {
    this.hederOpen.next(headerId);
  }
  setOpendHeaders(headerId) {
    this.headersList.push(headerId);
  }
  removeOpendHeader(index) {
    this.headersList.splice(index, 1);
  }
  clearOpendHeaders() {
    this.headersList = [];
  }
  getOpendHeaders() {
    return this.headersList;
  }
  // this releated to table widget
  requireTWSubject(tWIds) {
    this.requireTWIds.next(tWIds);
  }

  setMandatoryTWIds(tableWidgetIds) {
    this.tableWidgetIds = tableWidgetIds;
  }

  getMandatoryTWIds() {
    return this.tableWidgetIds;
  }
  setTableWidgetsControllers(controllers) {
    this.tableWidgetFieldsControllers = controllers;
  }
  getTableWidgetsControllers() {
    return this.tableWidgetFieldsControllers;
  }

  setTableWidgets(widget) {
    this.tableWidgetFields = widget ;
  }
  getTableWidgets() {
    return this.tableWidgetFields;
  }

  setTypeList(controllers) {
    this.fieldTypeList = controllers;
  }
  getTypeList() {
    return this.fieldTypeList;
  }
  addFileToFormData(fileName, fileSrc) {
    this.formdata.append(fileName, fileSrc);
  }
  setFileAttachments(attachments) {
   this.attachments = attachments;
  }
  getFileAttachments() {
    return this.attachments;
  }

  clearFileAttachments() {
    this.attachments = [];
  }

  getFileToFormData() {
    this.formdata.get('attachments');
  }
  getFormDataOfForm() {
    return this.formdata;
  }
  resetFormData() {
    this.formdata = new FormData();
  }
  derivedField(derivedFields) {
    this.derivedFieldBO.next(derivedFields);
  }
  removeUploadedFiles(removeUploadedFileItem) {
    this.removeUploadedFilesList.push(removeUploadedFileItem);
  }
  geetRemoveUploadedFiles() {
   return this.removeUploadedFilesList ;
  }
  reSetRemoveUploadedFiles() {
    this.removeUploadedFilesList = []
   }

   setAttachmentsTotalCount(count) {
    this.totalAttachmentsCount = count;
   }
   getAttachmentsTotalCount() {
    return this.totalAttachmentsCount;
   }
}

