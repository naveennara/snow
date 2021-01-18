import { Component, OnInit ,EventEmitter,Output, Input} from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as Globals from '../../../globals';
import { UsersService } from '../users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrls: ['./users-delete.component.css']
})
export class UsersDeleteComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() userId: string;
  openModal = false;
  constructor(
      private services: UsersService,
      private toastr: ToastrService
    ) { }

  ngOnInit() {
   
  }
 
  deleteUser(){
      this.services.userId = this.userId;
      this.openModal = true;
    }
  confirmDelete(action:string) {
    if(action == 'Yes'){
      const url: string = Globals.urls.deleteUser + '/' + this.services.userId;
      this.services.deleteUser(url).subscribe(
      (res: any) => {
        if ( res.status === 200) {
          this.openModal = false;
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
