import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class FilterStateService {

    private filterState: BehaviorSubject<any> = new BehaviorSubject<any>({});

    constructor() {
    }
}
