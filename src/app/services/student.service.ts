import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private _httpClient = inject(ApiService);

  constructor() {}

  fetchData() {
    return this._httpClient.getHttp('students/').pipe(
      map((response) => {
        return response.map((item: any) => {
          return {
            ...item,
            username: item.user?.username,
            email: item.user?.email,
            fullname: [item.user?.first_name, item.user?.last_name].join(' '),
          };
        });
      })
    );
  }

  getData(id: number) {
    return this._httpClient.getHttp('students/' + id).pipe(
      map((response) => {
        return {
          ...response,
          user: response.user?.id,
        };
      })
    );
  }

  postData(body: any) {
    return this._httpClient.postHttp('students/', body);
  }

  putData(id: number, body: any) {
    return this._httpClient.putHttp(`students/${id}/`, body);
  }

  deleteData(id: number) {
    return this._httpClient.deleteHttp(`students/${id}/`);
  }
}
