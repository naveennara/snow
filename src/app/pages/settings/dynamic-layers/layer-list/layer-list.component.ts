import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../globals';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SettingsService } from '../../settings.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.css']
})
export class LayerListComponent implements OnInit {
  editData: any;
  getLayerDataa: any = [];
  tableLayerFields = Globals.allConstants.constantKeys.tableLayerFields;
  pageDetails = {pageName : 'Layer List', pageIcon: Globals.headerIcons.settingsGrey,hideSearch:true };
  constants = Globals.allConstants.constantKeys;
  layersData: any;
  totalLayers;
  layerKeys;
  layersLimit = 10;
  layersPageNumber = 1;
  Imgsrc = Globals.noDataFound;
  @Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private service: SettingsService,
    private commonservice: CommonService,
    private location: Location,
    private toastr: ToastrService, 
    private router : Router,
    
  ) { this.layerKeys = Globals.allConstants.constantKeys;}
  
  ngOnInit() {
    this.getLayer();
  }


getLayer(){
  let url : string;
  url = Globals.urls.getAllLayers;
  this.service.getLayers(url).subscribe(
    (res: any) => {
      switch (res.data.status) {
        case 200:
          this.layersData = res.data.data;
          this.totalLayers = this.layersData.length; // total data count.
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
  );
}

editLayer(externalName) {
  console.log(externalName);
  this.service.editUrl(externalName);
}

create() {
  this.router.navigate(['mainLayout/settings/layerCreate']);
}
cancel() {
  this.location.back();
}

deleteLayer(externalName) {
  this.service.externalName = externalName;
  this.commonservice.delete.next(true);
}

confirmDelete(action: string) {
  if (action === 'Yes') {
    const data = []
    const url: string = Globals.urls.deleteLayer + '/' + this.service.externalName;
    this.service.deleteLayer(url, data).subscribe(
    (res: any) => {
      if ( res.status === 200) {
        this.toastr.success(res.message);
        this.getLayer();
        this.notifyParentOnUpdate.emit('success');
      } else {
        this.toastr.error(res.message);
        this.notifyParentOnUpdate.emit('Failed');
      }
    });
  }
}

}
