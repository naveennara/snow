import * as Globals from './globals';
import { Router } from '@angular/router';
import { Injectable, ElementRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';

declare global {
  interface Window { attachEvent: any; }
}

window.attachEvent = window.attachEvent || {};


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn = false;
  imageMimes: any[] = [
    {
      mime: 'image/png',
      pattern: [0x89, 0x50, 0x4e, 0x47]
    },
    {
      mime: 'image/jpeg',
      pattern: [0xff, 0xd8, 0xff]
    },
    {
      mime: 'image/gif',
      pattern: [0x47, 0x49, 0x46, 0x38]
    },
    {
      mime: 'image/webp',
      pattern: [0x52, 0x49, 0x46, 0x46, undefined, undefined, undefined, undefined, 0x57, 0x45, 0x42, 0x50, 0x56, 0x50],
    }
    // You can expand this list @see https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
  ];
  excelMimes: any[] = [
    {
      mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      pattern: [0x50, 0x4B, 0x03, 0x04]
    }
  ];
  constructor(private router: Router) { }
  isAuthenticated() {
    this.restoringSession();
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.isLoggedIn());
        }, 200);
      }
    );
    return promise;
  }
  checkLogin() {
    this.restoringSession();
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(
            this.checkingSession()
          );
        }, 200);
      }
    );
    return promise;

  }
  restoringSession() {
    if (!sessionStorage.length) {
      localStorage.setItem('getSessionStorage', 'foobar');
      localStorage.removeItem('getSessionStorage');
    };
    // transfers sessionStorage from one tab to another
    var sessionStorage_transfer = function (event) {
      if (!event) { event = window.event; } // ie suq
      if (!event.newValue) return;          // do nothing if no value to work with
      if (event.key == 'getSessionStorage') {
        // another tab asked for the sessionStorage -> send it
        localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage));
        // the other tab should now have it, so we're done with it.
        localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
      } else if (event.key == 'sessionStorage' && !sessionStorage.length) {
        // another tab sent data <- get it
        var data = JSON.parse(event.newValue);
        for (var key in data) {
          sessionStorage.setItem(key, data[key]);
        }
      }
    };

    // listen for changes to localStorage
    if (window.addEventListener) {
      window.addEventListener("storage", sessionStorage_transfer, false);
    } else {
      window.attachEvent("onstorage", sessionStorage_transfer);
    };
  }
checkingSession(){
    if(sessionStorage.getItem('LoginDetails') != null){
      let userdata = JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem('LoginDetails'), Globals.secretKey).toString(CryptoJS.enc.Utf8));
      if (userdata.type.toString() == '2') {
        this.router.navigate(['webuser/assignments']);
      }
      else if (userdata.type == '4') {
        this.router.navigate(['mainLayout/approvals']);
      }

      else {
        let routes = Globals.routes;
        for (const key of Object.keys(routes)) {
          if (userdata.privilege.privilegeList.includes(key)) {
            this.router.navigate([routes[key]]);
            return true;
          }
        }
      }
      return true;
    } else {
      return false;
    }
  }

  // listen for changes to localStorage


  sendToken(token: string) {
    sessionStorage.setItem('LoggedInUser', token);
  }

  getToken() {
    return sessionStorage.getItem('LoggedInUser');
  }
  isLoggedIn() {
    return this.getToken() !== null;
  }
  logout() {
    sessionStorage.removeItem('LoggedInUser');
    // this.myRoute.navigate(["Login"]);
  }
  isMime(bytes: Uint8Array, mime: any): boolean {
    // tslint:disable-next-line:no-unused-expression
    return mime.pattern.every((p, i) => {  return !p || bytes[i] === p; });
  }
  fileUploadCheck(acceptType: string, supportExtenionsList: string, file: File, callback: (b: boolean) => void) {
    const regex = new RegExp('(' + supportExtenionsList + ')$');

    if (!regex.test(file.name)) {
      callback(false);
    } else {
      const numBytesNeeded = Math.max(...this.imageMimes.map(m => m.pattern.length));
      const blob = file.slice(0, numBytesNeeded); // Read the needed bytes of the file

      const fileReader = new FileReader();
      const that = this;
      fileReader.onloadend = e => {
        if (!e || !fileReader.result) { return; }

        const bytes = new Uint8Array(fileReader.result as ArrayBuffer);
        let valid;
        if (acceptType === 'image') {
          valid = that.imageMimes.some(mime => this.isMime(bytes, mime));
        } else if (acceptType === 'excel') {
          valid = that.excelMimes.some(mime => this.isMime(bytes, mime));
        }
        callback(valid);
      };
      fileReader.readAsArrayBuffer(blob);
    }
  }
  resetFile(element: ElementRef) {
    element.nativeElement.value = '';
  }
}
