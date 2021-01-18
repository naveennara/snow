import { Component, OnInit, Input, Output, EventEmitter, ViewChildren, QueryList, OnChanges,  ViewChild, ElementRef } from '@angular/core';
import { TasksService } from '../../tasks/tasks.service';
import { WorkAssignmentsService } from '../work-assignments.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import * as Globals from '../../../globals';
import { GridOptions } from 'ag-grid-community';
import { AgGridAngular  } from 'ag-grid-angular';
import { CommonService } from '../../../sharing/sharing-module/common.service';
import { AuthService } from '../../../auth.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-work-assignment-create',
  templateUrl: './work-assignment-create.component.html',
  styleUrls: ['./work-assignment-create.component.css']
})
export class WorkAssignmentCreateComponent implements OnChanges, OnInit {
  @ViewChildren('agGrid') agGrid: QueryList<AgGridAngular>;
  gridOptions: GridOptions;
  @Input() taskId;
  @Input() fileInput;
  @Output() closeSideBar: EventEmitter<number> = new EventEmitter();
  taskBasicInfo: any;
  usersList: any[];
  userNames: any[];
  formsList: any[];
  selectedData: any[];
  @ViewChild('prepopRecordsFile') fileRef: ElementRef;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  dateFormat  = Globals.dateFormats;
  assignKeys;
  // columnDefs = [];
  constructor(
    private fb: FormBuilder,
    private taskService: TasksService,
    private workAssignmentService: WorkAssignmentsService,
    private toastr: ToastrService,
    private commonService: CommonService,
    private authService: AuthService
    // private cdRef: ChangeDetectorRef
  ) { this.assignKeys = Globals.allConstants.constantKeys;}
  createWorkAssignmentForm: FormGroup;
  prepopDataForm: FormGroup;
  frequencies: any[];
  userdropdownSettings: object;
  startMinDate: Date;
  startMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  submitted = false;
  file: File; // temp
  fileUploaded: boolean;
  enableUsers = false;
  fileUploadEnable: boolean;
  excelRecords: any[];
  formSubmitted = false;
  submitButton: string;
  prepopPreview: boolean;
  assignedUser: string;
  rowSelection;
  globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  get f() { return this.createWorkAssignmentForm.controls; }


