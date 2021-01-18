import { Component, OnInit, EventEmitter } from '@angular/core';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import * as Globals from '../../../globals';
import { FormsServicesService } from '../forms-services.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import { WindowRef } from '../../../sharing/sharing-module/WindowRef';
import { SharedRecordsService } from '../../../../app/sharing/shared-records/shared-records.service'
import * as CryptoJS from 'crypto-js';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.css']
})
export class FormsListComponent implements OnInit {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  showButtons = true;
  // humanizeBytes: function;
  dragOver: boolean;
  headerIcons = Globals.headerIcons;
  isCollapsed = true;
  Imgsrc = Globals.noDataFound;
  formsList: any;
  total_count: number;
  selectedRow: number;
  limit: number;
  search: string;
  pageNumber = 1;
  page: string;
  workflowDirectionalIcons = Globals.svgIcons;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  finalData = {};
  categories: any;
  showme = false;
  searchPagination = false;
  recordsIcons = Globals.svgIcons;
  shareFormGroup: FormGroup;
  dropdownSettings;
  deptList = [];
  submitted = false;
  formName = '';
  sharedFormDetails = {};
  isTrue = false;
  formID = '';
  responseRef = [];
  deletedFiles = '';
  existingFiles = '';
  type = '';
  widgets = [];
  ispreview = '';
  formInfo = [];
  formBasicInfo: object;
  formType = null;
  filtersList: any[];
  isFormExists = false;
  accountId;
  deptName = '';
  categoriesList = [];
  categoriesLimit = 5;
  categoryPageNumber = 1;
  totalCategories;
  selectedindex: number;
  clickedItem = false;
  myInnerHeight: any;
  myInnerComponentHeight: any;
  shareLinkGroup: FormGroup;
  formLinkExists: boolean;
  formLinkData: any;
  deptShare: any[];
  formKeys;
  autoCompleteField = Globals.autoCompleteField;
  startMaxDate = new Date();
  dateFormat = Globals.dateFormats;
  subscriptions: Subscription[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private commonservice: CommonService,
    private services: FormsServicesService,
    public ngxSmartModalService: NgxSmartModalService,
    private toastr: ToastrService,
    private sharedRecordsService: SharedRecordsService,
    private winRef: WindowRef
  ) {
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    // this.humanizeBytes = humanizeBytes;
    this.myInnerHeight = winRef.nativeWindow.innerHeight;
    this.myInnerComponentHeight = winRef.nativeWindow.innerHeight - 5;
    this.formKeys = Globals.allConstants.constantKeys;
  }
  getCategories() {
    const url = Globals.urls.getFormsCategoryForAccount + '/' + 'root';
    this.services.getCategoriesUsers(url).subscribe(
      (res: any) => {
        if (res) {
          if (res.status === 200) {
            this.categoriesList = res.data;
          } else {
            this.categoriesList = [];
            // this.toastr.warning(res.message);
          }
        } else {
          // this.toastr.error(res.message);
          this.categoriesList = [];
        }
        this.services.categoriesList = this.categoriesList;
      }
    );
  }

  getFormType(formType: any) {
    switch (formType) {
      case 'Public':
        return '3px solid #6861ce';
      case 'Private':
        return '3px solid #ffad46';
      case 'default':
        return '3px solid #eeeee';
    }
  }

  filterForms(filterType, index) {
    this.selectedRow = index;
    this.formType = filterType;
    this.getForms(1);
  }
  // filterForms(filterType) {
  //   if (filterType === 'Assigned') {
  //     const tempAssigned = [];
  //     this.formsList.forEach(form => {
  //       if (form.formzCategory.length > 0) {
  //         tempAssigned.push(form);
  //       }
  //     });
  //     this.formsList = tempAssigned;
  //   } else if (filterType === 'UnAssigned') {
  //     const tempAssigned = [];
  //     this.formsList.forEach(form => {
  //       if (form.formzCategory.length === 0) {
  //         tempAssigned.push(form);
  //       }
  //     });
  //     this.formsList = tempAssigned;
  //   } else {
  //     this.getForms(1);
  //   }
  // }

