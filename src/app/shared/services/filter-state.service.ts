import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FilterState } from 'src/app/model/filter';
import { NumberOperator } from 'src/app/model/number-operator.enum';
import { StringOperator } from 'src/app/model/string-operator.enum';

@Injectable({
    providedIn: 'root',
})
export class FilterStateService {

    private _filterState: BehaviorSubject<FilterState | null> = new BehaviorSubject<FilterState | null>(null);
        // {
        //     steps: [
        //         {
        //             eventName: 'page_visit',
        //             attributeRules: [
        //                 {
        //                     attribute: {
        //                         property: 'location',
        //                         type: 'string',
        //                     },
        //                     operator: StringOperator.Equals,
        //                     value: 'example.com',
        //                 },
        //                 {
        //                     attribute: {
        //                         property: 'browser',
        //                         type: 'string',
        //                     },
        //                     operator: StringOperator.Equals,
        //                     value: 'Chrome',
        //                 },
        //             ],
        //         },
        //         {
        //             eventName: 'purchase',
        //             attributeRules: [
        //                 {
        //                     attribute: {
        //                         property: 'total_price',
        //                         type: 'number',
        //                     },
        //                     operator: NumberOperator.InBetween,
        //                     value: [5, 10],
        //                 },
        //                 {
        //                     attribute: {
        //                         property: 'discount_value',
        //                         type: 'number',
        //                     },
        //                     operator: StringOperator.Equals,
        //                     value: '50',
        //                 },
        //             ],
        //         },
        //     ],
        // });

    get filterState(): Observable<FilterState | null> {
        return this._filterState.asObservable();
    }
}
