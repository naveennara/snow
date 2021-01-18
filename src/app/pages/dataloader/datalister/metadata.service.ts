import { Injectable } from '@angular/core';
import {
  HttpClient,
} from '@angular/common/http';
import * as Globals from '../../../globals';

@Injectable()
export class MetadataService {

  constructor(private http: HttpClient) { }

  /*
  private static METADATA_URL_SNOWDB = '/api/metadatasnowdb';
  private static METADATA_URL_USERDB = 'api/metadatauserdb';
  private static METADATA_URL_USERFILEDB = 'api/metadatauserfiledb';
  private static METADATA_URL_HISTORY = 'api/userhistory';
 */


private static METADATA_URL_SNOWDB = Globals.snowURL+'/dataloader/metadatasnowdb';
private static METADATA_URL_USERDB = Globals.snowURL+'/dataloader/metadatauserdb';
private static METADATA_URL_USERFILEDB = Globals.snowURL+'/dataloader/metadatauserfiledb';
private static METADATA_URL_HISTORY = Globals.snowURL+'/dataloader/userhistory';

  //request to get meta data from postgresql
  getMetaDataSnowDb(domain) {
    console.log("sending.."+domain);
    return this.http.get(MetadataService.METADATA_URL_SNOWDB,{"params":{"domain":domain}});
  }

  //request to get meta data from user uploaded files
  getMetaDataUserDb(key,files) {
    return this.http.post(MetadataService.METADATA_URL_USERDB,{"key":key,"files":files});
  }

    //request to get meta data from user uploaded files
    getMetaDataFromUserFileDb(key) {
      return this.http.post(MetadataService.METADATA_URL_USERFILEDB,{"key":key});
    }

    getUserHistory(user_name) {
      return this.http.get(MetadataService.METADATA_URL_HISTORY,{"params":{"user_name":user_name}});
    }

}
