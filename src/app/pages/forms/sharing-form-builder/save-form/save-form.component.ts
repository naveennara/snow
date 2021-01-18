import { Component, OnInit, Input } from '@angular/core';
import { FormsServicesService } from '../../forms-services.service';
import { FormBuilder, FormArray,FormGroup, Validators, FormControl,  } from '@angular/forms';
import * as Globals  from  '../../../../globals';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-save-form',
  templateUrl: './save-form.component.html',
  styleUrls: ['./save-form.component.css']
})
export class SaveFormComponent implements OnInit {
  @Input()
  formData = [];
  @Input ()
  requiredFields = [];
  @Input ()
  updateType = '';
  @Input ()
  dependentFields = [];
  @Input ()
  isDerivedFieldPresent;

  formBasicData;
  dropdownSettings;
  saveForm: FormGroup;
  loginDetails = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
  basicLevelChanges: any;
  showCopyName = false;
  isFromExist = false;
  submitted = false;
  updatedProperties: any;
  updatedProperty: any;
  updatedWidget = [];
  isTemplate;
  showTitle;
  constants;
  autoCompleteField = Globals.autoCompleteField;
  autoCompleteForm = Globals.autoCompleteForm;
  mediaWidgets = ['camera', 'video', 'rating', 'heading', 'break', 'barcode', 'map', 'signature'];
  constructor(private services:FormsServicesService,private formBuilder: FormBuilder,
    private toastr: ToastrService,
     private router: Router) { this.constants = Globals.allConstants.constantKeys; }
  get f() {
    return this.saveForm.controls;
   }
  ngOnChanges() {
    
    this.isTemplate = this.services.formData.formType;
    this.submitted = false;
    this.showCopyName = false;
    this.requiredFields = this.requiredFields.filter(column => !this.mediaWidgets.includes(column.type) && column.isTable != true);
    let displayFields = [];
    if (this.services.formTemplate === 'edit' && this.saveForm) {
      this.services.formDataBeforeUpdate.displayField.filter(obj => {
        const check = this.requiredFields.findIndex(obj2 => obj2.id === obj.id);
        if (check !== -1) {
          displayFields.push(obj);
        } 
      });
        this.saveForm.patchValue({
          displayField: displayFields
        });
      }
    

  }
  getText(){
    if(this.showActions() && this.isTemplate=='form'){
      this.showTitle  = "Save form"; 
    }else if(this.showActions() && this.isTemplate=='template'){
      this.showTitle  = "Save template";
    }else if(!this.showActions() && !this.showCopyName && this.updateType != 'hard' && this.isTemplate=='form'){
      this.showTitle  = "Update form";
    }else if(!this.showActions() && !this.showCopyName && this.updateType != 'hard' && this.isTemplate=='template'){
      this.showTitle  = "Update template";
    }else if((this.showCopyName || this.updateType == 'hard') && this.isTemplate=='form'){
      this.showTitle  = "Copy Form";
    }else if((this.showCopyName || this.updateType == 'hard') && this.isTemplate=='template'){
      this.showTitle  = "Copy Template";
    }
    return true;
  }
  formSubmitionPopup() {
    this.submitted = true;
    if (this.services.formTemplate === 'edit') {
      if (this.saveForm.invalid) {
        return;
      } else {
        if (this.showCopyName) {
          if (this.saveForm.value.formname.length > 0) {
            this.updateService('update');
          } else {}
        } else {
          this.updateService('update');

        }
      }
    } else {
      if(this.saveForm.invalid){
        return;
      } else {
        const FinalObject = this.services.formData;
       // FinalObject['formType'] = "form";
        // FinalObject['accountId'] = this.loginDetails.accounts[0]._id;
        FinalObject['formSkeleton'] = this.formData;
        FinalObject['displayField'] = this.saveForm.value.displayField;
        FinalObject['isCreateNewForm'] = false;
        FinalObject['dependentFields'] = this.dependentFields;
        let mapObject = this.formData.filter(widget => widget.type === Globals.widgetTypes.widgets['map'])
        if (mapObject.length >0) {
          FinalObject['locationField'] = [{id: mapObject[0].id, label: mapObject[0].label}];

        } else{
          FinalObject['locationField'] = []
        }
        const url = Globals.urls.createForm;
        this.services.createFrom(url, FinalObject).subscribe(
          (res: any) => {
              if (res.status === 200) {
               this.services.formSubmitted = true;
                this.toastr.success(res.message);
                if (FinalObject.formType === 'form') {
                  this.router.navigate(['mainLayout/forms']);
                } else {
                  this.router.navigate(['mainLayout/templates']);
                }
                
              } else {
                this.toastr.info(res.message);
              }
          });
      }
    }
  }
  copyForm() {
    this.submitted = false;
    this.showCopyName = true;
  }
  Back() {
    this.submitted = false;
    this.showCopyName = false;
  }
  copyFormProcess() {
    this.submitted = true;
    if (this.saveForm.valid) {
          if (this.saveForm.value.formname.length > 0) {
            this.updateService('copy');
          } else {
          }
    } else {
    }
  }
 
