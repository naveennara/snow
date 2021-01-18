import { Component, OnInit } from '@angular/core';
import { settingsConstansts } from '../settings-constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as Globals from '../../../globals';
import { SettingsService } from '../settings.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-map-config',
  templateUrl: './map-config.component.html',
  styleUrls: ['./map-config.component.css']
})
export class MapConfigComponent implements OnInit {
  constants = Globals.allConstants.constantKeys;
  mapConfig: FormGroup;
  departmentList: any[];
  submitted = false;
  mapList = Globals.allConstants.constantKeys.maps;
  constructor(private formBuilder: FormBuilder,
    public toastr: ToastrService,
    private location: Location,
    public services: SettingsService
  ) { }
  getALLDepartments() {
    let url: string;
    url = Globals.urls.getAllListOfDepartments + '/'+null;
    this.services.getDepartments(url).subscribe((deptList: any[]) => {
      this.departmentList = deptList;
    });
  }
  get f() { return this.mapConfig.controls; }
  onUpdate() {
    this.submitted = true;
    const url = Globals.urls.updateMapConfig + '/' +  this.mapConfig.value.accountId;
    this.services.updateMap(url, this.mapConfig.value).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.toastr.success(res.message);
          this.cancel();
          // this.router.navigate(['mainLayout/categories']);
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.error(this.constants.serverErrMsg);
        }
      }
    );
  }
  accountChanged(value) {
    let url: string;
    url = Globals.urls.fetchMapType + '/' + value;
    this.services.getMap(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.mapConfig.patchValue(res.data);
          } else if (res.status === 204) {
            //this.departmentList = [];
          }
        } else {
          // this.departmentList = [];
        }
      }
    );
  }
  cancel() {
    this.location.back();
  }
  ngOnInit() {
    this.getALLDepartments();
    this.mapConfig = this.formBuilder.group({
      accountId: ['', Validators.required],
      mapType: ['', Validators.required]
    });
  }

}
