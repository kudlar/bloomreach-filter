import { Attribute } from 'src/app/model/filter';

export interface EventsListResponse {
    events: Event[];
}

export interface Event {
    type: string;
    properties: Attribute[];
}
