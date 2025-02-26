export enum StringOperator {
    Equals = 'equals',
    DoesNotEqual = 'does not equal',
    Contains = 'contains',
    DoesNotContain = 'does not contain',
}

export const StringOperatorToValueTypeMap = {
    [StringOperator.Equals]: 1,
    [StringOperator.DoesNotEqual]: 1,
    [StringOperator.Contains]: 1,
    [StringOperator.DoesNotContain]: 1,
};