  bsValueChange(value) {
    if ( value !== null ) {
      this.endMinDate.setDate(value.getDate() + 1);
      this.endMinDate.setMonth(value.getMonth());
      this.endMinDate.setFullYear(value.getFullYear());

    }
  }
  endValueChange(value) {
    if ( value !== null ) {
      this.startMaxDate = new Date();
      this.startMaxDate.setDate(value.getDate());
      this.startMaxDate.setMonth(value.getMonth());
      this.startMaxDate.setFullYear(value.getFullYear());

    }
  }



  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }

  onItemDeSelect(item: any) {
    // console.log(item);
  }

  ngOnChanges() {
    //const taskIdKey: SimpleChange = changes.taskId;
    //this.taskId = taskIdKey.currentValue;
    this.loadTaskData(this.taskId);
  }
  
  createWorkAssignment() {

    this.submitted = true;
    if (this.createWorkAssignmentForm.invalid) {
      return;
    } else {
      if (this.submitButton === 'Next') {
        if (this.excelRecords.length > 0) {
          this.submitButton = 'Create';
          this.prepopPreview = true;
          this.prepopDataForm = this.fb.group({
            user: ['', Validators.required]
          });
          return;
        } else {
          this.fileUploaded = true;
          return;
        }
      } else {
        type Data = {
          taskBasicInfo?: any;
          tasskAssignMents?: any;
        };
        const data = {} as Data;
        data['taskBasicInfo'] = JSON.parse(JSON.stringify(this.taskBasicInfo));
        data.taskBasicInfo['taskId'] = data.taskBasicInfo._id;
        delete data.taskBasicInfo._id;
        const workAssignment = JSON.parse(JSON.stringify(this.createWorkAssignmentForm.value));
        const arr = [];
        if (!this.prepopPreview) {
          if (workAssignment['users'].length > 0) {
            workAssignment['users'].forEach((user) => {
              arr.push(user._id);
            });
          }
        }
        workAssignment['formzCategory'] = this.createWorkAssignmentForm.value.form.formzCategory;
        workAssignment['formName'] = this.createWorkAssignmentForm.value.form.name;
        workAssignment['formId'] = this.createWorkAssignmentForm.value.form._id;
        workAssignment['users'] = arr;
        if (this.prepopPreview) {
          let noUserRecords: any[] = this.gridOptions.rowData.filter((record) => {
            if (record.UserId === undefined) {
              return record;
            }else{
              let id = this.usersList.filter(obj=>obj.username == record.UserId).map(object=>object._id);
              record.UserId = id[0];                                 
            }
          });
          if (noUserRecords.length > 0) {
            this.toastr.error('Please assign user to every record');
            return;
          } else {
            workAssignment['records'] = this.gridOptions.rowData;
            data.taskBasicInfo['isPrepopAttached'] = true;
          }
        } else {
          workAssignment['records'] = [];
          data.taskBasicInfo['isPrepopAttached'] = false;
        }

        delete workAssignment['form'];
        data['taskAssignment'] = workAssignment;
        this.workAssignmentService.createWorkAssignments(data).subscribe(
          (res: any) => {
            if (res.status === 200) {
              this.formSubmitted = true;
              this.toastr.success(res.message);
              this.closeSideBarfn();
              this.commonService.refresh.next(this.taskBasicInfo._id);
            // } else if (res.status === 204) {
            } else {
              this.toastr.error(res.message);
            }
          }
        );
      }
    }
  }

  backToForm() {
    this.prepopPreview = !this.prepopPreview;
    this.ngOnInit( );
  }

  resetSideBar() {
    this.ngOnInit( );
  }

  loadTaskData(taskId) {
    this.taskService.getTaskBasicInfo(taskId).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.taskBasicInfo = res.data;
          this.startMinDate = new Date(this.taskBasicInfo.startDate);
          this.startMaxDate = new Date(this.taskBasicInfo.endDate);
          this.endMaxDate = new Date(this.taskBasicInfo.endDate);
          if (this.fileInput) {
            this.fileUploadEnable = true;
            this.enableUsers = false;
            this.submitButton = 'Next';
            this.excelRecords = [];
          } else {
            if (this.taskBasicInfo.isPrepopAttached === false) {
              this.enableUsers = true;
              this.submitButton = 'Create';
              this.fileUploadEnable = false;
              this.createWorkAssignmentForm.addControl('users', new FormControl([], Validators.required));
            } else {
              this.enableUsers = false;
              this.submitButton = 'Next';
              this.fileUploadEnable = true;
              this.excelRecords = [];
            }
          }
          this.getUsersList();
          this.getCategoryForms();
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }

  ngOnInit() {
    this.submitted = false;
    this.prepopPreview = false;
    this.fileUploaded = false;
    this.gridOptions = {} as GridOptions;
    this.rowSelection = 'multiple';
    this.createWorkAssignmentForm = this.fb.group({
      name: ['', Validators.required],
      form:  ['', Validators.required],
      formFrequency: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    this.userdropdownSettings = this.taskService.userdropdownSettings;
    this.endMinDate = new Date();
    this.frequencies = ['Once', 'Daily', 'Weekly', 'Monthly', 'Yearly', 'All weather'];
    this.commonService.openSideBar.subscribe(
      (data: any) => {
        this.taskId = data.id;
        this.loadTaskData(this.taskId);
      })
  }

  onFileChange(event) {
    this.authService.fileUploadCheck('excel', 'xlsx', event.target.files[0], valid => {
      if (!valid) {
        this.toastr.info(this.assignKeys.excelFormatMsg);
        this.authService.resetFile(this.fileRef);
       } else {
        if (this.createWorkAssignmentForm.value.form._id) {
          const url = Globals.urls.convertExcel + '/' + this.createWorkAssignmentForm.value.form._id;
          this.file = event.target.files[0];
          const inputfileName = this.file.name;
          const formFileName = this.createWorkAssignmentForm.value.form.name + '@' + this.createWorkAssignmentForm.value.form._id;
          const trimmedFileName = inputfileName.replace(/\.[^/.]+$/, '');
          if (formFileName === trimmedFileName) {
            this.excelRecords = [];
            if (this.file.name.indexOf('xlsx') !== -1) {
              // this.isUploadFile = true;
              const formdata = new FormData();
              formdata.append('file', this.file);
              this.workAssignmentService.convertExceltoJSON(url, formdata).subscribe(
                (res: any) => {
                  if (res.status === 200) {
                    this.fileUploaded = false;
                    this.excelRecords = res.data;
                    // this.excelRecords.shift();
                    const columnDefs = [];
                    // columnDefs.push({ headerName: 'User', field: 'UserId', minWidth: 90, editable: false});
                    columnDefs.push({
                      headerName: 'User',
                      field: 'UserId',
                      editable: true,
                      checkboxSelection: true,
                      headerCheckboxSelection: true,
                      cellEditor: 'agSelectCellEditor',
                      cellEditorParams: { values: this.userNames },
                     
                  });
                    res.idLabel.forEach((defObject, key) => {
                      let columnDefsObj = {};
    
                      columnDefsObj['field'] = defObject.id;
                      columnDefsObj['headerName'] = defObject.label;
                      columnDefsObj['editable'] = true;
                      if (defObject.sketchingNames != undefined) {
                        columnDefsObj['sketchingInfo'] = defObject.sketchingNames;
                      }
                      columnDefs.push(columnDefsObj);
                      // count++;
                    });
                    this.gridOptions.columnDefs = columnDefs;
                    this.gridOptions.rowData = this.excelRecords;
                  } else {
                      // swal.fire(res.message);
                  }
                }
              );
            } else {
              this.toastr.error(this.assignKeys.excelFormatMsg);
              this.authService.resetFile(this.fileRef);
              // document.getElementById('fileId').value = '';
            }
          } else {
            this.toastr.error(this.assignKeys.invalidFileMsg);
            this.authService.resetFile(this.fileRef);
            // document.getElementById('fileId').value = '';
          }
    
        } else {
          this.toastr.error(this.assignKeys.selectFormValidFile);
          this.authService.resetFile(this.fileRef);
          // document.getElementById('fileId').value = '';
        }
       }
    });
    
   
  }
  
  getUsersList() {
    const url: string = Globals.urls.getUser + '/' + this.taskBasicInfo.accountId;
    this.workAssignmentService.getUsersByDept(url).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.usersList = res.data;
          this.userNames = this.usersList.map((user) => {
            return user.username;
          });
        } else if (res.status === 204) {
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }

  getCategoryForms() {
    const data: any = {formsCategories: this.taskBasicInfo.formzCategory, accountId : this.taskBasicInfo.accountId};
    const url: string = Globals.urls.getFormszByCategory;
    this.workAssignmentService.getFormsByCat(url, data).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.formsList = res.data;
        } else if (res.status === 204) {
        } else {
          this.toastr.error(res.message);
        }
      }
    );
  }

  compare(val1, val2) {
    if (val1 !== undefined && val2 !== undefined) {
      return val1._id === val2._id;
    }
  }

  closeSideBarfn() {
   // this.closeSideBar.emit();
    this. canDeactivate();
  }

  assignUser() {
    if (this.prepopDataForm.invalid) {
      return;
    } else {
      this.getSelectedRows();
      if (this.selectedData.length > 0) {
        this.selectedData.forEach(index => {
          this.excelRecords[index]['UserId']  = this.prepopDataForm.value.user;
        });
        this.gridOptions.api.setRowData(this.gridOptions.rowData);
      } else {
        this.toastr.info(this.assignKeys.selectRowsMsg);
      }
    }
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.first.api.getSelectedNodes();
    this.selectedData = selectedNodes.map( node => node.id );
  }

  // editPrepop() {
  //   let newColDefs = this.gridOptions.columnDefs;
  //   newColDefs = newColDefs.map((colDef) => {
  //     if (colDef['headerName'] !== 'User') {
  //       colDef['editable'] = true;
  //     }
  //     return colDef;
  //   });
  //   this.gridOptions.columnDefs = newColDefs;
  // }

  deleteSelected() {
    this.getSelectedRows();
    if (this.selectedData.length > 1) {
      this.toastr.info(this.assignKeys.selectOneRowMsg);
    } else if (this.selectedData.length < 1) {
      this.toastr.info(this.assignKeys.selectARowMsg);
    } else {
      this.gridOptions.rowData.splice(this.selectedData[0], 1);
      this.gridOptions.api.setRowData(this.gridOptions.rowData);
    }
  }
  canDeactivate() {
    if (!this.formSubmitted && this.createWorkAssignmentForm.dirty) {
      if (confirm(Globals.formExitMsg)) {
        this.closeSideBar.emit();
      } else {
        return false
      }

    } else {
      this.closeSideBar.emit();
    }
  }
}
