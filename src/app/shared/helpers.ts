import { EventType } from 'src/app/model/event-list-response';
import { Attribute } from 'src/app/model/filter';
import { NumberOperator } from 'src/app/model/number-operator.enum';
import { StringOperator } from 'src/app/model/string-operator.enum';

export function isStringOperator(operator: StringOperator | NumberOperator): operator is StringOperator {
    return Object.values(StringOperator).includes(operator as StringOperator);
}

export function isEvent(option: EventType | Attribute): option is EventType {
    return 'properties' in (option as EventType);
}

export function isAttribute(option: EventType | Attribute): option is Attribute {
    return !isEvent(option);
}
