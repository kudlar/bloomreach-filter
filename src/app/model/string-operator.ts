export enum StringOperator {
    Equals = 'equals',
    DoesNotEqual = 'does not equal',
    Contains = 'contains',
    DoesNotContain = 'does not contain',
}

export type StringOperatorToValueTypeMap = {
    [StringOperator.Equals]: string,
    [StringOperator.DoesNotEqual]: string,
    [StringOperator.Contains]: string,
    [StringOperator.DoesNotContain]: string,
};
