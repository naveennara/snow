import { Component, OnInit, Input } from '@angular/core';
import * as Globals from '../../../globals';
import { SharedRecordsService } from '../shared-records.service';

@Component({
  selector: 'app-attached-documents',
  templateUrl: './attached-documents.component.html',
  styleUrls: ['./attached-documents.component.css']
})
export class AttachedDocumentsComponent implements OnInit {
  @Input() recordData: any;
  responseRef = [];
  type = '';
  noDataImg = Globals.noDataFound;
  constants = Globals.allConstants.constantKeys;
  constructor(public services:SharedRecordsService) { }

  ngOnInit() {
    this.getAttachedReferences();
  }
  ngOnChanges() {
    this.getAttachedReferences();
  }

  getAttachedReferences() {
    const url = Globals.urls.getAttachmentsOfRecordId + '/' + this.recordData.recordId;
    this.services.getAttachedReferences(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.responseRef = res.data;
        } else {
          this.responseRef = [];
        }
      });
  }
  getReferredFile(file,viewType) {
    const fileType = file.filename.split('.')[1];
    switch (fileType) {
      case  'xlsx': {
        this.type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      }
      case 'PDF': {
        this.type = 'application/pdf';
        break;
      }
      case 'jpg': {
        this.type = 'image/jpeg';
        break;
      }
      case 'jpeg': {
        this.type = 'image/jpeg';
        break;
      }
      case 'png': {
        this.type = 'image/png';
        break;
      }
      case 'xls': {
        this.type = 'application/vnd.ms-excel';
        break;
      }
      case 'doc': {
        this.type = 'application/msword';
        break;
      }
      case 'docx': {
        this.type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      }
      case 'ppt': {
        this.type = 'application/vnd.ms-powerpoint';
        break;
      }
      case 'pptx': {
        this.type = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      }
      case 'txt': {
        this.type = 'text/plain';
        break;
      }
    }
    const url = Globals.urls.getAttachedReferenceOfForm + '/' + file._id;
    this.services.getAttachedReference(url, this.type).subscribe(
      (res: any) => {
        const File = new Blob([res], {
          type: this.type
        });
        const blobURL = window.URL.createObjectURL(File);
       
        const anchor = document.createElement('a');
        anchor.download = file.filename;
        anchor.href = blobURL;
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout( function() {
          // For Firefox it is necessary to delay revoking the ObjectURL
          document.body.removeChild(anchor);
          window.URL.revokeObjectURL(blobURL);
        }, 100);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

}
