import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadService } from '../upload.service';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Inject } from '@angular/core';
import { MapComponent } from '../../../dataloader/map/map.component';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  template:'<map></map>',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @ViewChild('file', { static: false }) file;
  path:String;
  public files: Set<File> = new Set();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<DialogComponent>, 
  public uploadService: UploadService,private router: Router,public mapComponent : MapComponent) { }

  ngOnInit() { }

  progress;
  canBeClosed = false;
  primaryButtonText = 'Upload';
  showCancelButton = true;
  uploading = false;
  uploadSuccessful = false;
  allowedExtensionsForShp =  ['shp','dbf','shx','prj'];
  newdir= '';
  filesInfo = [];
  
  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        //console.log(this.data.format+'----'+files[key].name.split('.').pop());
        if(this.data.format=='kml'){
          if(files[key].name.split('.').pop()=='kml'){
            this.files.add(files[key]);
            this.filesInfo.push(files[key].name);
          }else{
            alert('Please choose valid file types');
          }
        }
        else if(this.data.format=='shape'){
          if(this.allowedExtensionsForShp.includes(files[key].name.split('.').pop())){
          this.files.add(files[key]);
          this.filesInfo.push(files[key].name);
        }else{
          alert('Please choose valid file types');
        }
      }
        
      }
    }

    if(this.files.size==0){
      this.canBeClosed = false;
    }else{
      if(this.data.format=='shape'&&this.files.size<3){
       // alert('Please upload all required files for shape format');
        this.canBeClosed = false;
      }else{
      this.canBeClosed = true;
      }
    }

  }

  addFiles() {
    this.file.nativeElement.click();
  }

  srcdata ={};
  timestamp;

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      //this.router.navigateByUrl('/mapping?path='+this.newdir);
      
      this.router.navigate(['mapping'], {
        queryParams: {
          key: this.newdir, //pass whatever here
          files: this.filesInfo,
          domain: this.data.domain
        }
      });
      return this.dialogRef.close();
    }

    // set the component state to "uploading"
    this.uploading = true;
    this.timestamp = new Date().getTime()+"";
    // start the upload and save the progress map
    this.progress = this.uploadService.upload(this.files,this.timestamp);
    this.newdir= this.newdir+this.timestamp;
    //console.log(this.progress);
    for (const key in this.progress) {
      this.progress[key].progress.subscribe(val => console.log(val)
      );
    }

    // convert the progress map into an array
    let allProgressObservables = [];
    for (let key in this.progress) {
      allProgressObservables.push(this.progress[key].progress);
    }

    // Adjust the state variables

    // The OK-button should have the text "Finish" now
    this.primaryButtonText = 'Finish';

    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;

    // Hide the cancel-button
    this.showCancelButton = false;

    // When all progress-observables are completed...
    forkJoin(allProgressObservables).subscribe(end => {
      // ... the dialog can be closed again...
      this.canBeClosed = true;
      this.dialogRef.disableClose = false;

      // ... the upload was successful...
      this.uploadSuccessful = true;

      // ... and the component is no longer uploading
      this.uploading = false;
    });
  }
}
