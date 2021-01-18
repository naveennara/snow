import { Component, ViewContainerRef, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import {widgetKeys} from '../../object-keys-constants';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import { RestAPICallsService } from '../../../rest-apicalls.service';
import { webUserConstants } from '../../../webuser-constant';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-form-image',
  templateUrl: './form-image.component.html',
  styleUrls: ['./form-image.component.css']
})
export class FormImageComponent implements OnInit, Field {
  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  widgetKey: any;
  groupName: any;
  expendedHeaderId: any;
  imageDataValue: any;
  modalRef: BsModalRef;
  historyView: boolean;
  imageurl: string;
  isTable: any;
  modalconfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };
  @ViewChild('uplaodImageRef')
  uplaodImageRef: ElementRef;
  constructor(private formDataDistributionService: FormDataDistributionService,
              private modalService: BsModalService,
              private restAPICallsService: RestAPICallsService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toastr: ToastrService
  ) {
    this.widgetKey = widgetKeys.keys;
   }

   ngOnInit() {
    const actionType = this.activatedRoute.snapshot.params.actionType;
    if (actionType === webUserConstants.formReassignActionType || actionType === webUserConstants.formViewActionType) {
      this.imageDataValue = webUserConstants.apis.imageView + '/' + this.activatedRoute.snapshot.params.recordId
      + '/' + this.config[widgetKeys.keys._id];
    }

    this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
  }

  openSignatureModal(event) {
    this.authService.fileUploadCheck('image', 'png|jpeg|pjpeg|jff|jpg', event.target.files[0], valid => {
      if (!valid) {
        this.toastr.info(webUserConstants.constantKeys.fileFormatMsg);
       } else {
          const reader = new FileReader();
          if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
              this.imageDataValue =  reader.result;
              this.group.patchValue({ [this.config['id']]: file.name });
              this.formDataDistributionService.addFileToFormData(this.config['id'], file);
            //  this.group.value[this.config['id']] = file.name;
              this.group.markAsDirty();
            };
          }
       }
    });
    
 
  }

  viewImage(rowFormTemplate) {
    this.modalRef = this.modalService.show(rowFormTemplate, this.modalconfig);

  }

  removeattachdeImage(data) {
    this.imageDataValue = null;
    this.modalRef.hide();
    this.group.patchValue({ [this.config['id']]: null });
    this.uplaodImageRef.nativeElement.value = '';
  }

  // viewHistoryPreview() {
  //   const url = webUserConstants.apis.imageView + '/' + this.activatedRoute.snapshot.params.recordId
  //   + '/' + this.config[widgetKeys.keys._id];
  //   this.restAPICallsService.getImage(url).subscribe((res) => {
  //     // this.assignmentList = response.docs;
  //     // if (res[webUserConstants.standardKeys.status] === 200) {
  //     //   const response = res[webUserConstants.standardKeys.data];
  //     //   this.assignmentList = this.assignmentList.concat(response.docs);
  //     // } else if (res[webUserConstants.standardKeys.status] === 204) {
  //     //     this.toastr.success(webUserConstants.workAssigmnetsConstants.noWorkAssignmentstoLaod);
  //     // }

  //   }, (error) => {
  //     console.log(error);
  //   });

  // }

}
