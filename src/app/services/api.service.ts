import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private _httpClient = inject(HttpClient);

    constructor() {}

    getHttp(url: string): Observable<any> {
        return this._httpClient
            .get(environment.API + url)
            .pipe(catchError(this.handleError));
    }

    postHttp(url: string, data: any): Observable<any> {
        return this._httpClient
            .post(environment.API + url, data)
            // .pipe(catchError(this.handleError));
    }

    putHttp(url: string, data: any): Observable<any> {
        return this._httpClient
            .put(environment.API + url, data)
            .pipe(catchError(this.handleError));
    }

    deleteHttp(url: string): Observable<any> {
        return this._httpClient
            .delete(environment.API + url)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        console.log(error.message);

        return throwError(() => error);

        // return throwError(
        //     () => 'Something bad happened; please try again later.'
        // );
        // return throwError(
        //     () => error.message
        // );
        // return new Error('Ocurrio un error innesperado');
    }
}
