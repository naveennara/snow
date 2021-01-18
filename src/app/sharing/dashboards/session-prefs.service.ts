import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionPrefsService {

  private isSupported;
  private storage: any;

  constructor() {
    try {
      this.isSupported = window.sessionStorage;
    } catch (err) {
      this.isSupported = false;
    }
    this.storage = this.isSupported ? window.sessionStorage : {};
  }

  /**
   * Stores a preference in browser local storage.
   * @param {string} key - string
   * @param {string} value - string or number
   */
  public storePref(key: string, value: string): void {
    if (this.isSupported) {
      this.storage.setItem(key, value);
    } else {
      this.storage[key] = value;
    }
  }

  public removePref(key: string): void {
    if (this.isSupported) {
      this.storage.removeItem(key);
    } else {
      delete this.storage[key];
    }
  }

  public getPref(key: string): string {
    if (this.isSupported) {
      return this.storage.getItem(key);
    } else {
      return this.storage[key];
    }
  }
}
