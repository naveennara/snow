import { Injectable } from '@angular/core';
import { ServerService } from '../../server.service';

@Injectable({
  providedIn: 'root'
})
export class AppSettingService {

  constructor(private services: ServerService) { }

  getSettingsInfo(url) {
    return this.services.getServers(url, '');
  }

  updateSetting(url, data) {
    return this.services.postServers(url, data);
  }

  getVersionHistory(url) {
    return this.services.getServers(url, '');
  }
  addFunctionalHistoryToVersion(url, data) {
    return this.services.postServers(url, data);
  }

}
