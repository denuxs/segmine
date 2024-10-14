import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class DepartmentService {
    private _httpClient = inject(ApiService);

    constructor() {}

    getData() {
        return this._httpClient.getHttp('departments');
    }

    postData(body: any) {
        return this._httpClient.postHttp('departments', body);
    }
}
