import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersService } from '../users.service';
import * as Globals from '../../../globals';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from '../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-users-bulkimport',
  templateUrl: './users-bulkimport.component.html',
  styleUrls: ['./users-bulkimport.component.css']
})
export class UsersBulkimportComponent implements OnInit {

  arrayBuffer: any;
  file: File;
  uploadFileInfo: any[] = [];
  fileupload: object;
  uploadUserFileInfo: any;
  invalidDataRecords: any[] = [];
  uploadFileInfoUser: any;
  isShowTable: boolean = false;
  editUserOriginalInfo: any;
  selectedIndex: number;
  isTableColumnEditshow: boolean = false;
  isUploadFile = false;
  disableUpload = false;
  recordKeys: any;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  showUsersOpen = false;
  Data: any;
  total_count: number;
  limit = 10;
  pageNumber = 1;
  formSubmitted = false;
  @ViewChild('usersFile') fileRef: ElementRef;
  showAlert: boolean = false;
  constructor(
    private services: UsersService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    public ngxSmartModalService: NgxSmartModalService) { this.recordKeys = Globals.allConstants.constantKeys; }

  ngOnInit() {
  }
  // Function Code: U-15
  onFileChange(event) {
    this.authService.fileUploadCheck('excel', 'xlsx|xls', event.target.files[0], valid => {
      if (!valid) {
      // alert('Not a valid image file.');`
       this.toastr.info(this.recordKeys.xlsxformat);
       this.authService.resetFile(this.fileRef);
        // return false;
      } else {
        const url = Globals.urls.xlsxtojsonuser;
        this.file = event.target.files[0];
        this.isUploadFile = true;
        const formdata = new FormData();
        formdata.append('file', this.file);
        this.uploadFileInfo = [];
        this.services.xlsxtojsonuser(url, formdata).subscribe(
          (res: any) => {
            if (res.status === 200) {
              this.pageNumber = 1;
              this.showAlert = true;
              res.data.forEach(fileVal => {
                this.fileupload = {};
               
                if (fileVal[this.recordKeys.Name] !== undefined && fileVal[this.recordKeys.Name]) {
                  this.fileupload[this.recordKeys.name] = fileVal[this.recordKeys.Name];
                  delete fileVal[this.recordKeys.Name];
                } else {
                  this.fileupload[this.recordKeys.name] = '';
                }
                if (fileVal[this.recordKeys.label_LastName] !== undefined && fileVal[this.recordKeys.label_LastName]) {
                  this.fileupload[this.recordKeys.lastname] = fileVal[this.recordKeys.label_LastName];
                  delete fileVal[this.recordKeys.lastname];
                } else {
                  this.fileupload[this.recordKeys.lastname] = '';
                }
                if (fileVal[this.recordKeys.Email] !== undefined && fileVal[this.recordKeys.Email]) {
                  this.fileupload[this.recordKeys.email] = fileVal[this.recordKeys.Email];
                  delete fileVal[this.recordKeys.Email];
                } else {
                  this.fileupload[this.recordKeys.name] = '';
                }
                if (fileVal[this.recordKeys.Phone] !== undefined && fileVal[this.recordKeys.Phone]) {
                  this.fileupload[this.recordKeys.phone] = fileVal[this.recordKeys.Phone];
                  delete fileVal[this.recordKeys.Phone];
                } else {
                  this.fileupload[this.recordKeys.phone] = '';
                }
                this.uploadFileInfo.push(this.fileupload);
              });
              this.uploadUserFileInfo = this.uploadFileInfo;
              this.total_count = this.uploadFileInfo.length;
            } else {
              this.toastr.info(res.message);
            }
          }
        );
      }


    });

  }
  // Function Code: U-16
  editUserRecord(index, user) {
    this.editUserOriginalInfo = JSON.parse(JSON.stringify(user));
    this.selectedIndex = index;
    this.isTableColumnEditshow = true;
  }
  // Function Code: U-17
  deleteUser(index) {
    this.uploadFileInfo.splice(index, 1);
    this.total_count = this.uploadFileInfo.length;
  }
  closeEdit(index) {
    this.uploadFileInfo[index] = this.editUserOriginalInfo;
    this.selectedIndex = undefined;
  }
  saveEdit(index) {
    this.selectedIndex = undefined;
  }
  // Function Code: U-18
  emailPhoneCheck1(email, phone) {
    // tslint:disable-next-line:max-line-length
    const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
    //new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const phoneRegex = /^[0-9]{10,12}$/;
    return emailRegex.test(email) && phoneRegex.test(phone);
  }
  // Function Code: U-19
  Upload(data) {
    const url = Globals.urls.createUserFromFile;
    if (this.isUploadFile && data.length > 0) {
      this.disableUpload = true;
      this.uploadFileInfoUser = {};
      this.uploadFileInfoUser.accounts = this.loginDetails.accounts;
      this.uploadFileInfoUser.userData = data;
      this.uploadFileInfoUser.createdByMailID = this.loginDetails.email;
      this.uploadFileInfoUser.createdBy = this.loginDetails.email;
      let j = 0;
      // tslint:disable-next-line:max-line-length
      const emailRegex = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
      ///^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const phoneRegex = /^[0-9]{10,12}$/;
      data.forEach(record => {
        const emailPhoneCheck = emailRegex.test(record.email) && phoneRegex.test(record.phone) && record.name != "" && record.lastname != "";
        if (!emailPhoneCheck) {
          this.invalidDataRecords.push(j);
        }
        j++;
      });
      if (this.invalidDataRecords.length === 0) {
        this.isShowTable = false;
        this.services.createUserFromFile(url, this.uploadFileInfoUser).subscribe(
          (res: any) => {
            if (res.status === 200) {
              this.formSubmitted = true;
              this.toastr.success(res.message);
              this.router.navigate(['mainLayout/users']);
            } else if (res.status === 204 || res.status === 208) {
              this.toastr.info(res.message);
              this.uploadUserFileInfo = res.skippedRecords;
              this.total_count = res.skippedRecords.length;
            } else {
              this.toastr.error(res.message);
            }
            this.disableUpload = false;
          }
        );
      } else {
        this.isShowTable = true;
        this.showUsersOpen = true;
        this.Data = data;
        this.ngxSmartModalService.getModal('showUsers').open();
        this.disableUpload = false;
      }
    } else {
      this.toastr.warning(this.recordKeys.validFile);
    }
  }
  skipInvalidRecords() {
    const url = Globals.urls.createUserFromFile;
    for (let i = this.invalidDataRecords.length - 1; i >= 0; i--) {
      this.Data.splice(this.invalidDataRecords[i], 1);
    }
    this.invalidDataRecords = [];
    if (this.Data.length > 0) {
      this.services.createUserFromFile(url, this.uploadFileInfoUser).subscribe(
        (res: any) => {
          if (res.status === 200) {
            this.toastr.success(res.message);
            this.router.navigate(['mainLayout/users']);
          } else {
            this.toastr.info(res.message);
          }
        }
      );
    } else {
      this.toastr.warning(this.recordKeys.Norecords);
      this.ngxSmartModalService.getModal('showUsers').close();
    }
    this.uploadFileInfoUser.userData = this.Data;
  }
  editRecords() {
    this.invalidDataRecords = [];
    this.ngxSmartModalService.getModal('showUsers').close();
  }
  // Function Code: U-20
  showUsersInTable() {
    if (this.isUploadFile) {
      this.isShowTable = true;
    } else {
      this.toastr.warning(this.recordKeys.validFile);
    }
  }
  // Function Code: U-21
  hideUsersInTable() {
    this.isShowTable = false;
  }
  // Function Code: U-22
  excelTemplate() {
    const url = Globals.urls.downloadFile + '/' + 'userCreationTemplate.xlsx';
    this.services.getUserTemplate(url).subscribe(
      (res: any) => {
        if (res) {

        } else {
          //swal(CONSTANTS.serverProblem);
        }
      });
  }
  canDeactivate() {
    if (!this.formSubmitted && this.showAlert) {
      if (confirm(Globals.formExitMsg)) {
        return true
      } else {
        return false
      }

    } else {
      return true;
    }
  }
}
