import { Component, OnInit } from '@angular/core';
import { DepartmentsService } from '../departments.service';
import * as Globals from '../../../globals';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {
  formSubmitted = false;
  createDepart: FormGroup;
  submitted = false;
  deptKeys: any;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteFieldForm = Globals.autoCompleteForm;
  constructor(private formBuilder: FormBuilder,
    private services: DepartmentsService,
    private router: Router, private toastr: ToastrService) {
    this.deptKeys = Globals.allConstants.constantKeys;
  }
  createDepartment() {
    this.submitted = true;
    if (this.createDepart.invalid) {
      return;
    } else {
      const url = Globals.urls.createDepartment;
      this.services.createDepartment(url, JSON.stringify(this.createDepart.value)).subscribe(
        (res: any) => {
          if (res.status == 200) {
            this.formSubmitted = true;
            this.router.navigate(['mainLayout/accounts']);
            this.toastr.success(res.message);
          } else {
            this.toastr.info(res.message);
          }
        }
      );

    }

  }
  get f() { return this.createDepart.controls; }
  ngOnInit() {
    this.createDepart = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      description: ['']
    });
  }
  canDeactivate() {
    if (!this.formSubmitted && this.createDepart.dirty) {
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
