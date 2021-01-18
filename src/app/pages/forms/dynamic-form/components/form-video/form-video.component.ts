import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import { FormsServicesService } from '../../../forms-services.service';
import * as Globals from '../../../../../globals';

@Component({
  selector: 'app-form-video',
  templateUrl: './form-video.component.html',
  styleUrls: ['./form-video.component.css']
})
export class FormVideoComponent implements Field, OnInit {
  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  bgColor: boolean = false;
  video;
  WidgetInfo = { displayText: 'Video', displayIcon: Globals.svgIcons.video_camera };

  constructor(private commonService: CommonService,private services: FormsServicesService) {
    this.widgetKey = Globals.widgetKeys.keys;
  }

  setColor() {
    if (this.bgColor === true) {
      return 'rgb(169, 195, 229)';
    }
  }

  ngOnInit() {
    this.commonService.editProperties.subscribe(
      (enabled) => {
        if (enabled['id'] === this.config['id']) {
          this.bgColor = true;
        } else {
          this.bgColor = false;
        }
      });
      if(this.config['_id'] && this.ispreview != ''){
        this.video = Globals.urls.fetchImageOrVideo + "/" + this.services.recordId + "/" + this.config['id'];
        // this.services.getAttachedReferences(url).subscribe(
        //   (res: any) => {
        //     if (res.status === 200) {
        //       this.video = res.data;
        //     } else {
        //       //this.responseRef = [];
        //     }
        //   });
      }
  }
}
