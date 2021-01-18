import { Component, OnInit } from '@angular/core';
import * as Globals from '../../globals';
import {AsyncDownloadService} from '../asyn-downloads/async-download.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-asyn-downloads',
  templateUrl: './asyn-downloads.component.html',
  styleUrls: ['./asyn-downloads.component.css']
})
export class AsynDownloadsComponent implements OnInit {
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  pageDetails = {pageIcon: Globals.headerIcons.downloadGrey};
  data = {};
  fetchedRecords = [];
  total_count: number;
  limit = 10;
  pageNumber = 1;
  type = '';
  Imgsrc = Globals.noDataFound;
  constants = Globals.allConstants.constantKeys;
  constructor(
    private services: AsyncDownloadService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.fetchDownloadDetails();
  }
  fetchDownloadDetails() {
    const url = Globals.urls.fetchDownloadDetails;
    this.data['userId'] = this.loginDetails._id;
    this.data['userType'] = this.loginDetails.type;
    this.services.fetchDownloadDetailsService(url, this.data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          if (res.data.length) {
            this.pageNumber = 1;
            this.total_count = res.data.length;
            this.fetchedRecords = res.data;
          }
        } else if (res.status === 204) {
          this.fetchedRecords = [];
        }
      }
    );
  }
  downloadFile(record) {
    switch (record.type) {
      case  'xlsx': {
        this.type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      }
      case 'PDF': {
        this.type = 'application/pdf';
        break;
      }
    }
    const url = Globals.urls.downloadFile + '/' + record.fileName;
    this.services.downloadFileService(url, this.type).subscribe(
      (res: any) => {
        const File = new Blob([res], {
          type: this.type
        });
        const blobURL = window.URL.createObjectURL(File);
        const anchor = document.createElement('a');
        anchor.download = record.fileName;
        document.body.appendChild(anchor);
        anchor.href = blobURL;
        anchor.click();
        setTimeout(function(){
          // For Firefox it is necessary to delay revoking the ObjectURL
          document.body.removeChild(anchor);
          window.URL.revokeObjectURL(blobURL);
        }, 100);
      });
  }

}
