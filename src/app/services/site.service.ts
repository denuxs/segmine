import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteService {
  private _httpClient = inject(ApiService);

  constructor() {}

  fetchData() {
    return this._httpClient.getHttp('sites/').pipe(
      map((response) => {
        return response.map((item: any) => {
          return {
            ...item,
            country: item.country?.name,
            department: item.department?.name,
          };
        });
      })
    );
  }

  getData(id: number) {
    return this._httpClient.getHttp('sites/' + id).pipe(
      map((response) => {
        const courses = response.courses.map((item: any) => {
          return {
            id: item,
          };
        });
        return {
          ...response,
          country: response.country?.id,
          department: response.department?.id,
          courses: courses,
        };
      })
    );
  }

  postData(body: any) {
    return this._httpClient.postHttp('sites/', body);
  }

  putData(id: number, body: any) {
    return this._httpClient.putHttp(`sites/${id}/`, body);
  }

  deleteData(id: number) {
    return this._httpClient.deleteHttp(`sites/${id}/`);
  }
}
