export interface ErrorItem {
    type: string;
    text: string;
    number?: number;
    [prop: string]: any;
    index?: number;
}
export interface RuleFormItem {
    pass: string;
    checkPass: string;
    age: string;
    region: string;
    [prop: string]: any;
}