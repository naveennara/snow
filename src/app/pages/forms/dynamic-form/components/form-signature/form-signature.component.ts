import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../objcet-keys-constants';
import { FormsServicesService } from '../../../forms-services.service';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../../globals';
import { AuthService } from '../../../../../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-signature',
  templateUrl: './form-signature.component.html',
  styleUrls: ['./form-signature.component.css']
})
export class FormSignatureComponent implements OnInit {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  signature: any;
  WidgetInfo = { displayText: 'Signature', displayIcon: Globals.svgIcons.signature };
  widgetKey: any;
  bgColor: boolean = false;
  showButton = false;
  signatureDataValue;
  constructor(private commonService: CommonService,
              private services: FormsServicesService,
              private authService: AuthService,
              private toastr: ToastrService
  ) {
    this.widgetKey = Globals.widgetKeys.keys;
  }

  openSignatureModal(event) {

    this.authService.fileUploadCheck('image', 'png|jpeg|pjpeg|jff|jpg', event.target.files[0], valid => {
        if (!valid) {
         this.toastr.info(Globals.allConstants.constantKeys.fileFormatMsg);
        } else {
          const reader = new FileReader();
          if (event.target.files && event.target.files.length) {
          const [file] = event.target.files;
          reader.readAsDataURL(file);
          reader.onload = () => {
            this.signatureDataValue = reader.result;
            this.group.patchValue({ [this.config['id']]: file });
            // this.group.value[this.config['id']] = reader.result;
            this.group.markAsDirty();
          };
        }

        }
      });
            }

  setColor() {
        if(this.bgColor === true) {
      return 'rgb(169, 195, 229)';
    }
  }

  ngOnInit() {
    this.commonService.editProperties.subscribe(
      (enabled) => {
        if (enabled['id'] === this.config['id']) {
          this.bgColor = true;
        } else {
          this.bgColor = false;
        }
      });
    if (this.config['isUnderHeading'] == undefined && this.ispreview == 'Edit') {
      this.showButton = true;
    }
    else if (this.config['_id'] && this.config['isUnderHeading'] != undefined && this.ispreview != '') {
      this.signature = Globals.urls.fetchImageOrVideo + "/" + this.services.recordId + "/" + this.config['id'];
      this.showButton = false;
      // this.services.getAttachedReferences(url).subscribe(
      //   (res: any) => {
      //     if (res.status === 200) {
      //       this.signatureDataValue = res.data;
      //     } else {
      //       //this.responseRef = [];
      //     }
      //   });
    }

  }

}
