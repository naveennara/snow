import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Subject, Observable,forkJoin } from 'rxjs';
import * as Globals from '../../../globals';

//const url = 'api/upload';

const url = Globals.snowURL+'/dataloader/upload';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) { }
  filepath:String;

  public upload(
    files,timestamp
  ) {
    // this will be the our resulting map
   
    var results = [];
    var timestampname = timestamp;
    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append(timestampname, file, file.name);

      const res = this.http.post(url, formData,{
                                      reportProgress: true,
                                      responseType:"json"
                                    }
                              ).toPromise();
      results.push(res);
      
    });

    const tt = forkJoin(results);
    return tt;
    }

}
