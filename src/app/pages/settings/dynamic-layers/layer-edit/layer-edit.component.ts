import { Component, OnInit } from '@angular/core';
import * as Globals from '../../../../globals';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SettingsService } from '../../settings.service';
@Component({
  selector: 'app-layer-edit',
  templateUrl: './layer-edit.component.html',
  styleUrls: ['./layer-edit.component.css']
})
export class LayerEditComponent implements OnInit {
  constants = Globals.allConstants.constantKeys;
   layerData : any;
  externalName: any;
  internalName: any;
  layerUrl: any;
  layerKeys: any;
  constantKeys;
  layersData: any;
  submitted = false;
  layerObj: any;
  layerEditForm: FormGroup;
  private sub: any;
  selectedLayer: any;
  name: any;
  formSubmitted = false;
   constructor(
     private toastr : ToastrService,
     private service : SettingsService, 
     private router : Router,
     private location: Location,
     private route: ActivatedRoute,
     private formBuilder: FormBuilder,
     ) { 
    this.constantKeys = Globals.allConstants.constantKeys;
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.externalName = params['externalName'];
    });
    this.getLayer();
    this.layerEditForm = this.formBuilder.group({
      externalName: ['', Validators.required],
      internalName: ['', Validators.required],
      layerUrl: ['', Validators.required]
      });
  }

  getLayer(){
    let url : string;
    url = Globals.urls.getLayerByName + '/' + this.externalName;
    this.service.getlayerByName(url).subscribe(
      (res: any) => {
        switch (res.status) {
          case 200:
    this.layerEditForm.patchValue(res.data);
            break;
          case 204:
            this.layersData = [];
            this.toastr.info(res.message);
            break;
          default:
            this.layersData = [];
            this.toastr.error(this.layerKeys['errorMsg']);
        }
      }
    )
  }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.layerEditForm.invalid) {
  //     return ;
  //   }
  //   const url = Globals.urls.updateLayer + '/' + this.externalName;
  //   this.service.updateLayer(url, this.layerEditForm.value).subscribe(
  //     (res: any) => {
  //       if (res.status === 200) {
  //         this.formSubmitted  = true;
  //         this.toastr.success(res.message);
  //         this.router.navigate(['mainLayout/settings/layerConf']);
  //       } else if (res.status === 204) {
  //         this.toastr.info(res.message);
  //       } else {
  //         this.toastr.info(this.constantKeys.serverErrMsg);
  //       }
  //     }
  //   );
  // }
  onSubmit() {
    this.submitted = true;
    if (this.layerEditForm.invalid) {
      return ;
    }
    const url = Globals.urls.updateLayer + '/' + this.externalName;
    this.service.updateLayer(url, this.layerEditForm.value).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === 200) {
          this.formSubmitted  = true;
          this.toastr.success(res.message);
          this.router.navigate(['mainLayout/settings/layerConf']);
        } else if (res.status === 204) {
          this.toastr.info(res.message);
        } else {
          this.toastr.info(this.constantKeys.serverErrMsg);
        }
      }
    );
  }

   canDeactivate() {
    if (!this.formSubmitted && this.layerEditForm.touched) {
      if (confirm(Globals.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }
  cancel() {
    this.location.back();
  }

}
