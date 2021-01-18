import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
//import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field-config.interface';
import { widgetKeys } from '../../objcet-keys-constants';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-barcode',
  templateUrl: './form-barcode.component.html'
})
export class FormBarcodeComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  barcode: any;
  widgetKey: any;
  bgColor = false;
  WidgetInfo = { displayText: 'Barcode', displayIcon: Globals.svgIcons.barcode };

  constructor(private commonService: CommonService) {
    this.widgetKey = Globals.widgetKeys.keys;
  }

  setColor() {
    if (this.bgColor === true) {
      return 'rgb(169, 195, 229)';
    }
  }
  // constructor(private barcodeScanner: BarcodeScanner){
  //   this.widgetKey = Globals.widgetKeys.keys;
  //  }
  // captureBarcode(formcontrolNameRef:any){
  //   this.barcodeScanner.scan().then(barcodeData => {
  //     this.barcode=barcodeData.text;
  //     this.group.get(formcontrolNameRef).setValue(barcodeData.text);
  //    }).catch(err => {
  //    });
  // }

  ngOnInit() {
    this.commonService.editProperties.subscribe(
      (enabled) => {
        if (enabled['id'] === this.config['id']) {
          this.bgColor = true;
        } else {
          this.bgColor = false;
        }
      });
  }

}
