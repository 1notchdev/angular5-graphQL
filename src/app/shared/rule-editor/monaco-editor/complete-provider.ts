import { FlatPropertyGroup } from "../../../model/entities/property";
import { IndigoLexerParser } from "../indigo-antlr4/indigo-lexer-parser";
import { RuleSuggestionList } from "../model";

export class IndigoAutoCompleteProvider {

    public readonly triggerCharacters = ['', ' '];

    constructor(private _editor: any, private _suggestionList: RuleSuggestionList) { }

    public update(value: RuleSuggestionList) {
        this. _suggestionList = value;
    }

    public provideCompletionItems(model, position) {
        return this._getAutocompletion(model, position)
    }

    private readonly _propertyOperators = new Set("+-*/^".split(''));
    private readonly _aspectOperators = new Set(['of', 'with','in','and']);
    private _getAutocompletion(model: any, position: any): any[] {
        if (this._editor.getModel() !== model) return [];
        if (!this. _suggestionList) return [];
        const text = model.getValueInRange({ startLineNumber: position.lineNumber, startColumn: 1, endLineNumber: position.lineNumber, endColumn: position.column });
        const indigoLexerParser = new IndigoLexerParser();
        const tokenList = indigoLexerParser.getTokens(text);
        const tokens = tokenList.tokens;
        if (tokens.tokens.length <= 1) {
            return this._getProperties(false);
        }
        else if (tokens.tokens.length === 2) {
            const lastToken = tokens.tokens[tokens.tokens.length - 2];
            const tokenType = tokenList.symbolicNames[lastToken.type];
            const value = lastToken.text.trim();
            if (tokenType === "ID") {
                if (this._isProperty(value)) {
                    return [{
                        label: `=`,
                        kind: monaco.languages.CompletionItemKind.Text
                    },
                    {
                        label: `of`,
                        kind: monaco.languages.CompletionItemKind.Text
                    }
                    ];
                }
                else {
                    return this._getProperties(false);
                }
            }
        }
        else {
            const lastToken = tokens.tokens[tokens.tokens.length - 2];
            const tokenType = tokenList.symbolicNames[lastToken.type];
            const tokenSet = new Set(tokens.tokens.map(tk => tokenList.symbolicNames[tk.type]));
            const value = lastToken.text.trim();
            if (tokenType === "ID") {
                const beforeLastToken = tokens.tokens[tokens.tokens.length - 3];
                const beforeLastTokenType = tokenList.symbolicNames[beforeLastToken.type];
                const beforeLastTokenValue = beforeLastToken.text.trim();
                if (this._isPropertyOperator(beforeLastTokenValue) || beforeLastTokenType === 'EQ') {
                    if(this._isProperty(value)){
                        var items: any[];
                        if (!tokenSet.has('EQ')) {
                            items = [];
                            items.push({
                                label: `=`,
                                kind: monaco.languages.CompletionItemKind.Text
                            });
                        }
                        else items = this._getOperatorsForProperty();
                        items.push({
                            label: `of`,
                            kind: monaco.languages.CompletionItemKind.Text
                        });
                        return items;
                    }
                    else return this._getProperties(tokenSet.has('EQ'));
                
                }
                else if (this._isAspectOperator(beforeLastTokenValue)) {
                    if(this._isAspect(value)){
                        const items = this._getOperatorsForAspect();
                        if (!tokenSet.has('EQ')) {
                            items.push({
                                label: `=`,
                                kind: monaco.languages.CompletionItemKind.Text
                            });
                            return items;
                        }
                        return items;
                    }
                    else return this._getAspects();
                  
                }
                else if( (beforeLastTokenType === 'SBR' && beforeLastTokenValue ==='[') || beforeLastTokenType === 'COMMA' ){
                    if(this._isElement(value)){
                        const items = [{
                            label: `,`,
                            kind: monaco.languages.CompletionItemKind.Text
                        },
                        {
                            label: `]`,
                            kind: monaco.languages.CompletionItemKind.Text
                        }
                        ];
                        return items;
                    }
                    else return this._getElements();
                }
                else {
                   return [];
                }

            }
            else if (tokenType === 'EQ') {
                return this._getProperties();
            }
            else if (tokenType === "BR"){
                if(value === '('){
                    return this._getProperties();
                }
                else {
                    return this._getOperatorsForProperty();
                }
            }
            else if(tokenType === 'SBR'){
                if(value === '['){
                    return this._getElements();
                }
                else if( value === ']'){
                    const items = this._getOperatorsForAspect();
                    if (!tokenSet.has('EQ')) {
                        items.push({
                            label: `=`,
                            kind: monaco.languages.CompletionItemKind.Text
                        });
                        return items;
                    }
                    else {
                        return items.concat(this._getOperatorsForProperty());
                    }
                }
            }
            else if(tokenType === 'COMMA'){
                return this._getElements();
            }
            else if (this._isAspectOperator(value)) {
                return this._getAspects();
            }
            else if (this._isPropertyOperator(value)) {
                return this._getProperties();
            }
            else {
                return [];
            }
        }
    }

    private _getElements() {
        return this. _suggestionList.elements().map(p => {
            return {
                label: `${p}`,
                kind: monaco.languages.CompletionItemKind.Text
            }
        });
    }

    private _isPropertyOperator(token: string) {
        return this._propertyOperators.has(token);
    }

    private _isAspectOperator(token: string) {
        return this._aspectOperators.has(token);
    }

    private _isElement(token: string){
        return this. _suggestionList.elements().filter(p => p === token).length > 0;
    }
    private _getOperatorsForAspect() {
        return Array.from(this._aspectOperators).map(p => {
            return {
                label: `${p}`,
                kind: monaco.languages.CompletionItemKind.Text
            }
        }).concat([{
            label: `[`,
            kind: monaco.languages.CompletionItemKind.Text
        }]);
    }

    private _getOperatorsForProperty(includeOff = true) {
        const items = Array.from(this._propertyOperators);
        if (includeOff) {
            items.push('of');
        }
        return items.map(p => {
            return {
                label: `${p}`,
                kind: monaco.languages.CompletionItemKind.Text
            }
        });
    }

    private _isProperty(token: string) {
        return this. _suggestionList.properties().filter(p => p === token).length > 0;
    }

    private _isAspect(token: string) {
        return new Set(this. _suggestionList.aspects()).has(token);
    }

    private _getAspects(): any[] {
        return this. _suggestionList.aspects().map(p => {
            return {
                label: `${p}`,
                kind: monaco.languages.CompletionItemKind.Text
            }
        });
    }

    private _getProperties(includeFunctions = true): any[] {
        const items = this. _suggestionList.properties().map(pName => {
            return {
                label: `${pName}`,
                kind: monaco.languages.CompletionItemKind.Text
            }
        })
        if(includeFunctions) return items.concat(this._getFunctions());
        else return items;
    }

    private _getFunctions(): any[]{
        return this. _suggestionList.functions().map(pName => {
            return {
                label: `${pName}`,
                kind: monaco.languages.CompletionItemKind.Function,
                insertText: {
                    value: `${pName} (`
                }
            }
        });
    }

}