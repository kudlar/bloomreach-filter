export enum NumberOperator {
    EqualTo = 'equal to',
    InBetween = 'in between',
    LessThan = 'less than',
    GreaterThan = 'greater than',
}

export const NumberOperatorToValueTypeMap = {
    [NumberOperator.EqualTo]: 1,
    [NumberOperator.InBetween]: 2,
    [NumberOperator.LessThan]: 1,
    [NumberOperator.GreaterThan]: 1,
};
