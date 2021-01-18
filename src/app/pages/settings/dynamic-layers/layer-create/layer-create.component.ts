import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SettingsService} from '../../settings.service'
import * as Globals from '../../../../globals';
@Component({
  selector: 'app-layer-create',
  templateUrl: './layer-create.component.html',
  styleUrls: ['./layer-create.component.css']
})
export class LayerCreateComponent implements OnInit {
  constants = Globals.allConstants.constantKeys;
  createLayer: FormGroup;
  layerkeys: any;
  submitted: boolean;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  formSubmitted = false;
  constructor(
              private formBuilder: FormBuilder,
              private service: SettingsService,
              private toastr: ToastrService,
              private location: Location,
              private router: Router) { 
              this.layerkeys = Globals.allConstants.constantKeys;
            }
            ngOnInit() {
    this.createLayer = this.formBuilder.group({
      externalName: ['', Validators.required],
      internalName: ['', Validators.required],
      layerUrl: ['', Validators.required]
    });
  }
  get f() { return this.createLayer.controls; }

  onCreate(data) {
    this.submitted = true;
    if (this.createLayer.invalid) {
      return ;
    }
    const url = Globals.urls.CreateLayers;
    this.service.createLayer(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.formSubmitted = true;
          this.toastr.success( res.message);
          this.router.navigate(['mainLayout/settings/layerConf']);
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.error(this.layerkeys.serverErrMsg);
        }
      }
    );
  }
  canDeactivate() {
    if (!this.formSubmitted && this.createLayer.dirty) {
      if (confirm(Globals.formExitMsg)) {
        return true;
      } else {
        return false;
      }

    } else {
      return true;
    }
  }
  cancel() {
    this.location.back();
  }
}
