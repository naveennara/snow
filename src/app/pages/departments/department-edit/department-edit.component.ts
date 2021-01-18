import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as Globals from '../../../globals';
import { DepartmentsService } from '../departments.service';
import { Departments } from '../departments';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {
  accountId: String;
  updateDepart: FormGroup;
  editDepart: Departments;
  submitted = false;
  deptKeys:any;
  formSubmitted = false;
  constructor(private router: Router,
        private location: Location,
    private route: ActivatedRoute, private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private services: DepartmentsService) { 
      this.deptKeys = Globals.allConstants.constantKeys;
    }
  updateDepartment() {
    this.submitted = true;
    if (this.updateDepart.invalid) {
      return;
    } else {
      const url = Globals.urls.UpdateDepartment + "/" + this.accountId;
      this.services.updateDepartment(url, JSON.stringify(this.updateDepart.value)).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.formSubmitted = true;
            this.router.navigate(['mainLayout/accounts'])
            this.toastr.success(res.message);
          }
          else {
            this.toastr.info(res.message);
          }
        }
      );
    }
  }


  editDepartment() {
    const url = Globals.urls.editDepartment + '/' + this.accountId;
    this.services.editDepartment(url).subscribe(
      (res: any) => {
          if (res.status === 200) {
            this.editDepart = res.data;         
            this.updateDepart.patchValue(this.editDepart);
          }
          else if (res.status === 204) {
          }
      });
  }
 

  get f() { return this.updateDepart.controls; }
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['accountId'];
    });
    this.editDepartment();
    this.updateDepart = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['',[Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      description: ['']
    });
  }
  back() {
    this.location.back();
  }
  canDeactivate() {
    if (!this.formSubmitted && this.updateDepart.dirty) {
      if (confirm(Globals.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }

}
