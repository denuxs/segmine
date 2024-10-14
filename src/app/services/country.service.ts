import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private _httpClient = inject(ApiService);

    constructor() {}

    getData() {
        return this._httpClient.getHttp('countries');
    }
}
