import { Component, OnInit, Input, ChangeDetectionStrategy, AfterViewInit, ViewChild, QueryList, NgZone, ElementRef, Output, EventEmitter } from '@angular/core';
import { SharedRecordsService } from '../shared-records.service';
import { ToastrService } from 'ngx-toastr';
import { GridOptions } from 'ag-grid-community';
import { AgGridAngular } from 'ag-grid-angular';
import { FormBuilder, FormArray, FormGroup, Validators, FormControl, } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { MediaWidgetsComponent } from '../media-widgets/media-widgets.component';
import { FullRecordViewComponent } from '../full-record-view/full-record-view.component';
import { WindowRef } from '../../../sharing/sharing-module/WindowRef';
import * as Globals from '../../../globals';
import { CommonService } from '../../sharing-module/common.service';
import {
	NgxSmartModalService
} from 'ngx-smart-modal';
import { TasksService } from '../../../../../src/app/pages/tasks/tasks.service';
import * as CryptoJS from 'crypto-js';
import { DateWidgetsComponent } from '../date-widgets/date-widgets.component';
import { Subscription } from 'rxjs';
import { GooglemapsComponent } from '../googlemaps/googlemaps.component';
import { LeafletComponent } from '../leaflet/leaflet.component';

@Component({
	selector: 'app-shared-records',
	templateUrl: './shared-records.component.html',
	//changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./shared-records.component.css']
})
export class SharedRecordsComponent implements OnInit, AfterViewInit {

