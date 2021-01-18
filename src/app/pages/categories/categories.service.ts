import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../../server.service';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  categoryId:string;
  constructor(private services: ServerService, private router: Router) { }

    createCategory(url, data) {
      return this.services.postServers(url, data);
    }
    getCategories(url) {
      return this.services.getServers(url, '');
    }
    editCategory(data) {
      this.router.navigate(['/mainLayout/categories/edit', data._id]);
    }
    viewCategory(url, id) {
      return this.services.getServers(url, id);
    }
    updateCategory(url, data) {
      return this.services.postServers(url, data);
    }
    deleteCategory(url, id) {
      return this.services.postServers(url, []);
    }
}
