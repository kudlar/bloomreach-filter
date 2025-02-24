import { NumberOperator, NumberOperatorToValueTypeMap } from 'src/app/model/number-operator.enum';
import { StringOperator, StringOperatorToValueTypeMap } from 'src/app/model/string-operator.enum';

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
    value: NumberOperatorToValueTypeMap[NumberOperator] | StringOperatorToValueTypeMap[StringOperator];
}

export interface Attribute {
    property: string;
    type: 'string' | 'number';
}