  ngOnInit() {
    let filterbyDept = this.commonservice.callGetForms.subscribe(
      (res: any) => {
        if (res !== undefined) {
          this.deptName = res.name;
          this.accountId = res._id;
          this.getForms(1);
        }
      }
    );
    this.dropdownSettings = this.services.dropdownSettings4;
    this.getAllDepartments();
    // this.filtersList = ['All', 'Assigned', 'UnAssigned'];
    this.filtersList = ['All', 'Public', 'Private'];
    this.shareFormGroup = this.formBuilder.group({
      // formname: ['', Validators.required],
      formId: [''],
      formcopyname: ['', Validators.required],
      accounts: [[], Validators.required]
    });
    this.shareLinkGroup = this.formBuilder.group({
      formId: [''],
      validity: ['', Validators.required],
      emails: [],
      type: [''],
      formName: []
    });
    this.services.formData = [];
    this.services.formTemplate = '';
    this.services.skeletonchanges = [];
    this.services.Modifiedwidgets = [];
    this.services.formSkeleton = [];
    this.getForms(1);
    let search = this.commonservice.search.subscribe((data: any) => {
      this.search = data.search;
      this.page = data.page;
      this.getForms(1);
    });
    this.subscriptions.push(filterbyDept);
    this.subscriptions.push(search);
    if (this.loginDetails['type'] === 0) {
      this.getCategories();
    }
    if (this.loginDetails.privilege[Globals.Privileges['forms']] == 0) {
      this.commonservice.hideCreate.next(true);
      this.showButtons = false;
    }
  }
  previewForm(form) {
    const url = Globals.urls.getform + '/' + form._id;
    this.services.editForm(url).subscribe(
      (res: any) => {
        this.ngxSmartModalService.getModal('previewFormPopup').open();
        this.widgets = res.data.formSkeleton;
        this.formInfo = res.data.formData;
        this.ispreview = 'preview';
      });
  }

  getVersions(form) {
    this.services.goToVersionsList(form);
  }

