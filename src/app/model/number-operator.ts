export enum NumberOperator {
    EqualTo = 'equal to',
    InBetween = 'in between',
    LessThan = 'less than',
    GreaterThan = 'greater than',
}

export type NumberOperatorToValueTypeMap = {
    [NumberOperator.EqualTo]: number,
    [NumberOperator.InBetween]: [number, number],
    [NumberOperator.LessThan]: number,
    [NumberOperator.GreaterThan]: number,
};
