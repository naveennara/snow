import { Component, OnInit , EventEmitter, Output, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as Globals from '../../../globals';
import { AdministratorServiceService } from '../administrator-service.service';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator-delete',
  templateUrl: './administrator-delete.component.html',
  styleUrls: ['./administrator-delete.component.css']
})
export class AdministratorDeleteComponent implements OnInit {
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Input() adminId: string;
  openModal = false;
  adminkeys = Globals.allConstants.constantKeys;
  constructor(
    private services:AdministratorServiceService,
    private toastr: ToastrService,
    private commonservice:CommonService,
    private router: Router) { }
  // deleteAdministrator(){
  //   swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'No, cancel!',
  //     reverseButtons: true
  //   }).then((result) => {
  //     if (result.value) {
  //       const url: string = Globals.urls.deleteAdmin + '/' +  this.adminId;
  //       this.services.deleteAdministrator(url).subscribe(
  //         (res: any) => {
  //           if ( res.status === 200) {
  //             this.toastr.success(res.message);
  //             this.notifyParentOnUpdate.emit('success');
  //             this.router.navigate(['mainLayout/administrators']);
  //           } else {
  //             this.toastr.error(res.message);
  //           }
  //         });
  //     } else if (
  //       result.dismiss === swal.DismissReason.cancel
  //     ) {
  //       swal.fire(
  //         'Cancelled',
  //         'Deletion Failed',
  //         'error'
  //       );
  //     }
  //   });
  //   this.services.adminId = this.adminId;
  //   this.commonservice.delete.next(true);

  // }
  deleteAdministrator() {
    this.services.adminId = this.adminId;
    // this.commonservice.delete.next(true);
    this.openModal = true;
  }
  confirmDelete(action:string) {
    if(action == 'Yes'){
      const url: string = Globals.urls.deleteAdmin + '/' +  this.services.adminId;
      this.services.deleteAdministrator(url).subscribe(
      (res: any) => {
        if ( res.status === 200) {
          this.openModal = false;
          this.toastr.success(res.message);
          this.notifyParentOnUpdate.emit('1');
        } else {
          this.toastr.error(res.message);
          this.notifyParentOnUpdate.emit('0');
        }
      });
    }   
  }
  ngOnInit() {
  }

}
