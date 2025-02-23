import { NumberOperator, NumberOperatorToValueTypeMap } from 'src/app/model/number-operator';
import { StringOperator, StringOperatorToValueTypeMap } from 'src/app/model/string-operator';

export interface FilterState {
    steps: FilterStep[];
}

export interface FilterStep {
    event: string;
    attributeRules: AttributeRule[];
}

export interface AttributeRule {
    attribute: Attribute;
    operator: StringOperator | NumberOperator;
    value: NumberOperatorToValueTypeMap[NumberOperator] | StringOperatorToValueTypeMap[StringOperator];
}

export interface Attribute {
    property: string;
    type: string | number;
}

// export type ValueType = string | number | [number, number];
