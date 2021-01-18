import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';
import { FormsServicesService } from '../forms-services.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-form-delete',
  templateUrl: './form-delete.component.html',
  styleUrls: ['./form-delete.component.css']
})
export class FormDeleteComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() formId: string;
  recordsIcons = Globals.svgIcons;
  formKeys = Globals.allConstants;
  constructor(
     private services: FormsServicesService,
     private toastr: ToastrService,
     private commonservice: CommonService) { }

  ngOnInit() {
  }
  deleteForm() {
      this.services.formIdDelete = this.formId;
      this.commonservice.delete.next(true);
  }
  confirmDelete(action: string) {
    if (action === 'Yes') {
      const url: string = Globals.urls.deleteform + '/' + this.services.formIdDelete;
      this.services.deleteForm(url).subscribe(
      (res: any) => {
        if ( res.status === 200) {
          this.toastr.success(res.message);
          this.notifyParentOnUpdate.emit('success');
        } else {
          this.toastr.error(res.message);
          this.notifyParentOnUpdate.emit('Failed');
        }
      });
    }
  }

}
