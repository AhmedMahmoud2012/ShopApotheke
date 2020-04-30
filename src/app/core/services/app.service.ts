import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';




@Injectable({
    providedIn: 'root'
})
export class AppService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();


    changeLoading(status: boolean) {
        setTimeout(() => {
            this.loadingSubject.next(status);
        }, 0)
    }
}