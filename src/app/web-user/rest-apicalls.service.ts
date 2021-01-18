import { Injectable } from '@angular/core';
import { ServerService } from '../server.service';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class RestAPICallsService {

  constructor(private httpClient: HttpClient, public services: ServerService) { }
  getAssignments(url: string) {
    return this.services.getServers(url, '');
  }
  getForm(url: string) {
    return this.services.getServers(url, '');
  }

  submitForm(url: string, data: any) {
    return this.services.postServersMultipart(url, data);
  }
  LogoutFromWeb(url: string, data: any) {
    return this.services.postServers(url, data);
  }

  getHistory(url: string) {
    return this.services.getServers(url, '');
  }
  getImage(url: string) {
    return this.getServers(url, '');
  }

  getFormInfo(url: string) {
    return this.services.getServers(url, '');
  }

  getWorkOrdersList(url: string) {
    return this.services.getServers(url, '');
  }
  getServers(url: string, params) {
    const headers1 = new HttpHeaders({'authorization': CryptoJS.AES.decrypt(sessionStorage.getItem('Token') || 'N/A','F!3LD0N:M@G!KM!ND$').toString(CryptoJS.enc.Utf8) || 'N/A' });

    return this.httpClient.get(url, { headers: headers1, params: new HttpParams(params) });
  }

  getAttachmnets(url ) {
    return this.services.getServers(url, '');
  }
  getAttachment( url, type) {
    return this.services.getServersFiles(url, type, '');
  }
  getAttachmentConfigureations(url ) {
    return this.services.getServers(url, '');
  }
}
