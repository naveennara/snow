import { Component, OnInit,ViewChild ,ElementRef} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../object-keys-constants';
import { FormDataDistributionService } from '../../form-data-distribution.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RestAPICallsService } from '../../../rest-apicalls.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { webUserConstants } from '../../../webuser-constant';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Component({
  selector: 'app-form-video',
  templateUrl: './form-video.component.html',
  styleUrls: ['./form-video.component.css']
})
export class FormVideoComponent implements OnInit {
  @ViewChild('uplaodVideoRef') uplaodVideoRef: ElementRef;

  config: FieldConfig;
  group: FormGroup;
  derivedFields: any;
  derivedFieldsCopy: any;
  rating: number;
  widgetKey: any;
  historyView: boolean;
  expendedHeaderId: any;
  isTable: any;
  groupName: any;
  videoDataValue:any;
  modalRef: BsModalRef;
  modalconfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private formDataDistributionService: FormDataDistributionService, private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,private restAPICallsService: RestAPICallsService,private ngxService: NgxUiLoaderService,
        private toastr: ToastrService,


    ) {   this.widgetKey = widgetKeys.keys;
  }

  ngOnInit() {
    const actionType = this.activatedRoute.snapshot.params.actionType;
    if (actionType === webUserConstants.formReassignActionType || actionType === webUserConstants.formViewActionType) {
      this.videoDataValue = webUserConstants.apis.imageView + '/' + this.activatedRoute.snapshot.params.recordId
      + '/' + this.config[widgetKeys.keys._id];
    }
    this.formDataDistributionService.hederOpen.subscribe(expendedHeaderId => {
      this.expendedHeaderId = expendedHeaderId;
    });
  }
  viewVideo(rowFormTemplate) {
    this.modalRef = this.modalService.show(rowFormTemplate, this.modalconfig);

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
  removeAttachedVideo(data) {
    this.videoDataValue = null;
    this.modalRef.hide();
    this.group.patchValue({ [this.config['id']]: null });
    this.uplaodVideoRef.nativeElement.value = '';
  }
  openVideoModal(event) {
   // this.ngxService.start();
   this.ngxService.startBackground('do-background-things');
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const size =  event.target.files[0].size / 1024 / 1024;
      if (size > 30) {
        this.toastr.warning( event.target.files.name + '' + 'size exceeds 30MB');
        this.ngxService.stopBackground('do-background-things');
      }else{
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.videoDataValue =  reader.result;
          this.group.patchValue({ [this.config['id']]: file.name });
          this.formDataDistributionService.addFileToFormData(this.config['id'], file);
         //this.ngxService.stop();
         this.ngxService.stopBackground('do-background-things');
         //this.ngxService.startBackground('do-background-things');
         //  this.group.value[this.config['id']] = file.name;
          this.group.markAsDirty();
        };
      }
     
    }
  }

}
