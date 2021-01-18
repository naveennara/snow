import { Component, OnInit } from '@angular/core';
import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';
import { FormGroup } from '@angular/forms';
import { widgetKeys } from '../../objcet-keys-constants';
import { CommonService } from '../../../../../sharing/sharing-module/common.service';
import { FormsServicesService } from '../../../forms-services.service';
import * as Globals from '../../../../../globals';
import * as exif from 'exif-js';
import { TagValues, IExifElement, IExif, dump, insert, load } from 'piexif-ts';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LightboxConfig, Lightbox } from 'ngx-lightbox';

@Component({
  selector: 'form-camera',
  templateUrl: './form-camera.component.html',
  styleUrls: ['./form-camera.component.css']
})
export class FormCameraComponent implements Field, OnInit {
  private albums = [];

  config: FieldConfig;
  group: FormGroup;
  ispreview: string;
  widgetKey: any;
  bgColor: boolean = false;
  errImageSrc = Globals.imageSrc;
  imagePath;
  WidgetInfo = { displayText: 'Camera', displayIcon: Globals.svgIcons.camera };
  imageUrl;
  i = 0;
  constants = Globals.allConstants.constantKeys;
  constructor(private commonService: CommonService,
              private services: FormsServicesService,
              private http: HttpClient,
              private toastr: ToastrService,
              private lightbox: Lightbox,
              private _lightboxConfig: LightboxConfig,
              private _lightbox: Lightbox
  ) {
    this.widgetKey = Globals.widgetKeys.keys;
  }

  open(index: number) {
    this._lightbox.open(this.albums, index, { wrapAround: true, showImageNumberLabel: true });
  }

  close(): void {
    this._lightbox.close();
  }
  capturedImage() {

  }
  errorHandler(event) {
    event.target.src = this.errImageSrc;
  }
  setColor() {
    if (this.bgColor === true) {
      return 'rgb(169, 195, 229)';
    }
  }

  loaded(e) {
    
    if(this.config[this.widgetKey.isGeotagginEnable]){
      const exifData = load(this.imagePath);
      exifData['imageUrl'] = this.imagePath;
      this.services.setImageExifInfo(exifData);
    }
  

  }
  gotoMap() {
    this.geoTagggingProcess();
  }

  geoTagggingProcess() {
    // if (this.imagePath.indexOf('png') !== -1 || this.imagePath.indexOf('PNG') !== -1 ) {
    //   alert('No geo tagging elments ');
    //   return;
    // }
    try {
      const exifData = load(this.imagePath);
      exifData['imageUrl'] = this.imagePath;
      this.commonService.photoOnmap.next(exifData);
     // this.toastr.info(Globals.allConstants.constantKeys.mapViewMsg);
    } catch (err) {
      this.toastr.info(Globals.allConstants.constantKeys.geoTagMsg);
    }
  }




  getDataUrl(img) {
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and heightSE3Q
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/jpeg', 1.0);
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
    // get base64 code
    if (this.config['_id'] && this.ispreview != '') {
      this.imageUrl = Globals.urls.fecthWebImage + "/" + this.services.recordId + "/" + this.config['id'];
      this.http.get(this.imageUrl).subscribe((res) => {
        this.imagePath = res['img'];
        const src = this.imagePath;
    const caption = 'caption here';
    const thumb = this.imagePath;
    const album = {
      src: src,
      // caption: caption,
      thumb: thumb
    };
    this.albums.push(album);
      }, (err) => {
      });
      // this.services.getAttachedReferences(url).subscribe(
      //   (res: any) => {
      //     if (res.status === 200) {
      //       this.imagePath = res.data;
      //     } else {
      //       //this.responseRef = [];
      //     }
      //   });
    }
    
  }

}
