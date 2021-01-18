import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import * as Globals from '../../../globals';


@Injectable()
export class MigrateService {

  constructor(private http: HttpClient) { }

  //private static MAPPED_URL = '/api/migrate';
  private static MAPPED_URL = Globals.snowURL+'/dataloader/migrate';
  
  mappedData:any;
  
  uploadMappedData(key,files,mappedInfo,percentage,additionalFields,userData,targetCollList,sourceCollList,duplicateLayers){

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                                      'Access-Control-Allow-Origin':'*'
                                    }); 

    //request to send mapped data to postgresql
    return this.http.post(MigrateService.MAPPED_URL ,{"key":key,"files":files,"indexes":JSON.stringify(mappedInfo),"additionalFields" : JSON.stringify(additionalFields),"percentage":percentage,"userData":userData,"targetCollList":targetCollList,"sourceCollList":sourceCollList,"duplicateLayers":duplicateLayers});
    
  }

}
