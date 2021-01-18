import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { UploadService } from './upload.service';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent {

  
  formats: any[] = [
    { name: 'kml' },
    { name: 'shape' }
    
];

domains: any[] = [
  { name: 'Gas' },
  { name: 'Land' },
  { name: 'Water' }
  
];

  constructor(public dialog: MatDialog, public uploadService: UploadService) { }

  selectedItem:string;
  selectedDomain:string;

  public openUploadDialog() {
    //console.log(this.selectedItem)
    let dialogRef = this.dialog.open(DialogComponent, { width: '50%', height: '50%' , data:{format:this.selectedItem,domain:this.selectedDomain}});
  }
}
