import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';

@Injectable({
  providedIn: 'root'
})
export class AsyncDownloadService {

  constructor(private services: ServerService) { }
  fetchDownloadDetailsService(url, data) {
    return this.services.postServers(url, data);
  }
  downloadFileService(url, type) {
    // return this.services.getServers(url, '');
    return this.services.getServersFiles(url, type, '');
  }
}
