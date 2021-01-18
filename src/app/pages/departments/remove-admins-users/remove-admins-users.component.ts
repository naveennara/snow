import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentsService } from '../departments.service';
import * as Globals from '../../../globals';
import { Location } from '@angular/common';

@Component({
  selector: 'app-remove-admins-users',
  templateUrl: './remove-admins-users.component.html',
  styleUrls: ['./remove-admins-users.component.css']
})
export class RemoveAdminsUsersComponent implements OnInit {
  accountId:string;
  remove: FormGroup;
  adminsList: any[];
  availableList:any[] = [];
  GAList: any[];
  usersList: any[];
  moderatorsList:any[];
  deptKeys:any;
  dropdownSettings: object;
  pageNumber = 1;
  limit = 10;
  total_count: number;
  typeSelected:number;
  adminsRemove:any[] = [];
  moderatorRemove:any[] = [];
  usersRemove:any[] = [];
  groupAdminsRemove:any[] = [];
  imageSrc = Globals.noDataFound;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private location: Location, 
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private services: DepartmentsService) { 
      this.deptKeys = Globals.allConstants.constantKeys;
    }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['accountId'];

    });
   this.getAdminsUsers();
    this.dropdownSettings = this.services.dropdownSettings;
    this.remove = this.formBuilder.group({
      admins: [[]],
      moderator:[[]]
    });
  }
  back() {
    this.location.back();
  }
  
  removeAssociation(){
    const url = Globals.urls.removeAdmins + "/" + this.accountId;
    let obj = {};
    obj['GARemove'] = this.groupAdminsRemove;
    obj['usersRemove'] = this.usersRemove;
    obj['adminsRemove'] = this.adminsRemove;
    obj['moderatorRemove'] = this.moderatorRemove;
    this.services.removeAdmins(url,obj).subscribe(
      (res: any) => {
        if (res.status === 200) {
          this.router.navigate(['mainLayout/accounts'])
          this.toastr.success(res.message);
        }
        else {
          this.toastr.info(res.message);
        }
      }
    );
  }
  
  dropdownChange(type){
    this.pageNumber = 1;
    if(type== this.deptKeys["label_Admins"]) {
      this.typeSelected = 1;
      this.availableList = this.adminsList
      this.total_count = this.availableList.length;
    } else if(type == this.deptKeys["label_Users"]){
      this.typeSelected = 2;
      this.availableList = this.usersList;
      this.total_count = this.availableList.length;
    }else if(type == this.deptKeys["label_Moderator"]){
      this.typeSelected = 4;
      this.availableList = this.moderatorsList;
      this.total_count = this.availableList.length;
    } else {
      this.typeSelected = 3;
      this.availableList = this.GAList;
      this.total_count = this.availableList.length;
    }
  }

  RowSelected(selectedRow){
    if(this.typeSelected == 1){
      this.departmentAdminsSelected(selectedRow);
    } else if(this.typeSelected == 2){
      this.usersSelected(selectedRow);
    }else if(this.typeSelected == 3){
      this.groupAdminsSelected(selectedRow);
    } else {
      this.ModeratorsSelected(selectedRow);
    }
  }

  departmentAdminsSelected(selectedDA) {
    const index = this.adminsRemove.findIndex((user)=>user._id == selectedDA._id);
    if(index == -1) {
      this.adminsRemove.push(selectedDA);
    } else {
      this.adminsRemove.splice(index,1);
    }
  }

  ModeratorsSelected(selectedModerator) {
    const index = this.moderatorRemove.findIndex((user)=>user._id == selectedModerator._id);
    if(index == -1) {
      this.moderatorRemove.push(selectedModerator);
    } else {
      this.moderatorRemove.splice(index,1);
    }
  }

  usersSelected(selectedUser){
    const index = this.usersRemove.findIndex((user)=>user._id == selectedUser._id);
    if(index == -1){
      this.usersRemove.push(selectedUser);
    }else{
      this.usersRemove.splice(index,1);
    }
  }

  groupAdminsSelected(selectedGA){
    const index = this.groupAdminsRemove.findIndex((user)=>user._id == selectedGA._id);
    if(index == -1){
      this.groupAdminsRemove.push(selectedGA);
    }else{
      this.groupAdminsRemove.splice(index,1);
    }
  }

  getSelectedRows(userObject){
    if(this.typeSelected == 1){
      const index = this.adminsRemove.findIndex((DA)=>DA._id == userObject._id);
      if(index == -1){
        return false;
      }else{
        return true;
      }
    } else if(this.typeSelected == 2){
      const index = this.usersRemove.findIndex((user)=>user._id == userObject._id);
      if(index == -1){
        return false;
      }else{
        return true;
      }
    }else if(this.typeSelected == 3){
      const index = this.groupAdminsRemove.findIndex((GA)=>GA._id == userObject._id);
      if(index == -1){
        return false;
      }else{
        return true;
      }
    } else {
      const index = this.moderatorRemove.findIndex((Mod)=>Mod._id == userObject._id);
      if(index == -1){
        return false;
      }else{
        return true;
      }
    }
  }

  getAdminsUsers(){
    const url = Globals.urls.deptAdminsList + '/' + this.accountId ;
   this.services.getDepartments(url).subscribe(
    (res: any) => {
        if (res) {
          switch (res.status) {
            case 200:
            this.adminsList = res.data.adminList;
            this.GAList = res.data.groupadminList;
            this.usersList = res.data.userList;
            this.moderatorsList  = res.data.moderatorsList;
            this.remove.patchValue({admins:this.adminsList});
            this.remove.patchValue({moderator:this.moderatorsList});
            this.dropdownChange(this.deptKeys["label_Admins"]);
            break;
            case 204:
            this.adminsList =[];
            this.GAList = [];
            this.usersList = [];
            this.remove.patchValue({admins:this.adminsList});
            this.remove.patchValue({moderator:this.moderatorsList});
          }
        } else {
          this.toastr.info(res.data.message);
        }
    }
    );
  }

}
