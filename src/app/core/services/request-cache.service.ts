import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { RequestCache } from '../types';
import { DBService } from './db.service';



const maxAge = 30000;

@Injectable({
    providedIn: 'root'
})
export class RequestCacheWithMap extends RequestCache {



    get(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = DBService.get(url);
        if (!cached) {
            return undefined;
        }
        const isExpired = cached.lastRead < (Date.now() - maxAge);
        return isExpired ? undefined : cached.response;
    }

    put(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.urlWithParams;
        const entry = { url, response: response.clone(), lastRead: Date.now() };
        DBService.set(url, entry);
        const expired = Date.now() - maxAge;
        DBService.allStorage().forEach(entry => {
            if (entry.lastRead < expired) {
                DBService.delete(entry.url);
            }
        });
    }
}