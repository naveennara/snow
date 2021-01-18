import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { settingsConstansts } from '../../settings-constants';
import * as Globals from '../../../../globals';
import { SettingsService } from '../../settings.service';
import { CommonService } from '../../../../sharing/sharing-module/common.service';
@Component({
  selector: 'app-dropdown-table',
  templateUrl: './dropdown-table.component.html',
  styleUrls: ['./dropdown-table.component.css']
})
export class DropdownTableComponent implements OnInit {
  @Input() data;
  @Input() action;
  @Input() collectionName;
  @Output() updatedData = new EventEmitter<any>();
  options: FormArray;
  tableForm:FormGroup;
  keys: string[];
  obj: {};
  constants = Globals.allConstants.constantKeys;
  updated: any[] = [];
  edit:boolean = false;
  limit = 10;
  pageNumber = 1;
  deleteIndex: any;
  noDataImg = Globals.noDataFound;
  showSubmit:boolean;
  constructor(private fb: FormBuilder,
    public toastr: ToastrService,
    public commonservice: CommonService,
    public services: SettingsService) { }
  
  ngOnInit() {
    // this.tableForm = this.fb.group({
    //   options: this.fb.array([])
    // });
    // if(this.action == this.constants.edit){
    //   this.showSubmit = false;
    // }
    // else{
    //   this.showSubmit = true;

    // }
    // this.keys = Object.keys(this.data[0]);
    // this.obj= {};
    // for(const key of this.keys){
    //     this.obj[key] = ''
    // }
    // this.keys = this.keys.filter(key => key != '_id' && key != '__v' );
    // this.tableForm.controls.options = this.fb.array([]);
    // this.assignData();
   
  }
  ngOnChanges(){
    this.tableForm = this.fb.group({
      options: this.fb.array([])
    });
    if(this.action == this.constants.edit){
      this.showSubmit = false;
    }
    else{
      this.showSubmit = true;

    }
    this.keys = Object.keys(this.data[0]);
    this.obj= {};
    for(const key of this.keys){
        this.obj[key] = ''
    }
    this.keys = this.keys.filter(key => key != '_id' && key != '__v' ); 
    this.tableForm.controls.options = this.fb.array([this.createItem()]);
    this.assignData();
    
  }
  add() {
    this.options = this.tableForm.get('options') as FormArray;
    this.options.push(this.createItem());
  }
  editTable(){
    this.edit = !this.edit;
  }
  createItem(): FormGroup {
    return this.fb.group(this.obj);
  }
  assignData(){
    if (this.data.length > 1) {
      for(let i=0;i<this.data.length - 1;i++){
        this.add();
      }
    }
    this.tableForm.get('options').patchValue(this.data);
  }
  removeIndex(index) {
    //if(this.action == this.constants.edit){
      this.deleteIndex = index;
      this.commonservice.delete.next(true);
    //} 
  }
  submit(){
    if(this.action == this.constants.edit){
      let addedRows = this.tableForm.controls.options.value.filter(obj => obj._id == '');
      let finalData = this.updated.concat(addedRows);
      this.updatedData.emit(finalData);
      this.edit = false;
      this.updated = [];
    }else{
      if(this.tableForm.controls.options.value.length == 0){
        this.toastr.error(this.constants.emptyDataMsg);
      }else{
        this.edit = false;
        this.updatedData.emit(this.tableForm.controls.options.value);
      }
    }
  }
  onchange(tindex){
    let row = this.tableForm.controls.options.value[tindex];
    this.services.editedTable = true;
    this.showSubmit = true;
    if(this.action == this.constants.edit){
      let index = this.updated.findIndex((object)=>object._id == row._id);
      if(index >-1){
        this.updated.splice(index,0,row);
      }else if(row._id!= ''){
        this.updated.push(row);
      }
    }
  }
  confirmDelete(action: string) {
    if (action === 'Yes') {
      let data = {};
      data['recordId']  = this.tableForm.controls.options.value[this.deleteIndex]._id;
      data['collectionName'] = this.collectionName;
      if(data['recordId'] == '' ||data['recordId'] == undefined ){
        this.options.controls.splice(this.deleteIndex, 1);
        this.tableForm.controls.options.value.splice(this.deleteIndex,1);
      }else{
        const url: string = Globals.urls.deleteDropdownCollectionRecord;
        this.services.deleteRecords(url,data).subscribe(
          (res: any) => {
            if ( res.status === 200) {
              this.options.controls.splice(this.deleteIndex, 1);
              this.options.value.splice(this.deleteIndex,1);
              this.toastr.success(res.message);
            } else {
              this.toastr.error(res.message);
            }
          });
      }
    }
  }
 
}