	@Output() notifyParentOnUpdate: EventEmitter<any> = new EventEmitter<any>();
	map: google.maps.Map;
	@ViewChild('agGrid') agGrid: AgGridAngular;
	gridOptions: GridOptions;
	@ViewChild('locations') locationClick: ElementRef;
	@ViewChild('leafletRef') leafletRef: LeafletComponent;
	@ViewChild('googleMaps') googleMaps: GooglemapsComponent;
	@Input() url;
	@Input() requestData;
	gridOptionsForPrepop: GridOptions;
	email: FormGroup;
	excelRecords = [];
	usersList = [];
	userNames = [];
	deletedRecords = [];
	selectedFormat: string;
	prepopDataForm: FormGroup;
	recordsIcons = Globals.svgIcons;
	globalInfo = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
	public gridApi;
	public gridColumnApi;
	public defaultColDef;
	public rowSelection;
	public getRowNodeId;
	paginationPageSize = 10;
	myInnerHeight: any;
	myInnerComponentHeight: any;
	total_length;
	smallnumPages = 0;
	isOpen = false;
	columnsSelection = false;
	columns = [];
	records: FormGroup;
	reassign: FormGroup;
	columnAddingValues = [];
	range = { startRange: 0, endRange: 0 };
	SelectedRecordIds: any[] = [];
	imageSrc = Globals.noDataFound;
	isAttachPrepop = false;
	selectedData = [];
	taskId = '';
	formId = '';
	date: Date;
	dateCheck: boolean;
	formName = '';
	assignmentName = '';
	assignmentId = '';
	addedRecords = [];
	columnHeadings = [];
	isPendingRecords;
	dataObservable;
	constantKeys;
	submitted;
	currentPage;
	rowIdNode;
	displayValues;
	mediaWidgets = ['camera', 'video', 'rating', 'heading', 'break', 'barcode', 'signature'];
	loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8))
	configDetails = JSON.parse(sessionStorage.getItem('Config'));
	public noRowsTemplate;
	sketchingForm: FormGroup;
	formInfo;
	widgets;
	that = this;
	ispreview = 'preview';
	hide = true;
	imgForMap = this.recordsIcons.mapSketching;
	mapLayer;
	filterFlag: boolean = false;
	getRowStyle;
	showFilterRecords: boolean;
	infoWindowData: any;
	markers: any = [];
	mapFirst =  true;
	formrecordData: any;
	editedRecords: any[] = [];
	assignedUsers: boolean;
	subscriptions: Subscription[]=[];
	locationsList: any[];
	mapType: any;
	constructor(
		public services: SharedRecordsService,
		public toastr: ToastrService,
		public winRef: WindowRef,
		public commonService: CommonService,
		public ngxSmartModalService: NgxSmartModalService,
		public fb: FormBuilder,
		public taskservice: TasksService,
	) {
		this.constantKeys = Globals.allConstants.constantKeys;
		this.defaultColDef = {
			width: 150,
			filter: true,
			sortable: true,
			headerCheckboxSelection: this.isFirstColumn,
			checkboxSelection: this.isFirstColumn,
			resizable: true
		};
		this.rowSelection = "multiple";
		this.gridOptions = <GridOptions>{
			context: {
				componentParent: this
			},
		};
		this.getRowNodeId = function (data) {
			return data._id;
		};
		//   this.getRowStyle =  {
		// 	"text-color": function(data) {
		// 			if(JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).type != 1 && JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).username === data.data.workFlowAssignedTo){
		// 				return true;

		// 			}
		// 	  }
		//   };

	}
	ngAfterViewInit() {
		this.myInnerHeight = '350'; //this.winRef.nativeWindow.innerHeight;
		this.myInnerComponentHeight = this.winRef.nativeWindow.innerHeight - 5;
	}
	isFirstColumn(params) {
		let displayedColumns = params.columnApi.getAllDisplayedColumns();
		let thisIsFirstColumn = displayedColumns[0] === params.column;
		return thisIsFirstColumn;
	}
	onQuickFilterChanged() {
		this.gridApi.setQuickFilter(document.getElementById("quickFilter")['value']);
	}
	onGridReady(params) {
		this.gridApi = params.api;
		this.gridColumnApi = params.columnApi;
		if (!this.columnAddingValues.length) {
			this.gridOptions.api.setColumnDefs([]);
			this.gridOptions.api.setRowData([]);
		}
	}
	onGrid() {
		return this.dataObservable = new Observable(observer => {
			this.isPendingRecords = this.services.isPendingRecords;
			if (this.isPendingRecords) {
				if (this.globalInfo.type !== 0) {
					this.getUsersList();
				}
				this.taskId = this.requestData.taskId;
				this.formId = this.requestData.formId;
				this.formName = this.requestData.formName;
				this.assignmentName = this.requestData.name;
				this.assignmentId = this.requestData.assignmentId;
				this.services.formId = this.requestData.formId;
			}
			this.services.getRecords(this.url, this.requestData).subscribe(
				(res: any) => {
					switch (res.status) {
						case 200:
							let columnHeadings = [];
							let tableIds = res.data.columnDef.filter(column => column.isTable == true).map(value => value.id);
							this.displayValues = res.data.displayValue;
							res.data.columnDef.forEach((defObject, key) => {
								if (defObject.isRequired == true && !this.mediaWidgets.includes(defObject.type) && !tableIds.includes(defObject.id)) {
									let columnDefsObj = {};
									columnDefsObj['field'] = defObject.id;
									columnDefsObj['headerName'] = defObject.label;
									columnDefsObj['filterParams'] = {
										filterOptions: ["contains", "notContains"],
										debounceMs: 0,
										suppressAndOrCondition: true
									}
									// if(this.isPendingRecords){
									// 	if (defObject.id == "UserId") {
									// 		columnDefsObj['cellRendererFramework'] = UserAssignmentComponent;
									// 	}
									// }
									if (defObject.sketchingNames != undefined) {
										columnDefsObj['sketchingInfo'] = defObject.sketchingNames;
									}
									if (defObject.id == "Inserted Place" || defObject.type == 'map') {
										columnDefsObj['cellRendererFramework'] = MediaWidgetsComponent;
									}
									else if (defObject.type == 'calendar') {
										columnDefsObj['cellRendererFramework'] = DateWidgetsComponent;
									}
									
									columnHeadings.push(columnDefsObj);
								}

							});
							columnHeadings[0]['width'] = 160;
							columnHeadings[0]['suppressSizeToFit'] = true;
							columnHeadings[0].cellRendererFramework = FullRecordViewComponent;
							columnHeadings[0].pinned = 'left';
							this.columnHeadings = columnHeadings;
							this.columnAddingValues = res.data.columnDef.filter(column => column.isRequired == false && !this.mediaWidgets.includes(column.type) && !tableIds.includes(column.id));
							this.columns = res.data.columnDef.filter(column => column.type != undefined && column.isUnderHeading == '');
							this.gridOptions.api.setColumnDefs(columnHeadings);
							this.gridOptions.api.setRowData(res.data.data);
							//this.total_length = res.data;
							let allColIds = this.gridOptions.columnApi.getAllColumns().map(column => column['colId']);
							this.gridOptions.columnApi.autoSizeColumns(allColIds);
							observer.next(res.data.total);
							break;
						case 204:
							if (this.requestData && this.requestData.placeOfRecord == 'Forms' && this.requestData[this.constantKeys['toDate']] == this.requestData[this.constantKeys['fromDate']]) {
								this.noRowsTemplate = this.constantKeys.applyFilterMsg;
							} else {
								this.noRowsTemplate = this.constantKeys.noRowsMsg;
							}
							this.gridOptions.api.setColumnDefs([]);
							this.gridOptions.api.setRowData([]);
							this.toastr.info(this.constantKeys.noRecords);
							observer.next(0);
							break;
						case 500:
							this.toastr.info();
							break;
						default:
							this.toastr.info();
					}
				})
		})
	}
	showOrHideAssign() {
		if (this.requestData && this.requestData.placeOfRecord !== 'Forms' && this.requestData.status == 0 && this.requestData.taskStatus !== Globals.taskStatusObject['workflowCycleStarted']) {
			if (this.loginDetails.type == 1) {
				if (this.requestData.placeOfRecord == 'Tasks') {
					return true;
				} else {
					return false;
				}
			}
			else if (this.loginDetails.type == 3) {
				if (this.requestData.placeOfRecord == 'Projects') {
					return true;
				} else {
					return false;
				}
			}
		} else {
			return false;
		}
	}
	showOrHideReassign(){
		this.showOrHide();
		if (this.requestData && this.requestData.placeOfRecord !== 'Forms' && this.requestData.status == "all" &&  this.requestData.taskStatus !== Globals.taskStatusObject['workflowCycleStarted']) {
			if (this.loginDetails.type == 1) {
				if (this.requestData.placeOfRecord == 'Tasks') {
					return true;
				} else {
					return false;
				}
			}
			else if (this.loginDetails.type == 3) {
				if (this.requestData.placeOfRecord == 'Projects') {
					return true;
				} else {
					return false;
				}
			}else{
				return false;
			}
		}
	}
	showOrHide() {
		// this.requestData.status == "all" &&
		if (this.requestData && this.requestData.placeOfRecord !== 'Forms' &&  this.requestData.taskStatus !== Globals.taskStatusObject['workflowCycleStarted']) {
			if (this.loginDetails.type == 1) {
				if (this.requestData.placeOfRecord == 'Tasks') {
					this.services.showEdit = true;
				} else {
					this.services.showEdit = false;
				}
			}
			else if (this.loginDetails.type == 3) {
				if (this.requestData.placeOfRecord == 'Projects') {
					this.services.showEdit = true;
				} else {
					this.services.showEdit = false;
				}
			}else{
				this.services.showEdit = false;
			}
		} else if(this.requestData && this.requestData.placeOfRecord !== 'Forms' && this.requestData.status == "all" && this.requestData.taskStatus == Globals.taskStatusObject['workflowCycleStarted']){
			if(this.requestData.workFlowAssignedTo && this.requestData.workFlowAssignedTo._id == this.loginDetails._id){
				this.services.showEdit = true;
			}
			// else if (this.loginDetails.type == 1) {
			// 	if (this.requestData.placeOfRecord == 'Tasks') {
			// 		this.services.showEdit = true;
			// 	} else {
			// 		this.services.showEdit = false;
			// 	}
			// }
			else{
				this.services.showEdit = false;
			}
			
		}
		else if(this.requestData && this.requestData.placeOfRecord == 'Forms'){
			this.services.showEdit = true;
		}
		else {
			this.services.showEdit = false;
		}
	}
	showMap() {
		this.hide = !this.hide;
		if (this.hide == false) {
			this.imgForMap = this.recordsIcons.mapSketchingCross;
		} else {
			this.imgForMap = this.recordsIcons.mapSketching;

		}
	}
	pageChanged(event) {
		if (this.requestData && this.gridApi) {
			//this.gridApi.paginationGoToPage(event.page - 1);
			if ((this.gridApi.paginationGetTotalPages() == this.gridApi.paginationGetCurrentPage() + 1) && this.gridApi.paginationGetTotalPages()!==1) {
				this.requestData.skipCount = this.gridApi.paginationGetRowCount();
				this.addRecords();
			}
		}
	}
	addRecords() {
		this.services.getRecords(this.url, this.requestData).subscribe(
			(res: any) => {
				switch (res.status) {
					case 200: this.gridApi.updateRowData({ add: res.data.data });
						break;
					case 204:
						//this.gridOptions.api.setColumnDefs([]);
						//this.gridOptions.api.setRowData([]);
						//this.toastr.info("No Records Found");
						break;
					default:
						this.toastr.info();
				}
			})
	}
	addingColumns() {
		if (this.total_length) {
			this.columnsSelection = true;
		} else {
			this.toastr.info(this.constantKeys.noRecords);
		}
	}
	download() {
		if (this.selectedFormat == this.constantKeys['excel']) {
			this.downloadExcel();
		} else if (this.selectedFormat == this.constantKeys['pdf']) {
			this.downloadPdf();
		} else if (this.selectedFormat == this.constantKeys['email']) {
			this.emailRecords();
		}

	}
	reassignPopUp() {
		this.reassign.reset();
		this.SelectedRecordIds = this.gridOptions.api.getSelectedRows();
		if (this.SelectedRecordIds.length < 1) {
			this.toastr.warning(this.constantKeys.reassignMsgRecord);
			return;
		} else if (this.constantKeys[this.SelectedRecordIds[0][this.constantKeys['recordStatus']]] == 1 || this.constantKeys[this.SelectedRecordIds[0][this.constantKeys['recordStatus']]] == 0) {
			this.toastr.warning(this.constantKeys.workflowStartedMsg);
		} else {
			let reassignRecords = this.SelectedRecordIds.filter(obj => obj[this.constantKeys['recordStatus']] == this.constantKeys.reassignRecord)
			if (reassignRecords.length > 0) {
				this.toastr.warning(this.constantKeys.alreadyReassignMsg);
				this.gridOptions.api.deselectAll();
				return;
			} else {
				this.getUsersList();
				this.ngxSmartModalService.getModal('reassignModel').open();
			}

		}
	}
	emailPopUp() {
		this.email.reset();
		this.submitted = false;
		this.SelectedRecordIds = this.gridOptions.api.getSelectedRows();
		let pdfLimit = Globals.attachmentLimit;
		if (this.SelectedRecordIds.length > pdfLimit) {
			this.toastr.warning(this.constantKeys.pdfLimitMsg1 + " " + pdfLimit + " " + this.constantKeys.pdfLimitMsg2);
			return;
		} else if (this.SelectedRecordIds.length < 1) {
			this.toastr.warning(this.constantKeys.emailMsgRecord);
			return;
		} else {
			this.ngxSmartModalService.getModal('emailModel').open();
		}
	}
	recordsReassign() {
		if (this.reassign.valid) {
			this.reassign.value['recordIds'] = this.SelectedRecordIds.map(value => value._id);
			this.reassign.value['formId'] = this.requestData.formId;
			this.reassign.value['reassignedfrom'] = this.requestData.placeOfRecord;
			let url = Globals.urls.reAssign;
			this.services.exportRecords(url, this.reassign.value).subscribe(
				(res: any) => {
					if (res.status == 200) {
						this.toastr.success(res.message);
						this.gridOptions.api.deselectAll();
						this.ngxSmartModalService.getModal('reassignModel').close();
						for (let id of this.reassign.value['recordIds']) {
							let rowNode = this.gridApi.getRowNode(id);
							rowNode.setDataValue(this.constantKeys['recordStatus'], 'Reassigned Record');
						}

					} else {
						this.toastr.info(res.message);
						this.gridOptions.api.deselectAll();
					}

				});
		} else {
			return;
		}
	}
	showColumns(startRange, endRange, typeOfRecord) {
		this.SelectedRecordIds = this.gridOptions.api.getSelectedRows();
		if (typeOfRecord == this.constantKeys['excel']) {
			if (this.SelectedRecordIds.length <= 0 && (this.range.startRange == 0 && this.range.endRange == 0)) {
				this.toastr.warning(this.constantKeys.excelMsgRecord);
				return;
			}  else {
				this.records.reset();
				this.selectedFormat = this.constantKeys['excel'];
				this.isOpen = true;
			}
		} else if (typeOfRecord == this.constantKeys['pdf']) {
			let pdfLimit = Globals.attachmentLimit;
			if (this.SelectedRecordIds.length > pdfLimit) {
				this.toastr.warning(this.constantKeys.pdfLimitMsg1 + " " + pdfLimit + " " + this.constantKeys.pdfLimitMsg2);
				this.gridOptions.api.deselectAll();
				return;
			} else if (this.SelectedRecordIds.length < 1) {
				this.toastr.warning(this.constantKeys.pdfMsgRecord);
				return;
			} else {
				this.records.reset();
				this.selectedFormat = this.constantKeys['pdf'];
				this.isOpen = true;
			}
		}
	}
	getFilterInfo() {
		let obj = {};
		obj["formId"] = this.requestData.formId;
		obj["formName"] = this.requestData.formName;
		obj["taskId"] = this.requestData.taskId;
		obj["fromDate"] = this.requestData.fromDate;
		obj["toDate"] = this.requestData.toDate;
		obj['placeOfRecord'] = this.requestData.placeOfRecord;
		if (this.requestData.placeOfRecord !== 'Forms') {
			obj["assignmentId"] = this.requestData.assignmentId;
			obj["assignmentName"] = this.requestData.name;
			obj["status"] = this.requestData.status;
			obj['taskName'] = this.requestData.taskName;
		}
		return obj;
	}
	downloadPdf() {
		const selectedColumns = this.records.value.columns
			.map((checked, index) => checked ? this.columns[index].id : null)
			.filter(value => value !== null);

		let userList = [];
		let obj = {};
		obj = this.getFilterInfo();
		if (typeof this.requestData.user == "object") {
			obj["user"] = this.requestData.user;
		}
		else {
			userList.push(this.requestData.user);
			obj["user"] = userList;
		}

		if (this.SelectedRecordIds.length == this.total_length) {
			this.SelectedRecordIds = [];
			obj["records"] = "All";

		} else {
			obj["records"] = this.SelectedRecordIds.map(value => value._id);

		}
		if (selectedColumns.length > 0) {
			obj["columns"] = selectedColumns;
		} else {
			obj["columns"] = "all";
		}

		obj["type"] = "download";
		obj['userId'] = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8))._id;
		obj["username"] = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).username;
		obj["userType"] = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).type;
		let url = Globals.urls.pdfDownload;
		this.services.exportRecords(url, obj).subscribe(
			(res: any) => {
				if (res.status == 200) {

					this.toastr.info(
						"Please check for " + res.filename + " in downloads tab"
					)
					this.closeSidebar();
					this.gridOptions.api.deselectAll();
					// <--End
				} else {
					this.toastr.warning(this.constantKeys.pdfErrorMsg);
					this.gridOptions.api.deselectAll();
				}

			});
		this.closeSidebar();
	}
	downloadExcel() {
		const selectedColumns = this.records.value.columns
			.map((checked, index) => checked ? this.columns[index].id : null)
			.filter(value => value !== null);

		// Sending Users as array format to server
		let userList = [];
		//userList.push(localStorageService.get("selected_User"));
		let obj = {};
		obj = this.getFilterInfo();
		if (typeof this.requestData.user == "object") {
			obj["user"] = this.requestData.user;
		}
		else {
			userList.push(this.requestData.user);
			obj["user"] = userList;
		}

		if (this.SelectedRecordIds.length == this.total_length) {
			this.SelectedRecordIds = [];
			obj["records"] = "All";
			obj["skip"] = 0;
			obj["offset"] = 1000;
		} else if (this.SelectedRecordIds.length == 0) {
			obj["records"] = "All";
			obj["skip"] = this.range.startRange - 1;
			obj["offset"] = this.range.endRange;
		} else {
			obj["records"] = this.SelectedRecordIds.map(value => value._id);
			obj["skip"] = 0;
			obj["offset"] = 1000;
		}
		if (selectedColumns.length > 0) {
			obj["columns"] = selectedColumns;
		} else {
			obj["columns"] = "all";
		}

		obj["type"] = "download";
		obj['userId'] = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8))._id;
		obj["username"] = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).username;
		obj["userType"] = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8)).type;
		let url = Globals.urls.excelDownload;

		this.services.exportRecords(url, obj).subscribe(
			(res: any) => {
				if (res.status == 200) {

					this.toastr.info(
						"Please check for " + res.filename + " in downloads tab",
						this.constantKeys.excelNoteMsg
					)
					this.range.startRange = 1;
					this.range.endRange = 1000;
					this.closeSidebar();
					this.gridOptions.api.deselectAll();
					// <--End
				} else {
					this.toastr.warning(this.constantKeys.excelErrorMsg);
					this.range.startRange = 1;
					this.range.endRange = 1000;
					this.gridOptions.api.deselectAll();
				}

			});
		this.closeSidebar();
	}

	showColumnsEmail() {
		this.submitted = true;
		if (this.email.valid) {
			this.selectedFormat = this.constantKeys['email'];
			this.records.reset();
			this.isOpen = true;
			this.ngxSmartModalService.getModal('emailModel').close();
		} else {
			return;
		}
	}
	emailRecords() {
		const selectedColumns = this.records.value.columns
			.map((checked, index) => checked ? this.columns[index].id : null)
			.filter(value => value !== null);

		let attachmentData = {
			mailid: this.globalInfo.email,
			fileType: 1
		}
		let metaDataInfo = ''//communicatorFactories.getObjectForTask();
		let taskName = metaDataInfo['taskName'];
		let projectName = metaDataInfo['Project Name'];
		if (projectName == undefined || projectName == null) {
			projectName = "N/A";
		}
		let metadata = this.getFilterInfo();
		Object.assign(this.email.value, metadata);
		this.email.value["records"] = this.SelectedRecordIds.map(value => value._id);
		this.email.value["metaDataInfo"] = [metadata];
		this.email.value["type"] = "mail";
		let emailIds;
		let url;
		if (this.email.value['sendCC']) emailIds = this.email.value['sendCC'].split(";");
		if (selectedColumns.length > 0) {
			this.email.value["columns"] = selectedColumns;
		} else {
			this.email.value["columns"] = "all";
		}
		this.email.value['sendCC'] = emailIds;
		if (this.email.value['fileType'] == 1) {
			url = Globals.urls.excelDownload;
		}
		else {
			url = Globals.urls.pdfDownload;
		}
		this.services.exportRecords(url, this.email.value).subscribe(
			(res: any) => {
				if (res.status == 200) {
					this.toastr.success(res.message);
					this.closeSidebar();
					this.gridOptions.api.deselectAll();

				} else if (res.status == 204) {
					this.toastr.info(res.data.message);
				}
			});
		this.closeSidebar();
	}
	deletePendingRecords() {
		const selectedRows = this.gridOptions.api.getSelectedRows();
		this.deletedRecords = [];
		if (selectedRows.length) {
			selectedRows.filter(obj => {
				if (obj['_id'] !== undefined) {
					this.deletedRecords.push(obj._id);
				}
			});
			
			this.commonService.delete.next(true);
		} else {
			this.toastr.warning(this.constantKeys.deleteRecordsMsg);
		}
	}
	confirmDelete(action:string) {
		if(action == 'Yes'){
			const url = Globals.urls.addOrDeletePrepopRecords
			const finalObject = {};
			finalObject['formId'] = this.formId;
			finalObject['formName'] = this.formName;
			finalObject['taskId'] = this.taskId;
			finalObject['assignmentName'] = this.assignmentName;
			finalObject['assignmentId'] = this.assignmentId;
			finalObject['deletedRecords'] = this.deletedRecords;
			finalObject['addedRecords'] = [];
			finalObject['editedRecords'] = [];
			this.services.addOrDeletePrepopRecords(url, finalObject).subscribe(
				(res: any) => {
					if (res.status === 200) {
						this.toastr.success(res.message);
						document.getElementById('sidebarAnchorClose').click();
						const resp = this.gridOptions.api.updateRowData({
							remove: this.gridOptions.api.getSelectedRows()
						});
						this.gridOptions.api.deselectAll();
						this.deletedRecords = [];
						this.notifyParentOnUpdate.emit('success');
					} else {
						this.toastr.error(res.message);
						this.notifyParentOnUpdate.emit('Failed');
					}
				}
			)
		}   
	  }
	assignUser() {
		if (this.isAttachPrepop && this.excelRecords) {
			this.toastr.warning(this.constantKeys.submitRecordsUsersMsg);
		} else {
			const selectedData = this.gridOptions.api.getSelectedRows();
			if (selectedData.length > 0) {
				if(!this.prepopDataForm.value.user){
				 	this.toastr.warning(this.constantKeys.selectUserMsg);
				}else{
					selectedData.filter(obj => {
						if (obj['assignedTo'] === undefined) {
							obj['assignedTo'] = this.prepopDataForm.value.user;
							obj['UserId'] = this.prepopDataForm.value.user;
							obj['formId'] = this.formId;
						} else {
							// if (this.dateCheck) {
								obj['assignedTo'] = this.prepopDataForm.value.user;
								obj['UserId'] = this.prepopDataForm.value.user;
								obj['formId'] = this.formId;
							// } else {
							// 	this.toastr.warning(this.constantKeys.cantReassignMsg);
							// }
						}
					});
					this.assignedUsers = true;
					this.toastr.info(this.constantKeys.assignedMsg);
				}
				
			} else {
				this.toastr.info(this.constantKeys.selectRowsMsg);
			}
			this.gridOptions.api.updateRowData({ update: selectedData });
		}

		// showing unassigned records in color
		// this.gridOptions.getRowStyle = function (params) {
		// 	if (params.data.assignedTo === undefined) {
		// 		return { 'background-color': 'lightcoral' }
		// 	}
		// 	return null;
		// }
	//	this.gridOptions.api.deselectAll();
	}
	submitPendingRecords() {
		let data = this.gridOptions.api.getSelectedRows();
		let count = data.length;
		if(count !=0){
		let j = 0;
		for (let i of  data) {
			let rowNode = i; //this.gridOptions.api.getDisplayedRowAtIndex(i);
			if (rowNode['assignedTo'] !== undefined && rowNode['assignedTo']!=null ) {
				j++;
			} else {
				// console.log(rowNode.data);
			}
			if (rowNode['workAssignmentId'] === undefined && rowNode['assignedTo'] !== undefined) {
				let id = this.usersList.filter(obj => obj.username == rowNode['assignedTo']).map(object => object._id);
				rowNode['assignedTo'] = id[0];
				rowNode['UserId'] = id[0];
				this.addedRecords.push(rowNode);
			}else{
				let id = this.usersList.filter(obj => obj.username == rowNode['assignedTo']).map(object => object._id);
				rowNode['assignedTo'] = id[0];
				rowNode['UserId'] = id[0];
				this.editedRecords.push(rowNode);
			}
		}
		if (count === j) {
			const url = Globals.urls.addOrDeletePrepopRecords
			const finalObject = {};
			finalObject['formId'] = this.formId;
			finalObject['formName'] = this.formName;
			finalObject['taskId'] = this.taskId;
			finalObject['assignmentName'] = this.assignmentName;
			finalObject['assignmentId'] = this.assignmentId;
			finalObject['deletedRecords'] = this.deletedRecords;
			finalObject['addedRecords'] = this.addedRecords;
			finalObject['editedRecords'] = this.editedRecords;

			this.services.addOrDeletePrepopRecords(url, finalObject).subscribe(
				(res: any) => {
					if (res.status === 200) {
						this.toastr.success(res.message);
						document.getElementById('sidebarAnchorClose').click();
						this.gridOptions.api.deselectAll();
						this.addedRecords = [];
						this.deletedRecords = [];
						this.editedRecords = [];
						this.assignedUsers = false;
					} else {
						this.toastr.error(res.message);
					}
				}
			)
		} else {
			this.toastr.warning(this.constantKeys.assignUsersMsg);
		}
	}else{
		this.toastr.warning(this.constantKeys.saveMsgRecord);
		return;
	}
	}
	getSelectedRows() {
		this.selectedData = this.gridOptions.api.getSelectedRows();
	}
	attachPrepop() {
		// this.ngxSmartModalService.getModal('attachPrepopPopup').open();
		this.excelRecords = [];
		this.isAttachPrepop = true;
	}

	insertedLocations() {
        this.locationsList = this.gridOptions.api.getSelectedRows();
        if (this.mapType == 'googleMap') {
            this.googleMaps.insertedLocations(this.locationsList);
        } else {
            this.leafletRef.insertedLocations(this.locationsList);
        }
    }
	toggleMap(event) {
        if (this.hide == true) {
            this.showMap();
		}
	}
	 clearMarkers() {
		this.setMapOnAll(null);
	  }
	  setMapOnAll(map: google.maps.Map | null) {
		for (let i = 0; i < this.markers.length; i++) {
		  this.markers[i].setMap(map);
		}
	  }
	viewMore(event){
		let data;
		if(event == null){
			 data = this.gridOptions.api.getSelectedRows().filter(obj => obj['Inserted Place'] == this.infoWindowData);
		}else{
			data = [event];

		}
		
		const url = Globals.urls.getform + "/" + data[0].formId;
			this.services.getMedia(url).subscribe(
				(res: any) => {
					if (res.status == 200) {
						this.commonService.formOpen.next({ recordInfo: data[0], formSkeleton: res.data.formSkeleton, recordEdit: false });
					} else if (res.status == 404) {

					} else if (res.status == 500) {
						//swal(CONSTANTS.serverProblem);
					}
				});
		// this.zone.run(() => {
		// 	console.log('enter',event)
		// });
	}
	onFileChange(event) {
		if (this.requestData.formId) {
			const url = Globals.urls.convertExcel + '/' + this.requestData.formId;
			const inputfileName = event.target.files[0].name;
			const formFileName = this.requestData.formName + '@' + this.requestData.formId;
			const trimmedFileName = inputfileName.replace(/\.[^/.]+$/, '');
			if (formFileName === trimmedFileName) {
				if (event.target.files[0].name.indexOf('xlsx') !== -1) {
					// this.isUploadFile = true;
					const formdata = new FormData();
					formdata.append('file', event.target.files[0]);
					this.services.convertExceltoJSON(url, formdata).subscribe(
						(res: any) => {
							const columnDefs = [];
							if (res.status === 200) {
								this.excelRecords = res.data;
								// this.excelRecords.shift();
								// columnDefs.push({ headerName: 'User', field: 'UserId', minWidth: 90, editable: false});
								columnDefs.push({
									headerName: 'User',
									field: 'UserId',
									editable: true,
									cellEditor: 'agSelectCellEditor',
									cellEditorParams: {
										values: this.userNames
									}
								});

								res.idLabel.forEach((defObject, key) => {
									//if (defObject.isRequired == true && !this.mediaWidgets.includes(defObject.type) && !tableIds.includes(defObject.id)) {
									let columnDefsObj = {};
									columnDefsObj['field'] = defObject.id;
									columnDefsObj['headerName'] = defObject.label;
									columnDefsObj['editable'] = true;
									if (defObject.sketchingNames != undefined) {
										columnDefsObj['sketchingInfo'] = defObject.sketchingNames;
									}
									columnDefs.push(columnDefsObj);
									//}
									// count++;
								});
								columnDefs[0].cellRendererFramework = FullRecordViewComponent;
								columnDefs[0]['width'] = 160;
								columnDefs[0]['suppressSizeToFit'] = true;
								columnDefs[0].pinned = 'left';
								if(this.columnAddingValues && this.columnAddingValues.length){
									let columnsAddingData = Array.from({length: this.columnAddingValues.length}, () => true)
									this.records.get('columnAddingValues').patchValue(columnsAddingData);
								}
								
							} else {
								// swal.fire(res.message);
							}
							//this.gridOptions.columnDefs = columnDefs;
							this.gridOptions.api.setColumnDefs(columnDefs);
							// this.gridOptions.api.setRowData(this.excelRecords);
							// this.gridOptions.api.updateRowData({ add: this.excelRecords });
							// this.total_length = this.gridOptions.api.getDisplayedRowCount();
							// this.total_length = this.total_length+this.excelRecords.length;

						});

				} else {
					this.toastr.warning(this.constantKeys.invalidFileMsg);
				}
			} else {
				this.toastr.warning(this.constantKeys.invalidFileMsg);
			}
		}
	}
	get f() { return this.email.controls; }
	get c() { return this.reassign.controls; }
	ngOnInit() {
		this.mapType = this.configDetails.mapType;
		let formOpen = this.commonService.formOpen.subscribe(
			(data: any) => {
			  this.formrecordData = data.recordInfo;
			 
			});
		if (this.requestData && this.requestData.placeOfRecord == 'Forms') {
			this.noRowsTemplate = this.constantKeys.applyFilterMsg;
		} else {
			this.noRowsTemplate = this.constantKeys.noRowsMsg;
			if (this.requestData && this.requestData.workflowLevel == 1 && this.requestData.status != 0 && this.globalInfo.type == 3) {
				this.showFilterRecords = true;
			}
		}

		this.gridOptionsForPrepop = {} as GridOptions;
		this.gridOptions = {} as GridOptions;
		this.prepopDataForm = this.fb.group({
			user: ['', Validators.required]
		});
		this.reassign = this.fb.group({
			comments: ['', Validators.required],
			assignedTo: ['', Validators.required]
		});
		this.email = this.fb.group({
			sendTo: ['', [Validators.required, Validators.email]],
			sendCC: ['', Validators.email],
			fileType: [{value:1}, Validators.required]
		});
		this.sketchingForm = this.fb.group({
			name: ['', Validators.required],
			type: ['', Validators.required],
			status: ['', Validators.required]
		});
		let formEdit = this.commonService.formEdit.subscribe(
			(res: any) => {
				if (res.isEdit !== undefined && res.isEdit == true) {
					let obj = this.formrecordData;
					let rowNode = this.gridApi.getRowNode(obj._id);
					let data = Object.assign(obj, res)
					rowNode.setData(data);
				} else {
					//this.gridApi.getRowNode(res._id).setData(res);
					let row = this.gridApi.getRowNode(res._id);
					res[this.constantKeys['recordStatus']] = res[this.constantKeys['recordStatus']] + ' ';
					row.setData(res);
					if(this.globalInfo.type == 4 || this.globalInfo.type == 5){
						this.gridOptions.api.updateRowData({ remove: [res] });
					}
				}
			}
		);
		this.subscriptions.push(formEdit);
		this.subscriptions.push(formOpen);

	}
	
	
	attachPrepopFile() {
		this.gridOptions.api.updateRowData({ add: this.excelRecords });
		this.total_length = this.total_length + this.excelRecords.length;
		if (this.isAttachPrepop) {
			this.isAttachPrepop = false;
		} else {
			this.toastr.warning(this.constantKeys.noRecordsAttached);
		}
		this.taskservice.getTaskInfo(this.taskId).subscribe((res: any) => {
			const startDate = new Date(res.data.startDate);
			this.date = new Date();
			if (this.date >= startDate) {
				this.dateCheck = false;
			} else {
				this.dateCheck = true;
			}
		});
	}
	closeAttachPrepop() {
		// this.showGrid = false;
		this.excelRecords = [];
		this.gridOptions.api.updateRowData({ remove: this.excelRecords });
		this.isAttachPrepop = false;
	}
	getUsersList() {
		const url: string = Globals.urls.getUsersList + '/' + this.requestData.taskAccountId;
		this.services.getUsersByDept(url).subscribe(
			(res: any) => {
				if (res.status === 200) {
					this.usersList = res.data;
					this.services.userList = res.data;
					this.userNames = this.usersList.map((user) => {
						return user.username;
					});
				} else if (res.status === 204) { } else {
					this.toastr.error(res.message);
				}
			}
		);
	}
	closeSidebar() {
		this.columnsSelection = false;
		this.isOpen = false;
		document.getElementById('sidebarAnchorClose').click();
	}
	cancelSidebar() {
		document.getElementById('sidebarAnchorClose').click();
	}
	addColumnsToTable() {
		const selectedColumns = this.records.value.columnAddingValues
			.map((checked, index) => checked ? this.columnAddingValues[index] : null)
			.filter(value => value !== null);
		const unselectedColumns = this.records.value.columnAddingValues
			.map((unchecked, index) => unchecked ? null : this.columnAddingValues[index])
			.filter(value => value !== null);
		selectedColumns.forEach((defObject, key) => {
			let columnDefsObj = {};
			columnDefsObj['field'] = defObject.id;
			columnDefsObj['headerName'] = defObject.label;
			if(defObject.type == 'map'){
				columnDefsObj['cellRendererFramework'] = MediaWidgetsComponent;
			}
			else if (defObject.type == 'calendar') {
				columnDefsObj['cellRendererFramework'] = DateWidgetsComponent;
			}
			if (this.columnHeadings.findIndex(obj => obj.field === defObject.id) == -1) {
				this.columnHeadings.push(columnDefsObj);
			}
		});
		unselectedColumns.forEach((defObject, key) => {
			let index = this.columnHeadings.findIndex(obj => obj.field === defObject.id);
			if (index !== -1) {
				this.columnHeadings.splice(index, 1);
			}
		});
		this.gridOptions.api.setColumnDefs(this.columnHeadings);
		this.closeSidebar();

	}

	showTable(pType: any) {
		switch (pType) {
			case 'img':
				if (this.columnHeadings.length > 0) {
					return true;
				} else {
					return false;
				}

			case 'table':
				if (this.columnHeadings.length > 0) {
					return false;
				} else {
					return true;
				}
		}
	}
	WFfilter() {
		// this.requestData = {};
		this.filterFlag = !this.filterFlag;
		if (this.requestData) {
			this.requestData.skipCount = 0;
			if (this.filterFlag) {

				this.requestData['loginId'] = this.loginDetails._id;

			} else {
				this.requestData['loginId'] = null;

			}
			this.onGrid().subscribe((gridList: number) => {
				const formControls = this.columns.map(control => new FormControl(false));
				const formControlsAdding = this.columnAddingValues.map(control => new FormControl(false));
				//this.total_length = gridList;
				if (this.requestData.placeOfRecord == 'Forms' ) {
					this.total_length = gridList;
				}
				this.records = this.fb.group({
					columnAddingValues: new FormArray(formControlsAdding),
					columns: new FormArray(formControls)

				});
			})
		} else {
			this.toastr.warning(this.constantKeys.filterMsgRecord);
		}

	}

	ngOnChanges() {
		if (this.requestData && this.requestData.placeOfRecord !== 'Forms') {
			this.total_length = this.requestData.total_count;
		}
		if (this.requestData && this.requestData.workflowLevel == 1 && this.requestData.status != 0 && this.globalInfo.type == 3) {
			this.showFilterRecords = true;
		}
		this.noRowsTemplate = this.constantKeys.noRowsMsg;
		this.onGrid().subscribe((gridList: number) => {
			const formControls = this.columns.map(control => new FormControl(false));
			const formControlsAdding = this.columnAddingValues.map(control => new FormControl(false));
			//this.total_length = gridList;
			if (this.requestData.placeOfRecord == 'Forms' ) {
				this.total_length = gridList;
			}
			this.records = this.fb.group({
				columnAddingValues: new FormArray(formControlsAdding),
				columns: new FormArray(formControls)
			});
		})


		//this.onGrid(); // Now has value;
		// this.taskId = this.taskInfo.data.taskId;
		// this.formId = this.taskInfo.data.formId;
		// this.formName = this.taskInfo.data.formName;
		// this.assignmentName = this.taskInfo.data.name;
		// this.assignmentId = this.taskInfo.data._id;
	}
	ngOnDestroy() {
		this.subscriptions.forEach((subscription) => subscription.unsubscribe())  
	
	}

}

