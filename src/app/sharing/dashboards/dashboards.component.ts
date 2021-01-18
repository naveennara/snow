import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output,Input } from '@angular/core';
import { CommonService } from '../sharing-module/common.service';
import { DashboardsService } from './dashboards.service';
import * as Globals from '../../globals';
import * as CryptoJS from 'crypto-js';
// import { SessionPrefsService } from "./session-prefs.service";
import * as $ from 'jquery';
declare var IS_VIEWER: boolean;

@Component({
	selector: 'app-dashboards',
	templateUrl: './dashboards.component.html',
	styleUrls: ['./dashboards.component.css']
})

export class DashboardsComponent implements OnInit {
	@Input() dashboardData;
	@Output() setMaxwidth: EventEmitter<any> = new EventEmitter<any>();
	@Output() closeSidebar: EventEmitter<any> = new EventEmitter<any>();
  constants = Globals.dashboardConstansts.dashboardkeys;
  selectionButtons;
  dropdown;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  status:boolean = false;
  tables = [];
  data:any[];
  mainKeys = [];
  pieChartData = [];
  showFeedData = [];
  pieCharts = ['deviceCount','statusOfTask'];
  showFeed = ['recordsFeed'];
  departmentList = [];
  selectedValue;
  selectedEntity;
  isTrue = false;
  deptName;

	// dashboard linq
	public isOpen: boolean = false;
	public isAnimatingWidth: boolean = false;
	public isAnimatingFade: boolean = true;
	public isFullScreen: boolean = false;
	public isClosing: boolean = false;
	public isTopicControlOpen: boolean = false;
	public isTopicControlAnimating: boolean = false;
	private isFullScreening: boolean = false;
	private prevContentWidth: number;
	private widthBeforeFullscreen: number;
	private widthBeforeClose: string;
	private widthBeforeResize: number;

	// @PK
	public setwidth: number = 60;
	public setInnerwidth: number = 90;
	searchDept;
	flag;
	constructor(private commonService: CommonService,private service:DashboardsService) { }
	onKey(event) {
		this.searchDept = event.target.value;
	  }
	ngOnInit() {
		this.commonService.dashboard.subscribe(
			(data: any) => {
				if (data == 1) {
					this.clickEvent();
					if(this.loginDetails.type != 1){
						this.getALLDepartments();
					}
				} else {
					this.close();
				}
			});
			// if (this.dashboardData == 1) {
			// 	this.clickEvent();
			// 	if(this.loginDetails.type != 1){
			// 		this.getALLDepartments();
			// 	}
			// } else {
			// 	this.close();
			// }
		
	}
	ngOnChanges(){
		if (this.dashboardData == 1) {
			this.clickEvent();
			if(this.loginDetails.type != 1){
				this.getALLDepartments();
			}
		} else {
			this.close();
		}
		
	}
	chunkArray(myArray, chunk_size) {
		var results = [];

		while (myArray.length) {
			results.push(myArray.splice(0, chunk_size));
		}

		return results;
	}
	getData(selected) {
		this.tables = [];
		this.pieChartData = [];
		this.showFeedData = [];
		this.deptName = '';
		let url;
		this.selectedEntity = selected;
		this.selectedValue =  selected.toLowerCase().replace(/\s/g, '');
		if(this.loginDetails.type == 1){
			 url = Globals.urls.getDashboardData + '/' +  this.loginDetails.accounts[0]._id + '/' + this.selectedValue + '/' + this.loginDetails._id + '/' + this.loginDetails.type;

		}else{
			if(this.selectedValue == 'accountspecific'){
				this.deptName = this.departmentList[0].name;
				url = Globals.urls.getDashboardData + '/' +  this.departmentList[0]._id + '/' + this.selectedValue + '/' + this.loginDetails._id + '/' + this.loginDetails.type;
			}else{
				url = Globals.urls.getDashboardData + '/' +  null + '/' + this.selectedValue + '/' + this.loginDetails._id + '/' + this.loginDetails.type;
			}
		}
		this.service.getDashboard(url).subscribe((dataList: any[]) => {
			this.data = dataList;
			this.mainKeys = Object.keys(this.data['main']);
			if(this.data['other']){
				let keys = Object.keys(this.data['other']);
				this.selectionButtons = this.chunkArray(keys, 6);
			}else{
				this.selectionButtons = [];
			}
		  });
	  }
	
		

	clickEvent() {
		this.status = !this.status;
		this.isTrue = true;
		if(this.loginDetails.type != 0 && this.loginDetails.type != 6){
			let list = this.constants.selectionButtons[this.loginDetails.type];
			this.dropdown =  list.filter(data => {return this.loginDetails.privilege.privilegeList.includes(this.constants[data.toLowerCase().replace(/\s/g, '')])});			
		}else{
			this.dropdown = this.constants.selectionButtons[this.loginDetails.type];
		}
		this.getData(this.dropdown[0]);
		
	}

	close() {
		this.status = !this.status;
		this.isTrue = false;
		this.closeSidebar.emit();
	}

	// Maximize you window
	// AUTHOR : PK
	maximizeWindow(flag) {
		this.setMaxwidth.emit();
		this.flag = !this.flag;
		if (this.flag === false) {
			this.setwidth = 60;
			this.setInnerwidth = 90;
		}
		else {
			this.setwidth = 100;
			this.setInnerwidth = 90;
		}
	}


	setbackgroundColor(index: any) {
		switch (index) {
			case 0 :
				return '#9AAD77';
			case 1 :
				return '#577A98';
			case 2 :
				return '#FAA74A';
			case 3 :
				return '#A36FA7';
			case 'default':
				return '#eeeee';
		}
	}

	isTable(key) {
		if(this.data['other']){
			if(typeof(this.data['other'][key]) == 'object'){
				return true;
			} else {
				return false;
			}
		}else{
			return false;
		}
		
	}
	getTable(key){
		if(this.tables.indexOf(key)==-1 && !this.pieCharts.includes(key) && !this.showFeed.includes(key)){
			this.tables.unshift(key);
		}else if(this.pieChartData.indexOf(key)==-1 && this.pieCharts.includes(key)){
			this.pieChartData.unshift(key);
		}else if( this.showFeedData.indexOf(key)==-1 && this.showFeed.includes(key)){
			this.showFeedData.unshift(key);
		}
	}
	closeTable(selectedTable){
		let index = this.tables.indexOf(selectedTable);
		this.tables.splice(index,1);
	}
	closePieChart(selected){
		let index = this.pieChartData.indexOf(selected);
		this.pieChartData.splice(index,1);
	}
	closeShowFeed(selected){
		let index = this.showFeedData.indexOf(selected);
		this.showFeedData.splice(index,1);
	}
	getALLDepartments() {
		let url: string;
		url = Globals.urls.getAllListOfDepartments + '/'+null;
		this.service.getDepartments(url).subscribe((deptList: any[]) => {
		  this.departmentList = deptList;
		});
	  }
	  deptChange(value){
		this.deptName = value.name;
		this.tables = [];
		this.pieChartData = [];
		this.showFeedData = [];
		let url = Globals.urls.getDashboardData + '/' +  value._id + '/' + this.selectedValue + '/' + this.loginDetails._id + '/' + this.loginDetails.type;
		this.service.getDashboard(url).subscribe((dataList: any[]) => {
			this.data = dataList;
			this.mainKeys = Object.keys(this.data['main']);
			if(this.data['other']){
				let keys = Object.keys(this.data['other']);
				this.selectionButtons = this.chunkArray(keys, 6);
			}else{
				this.selectionButtons = [];
			}
			
		  });
	  }
}
