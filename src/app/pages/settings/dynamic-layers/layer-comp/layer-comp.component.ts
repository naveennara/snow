import { Component, OnInit } from '@angular/core';
// import * as Globals from '../../../../globals';
import * as Globals from '../../../../globals'
import { HeaderInputs } from 'src/app/sharing/page-header/headerInputs';
@Component({
  selector: 'app-layer-comp',
  templateUrl: './layer-comp.component.html',
  styleUrls: ['./layer-comp.component.css']
})
export class LayerCompComponent implements OnInit {
  constants = Globals.allConstants.constantKeys;
  layerKeys = Globals.allConstants.constantKeys;
  // pageDetails = {pageName : 'Layer Configuration', pageIcon: Globals.headerIcons.categoriesGrey};
  pageDetails = {pageName : 'Layer List', pageIcon: Globals.headerIcons.settingsGrey,hideSearch:true };
  loginDetails: any;
  ellipseList: any;
  headerInputs: any;
  constructor() { }

  ngOnInit() {
    this.ellipseList = ['Create'];
    this.headerInputs = [HeaderInputs.keys.categories];
  }

}
