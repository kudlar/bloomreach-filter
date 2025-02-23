import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventListResponse } from 'src/app/model/event-list-response';

@Injectable()
export class EventsService {
    httpClient: HttpClient = inject(HttpClient);

    fetchEventList(): Observable<EventListResponse> {
        return this.httpClient.get<EventListResponse>('https://br-fe-assignment.github.io/customer-events/events.json');
    }

}
