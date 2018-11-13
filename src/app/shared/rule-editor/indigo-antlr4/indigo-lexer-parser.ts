declare var require: any;
var antlr4 = require('antlr4/index');
var indigoLexer = require('./antlr4/indigoLexer');
var indigoParser = require('./antlr4/indigoParser');
var indigoError = require('./indigoErrorListener');

export interface IndigoTokenList {
    tokens: any;
    symbolicNames: string[];
}
export class IndigoLexerParser {

    public getTokens(text: string): IndigoTokenList {
        const tokens = this._tokenizes(text);
        tokens.fill();
        return {
            tokens: tokens,
            symbolicNames: new indigoParser.indigoParser().symbolicNames
        };
    }

    private _tokenizes(text: string) {
        const chars = new antlr4.InputStream(text);
        const lexer = new indigoLexer.indigoLexer(chars);
        const tokens = new antlr4.CommonTokenStream(lexer);
        return tokens;
    }

    public validateSyntax(text: string): any[] {
        const tokens = this._tokenizes(text);
        const annotations = [];
        const errorListener = new indigoError.AnnotatingErrorListener(annotations);
        const parser = new indigoParser.indigoParser(tokens);
        parser.removeErrorListeners();
        parser.addErrorListener(errorListener);
        parser.assign();
        return annotations;
    }

}