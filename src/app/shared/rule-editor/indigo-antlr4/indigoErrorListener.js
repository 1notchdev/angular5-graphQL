var antlr4 = require('antlr4/index');

var AnnotatingErrorListener = function(annotations) {
    antlr4.error.ErrorListener.call(this);
    this.annotations = annotations;
    return this;
};

AnnotatingErrorListener.prototype = Object.create(antlr4.error.ErrorListener.prototype);
AnnotatingErrorListener.prototype.constructor = AnnotatingErrorListener;

AnnotatingErrorListener.prototype.syntaxError = function(recognizer, offendingSymbol, line, column, msg, e) {
    this.annotations.push({
        severity: 3,
        startLineNumber: line,
        startColumn: column,
        endLineNumber: line,
        endColumn: column,
        message: msg
    });
};

exports.AnnotatingErrorListener = AnnotatingErrorListener;