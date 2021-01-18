import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';
import { ProjectServiceService } from '../project-service.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-projects-delete',
  templateUrl: './projects-delete.component.html',
  styleUrls: ['./projects-delete.component.css']
})
export class ProjectsDeleteComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  constructor(private services: ProjectServiceService, private toastr: ToastrService, private commonservice:CommonService) { }
  @Input() projectId: string;
  gridView;
  projectKeys = Globals.allConstants.constantKeys;
  ngOnInit() {
    this.gridView = this.services.gridView;
  }
  deleteProject() {
    this.services.projectId = this.projectId;
    this.commonservice.delete.next(true);
  }
  confirmDelete(action:string) {
    if(action == 'Yes'){
      const url: string = Globals.urls.deleteProject + '/' + this.services.projectId;
      this.services.deleteProject(url).subscribe(
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
