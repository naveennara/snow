import { Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {CategoriesService} from '../categories.service';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';
import { CommonService } from '../../../sharing/sharing-module/common.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: ['./category-delete.component.css']
})
export class CategoryDeleteComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() categoryId: string;
  categoryKeys = Globals.allConstants.constantKeys;
  constructor(
    private services: CategoriesService,
    private toastr: ToastrService,
    private commonservice:CommonService
  ) { }

  deleteCategory() {
    this.services.categoryId = this.categoryId;
    this.commonservice.delete.next(true);
  }
  confirmDelete(action:string) {
    if(action == 'Yes'){
      const url: string = Globals.urls.deleteFormCategory + '/' + this.services.categoryId;
      this.services.deleteCategory(url,this.categoryId).subscribe(
      (res: any) => {
        if ( res.status === 200) {
          this.toastr.success(res.message);
          this.notifyParentOnUpdate.emit('success');
        } else {
          this.toastr.error(res.message);
          this.notifyParentOnUpdate.emit('failed');
        }
      });
    }   
  }
  ngOnInit() {
  }

}
