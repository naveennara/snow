import { Component, OnInit } from '@angular/core';
import * as Globals from '../../../globals';
import { Router } from '@angular/router';
import { ProjectServiceService } from '../project-service.service';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectConstants } from '../project-constants';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-projects-create',
  templateUrl: './projects-create.component.html',
  styleUrls: ['./projects-create.component.css']
})
export class ProjectsCreateComponent implements OnInit {
  createproject: FormGroup;
  dropdownSettings: object;
  dropdownSettings1: object;
  categoriesList: any[];
  groupAdminsList: any[];
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  submitted = false;
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  projectKeys: any;
  formSubmitted = false;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  dateFormat  = Globals.dateFormats;

  
  constructor(
              private formBuilder: FormBuilder,
              private services: ProjectServiceService,
              private router: Router,
              private toastr: ToastrService) {
                this.projectKeys = Globals.allConstants.constantKeys;
              }
// Function Code: P-5
  ngOnInit() {
    this.getListOfCategory();
    this.getGAList();
    this.endMinDate = new Date();
    this.startMinDate = new Date();
    this.dropdownSettings = this.services.dropdownSettings;
    this.dropdownSettings1 = this.services.dropdownSettings1;
    this.createproject = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      category: [[], Validators.required],
      groupAdmins: [[], Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  get f() { return this.createproject.controls; }
  bsValueChange(value) {
    if ( value !== null ) {
      this.endMinDate.setDate(value.getDate() + 1);
      this.endMinDate.setMonth(value.getMonth());
      this.endMinDate.setFullYear(value.getFullYear());
    }
  }
  // Function Code: P-6
  getListOfCategory() {
    const url = Globals.urls.getFormsCategoryForAccount +'/' + this.loginDetails.accounts[0]._id;
    this.services.getCategories(url).subscribe((categoriesList: any[]) => {
      this.categoriesList = categoriesList;
    });
  }
  // Function Code: P-7
  getGAList() {
    this.services.getGroupAdminList(this.loginDetails.accounts[0]._id).subscribe((groupAdminsList: any[]) => {
      this.groupAdminsList = groupAdminsList;
    });
  }
  // Function Code: P-8
  createProject() {
    this.submitted = true;
    if (this.createproject.valid) {
     // this.createproject.value.groupAdmins = this.createproject.value.groupAdmins[0];
      this.createproject.value['createdBy'] = this.loginDetails.username;
      this.createproject.value['accountId'] = this.loginDetails.accounts[0]._id;
      const url = Globals.urls.createProject;
      this.services.createProject(url, this.createproject.value ).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.formSubmitted = true;
            this.toastr.success(res.message);
            this.router.navigate(['mainLayout/projectsTab/projects']);
          } else {
            this.toastr.error(res.message);
          }
        });
    } else {
      return;
    }
  }
  endValueChange(value) {
    if ( value !== null ) {
      this.startMaxDate = new Date();
      this.startMaxDate.setDate(value.getDate());
      this.startMaxDate.setMonth(value.getMonth());
      this.startMaxDate.setFullYear(value.getFullYear());

    }
  }
  canDeactivate() {
    if (!this.formSubmitted && this.createproject.dirty) {
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
