import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CourseService {
    private _httpClient = inject(ApiService);

    constructor() {}

    fetchData() {
        return this._httpClient.getHttp('courses/')
        // .pipe(
        //     map((response) => {
        //         return response.map((item) => {
        //             return {
        //                 ...item,
        //                 country: item.country?.name,
        //                 department: item.department?.name,
        //             };
        //         });
        //     })
        // );
    }

    getData(id: number) {
        return this._httpClient.getHttp('courses/' + id)
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
        return this._httpClient.postHttp('courses/', body);
    }

    putData(id: number, body: any) {
        return this._httpClient.putHttp(`courses/${id}/`, body);
    }

    deleteData(id: number) {
        return this._httpClient.deleteHttp(`courses/${id}/`);
    }
}
