import { NumberOperator } from 'src/app/model/number-operator.enum';
import { StringOperator } from 'src/app/model/string-operator.enum';

export interface FilterState {
    steps: FilterStep[];
}

export interface FilterStep {
    eventName: string;
    attributeRules: AttributeRule[];
}

export interface AttributeRule {
    attribute: Attribute;
    operator: StringOperator | NumberOperator;
    value1: string | number;
    value2: string | number;
}

export interface Attribute {
    property: string;
    type: 'string' | 'number';
}
