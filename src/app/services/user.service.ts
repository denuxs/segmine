import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _httpClient = inject(ApiService);

  constructor() {}

  fetchData() {
    return this._httpClient.getHttp('users').pipe(
      map((response) => {
        return response.map((item: any) => {
          return {
            ...item,
            fullname: [item.first_name, item.last_name].join(' '),
          };
        });
      })
    );
  }

  getData(id: number) {
    return this._httpClient.getHttp(`users/${id}/`);
    // .pipe(
    //     map((response) => {
    //         return {
    //             ...response,
    //             country: response.country?.id,
    //             department: response.department?.id,
    //         };
    //     })
    // );
  }

  postData(body: any) {
    return this._httpClient.postHttp('users/', body);
  }

  putData(id: number, body: any) {
    return this._httpClient.putHttp(`users/${id}/`, body);
  }

  changePassword(id: number, body: any) {
    return this._httpClient.postHttp(`users/${id}/password/`, body);
  }

  deleteData(id: number) {
    return this._httpClient.deleteHttp(`users/${id}/`);
  }
}
