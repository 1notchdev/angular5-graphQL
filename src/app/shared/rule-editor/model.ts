export interface IRule {
    valid: boolean;
    propertyID?: string;
    value?: string;
    uuidValue?: string;
    errors: any[];

}

export interface RuleSuggestionList{
    properties(): string[];
    aspects(): string[];
    elements(): string[];
    functions(): string[];
} 