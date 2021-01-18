import { Component, OnInit } from '@angular/core';
import * as Globals from '../../../globals';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from '../project-service.service';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { ToastrService } from 'ngx-toastr';
import { ProjectConstants } from '../project-constants';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-projects-edit',
  templateUrl: './projects-edit.component.html',
  styleUrls: ['./projects-edit.component.css']
})
export class ProjectsEditComponent implements OnInit {
  updateproject: FormGroup;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  categoriesList: any;
  groupAdminsList: any;
  dropdownSettings: object;
  dropdownSettings1: object;
  projectId: string;
  submitted = false;
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  projectKeys: any;
  selectedGA: any;
  selectCategories: any;
  formSubmitted = false;
  dateFormat  = Globals.dateFormats;

  constructor(
              private router: Router,
              private services: ProjectServiceService,
              private formBuilder: FormBuilder,
              private commonservice: CommonService,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
                this.projectKeys = Globals.allConstants.constantKeys;
               }
// Function Code: P-9
  ngOnInit() {
    
    this.getListOfCategory();
    this.getGAList();
    this.endMinDate = new Date();
    this.route.params.subscribe(params => {
      this.projectId = params[this.projectKeys.projectId];
    });
    this.dropdownSettings = this.services.dropdownSettings;
    this.dropdownSettings1 = this.services.dropdownSettings1;
    this.updateproject = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      category: [[], Validators.required],
      groupAdmins: [[], Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
    this.editProject();
    if(this.loginDetails.privilege[Globals.Privileges['projects']] == 0){
      this.updateproject.disable();
    }
  }
  // Function Code: P-10
  getListOfCategory() {
    const url = Globals.urls.getFormsCategoryForAccount +'/'+  this.loginDetails.accounts[0]._id;
    this.services.getCategories(url).subscribe((categoriesList: any[]) => {
      this.categoriesList = categoriesList;
    });
  }
  // Function Code: P-11
  getGAList() {
    this.services.getGroupAdminList(this.loginDetails.accounts[0]._id).subscribe((groupAdminsList: any[]) => {
      this.groupAdminsList = groupAdminsList;
    });
  }
  get f() { return this.updateproject.controls; }
  bsValueChange(value) {
    if ( value !== null ) {
      this.endMinDate.setDate(value.getDate() + 1);
      this.endMinDate.setMonth(value.getMonth());
      this.endMinDate.setFullYear(value.getFullYear());
    }
  }
  
  // Function Code: P-12
  editProject() {
    // this.commonservice.editActivated.next(true);
    if (this.loginDetails['type'] === 3) {
      this.commonservice.editActivated.next(false);
    } else {
      this.commonservice.editActivated.next(true);
    }
    const url = Globals.urls.editProject + '/' + this.projectId;
    this.services.editProject(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.updateproject.patchValue(res.data);
            this.updateproject.patchValue({
              startDate: new Date(res.data.startDate),
              endDate: new Date(res.data.endDate)
            });
          } else if (res.status === 204) {

          }
        } else {
          this.toastr.info(res.message);
        }
      });
  }
  // Function Code: P-13
  updateProject() {
    if (!this.updateproject.valid) {
      return;
    } else {
      this.updateproject.value['createdBy'] = this.loginDetails.username;
      this.updateproject.value['accountId'] = this.loginDetails.accounts[0]._id;
      const url = Globals.urls.updateProject + '/' + this.projectId;
      this.services.updateProject(url, this.updateproject.value).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.formSubmitted = true;
            this.toastr.success(res.message);
            this.router.navigate(['mainLayout/projectsTab/projects']);
          } else if (res.status === 204) {
            this.toastr.error(res.message);
          }
        });
    }

  }
  canDeactivate() {
    if (!this.formSubmitted && this.updateproject.dirty) {
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
