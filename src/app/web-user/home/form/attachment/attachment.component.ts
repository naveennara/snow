import { CommonService } from './../../../../sharing/sharing-module/common.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormDataDistributionService } from 'src/app/web-user/dynamic-form-web-user/form-data-distribution.service';
import { ToastrService } from 'ngx-toastr';
import { webUserConstants } from './../../../webuser-constant';
import { RestAPICallsService } from '../../../rest-apicalls.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../auth.service';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  responseRef: any;
  @Input() isHistoryView;
  allowedFileExtension = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/vnd.ms-excel',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'text/plain'
  ];
  constants = webUserConstants.constantKeys;

  constructor(
    private formDataDistributionService: FormDataDistributionService,
    public toastr: ToastrService,
    public restAPICallsService: RestAPICallsService,
    public activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private commonService: CommonService) { }

  // tslint:disable-next-line:member-ordering
  files = [];
  isUploadInprocess = false;
  totalAllowedFiles = 3;
  eachFilesize = 10;
  fileSizeParameter = 'KB';
  existingFiles = [];
  uploadFile = webUserConstants.uploadFile;
  uploadedFiles = [];
  ngOnInit() {
    if (!this.isHistoryView) {
      this.files = this.formDataDistributionService.getFileAttachments();
    } else {
      // this.getAttachedReferences();
    }
    this.getAttachedReferences();
    this.getAttachmentConfigs();
    // this.files = this.formDataDistributionService.getFormDataOfForm()['attachments'].split(',');
  }

  getAttachedReferences() {
    const url = webUserConstants.apis.getAttachMents + '/' + this.activatedRoute.snapshot.params._id;
    this.restAPICallsService.getAttachmnets(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          //console.log('list sucess');
          //console.log(res);
          if (this.isHistoryView) {
            this.existingFiles = res.data;

          } else {
            this.uploadedFiles = res.data;
          }
        } else {
          // this.responseRef = [];
        }
      });
  }
  getAttachmentConfigs() {
    const url = webUserConstants.apis.getAttachmentConfigureations;
    this.restAPICallsService.getAttachmnets(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.totalAllowedFiles = res.data.maxFilesAllowedPerRecord;
          this.eachFilesize = res.data.maxSizeOfEachFileAllowedPerRecord;
        }
      });

  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {

    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress === 100) {
      this.files.splice(index, 1);
    } else {
      this.toastr.info(webUserConstants.constantKeys.fileInprogressMsg);
    }
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
            this.isUploadInprocess = false;
          } else {
            this.files[index].progress += 5;
            this.isUploadInprocess = true;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    const totlaLength = this.files.length + this.uploadedFiles.length;
    if (totlaLength <= (this.totalAllowedFiles - 1)) {
      for (const item of files) {
        item.progress = 0;
        if (this.allowedFileExtension.indexOf(item.type) > -1) {
          if ((item.size / 1000) / 1000 < this.eachFilesize) {
            this.files.push(item);
          } else {
            this.toastr.error(webUserConstants.constantKeys.fileSizeMsg1 + this.eachFilesize + webUserConstants.constantKeys.fileSizeMsg2);
          }
        } else {
          this.toastr.error(webUserConstants.constantKeys.invalidFileMsg);
        }

      }
      this.uploadFilesSimulator(0);
    } else {
      this.toastr.error(webUserConstants.formAttachments.allowedFileSizeExisted + this.totalAllowedFiles + ' files');
    }
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  // getfileSizeParams(bytes, decimals) {
  //   if (bytes === 0) {
  //     return '0 Bytes';
  //   }
  //   const k = 1024;
  //   const dm = decimals <= 0 ? 0 : decimals || 2;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return {size : parseFloat((bytes / Math.pow(k, i)).toFixed(dm)), parameter: sizes[i]};
  // }
  closeFilesWindow() {
    this.commonService.attachmentDone.next('');
  }
  cancelUploads() {
    this.files = [];
    this.commonService.attachmentDone.next('');
    this.formDataDistributionService.clearFileAttachments();
    this.formDataDistributionService.reSetRemoveUploadedFiles();
    this.commonService.attachmnetCount.next(0);
  }

  uploadFiles() {
    if (this.files.length <= this.totalAllowedFiles) {
      this.files.forEach((item, index) => {
        this.formDataDistributionService.addFileToFormData('attachments' + index, item);
      });
      this.formDataDistributionService.setFileAttachments(this.files);
      this.commonService.attachmentDone.next('');
      this.commonService.attachmnetCount.next(this.files.length);
    } else {
      this.toastr.error(webUserConstants.formAttachments.allowedFileSizeExisted + this.totalAllowedFiles + ' files');
    }
  }

  getReferredFile(file, viewType) {
    const fileType = file.filename.split('.')[1];
    let type;
    switch (fileType) {
      case 'xlsx': {
        type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      }
      case 'PDF': {
        type = 'application/pdf';
        break;
      }
      case 'jpg': {
        type = 'image/jpeg';
        break;
      }
      case 'png': {
        type = 'image/png';
        break;
      }
      case 'xls': {
        type = 'application/vnd.ms-excel';
        break;
      }
      case 'doc': {
        type = 'application/msword';
        break;
      }
      case 'docx': {
        type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      }
      case 'ppt': {
        type = 'application/vnd.ms-powerpoint';
        break;
      }
      case 'txt': {
        type = 'text/plain';
        break;
      }
    }
    const url = webUserConstants.apis.getAttachedReferenceOfForm + '/' + file._id;
    this.restAPICallsService.getAttachment(url, type).subscribe(
      (res: any) => {
        const File = new Blob([res], {
          type
        });
        const blobURL = window.URL.createObjectURL(File);
        const anchor = document.createElement('a');
        anchor.download = file.filename;
        anchor.href = blobURL;
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout(function () {
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

  removeUploadedFile(index) {
    this.formDataDistributionService.removeUploadedFiles(this.uploadedFiles[index]._id);
    const removedFile = this.uploadedFiles.splice(index, 1);

  }

}
