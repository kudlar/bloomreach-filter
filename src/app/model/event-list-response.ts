import { Attribute } from 'src/app/model/filter';

export interface EventListResponse {
    events: Event[];
}

export interface Event {
    type: string;
    properties: Attribute[];
}
