import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



const URL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.css']
})

export class UploaderComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({
    url: URL,
    allowedMimeType: ['image/jpeg']

  });

  constructor(private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      //console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
      this.router.navigateByUrl('/mapping');
    };
  }

}