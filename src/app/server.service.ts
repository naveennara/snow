import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as CryptoJS from 'crypto-js';
import * as Globals from './globals';

@Injectable({ providedIn: 'root' })
export class ServerService {
  constructor(private httpClient: HttpClient, private ngxLoader: NgxUiLoaderService, private router: Router, private toastr: ToastrService) { }
  postServers(url: string, servers: any[]) {
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',  'authorization': CryptoJS.AES.decrypt(sessionStorage.getItem('Token') || 'N/A', Globals.secretKey).toString(CryptoJS.enc.Utf8) || 'N/A' });
    return this.httpClient.post(url, servers, { headers: headers })
      .map(
        (response) => {
          this.ngxLoader.stopAll();
          return response;
        }
      )
      .catch(
        (error) => {

          this.checkAuthorization(error.status);
          return Observable.throw('Something went wrong');
        }
      );

  }
  postServersMultipart(url: string, servers: any[]) {
    const headers = new HttpHeaders({'authorization': CryptoJS.AES.decrypt(sessionStorage.getItem('Token') || 'N/A', Globals.secretKey).toString(CryptoJS.enc.Utf8) || 'N/A' });

    return this.httpClient.post(url, servers, { headers: headers })
      .map(
        (response) => {
          this.ngxLoader.stopAll();
          return response;
        }
      )
      .catch(
        (error) => {
          this.checkAuthorization(error.status);
          return Observable.throw('Something went wrong');
        }
      );

  }
  // putServersMultipart(url: string, servers: any[]) {
  //   const headers = new HttpHeaders({ 'authorization': CryptoJS.AES.decrypt(sessionStorage.getItem('Token') || 'N/A', Globals.secretKey).toString(CryptoJS.enc.Utf8) || 'N/A' });

  //   return this.httpClient.put(url, servers, { headers: headers })
  //     .map(
  //       (response) => {

  //         return response;
  //       }
  //     )
  //     .catch(
  //       (error) => {
  //         this.checkAuthorization(error.status);
  //         return Observable.throw('Something went wrong');
  //       }
  //     );

  // }
  // putServers(url: string, servers: any[]) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': CryptoJS.AES.decrypt(sessionStorage.getItem('Token') || 'N/A', Globals.secretKey).toString(CryptoJS.enc.Utf8)|| 'N/A' });
  //   return this.httpClient.put(url,
  //     servers,
  //     { headers: headers })
  //     .map(
  //       (response) => {
  //         //  const data = response.json();
  //         return response;
  //       }
  //     )
  //     .catch(
  //       (error) => {
  //         this.checkAuthorization(error.status);
  //         return Observable.throw('Something went wrong');
  //       }
  //     );
  // }
  getServers(url: string, params) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': CryptoJS.AES.decrypt(sessionStorage.getItem('Token') || 'N/A', Globals.secretKey).toString(CryptoJS.enc.Utf8) || 'N/A' });
    return this.httpClient.get(url, { headers: headers, params: new HttpParams(params) })
      .map(
        (response) => {
          // const data = response.json();
          this.ngxLoader.stopAll();
          return response;
        }
      )
      .catch(
        (error) => {
          this.checkAuthorization(error.status);
          return Observable.throw('Something went wrong');
        }
      );
  }
  
  getServersExcel(url: string, params) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',  'authorization': CryptoJS.AES.decrypt(sessionStorage.getItem('Token') || 'N/A', Globals.secretKey).toString(CryptoJS.enc.Utf8) || 'N/A' });
    return this.httpClient.get(url, { headers: headers, params: new HttpParams(params),responseType:'arraybuffer'})
      .map(
        (response) => {
          this.ngxLoader.stopAll();
          // const data = response.json();
          return response;
        }
      )
      .catch(
        (error) => {
          this.checkAuthorization(error.status);
          return Observable.throw('Something went wrong');
        }
      );
  }

 

  // deleteServers(url: string, params) {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json',  'authorization': CryptoJS.AES.decrypt(sessionStorage.getItem('Token') || 'N/A', Globals.secretKey).toString(CryptoJS.enc.Utf8) || 'N/A' });
  //   return this.httpClient.delete(url, { headers: headers, params: new HttpParams(params) })
  //     .map(
  //       (response) => {
  //         return response;
  //       }
  //     )
  //     .catch(
  //       (error) => {
  //         this.checkAuthorization(error.status);
  //         return Observable.throw(error);
  //       }
  //     );
  // }
  responseCheck(res, view) {
    if (res.data.status === 208) {
      // swal(res.data.message)
    } else if (res.data.status === 204) {
      // swal(res.data.message);
    } else if (res.data.status === 202) {
      // swal(res.data.message);
    } else if (res.data.status === 200) {
      // swal(res.data.message);
      this.router.navigate([view]);
    } else if (res.data.status === 201) {
      // swal(res.data.message);
      this.router.navigate([view]);
    }
  }
  checkAuthorization(status) {
    if (status == 401) {
      if(document.getElementById('sidebarAnchorClose')!= null){
        document.getElementById('sidebarAnchorClose').click();
      }
      sessionStorage.clear();
      this.router.navigate(['/login']);
      this.toastr.info(Globals.allConstants.constantKeys.sessionExpired);
      return;
    }
  }
  getServersFiles(url: string, type, params) {
    // tslint:disable-next-line:max-line-length
    const headers = new HttpHeaders({ 'Content-Type': type, 'authorization': CryptoJS.AES.decrypt(sessionStorage.getItem('Token') || 'N/A', Globals.secretKey).toString(CryptoJS.enc.Utf8) || 'N/A' });
    // const headers = new HttpHeaders({ 'Content-Type': type});
    return this.httpClient.get(url, { headers: headers, params: new HttpParams(params),responseType:'arraybuffer'})
      .map(
        (response) => {
          this.ngxLoader.stopAll();
          // const data = response.json();
          return response;
        }
      )
      .catch(
        (error) => {
          this.checkAuthorization(error.status);
          return Observable.throw('Something went wrong');
        }
      );
  }
}
