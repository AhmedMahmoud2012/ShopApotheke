// #docplaster
import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpHeaders, HttpRequest, HttpResponse,
    HttpInterceptor, HttpHandler, HttpErrorResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { RequestCacheWithMap, AppService } from '../services';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: RequestCacheWithMap, private appService: AppService, private snackBar: MatSnackBar) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        this.appService.changeLoading(true);
        const cachedResponse = this.cache.get(req) as HttpResponse<any>;
        // if (req.headers.get('x-refresh')) {
        //     const results$ = this.sendRequest(req, next, this.cache);
        //     return cachedResponse ?
        //         results$.pipe(startWith(cachedResponse)) :
        //         results$;
        // }
        if (cachedResponse) {
            this.appService.changeLoading(false);
            return of(new HttpResponse<any>({ ...cachedResponse }));
        }
        return this.sendRequest(req, next, this.cache);
    }

    sendRequest(
        req: HttpRequest<any>,
        next: HttpHandler,
        cache: RequestCacheWithMap): Observable<HttpEvent<any>> {
        const noHeaderReq = req.clone({ headers: new HttpHeaders() });
        return next.handle(noHeaderReq).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    cache.put(req, event);
                    this.appService.changeLoading(false);
                }
            }),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error.error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                }
                this.snackBar.open(errorMessage);
                this.appService.changeLoading(false);
                return throwError(errorMessage);
            })
        );
    }
}



