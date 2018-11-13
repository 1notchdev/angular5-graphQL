import { Component, OnInit, ViewChild, AfterViewInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { PropertyService } from '../../model/services/property-service.service';
import { FlatPropertyGroup, Property } from '../../model/entities/property';
import { IndigoAutoCompleteProvider } from './monaco-editor/complete-provider';
import { IndigoLexerParser } from './indigo-antlr4/indigo-lexer-parser';
import { AspectService } from '../../model/services/aspect-service.service';
import { ElementService } from '../../model/services/element-service.service';
import { TaskQueue } from '../../model/utils/task-queue';
import 'rxjs/add/observable/forkJoin';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { RuleSuggestionList, IRule } from './model';
import { RuleService } from '../../model/services/rule-service.service';

declare var require: any;
declare var monaco: any;

@Component({
    selector: 'rule-editor',
    templateUrl: 'rule-editor.component.html',
    styleUrls: ['index.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RuleEditorComponent implements OnInit {

    @Input() properties: Property[] = [];
    @Input() value: string;
    @Output() valueChange = new EventEmitter<string>();

    private _editor: any;
    private syntaxValidator = new IndigoLexerParser();
    private autoCompleterProvider: IndigoAutoCompleteProvider;
    private editorOptions = {
        autoClosingBrackets: true,
        matchBrackets: true,
        minimap: {
            enabled: false
        },
        lineNumbers: "off",
        contextmenu: false,
        renderLineHighlight: "none",
        scrollbar: {
            "vertical": "hidden"
        },
        overviewRulerBorder: false,
        overviewRulerLanes: 0
    }

    private _aspects: any[];
    private _elements: any[];
    private _functions: any[];

    private suggestionList: RuleSuggestionList = {
        properties: () => {
            return this.properties ? this.properties.map(p => p.name) : [];
        },
        aspects: () => {
            return this._aspects.map(asp => asp.name);
        },
        elements: () => {
            return this._elements.map(element => element.name);
        },
        functions: () => {
            return this._functions.map(f => f.name);
        }
    }
    constructor(private _propertyService: PropertyService, private _aspectService: AspectService, private _elementSerivce: ElementService, private _ruleService: RuleService) {
    }

    ngOnInit() {
        const queue = new TaskQueue();
        forkJoin(this._aspectService.getAspects(), this._elementSerivce.getElements(),this._ruleService.getFunctions())
            .subscribe((result: any[]) => {
                this._aspects = result[0];
                this._elements = result[1];
                this._functions = result[2];
            });
    }

    private onRuleChange(rule: string) {
        if (rule.match(/\r\n|\n/)) {
            rule = rule.replace(/\n|\r\n/, '');
        }
        this.value = rule;
        this.valueChange.emit(this.value);
        if (rule && rule.length > 0) this._validateSyntax(rule);
    }

    public getRule(): IRule {
        const errors = this.syntaxValidator.validateSyntax(this.value);
        if (errors.length === 0) {
            const result = this._convertedRuleUsingUUID(this.value);
            return {
                valid: result[2].length ===0,
                value: this.value,
                uuidValue: result[1],
                propertyID: result[0],
                errors: result[2]
            }
        } else {
            return {
                valid: false,
                errors: errors
            }
        }
    }
    private _convertedRuleUsingUUID(text: string): any[] {
        const tokenList = this.syntaxValidator.getTokens(text);
        var result = "";
        var previousToken = null;
        var propertyID = "";
        const errors = [];
        const tokens = tokenList.tokens.tokens;
        tokens.forEach( (tk,index) => {
            if (tokenList.symbolicNames[tk.type] === 'ID') {
                const id = tk.text.trim();
                if(index < tokens.length-1 && tokenList.symbolicNames[tokens[index+1].type] === 'BR' && tokens[index+1].text.trim() === '('){
                    const functionName = this._functions.filter(p => p.name === id);
                    if (functionName.length > 0) {
                        result += functionName[0].id;
                    }
                    else  {
                        errors.push( this._error(monaco, `${id} is not a function`, 1, tk.start, tk.stop)); 
                        result += id; 
                    }
                }
                else {
                    if (!previousToken) {
                        const propertyName = this.properties.filter(p => p.name === id);
                        if (propertyName.length > 0) {
                            result += propertyName[0].id;
                            propertyID = propertyName[0].id
                        }
                        else  {
                            errors.push( this._error(monaco, `${id} is not a property`, 1, tk.start, tk.stop)); 
                            result += id; 
                        }
                    }
                    else {
                        const previousType = tokenList.symbolicNames[previousToken.type];
                        if (previousType === 'OF' || previousType === "WITH" || previousType === "IN" || previousType === "AND") {
                            const aspectName = this._aspects.filter(asp => asp.name === id);
                            if (aspectName.length > 0) {
                                result += aspectName[0].id;
                            }
                            else  { 
                                result += id;
                                errors.push( this._error(monaco, `${id} is not an aspect`, 1, tk.start, tk.stop)); 
                            }
                        }
                        else if (previousType === 'OPS' || previousType === "BR" || previousType === 'EQ') {
                            const propertyName = this.properties.filter(p => p.name === id);
                            if (propertyName.length > 0) {
                                result += propertyName[0].id;
                            }
                            else  { 
                                errors.push( this._error(monaco, `${id} is not a property`, 1, tk.start, tk.stop)); 
                                result += id;
                            }
                        }
                        else if ((previousType === 'SBR' && previousToken.text.trim() === '[') || previousType === 'COMMA') {
                            const elementName = this._elements.filter(e => e.name === id);
                            if(elementName.length > 0){
                                result += elementName[0].id
                            }
                            else  { 
                                errors.push( this._error(monaco, `${id} is not an element`, 1, tk.start, tk.stop)); 
                                result += id;
                            }
                        }
                    }
                }
               
            }
            else if(tk.type !== -1)  result += tk.text.trim();
            result += " ";
            previousToken = tk;
           
        });
        return [propertyID, result.trim(),errors];
    }


    public get valid(): boolean{
        return this.errors.length === 0;
    }

    private errors = [];
    private _decorators: any[] = [];
    private _validateSyntax(rule: string) {
        this.errors = this.getRule().errors;
        this._showErrors(this.errors);
    }

    private _error(monaco: any, error: string, lineNumber: number, startIndex: number, endIndex: number) {
        const errorMarker = {
            severity: 3,
            startLineNumber: 1,
            startColumn: startIndex + 1,
            endLineNumber: 1,
            endColumn: endIndex + 1,
            message: error
        };
        return errorMarker;
    }

    private _showErrors(errors: any){
        this._decorators = this._editor.deltaDecorations(this._decorators, errors.map(a => {
            a.startLineNumber = 1
            a.endLineNumber = 1;
            const dec =  { range: new monaco.Range(1,a.startColumn,1,a.endColumn+1), options: { isWholeLine: false, zIndex: 999999, inlineClassName: 'error-token' , hoverMessage:  { value: a.message }}};
            return dec;
        }) );
    }

    onInit(editor: any) {
        this._editor = editor;
        this._setAutoComplete(editor);
        this._disableEnterKeyForNewLine(editor);
        this._setLangageToIndigo(editor);
    }

    private _setAutoComplete(editor: any) {
        this.autoCompleterProvider = new IndigoAutoCompleteProvider(editor, this.suggestionList);
        this._disposable.push(monaco.languages.registerCompletionItemProvider("indigo", this.autoCompleterProvider));
    }

    private _disableEnterKeyForNewLine(editor: any) {
        editor.addCommand(monaco.KeyCode.Enter, (args) => {
        }, '!suggestWidgetVisible && !renameInputVisible && !inSnippetMode && !quickFixWidgetVisible');
    }

    private _setLangageToIndigo(editor: any) {
        monaco.editor.setTheme('myCoolTheme');
        var model = editor.getModel(); // we'll create a model for you if the editor created from string value.
        monaco.editor.setModelLanguage(model, "indigo");
    }

    private _disposable = [];
    ngOnDestroy() {
        this._disposable.forEach(provider => provider.dispose());
    }

}