  updateService(copyOrUpdate) {
    const editurl = Globals.urls.getform + '/' + this.services.formId;
    let versionManagementData = {};
    let updateArray = [];
    let deletedArray = [];
    this.services.editForm(editurl).subscribe(
      (res: any) => {
        const addedWidgets = [];
        this.formData.filter(obj => {
          const index = res.data.formSkeleton.findIndex(obj1 => obj1._id === obj._id);
          if (index === -1) {
            addedWidgets.push(obj);
          }
        })
        this.services.skeletonchanges['added'] = addedWidgets;
        deletedArray = this.services.skeletonchanges['deleted'];
        if (this.services.skeletonchanges['update'].length) {
          this.services.skeletonchanges['update'].filter(obj => {
            const index = res.data.formSkeleton.findIndex(obj1 => (obj1._id === obj._id));
            if (index !== -1) {
              this.updatedProperties = {};
              this.updatedProperty = {};
              Object.keys(res.data.formSkeleton[index]).forEach(key => {
                if (obj[key] === res.data.formSkeleton[index][key]) {
                } else {
                  if (key === 'options') {
                    if (res.data.formSkeleton[index][key].length !== obj[key].length) {
                      this.updatedProperty[key] = 'changed';
                    }
                  } else {
                    this.updatedProperty[key] = 'Changed from ' + res.data.formSkeleton[index][key] + ' to ' + obj[key];
                  }
                  if (res.data.formSkeleton[index].type === 'calculation') {
                    if (key === 'formula') {
                      this.updatedProperty[key] = 'changed';
                    } else {
                      this.updatedProperty[key] = 'Changed from ' + res.data.formSkeleton[index][key] + ' to ' + obj[key];
                    }
                  }
                  // if (res.data.formSkeleton[index].type === 'checkBox' ||
                  // res.data.formSkeleton[index].type === 'radio' ||
                  // res.data.formSkeleton[index].type === 'select') {
                  //   this.updatedProperty[key] = 'changed';
                  // } else {
                  //   this.updatedProperty[key] = 'Changed from ' + res.data.formSkeleton[index][key] + ' to ' + obj[key];
                  //   }
                }
              });
              this.updatedProperties[obj.label] = this.updatedProperty;
            }
            updateArray.push(this.updatedProperties);
          });
        }
        // versionManagementData['added'] = addedWidgets;
        versionManagementData = updateArray;
        // versionManagementData['deleted'] = deletedArray;
        // form update
        const FinalObject = this.services.formData;
        if (copyOrUpdate === 'copy') {
          FinalObject['isCreateNewForm'] = true;
          FinalObject['displayField'] = this.saveForm.value.displayField;
          FinalObject['newFormName'] = this.saveForm.value.formname;
    
        } else {
          FinalObject['isCreateNewForm'] = false;
          FinalObject['isWholeSkeleton'] = false;
          // FinalObject['name'] = this.formName;
          FinalObject['displayField'] = this.saveForm.value.displayField;
        }
        const basicChanges = {};
        this.basicLevelChanges = [];
        if (this.services.formData.workInstruction !== this.services.formDataBeforeUpdate.workInstruction) {
          basicChanges['Work Instruction'] = this.services.formData.workInstruction;
        }
        if (this.services.formData.description !== this.services.formDataBeforeUpdate.description) {
          basicChanges['Description'] = this.services.formData.description;
        }
        if (this.services.formData.category !== this.services.formDataBeforeUpdate.category) {
          basicChanges['Category'] = this.services.formData.category;
          if (basicChanges['Category'] === 'Public') {
            this.services.formData.allocatedUsers = [];
          }
        }
        this.basicLevelChanges.push(basicChanges);
        // FinalObject['formType'] = 'form';
        // FinalObject['accountId'] = this.loginDetails.accounts[0]._id;
        // To check drag and drop operation is performed or not
        FinalObject['updatedData'] = versionManagementData;
        FinalObject['formSkeleton'] = this.formData;
        FinalObject['basicLevelChanges'] = this.basicLevelChanges;
        FinalObject['formSkeletonLevelChanges'] = this.services.skeletonchanges;
        FinalObject['isDerivedFieldPresent'] = this.isDerivedFieldPresent;
        FinalObject['dependentFields'] = this.dependentFields;
        let mapObject = this.formData.filter(widget => widget.type === Globals.widgetTypes.widgets['map']);
        if (mapObject.length > 0) {
          FinalObject['locationField'] = [{id: mapObject[0].id, label: mapObject[0].label}];
    
        } else {
          FinalObject['locationField'] = [];
        }
        // FinalObject['name'] = this.formName;
        if (this.services.dragAndDrop !== undefined) {
          FinalObject['isWholeSkeleton'] = this.services.dragAndDrop;
        }
        if (this.updateType === 'hard') {
          FinalObject['isWholeSkeleton'] = false;
        }
        FinalObject['lastModifiedDate'] =  new Date();
        const url = Globals.urls.updateForm + '/' + this.services.formId;
        this.services.updateFrom(url, FinalObject).subscribe(
          (response: any) => {
              if (response.status === 200) {
                this.services.Modifiedwidgets = [];
                this.services.skeletonchanges['update'] = [];
                this.services.skeletonchanges['delete'] = [];
                this.toastr.success(response.message);
                this.services.formSubmitted = true;
                if (FinalObject.formType === 'form') {
                  this.router.navigate(['mainLayout/forms']);
                } else {
                  this.router.navigate(['mainLayout/templates']);
                }
                
                // this.router.navigate(['mainLayout/forms']);
              } else {
                this.toastr.info(response.message);
              }
          });

    })
   
  }
  ngOnInit() {
    this.dropdownSettings = this.services.dropdownSettings1;
    this.saveForm = this.formBuilder.group({
      formname: [''],
      displayField: ['', Validators.required]
    });
    if (this.services.formTemplate === 'edit') {
     
      this.saveForm.patchValue({
        displayField: this.services.formDataBeforeUpdate.displayField
      });
    }
    this.requiredFields = this.requiredFields.filter(column => !this.mediaWidgets.includes(column.type) && column.isTable != true);

  }
  showActions() {
    if (this.services.formTemplate === 'create') {
      return true;
    } else {
      return false;
    }
  }
  showFields(message) {
    if (message === 'formname') {
      if (this.services.formTemplate === 'create') {
        return false;
      } else {
        if (this.updateType === 'hard') {
          return true;
        } else {
          if (this.showCopyName) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
    if (message === 'displayField') {
      return true;
    }
  }
 
  
}