  showInfo(form) {
    this.formBasicInfo = form;
    const url = Globals.urls.getformInfo + '/' + form._id;
    this.services.showFormInfo(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.formBasicInfo = res.data;
          this.formBasicInfo['name'] = form.name;
          this.formBasicInfo['createdTime'] = form.createdTime;
          this.ngxSmartModalService.getModal('formInfo').open();
        }

      });
    // this.ngxSmartModalService.getModal('formInfo').open();
  }
  get f() {
    return this.shareFormGroup.controls;
  }
  getAllDepartments() {
    const url = Globals.urls.getAllListOfDepartments + '/' + null;
    this.services.getDepartments(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.deptList = res.data;
        } else if (res.status === 204) {
          this.deptList = [];
        } else {
        }
      });
  }
  toggleAccordion(index) {
    this.selectedindex = index;
    this.clickedItem = !this.clickedItem;
  }
  getForms(newPageNumber) {
    this.commonservice.showCreate.next(true);
    let url: string;
    if (this.search === undefined || this.search === '') {
      this.search = null;
    }
    if (this.page === undefined) {
      this.page = 'forms';
    }
    let deptFilter: string;
    if (this.loginDetails.type === 0) {
      if (this.accountId !== undefined) {
        deptFilter = this.accountId;
      } else {
        deptFilter = 'All';
      }
      if (this.formType === null) {
        this.formType = 'All';
      }
      url =
        Globals.urls.getformszlists + '/' + this.page +
        '/' + this.search + '/' + deptFilter +
        '/' + this.loginDetails.type +
        '/' + this.loginDetails._id +
        '/' + this.formType +
        '/' + Globals.itemsPerPage +
        '/' + newPageNumber;
    } else if (this.loginDetails.type === 4 || this.loginDetails.type === 5) {
      if (this.formType === null) {
        this.formType = 'All';
      }
      url = Globals.urls.getWorkflowFormsForMod + "/" + this.loginDetails._id + '/' + this.formType + "/" + Globals.itemsPerPage + "/" + newPageNumber;
    } else {
      // tslint:disable-next-line:max-line-length
      let deptFilterGA: string;
      if (this.loginDetails['type'] === 3) {
        if (this.accountId !== undefined) {
          deptFilterGA = this.accountId;
        } else {
          deptFilterGA = 'All';
        }
      } else {
        deptFilterGA = this.loginDetails.accounts[0]._id;
      }
      if (this.formType === null) {
        this.formType = 'All';
      }
      url =
        Globals.urls.getformszlists + '/' + this.page +
        '/' + this.search +
        '/' + deptFilterGA +
        '/' + this.loginDetails.type +
        '/' + this.loginDetails._id +
        '/' + this.formType +
        '/' + Globals.itemsPerPage +
        '/' + newPageNumber;
    }
    this.services.getFormsList(url).subscribe((res: any) => {
      if (res) {
        if (res.status === 200) {
          this.formsList = res.data.docs;
          this.total_count = res.data.total;
          this.limit = res.data.limit;
          this.pageNumber = res.data.page;
        } else {
          this.formsList = [];
        }
      } else {
      }
    });
  }
  filterFormType(type) {
  }
  sort() {
    this.showme = true;
    this.commonservice.configSettings.next('hideFormsSearch');
    let j = 0;
    let name = 'Others';
    this.finalData = {};
    this.formsList.map(obj => {
      const catNames = obj.formzCategory;
      let i = 0;
      catNames.forEach(obj1 => {
        if (catNames[i].name !== undefined) {
          name = catNames[i].name;
        }
        let valueArray = this.finalData[name];
        if (valueArray === undefined) {
          valueArray = new Array();
        }
        valueArray.push(this.formsList[j]);
        this.finalData[name] = valueArray;
        i++;
      });
      j++;
    });
    this.categories = Object.keys(this.finalData);
    this.totalCategories = this.categories.length;
  }
  showAllForms() {
    this.showme = false;
    this.commonservice.configSettings.next('showFormsSearch');
  }
  editForm(form) {
    this.services.editUrl(form);
  }
  getSubmittedRecords(form) {
    this.commonservice.recordsView.next({ name: form.name });
    this.services.getRecordsUrl(form);
    this.sharedRecordsService.isPendingRecords = false;
    //  this.toastr.warning('Hello, currently no data available to show! To view the data, please apply the filter');
  }
  exportAsexcel(formData) {
    if (formData.formzCategory.length > 0) {
      const url = Globals.urls.formDownload + '/' + formData._id + '/' + formData.name;
      this.services.getFormExcel(url).subscribe(
        (res: any) => {
          if (res) {
            const excelFile = new Blob([res], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            const blobURL = window.URL.createObjectURL(excelFile);
            const anchor = document.createElement('a');
            anchor.download = formData.name + '@' + formData._id + '.xlsx';
            anchor.href = blobURL;
            document.body.appendChild(anchor);
            anchor.click();
            setTimeout(function () {
              // For Firefox it is necessary to delay revoking the ObjectURL
              document.body.removeChild(anchor);
              window.URL.revokeObjectURL(blobURL);
            }, 100);

          } else {
            //swal(CONSTANTS.serverProblem);
          }
        });
    }else{
      this.toastr.info(this.formKeys.assignCategoryMsg);
    }

  }
  shareForm(data) {
    this.submitted = false;
    this.isFormExists = false;
    this.shareFormGroup.reset();
    this.formName = data.name;
    this.deptShare = this.deptList.filter(object => object._id != data.accountId);
    this.shareFormGroup.patchValue({
      formId: data._id
    });
    this.ngxSmartModalService.getModal('shareFormPopup').open();
  }
  shareLink(data) {
    this.submitted = false;
    this.isFormExists = false;
    this.shareLinkGroup.reset();
    this.formName = data.name;
    let url = Globals.urls.linkExists + '/' + data._id;
    this.services.CheckFormExists(url).subscribe(
      (res: any) => {
        if (res.status === 208) {
          this.formLinkExists = true;
          this.formLinkData = res;
          this.ngxSmartModalService.getModal('shareFormLink').open();
        } else {
          this.formLinkExists = false;
          this.shareLinkGroup.patchValue({
            formId: data._id,
            formName: data.name
          });
          this.ngxSmartModalService.getModal('shareFormLink').open();
        }
      });

  }
  formShareSubmit() {
    this.submitted = true;
    this.sharedFormDetails['formId'] = this.shareFormGroup.value.formId;
    this.sharedFormDetails['formName'] = this.shareFormGroup.value.formcopyname;
    this.sharedFormDetails['accountId'] = this.shareFormGroup.value.accounts[0]._id;
    if (this.shareFormGroup.valid) {
      const url = Globals.urls.formSharing;
      const url1 = Globals.urls.isFormExists + '/' + this.shareFormGroup.value.formcopyname;
      this.services.CheckFormExists(url1).subscribe(
        (res: any) => {
          if (res.status === 204) {
            this.services.shareform(url, this.sharedFormDetails).subscribe(
              (response: any) => {
                if (response.status === 200) {
                  this.ngxSmartModalService.getModal('shareFormPopup').close();
                  this.toastr.success(response.message);
                  this.getForms(1);
                }
              }
            );
          } else if (res.status === 208) {
            this.isFormExists = true;
            // this.toastr.warning(res.message);
          }
        });
    } else {
      return;
    }
  }
  formLinkShare() {
    if (this.shareLinkGroup.valid) {
      this.shareLinkGroup.value['accountId'] = this.loginDetails.accounts[0]._id;
      this.shareLinkGroup.value['type'] = 'public';
      let url = Globals.urls.createFormLink;
      this.services.shareform(url, this.shareLinkGroup.value).subscribe(
        (response: any) => {
          if (response.status === 200) {
            this.formLinkExists = true;
            this.formLinkData = response.data;
            //  this.ngxSmartModalService.getModal('shareFormLink').close();
            this.toastr.success(this.formKeys.formLinkMsg);
          }
        }
      );
    } else {
      return;
    }

    //      { type: ObjectId },
    //  formId: { type: ObjectId },
    //  type: { type: String, default: "public" },
    //  validity: { type: Date },
    //  emails: [],
    //  formName: { type: String }
  }
  copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    //this.toastr.success('Copied Link');
  }
  enableSidebar(data) {
    this.formName = data.name;
    this.formID = data._id;
    this.deletedFiles = '';
    this.getAttachedReferences();
    this.isTrue = true;
  }
  closeSidebar() {
    this.isTrue = false;
    this.files = [];
  }
  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      const size = output.file.size / 1024 / 1024;
      if (size > 2) {
        this.toastr.warning(output.file.name + '' + this.formKeys.fileSizeMsg);
      } else {
        this.files.push(output.file);
      }
      this.responseRef.filter(obj => {
        const index = this.files.findIndex(file => (file.name === obj.filename));
        if (index === -1) {
        } else {
          this.toastr.warning(this.formKeys.attachmentFileMsg);
          this.files.splice(index, 1);
        }
      });
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    }
  }
  removeAttachedFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }
  removeFile(id: string) {
    const index = this.responseRef.findIndex(obj => (obj._id === id));
    if (index !== -1) {
      this.responseRef.splice(index, 1);
      if (this.deletedFiles === '') {
        this.deletedFiles = id;
      } else {
        this.deletedFiles = this.deletedFiles + ',' + id;
      }
    }
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
  getAttachedReferences() {
    const url = Globals.urls.getAllAttachedReferenceOfForm + '/' + this.formID;
    this.services.getAttachedReferences(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.responseRef = res.data;
        } else {
          this.responseRef = [];
        }
      });
  }
  attachReferences(formId) {
    const formdata = new FormData();
    this.files.filter(file => {
      formdata.append(file.name, file.nativeFile);
    });
    this.responseRef.filter(file => {
      if (this.existingFiles === '') {
        this.existingFiles = file._id;
      } else {
        this.existingFiles = this.existingFiles + ',' + file._id;
      }
    });
    formdata.append('existingFiles', this.existingFiles);
    formdata.append('deletedFiles', this.deletedFiles);
    const url = Globals.urls.attachReferenceToForm + '/' + formId;
    this.services.attachReferences(url, formdata).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.files = [];
          this.deletedFiles = '';
          this.toastr.success(res.message);
          this.isTrue = false;
        } else {
          this.toastr.error(res.message);
        }
      });
  }
  getReferredFile(file) {
    const fileType = file.filename.split('.')[1];
    switch (fileType) {
      case 'xlsx': {
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
  onDeleteItem(message: any): void {
    if (message === 'success') {
      this.getForms(1);
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe())
  }


}
