import { SubmitSuccessComponent } from './../../components/submit-success/submit-success.component';
import { FieldConfig } from './../../dynamic-form-web-user/models/field-config.interface';
import { webUserConstants } from './../../webuser-constant';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, TemplateRef, ElementRef, NgZone } from '@angular/core';
import { RestAPICallsService } from '../../rest-apicalls.service';
import { environment } from '../../../../environments/environment';
import { DynamicFormComponent } from './../../dynamic-form-web-user/containers/dynamic-form/dynamic-form.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';

import { FormDataDistributionService } from '../../dynamic-form-web-user/form-data-distribution.service';
import { Validators } from '@angular/forms';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  recordData = {};
  isHistoryView: boolean;
  isFullLayout = true;
  constructor(public activatedRoute: ActivatedRoute,
              public restAPICallsService: RestAPICallsService,
              public modalService: BsModalService,
              public location: Location,
              public toastr: ToastrService,
              public router: Router,
              public formDataDistributionService: FormDataDistributionService,
              private ngZone: NgZone,
              private commonService: CommonService

  ) { }
  config: FieldConfig[] = [];
  formInfo: any;
  loginDetails: any;
  modalRef: BsModalRef;
  isRecordSbmittedsuccessfully: number;
  isRecordSubmitInProcess = false;
  constants = webUserConstants;
  actionPage: string;
  actionType: string;
  isIntialRequestInProcess: boolean;
  intialRequestStatus: number;
  recordStatus: any;
  derivedFields = [];
  formSubmitted = false;
  totalAttachedFiles;
  @ViewChild(DynamicFormComponent) dynamciForm: DynamicFormComponent;

  ngOnInit() {
    this.commonService.attachmnetCount.subscribe( (count) => {
      this.totalAttachedFiles = count;
    });
    this.formDataDistributionService.clearFileAttachments();
    this.formDataDistributionService.reSetRemoveUploadedFiles();
    this.commonService.attachmentDone.subscribe((res) => {
      this.isFullLayout = true;
    });
    let url;
    if (this.activatedRoute.snapshot.params.id) {
      this.isHistoryView = false;
      let checkUrl = webUserConstants.apis.publicFormLink + '/' + this.activatedRoute.snapshot.params.id;
      this.restAPICallsService.getForm(checkUrl).subscribe((res: any) => {
        if (res[webUserConstants.standardKeys.status] === 200) {
         this.openFormLink(res);
        }else if(res[webUserConstants.standardKeys.status] === 204){
          this.router.navigate(['formLink',this.activatedRoute.snapshot.params.id,'expired']);
        }
        else{
          this.intialRequestStatus = 1;
          this.toastr.error(res.message);
        }
      })
      
    }else{
      this.actionPage = this.activatedRoute.snapshot.params.actionPage;
      this.actionType = this.activatedRoute.snapshot.params.actionType;
      if (this.activatedRoute.snapshot.params.actionType === 'view') {
        this.isHistoryView = true;
      } else {
        this.isHistoryView = false;
      }
      this.loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));;
       url = webUserConstants.apis.getForm + '/' +
        this.activatedRoute.snapshot.params.formId + '/' +
        this.activatedRoute.snapshot.params.recordId + '/' + true + '/' +
        webUserConstants.nullValue + '/' +
        webUserConstants.nullValue + '/' + webUserConstants.nullValue +
        '/' + webUserConstants.nullValue + '/' + this.loginDetails._id +
        '/' + webUserConstants.formConstants.openform;
        this.getFormProcess(url);

    }
   
  }
  openFormLink(res){
    this.config = res['data'].formWidgets;
    this.formInfo = res['data'].formInfo;
    this.recordData = res['data'].recordInformation;
    this.intialRequestStatus = 3;
    this.derivedFields = res['data'].formInfo.dependentFields;
  }
  getFormProcess(url) {
    this.isIntialRequestInProcess = true;
    this.restAPICallsService.getForm(url).subscribe((res) => {
      this.isIntialRequestInProcess = false;
      if (res[webUserConstants.standardKeys.status] === 200) {
        this.config = res['data'].formWidgets;
        this.formInfo = res['data'].formInfo;
        this.recordData = res['data'].recordInformation;
        this.intialRequestStatus = 3;
        this.derivedFields = res['data'].formInfo.dependentFields;
      } else {
        this.intialRequestStatus = 1;
      }
    }, (error) => {
      this.isIntialRequestInProcess = false;
      // this is for, we are unable to reach the server
      this.intialRequestStatus = 2;
    });
  }
  formSubmit(template: TemplateRef<any>) {
    this.removeDerivedHidenFields();
    this.isRecordSubmitInProcess = true;
    this.dynamciForm.form.value.taskId = this.activatedRoute.snapshot.params.taskId || webUserConstants.nullValue;
    this.dynamciForm.form.value.recordId = this.activatedRoute.snapshot.params.recordId;
    // this.dynamciForm.form.value._id = this.activatedRoute.snapshot.params.recordId;
    this.dynamciForm.form.value.assignmentId = this.activatedRoute.snapshot.params.assignmentId || webUserConstants.nullValue;
    if (this.activatedRoute.snapshot.params.id) {
      this.dynamciForm.form.value.submittedBy = webUserConstants.formConstants.anonymous;
      this.dynamciForm.form.value.formId = this.formInfo._id;
    } else {
      this.dynamciForm.form.value.submittedBy = {_id:this.loginDetails._id,username:this.loginDetails.username} || webUserConstants.nullValue;
      this.dynamciForm.form.value.formId = this.activatedRoute.snapshot.params.formId || webUserConstants.nullValue;
    }
    if (this.activatedRoute.snapshot.params.actionType === webUserConstants.formFillActionType) {
      this.dynamciForm.form.value.isNewRecord = true;
    } else {
      this.dynamciForm.form.value.isNewRecord = false;
    }

    if (!this.dynamciForm.valid) {
      this.addRemovedValideations();
      this.isRecordSubmitInProcess = false;
      this.dynamciForm.form.markAsDirty();
      // tslint:disable-next-line:forin
      for (const control in this.dynamciForm.form.controls) {
        this.dynamciForm.form.controls[control].markAsDirty();
      }
      this.toastr.error(webUserConstants.formConstants.sucessFormSubmitmessage);
    } else {
      let url;
      if (this.activatedRoute.snapshot.params.id) {
        url = webUserConstants.apis.addRecordFromLink;
      } else {
        url = webUserConstants.apis.submitForm;
      }
      this.dynamciForm.form.value.isRecordFromWeb = true;
      this.dynamciForm.form.value.removedAttachments =  this.formDataDistributionService.geetRemoveUploadedFiles();
      // const formdata = new FormData();
      // formdata.append('data', JSON.stringify(this.dynamciForm.form.value));
      const formData = this.formDataDistributionService.getFormDataOfForm();
      formData.append('data', JSON.stringify(this.dynamciForm.form.value));
      this.restAPICallsService.submitForm(url, formData).subscribe((res) => {
        this.formSubmitted = true;
        this.isRecordSubmitInProcess = false;
        this.formDataDistributionService.resetFormData();
        // this.location.back();
        if (this.activatedRoute.snapshot.params.id) {
          this.router.navigate(['formLink', this.activatedRoute.snapshot.params.id, 'success']);
        } else {
          this.isRecordSbmittedsuccessfully = 1;
          this.modalRef = this.modalService.show(template);
          this.location.back();
        }
        this.formDataDistributionService.clearFileAttachments();

      }, (error) => {
        //console.log(error);
        this.isRecordSubmitInProcess = false;
        this.isRecordSbmittedsuccessfully = 2;
        this.modalRef = this.modalService.show(template);
      });
    }
  }

  gotoWorkOrders() {
    // this.router.navigate(['webuser/assignments/workorders',
    // this.activatedRoute.snapshot.params.formId,
    // this.activatedRoute.snapshot.params.assignmentId,
    // this.activatedRoute.snapshot.params.taskId,
    //  this.activatedRoute.snapshot.params.actionPage]);

    this.router.navigate(['webuser/assignments/workorderslist',
    this.activatedRoute.snapshot.params.assignmentId,
    this.activatedRoute.snapshot.params.formId,
    this.activatedRoute.snapshot.params.taskId,
    webUserConstants.actionPageForAssignmnets]);
  }
  gotoAssignmnets() {
    this.router.navigate(['webuser/assignments']);
  }
  gotoForms() {
    this.router.navigate(['webuser/assignments/forms']);
  }
  gotoHistory() {
    this.location.back();
  }
  goToReassigned() {
    this.location.back();
  }

  tryAginForGetForm() {
    const loginDetails =JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), webUserConstants.privatekey).toString(CryptoJS.enc.Utf8));
    const url = webUserConstants.apis.getForm + '/' +
      this.activatedRoute.snapshot.params.formId + '/' +
      this.activatedRoute.snapshot.params.recordId + '/' + true + '/' +
      webUserConstants.nullValue + '/' +
      webUserConstants.nullValue + '/' + webUserConstants.nullValue +
      '/' + webUserConstants.nullValue + '/' + this.loginDetails._id +
      '/' + webUserConstants.formConstants.openform;
    this.getFormProcess(url);
  }
  removeDerivedHidenFields() {
    this.derivedFields.forEach((field) => {
       if (this.dynamciForm.form.get(field) &&
       this.dynamciForm.form.get(field).errors && this.dynamciForm.form.get(field).errors['required']) {
         this.dynamciForm.form.get(field).clearValidators();
         this.dynamciForm.form.get(field).updateValueAndValidity();
       }
     });
   }
   addRemovedValideations() {
    for ( let index = 0; index < this.dynamciForm.config.length; index++) {
     if (this.derivedFields.indexOf(this.dynamciForm.config[index]['id']) > -1) {
       this.addValideation(this.dynamciForm.config[index]);
      }
    }
  }

  addValideation(fieldRef) {
    const validationList: any  = [];
    if (fieldRef['isRequired'] && fieldRef['isRequired'] === true) {
      validationList.push(Validators.required);
    }

    if (fieldRef['minLength']) {
      validationList.push(Validators.minLength(fieldRef['minLength']));
    }

    if (fieldRef['maxLength']) {
      validationList.push(Validators.maxLength(fieldRef['maxLength']));
    }
    this.derivedFields.forEach((field) => {
      if (this.dynamciForm.form.get(field)) {
        this.dynamciForm.form.get(field).setValidators(validationList);
        this.dynamciForm.form.get(field).updateValueAndValidity();
      }
    });
  }
  canDeactivate() {
    if (!this.formSubmitted && this.dynamciForm.form.dirty) {
      if (confirm(webUserConstants.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }

  gotoAttachments() {
    this.isFullLayout = !this.isFullLayout;
  }
}




