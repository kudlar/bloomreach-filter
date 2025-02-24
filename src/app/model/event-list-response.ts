import { Attribute } from 'src/app/model/filter';

export interface EventListResponse {
    events: EventType[];
}

export interface EventType {
    type: string;
    properties: Attribute[];
}
