import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import * as Globals from '../../../globals';
import { TemplatesService } from '../templates.service';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-templates-delete',
  templateUrl: './templates-delete.component.html',
  styleUrls: ['./templates-delete.component.css']
})
export class TemplatesDeleteComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() formId: string;
  openModal = false;

  constructor(
    private services: TemplatesService,
    private toastr: ToastrService,
    private commonservice: CommonService
  ) {

  }

  ngOnInit() {

  }
  deleteTemplate() {
    this.services.formIdDelete = this.formId;
    this.commonservice.delete.next(true);
    // this.openModal = true;
  }
  confirmDelete(action: string) {
    if (action == 'Yes') {
      const url: string = Globals.urls.deleteform + '/' + this.services.formIdDelete;
      this.services.deleteTemplate(url).subscribe(
      (res: any) => {
        if ( res.status === 200) {
          this.toastr.success(res.message);
          this.notifyParentOnUpdate.emit('Success');
        } else {
          this.toastr.error(res.message);
          this.notifyParentOnUpdate.emit('Failed');
        }
      });
    }
  }

}

