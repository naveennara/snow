import { Component, OnInit, TemplateRef, Input, EventEmitter, Output } from '@angular/core';
import * as Globals from '../../../globals';
import {DeviceManagementServiceService} from '../device-management-service.service';
import { ToastrService } from 'ngx-toastr';
import { Devicemanagementconstants } from '../device-management-constants';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-devices-delete',
  templateUrl: './devices-delete.component.html',
  styleUrls: ['./devices-delete.component.css']
})

export class DevicesDeleteComponent implements OnInit {
  @Input() deviceInfo;
  @Input() status;
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  deviceKeys = Globals.allConstants.constantKeys;
 // public modalRef: BsModalRef;
  popupMessage;
  modelOpen = false;
  openModal = false;
  deleteDisable = false;
  constructor(
    private deviceManegmentServices: DeviceManagementServiceService,
    private toastr: ToastrService,
    private commonservice:CommonService
  ) {this.deviceKeys = Globals.allConstants.constantKeys; }
  ngOnInit() {
  }
  ngOnChanges() {
    if (this.deviceInfo.status === this.deviceKeys.rejected  || this.deviceInfo.status === this.deviceKeys.unauthorized) {
      this.deleteDisable = true;
    }

  }
  deleteDevice() {
    if (this.deviceInfo.status === this.deviceKeys.rejected  || this.deviceInfo.status === this.deviceKeys.unauthorized) {
      this.commonservice.delete.next(true);
      this.deviceManegmentServices.deviceInfoId = this.deviceInfo._id;
      this.popupMessage =  this.deviceKeys.deviceDeleteMessage;
      }
   
  }
  confirmDelete(action: string) {

    if ( action === 'Yes') {
      const url: string = Globals.urls.deleteDeviceRequest + '/' + this.deviceManegmentServices.deviceInfoId;

      this.deviceManegmentServices.deleteDeviceStatus(url).subscribe(
      (res: any) => {
        switch (res.status) {
          case 200:
          this.openModal = false;
          this.toastr.success(res.message);
          this.notifyParentOnUpdate.emit(this.deviceKeys.successMsg);
          break;
         case 204:
         this.openModal = false;
         this.toastr.info(res.message);
         this.notifyParentOnUpdate.emit(this.deviceKeys.failedMsg);
         break;
        default:
          this.toastr.error(this.deviceKeys.errorMsg);
          this.notifyParentOnUpdate.emit(this.deviceKeys.failedMsg);
        }
      });
    }   
  }
  cancelPopup() {
    this.toastr.error(this.deviceKeys.failedMsg);
   // this.modalRef.hide();
  }
}
