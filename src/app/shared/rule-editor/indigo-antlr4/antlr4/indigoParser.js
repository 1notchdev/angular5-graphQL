// Generated from indigo.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');
var indigoListener = require('./indigoListener').indigoListener;
var grammarFileName = "indigo.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003\u0011i\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004\t",
    "\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0003\u0002\u0003\u0002",
    "\u0003\u0002\u0003\u0002\u0003\u0002\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0005\u0003\u001b\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0007\u0003)\n\u0003\f\u0003\u000e\u0003",
    ",\u000b\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0007\u00044\n\u0004\f\u0004\u000e\u00047\u000b\u0004",
    "\u0005\u00049\n\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005B\n\u0005\f\u0005\u000e",
    "\u0005E\u000b\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0003\u0005\u0003\u0005\u0007\u0005T\n\u0005\f\u0005\u000e",
    "\u0005W\u000b\u0005\u0003\u0005\u0003\u0005\u0005\u0005[\n\u0005\u0003",
    "\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0007\u0006b",
    "\n\u0006\f\u0006\u000e\u0006e\u000b\u0006\u0003\u0006\u0003\u0006\u0003",
    "\u0006\u0002\u0003\u0004\u0007\u0002\u0004\u0006\b\n\u0002\u0002\u0002",
    "t\u0002\f\u0003\u0002\u0002\u0002\u0004\u001a\u0003\u0002\u0002\u0002",
    "\u0006-\u0003\u0002\u0002\u0002\bZ\u0003\u0002\u0002\u0002\n\\\u0003",
    "\u0002\u0002\u0002\f\r\u0005\u0006\u0004\u0002\r\u000e\u0007\u0004\u0002",
    "\u0002\u000e\u000f\u0005\u0004\u0003\u0002\u000f\u0010\u0007\u0002\u0002",
    "\u0003\u0010\u0003\u0003\u0002\u0002\u0002\u0011\u0012\b\u0003\u0001",
    "\u0002\u0012\u0013\u0007\f\u0002\u0002\u0013\u0014\u0005\u0004\u0003",
    "\u0002\u0014\u0015\u0007\f\u0002\u0002\u0015\u001b\u0003\u0002\u0002",
    "\u0002\u0016\u001b\u0005\u0006\u0004\u0002\u0017\u001b\u0007\u000e\u0002",
    "\u0002\u0018\u001b\u0007\u000f\u0002\u0002\u0019\u001b\u0005\n\u0006",
    "\u0002\u001a\u0011\u0003\u0002\u0002\u0002\u001a\u0016\u0003\u0002\u0002",
    "\u0002\u001a\u0017\u0003\u0002\u0002\u0002\u001a\u0018\u0003\u0002\u0002",
    "\u0002\u001a\u0019\u0003\u0002\u0002\u0002\u001b*\u0003\u0002\u0002",
    "\u0002\u001c\u001d\f\n\u0002\u0002\u001d\u001e\u0007\u0005\u0002\u0002",
    "\u001e)\u0005\u0004\u0003\u000b\u001f \f\t\u0002\u0002 !\u0007\u0005",
    "\u0002\u0002!)\u0005\u0004\u0003\n\"#\f\b\u0002\u0002#$\u0007\u0005",
    "\u0002\u0002$)\u0005\u0004\u0003\t%&\f\u0007\u0002\u0002&\'\u0007\u0005",
    "\u0002\u0002\')\u0005\u0004\u0003\b(\u001c\u0003\u0002\u0002\u0002(",
    "\u001f\u0003\u0002\u0002\u0002(\"\u0003\u0002\u0002\u0002(%\u0003\u0002",
    "\u0002\u0002),\u0003\u0002\u0002\u0002*(\u0003\u0002\u0002\u0002*+\u0003",
    "\u0002\u0002\u0002+\u0005\u0003\u0002\u0002\u0002,*\u0003\u0002\u0002",
    "\u0002-8\u0007\u0010\u0002\u0002./\u0007\u0007\u0002\u0002/0\u0005\b",
    "\u0005\u000205\u0003\u0002\u0002\u000212\u0007\b\u0002\u000224\u0005",
    "\b\u0005\u000231\u0003\u0002\u0002\u000247\u0003\u0002\u0002\u00025",
    "3\u0003\u0002\u0002\u000256\u0003\u0002\u0002\u000269\u0003\u0002\u0002",
    "\u000275\u0003\u0002\u0002\u00028.\u0003\u0002\u0002\u000289\u0003\u0002",
    "\u0002\u00029\u0007\u0003\u0002\u0002\u0002:;\u0007\u0010\u0002\u0002",
    ";<\u0007\u0006\u0002\u0002<=\u0007\u000b\u0002\u0002=[\u0007\u000f\u0002",
    "\u0002>C\u0007\u0010\u0002\u0002?@\u0007\u0007\u0002\u0002@B\u0007\u0010",
    "\u0002\u0002A?\u0003\u0002\u0002\u0002BE\u0003\u0002\u0002\u0002CA\u0003",
    "\u0002\u0002\u0002CD\u0003\u0002\u0002\u0002DF\u0003\u0002\u0002\u0002",
    "EC\u0003\u0002\u0002\u0002FG\u0007\u0007\u0002\u0002G[\u0007\u0010\u0002",
    "\u0002HI\u0007\u0010\u0002\u0002IJ\u0007\n\u0002\u0002JK\u0007\u0010",
    "\u0002\u0002KL\u0003\u0002\u0002\u0002LM\u0007\t\u0002\u0002M[\u0007",
    "\u0010\u0002\u0002NO\u0007\u0010\u0002\u0002OP\u0007\r\u0002\u0002P",
    "U\u0007\u0010\u0002\u0002QR\u0007\u0003\u0002\u0002RT\u0007\u0010\u0002",
    "\u0002SQ\u0003\u0002\u0002\u0002TW\u0003\u0002\u0002\u0002US\u0003\u0002",
    "\u0002\u0002UV\u0003\u0002\u0002\u0002VX\u0003\u0002\u0002\u0002WU\u0003",
    "\u0002\u0002\u0002X[\u0007\r\u0002\u0002Y[\u0007\u0010\u0002\u0002Z",
    ":\u0003\u0002\u0002\u0002Z>\u0003\u0002\u0002\u0002ZH\u0003\u0002\u0002",
    "\u0002ZN\u0003\u0002\u0002\u0002ZY\u0003\u0002\u0002\u0002[\t\u0003",
    "\u0002\u0002\u0002\\]\u0007\u0010\u0002\u0002]^\u0007\f\u0002\u0002",
    "^c\u0005\u0004\u0003\u0002_`\u0007\u0003\u0002\u0002`b\u0005\u0004\u0003",
    "\u0002a_\u0003\u0002\u0002\u0002be\u0003\u0002\u0002\u0002ca\u0003\u0002",
    "\u0002\u0002cd\u0003\u0002\u0002\u0002df\u0003\u0002\u0002\u0002ec\u0003",
    "\u0002\u0002\u0002fg\u0007\f\u0002\u0002g\u000b\u0003\u0002\u0002\u0002",
    "\u000b\u001a(*58CUZc"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [  ];

var symbolicNames = [ null, "COMMA", "EQ", "OPS", "OFFSET", "OF", "WITH", 
                      "AND", "IN", "OP", "BR", "SBR", "NUM", "INT", "ID", 
                      "WS" ];

var ruleNames =  [ "assign", "expr", "grid", "ref", "fun" ];

function indigoParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

indigoParser.prototype = Object.create(antlr4.Parser.prototype);
indigoParser.prototype.constructor = indigoParser;

Object.defineProperty(indigoParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

indigoParser.EOF = antlr4.Token.EOF;
indigoParser.COMMA = 1;
indigoParser.EQ = 2;
indigoParser.OPS = 3;
indigoParser.OFFSET = 4;
indigoParser.OF = 5;
indigoParser.WITH = 6;
indigoParser.AND = 7;
indigoParser.IN = 8;
indigoParser.OP = 9;
indigoParser.BR = 10;
indigoParser.SBR = 11;
indigoParser.NUM = 12;
indigoParser.INT = 13;
indigoParser.ID = 14;
indigoParser.WS = 15;

indigoParser.RULE_assign = 0;
indigoParser.RULE_expr = 1;
indigoParser.RULE_grid = 2;
indigoParser.RULE_ref = 3;
indigoParser.RULE_fun = 4;

function AssignContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = indigoParser.RULE_assign;
    this.l = null; // GridContext
    this.r = null; // ExprContext
    return this;
}

AssignContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
AssignContext.prototype.constructor = AssignContext;

AssignContext.prototype.EQ = function() {
    return this.getToken(indigoParser.EQ, 0);
};

AssignContext.prototype.EOF = function() {
    return this.getToken(indigoParser.EOF, 0);
};

AssignContext.prototype.grid = function() {
    return this.getTypedRuleContext(GridContext,0);
};

AssignContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

AssignContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterAssign(this);
	}
};

AssignContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitAssign(this);
	}
};




indigoParser.AssignContext = AssignContext;

indigoParser.prototype.assign = function() {

    var localctx = new AssignContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, indigoParser.RULE_assign);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 10;
        localctx.l = this.grid();
        this.state = 11;
        this.match(indigoParser.EQ);
        this.state = 12;
        localctx.r = this.expr(0);
        this.state = 13;
        this.match(indigoParser.EOF);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = indigoParser.RULE_expr;
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;


 
ExprContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function GridExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

GridExprContext.prototype = Object.create(ExprContext.prototype);
GridExprContext.prototype.constructor = GridExprContext;

indigoParser.GridExprContext = GridExprContext;

GridExprContext.prototype.grid = function() {
    return this.getTypedRuleContext(GridContext,0);
};
GridExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterGridExpr(this);
	}
};

GridExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitGridExpr(this);
	}
};


function DividContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.l = null; // ExprContext;
    this.r = null; // ExprContext;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DividContext.prototype = Object.create(ExprContext.prototype);
DividContext.prototype.constructor = DividContext;

indigoParser.DividContext = DividContext;

DividContext.prototype.OPS = function() {
    return this.getToken(indigoParser.OPS, 0);
};

DividContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
DividContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterDivid(this);
	}
};

DividContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitDivid(this);
	}
};


function MultContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.l = null; // ExprContext;
    this.r = null; // ExprContext;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MultContext.prototype = Object.create(ExprContext.prototype);
MultContext.prototype.constructor = MultContext;

indigoParser.MultContext = MultContext;

MultContext.prototype.OPS = function() {
    return this.getToken(indigoParser.OPS, 0);
};

MultContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
MultContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterMult(this);
	}
};

MultContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitMult(this);
	}
};


function NumExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

NumExprContext.prototype = Object.create(ExprContext.prototype);
NumExprContext.prototype.constructor = NumExprContext;

indigoParser.NumExprContext = NumExprContext;

NumExprContext.prototype.NUM = function() {
    return this.getToken(indigoParser.NUM, 0);
};

NumExprContext.prototype.INT = function() {
    return this.getToken(indigoParser.INT, 0);
};
NumExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterNumExpr(this);
	}
};

NumExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitNumExpr(this);
	}
};


function PlusContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.l = null; // ExprContext;
    this.r = null; // ExprContext;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

PlusContext.prototype = Object.create(ExprContext.prototype);
PlusContext.prototype.constructor = PlusContext;

indigoParser.PlusContext = PlusContext;

PlusContext.prototype.OPS = function() {
    return this.getToken(indigoParser.OPS, 0);
};

PlusContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
PlusContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterPlus(this);
	}
};

PlusContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitPlus(this);
	}
};


function ParenthesesContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.content = null; // ExprContext;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ParenthesesContext.prototype = Object.create(ExprContext.prototype);
ParenthesesContext.prototype.constructor = ParenthesesContext;

indigoParser.ParenthesesContext = ParenthesesContext;

ParenthesesContext.prototype.BR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.BR);
    } else {
        return this.getToken(indigoParser.BR, i);
    }
};


ParenthesesContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};
ParenthesesContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterParentheses(this);
	}
};

ParenthesesContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitParentheses(this);
	}
};


function FunExprContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FunExprContext.prototype = Object.create(ExprContext.prototype);
FunExprContext.prototype.constructor = FunExprContext;

indigoParser.FunExprContext = FunExprContext;

FunExprContext.prototype.fun = function() {
    return this.getTypedRuleContext(FunContext,0);
};
FunExprContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterFunExpr(this);
	}
};

FunExprContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitFunExpr(this);
	}
};


function MinusContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.l = null; // ExprContext;
    this.r = null; // ExprContext;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MinusContext.prototype = Object.create(ExprContext.prototype);
MinusContext.prototype.constructor = MinusContext;

indigoParser.MinusContext = MinusContext;

MinusContext.prototype.OPS = function() {
    return this.getToken(indigoParser.OPS, 0);
};

MinusContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};
MinusContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterMinus(this);
	}
};

MinusContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitMinus(this);
	}
};



indigoParser.prototype.expr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 2;
    this.enterRecursionRule(localctx, 2, indigoParser.RULE_expr, _p);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 24;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
        switch(la_) {
        case 1:
            localctx = new ParenthesesContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 16;
            this.match(indigoParser.BR);
            this.state = 17;
            localctx.content = this.expr(0);
            this.state = 18;
            this.match(indigoParser.BR);
            break;

        case 2:
            localctx = new GridExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 20;
            this.grid();
            break;

        case 3:
            localctx = new NumExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 21;
            this.match(indigoParser.NUM);
            break;

        case 4:
            localctx = new NumExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 22;
            this.match(indigoParser.INT);
            break;

        case 5:
            localctx = new FunExprContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 23;
            this.fun();
            break;

        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 40;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 38;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MultContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.l = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, indigoParser.RULE_expr);
                    this.state = 26;
                    if (!( this.precpred(this._ctx, 8))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
                    }
                    this.state = 27;
                    this.match(indigoParser.OPS);
                    this.state = 28;
                    localctx.r = this.expr(9);
                    break;

                case 2:
                    localctx = new DividContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.l = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, indigoParser.RULE_expr);
                    this.state = 29;
                    if (!( this.precpred(this._ctx, 7))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
                    }
                    this.state = 30;
                    this.match(indigoParser.OPS);
                    this.state = 31;
                    localctx.r = this.expr(8);
                    break;

                case 3:
                    localctx = new PlusContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.l = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, indigoParser.RULE_expr);
                    this.state = 32;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 33;
                    this.match(indigoParser.OPS);
                    this.state = 34;
                    localctx.r = this.expr(7);
                    break;

                case 4:
                    localctx = new MinusContext(this, new ExprContext(this, _parentctx, _parentState));
                    localctx.l = _prevctx;
                    this.pushNewRecursionContext(localctx, _startState, indigoParser.RULE_expr);
                    this.state = 35;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 36;
                    this.match(indigoParser.OPS);
                    this.state = 37;
                    localctx.r = this.expr(6);
                    break;

                } 
            }
            this.state = 42;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};

function GridContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = indigoParser.RULE_grid;
    this.property = null; // Token
    this.firstRef = null; // RefContext
    this._ref = null; // RefContext
    this.otherRefs = []; // of RefContexts
    return this;
}

GridContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
GridContext.prototype.constructor = GridContext;

GridContext.prototype.ID = function() {
    return this.getToken(indigoParser.ID, 0);
};

GridContext.prototype.OF = function() {
    return this.getToken(indigoParser.OF, 0);
};

GridContext.prototype.ref = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(RefContext);
    } else {
        return this.getTypedRuleContext(RefContext,i);
    }
};

GridContext.prototype.WITH = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.WITH);
    } else {
        return this.getToken(indigoParser.WITH, i);
    }
};


GridContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterGrid(this);
	}
};

GridContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitGrid(this);
	}
};




indigoParser.GridContext = GridContext;

indigoParser.prototype.grid = function() {

    var localctx = new GridContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, indigoParser.RULE_grid);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 43;
        localctx.property = this.match(indigoParser.ID);
        this.state = 54;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,4,this._ctx);
        if(la_===1) {
            this.state = 44;
            this.match(indigoParser.OF);
            this.state = 45;
            localctx.firstRef = this.ref();
            this.state = 51;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,3,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 47;
                    this.match(indigoParser.WITH);
                    this.state = 48;
                    localctx._ref = this.ref();
                    localctx.otherRefs.push(localctx._ref); 
                }
                this.state = 53;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,3,this._ctx);
            }


        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function RefContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = indigoParser.RULE_ref;
    return this;
}

RefContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
RefContext.prototype.constructor = RefContext;


 
RefContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};


function IntersectionRefContext(parser, ctx) {
	RefContext.call(this, parser);
    this.aspect = null; // Token;
    this.intersection = null; // Token;
    this._ID = null; // Token;
    this.intersections = []; // of Tokens;
    RefContext.prototype.copyFrom.call(this, ctx);
    return this;
}

IntersectionRefContext.prototype = Object.create(RefContext.prototype);
IntersectionRefContext.prototype.constructor = IntersectionRefContext;

indigoParser.IntersectionRefContext = IntersectionRefContext;

IntersectionRefContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.ID);
    } else {
        return this.getToken(indigoParser.ID, i);
    }
};


IntersectionRefContext.prototype.IN = function() {
    return this.getToken(indigoParser.IN, 0);
};

IntersectionRefContext.prototype.AND = function() {
    return this.getToken(indigoParser.AND, 0);
};
IntersectionRefContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterIntersectionRef(this);
	}
};

IntersectionRefContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitIntersectionRef(this);
	}
};


function ElementRefContext(parser, ctx) {
	RefContext.call(this, parser);
    this.aspect = null; // Token;
    this.element = null; // Token;
    this._ID = null; // Token;
    this.elements = []; // of Tokens;
    RefContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ElementRefContext.prototype = Object.create(RefContext.prototype);
ElementRefContext.prototype.constructor = ElementRefContext;

indigoParser.ElementRefContext = ElementRefContext;

ElementRefContext.prototype.SBR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.SBR);
    } else {
        return this.getToken(indigoParser.SBR, i);
    }
};


ElementRefContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.ID);
    } else {
        return this.getToken(indigoParser.ID, i);
    }
};


ElementRefContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.COMMA);
    } else {
        return this.getToken(indigoParser.COMMA, i);
    }
};

ElementRefContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterElementRef(this);
	}
};

ElementRefContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitElementRef(this);
	}
};


function OffsetRefContext(parser, ctx) {
	RefContext.call(this, parser);
    this.aspect = null; // Token;
    this.op = null; // Token;
    this.delta = null; // Token;
    RefContext.prototype.copyFrom.call(this, ctx);
    return this;
}

OffsetRefContext.prototype = Object.create(RefContext.prototype);
OffsetRefContext.prototype.constructor = OffsetRefContext;

indigoParser.OffsetRefContext = OffsetRefContext;

OffsetRefContext.prototype.ID = function() {
    return this.getToken(indigoParser.ID, 0);
};

OffsetRefContext.prototype.OFFSET = function() {
    return this.getToken(indigoParser.OFFSET, 0);
};

OffsetRefContext.prototype.OP = function() {
    return this.getToken(indigoParser.OP, 0);
};

OffsetRefContext.prototype.INT = function() {
    return this.getToken(indigoParser.INT, 0);
};
OffsetRefContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterOffsetRef(this);
	}
};

OffsetRefContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitOffsetRef(this);
	}
};


function AspectRefContext(parser, ctx) {
	RefContext.call(this, parser);
    this.aspect = null; // Token;
    RefContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AspectRefContext.prototype = Object.create(RefContext.prototype);
AspectRefContext.prototype.constructor = AspectRefContext;

indigoParser.AspectRefContext = AspectRefContext;

AspectRefContext.prototype.ID = function() {
    return this.getToken(indigoParser.ID, 0);
};
AspectRefContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterAspectRef(this);
	}
};

AspectRefContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitAspectRef(this);
	}
};


function RelationRefContext(parser, ctx) {
	RefContext.call(this, parser);
    this.aspect = null; // Token;
    this._ID = null; // Token;
    this.relations = []; // of Tokens;
    RefContext.prototype.copyFrom.call(this, ctx);
    return this;
}

RelationRefContext.prototype = Object.create(RefContext.prototype);
RelationRefContext.prototype.constructor = RelationRefContext;

indigoParser.RelationRefContext = RelationRefContext;

RelationRefContext.prototype.ID = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.ID);
    } else {
        return this.getToken(indigoParser.ID, i);
    }
};


RelationRefContext.prototype.OF = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.OF);
    } else {
        return this.getToken(indigoParser.OF, i);
    }
};

RelationRefContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterRelationRef(this);
	}
};

RelationRefContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitRelationRef(this);
	}
};



indigoParser.RefContext = RefContext;

indigoParser.prototype.ref = function() {

    var localctx = new RefContext(this, this._ctx, this.state);
    this.enterRule(localctx, 6, indigoParser.RULE_ref);
    var _la = 0; // Token type
    try {
        this.state = 88;
        this._errHandler.sync(this);
        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
        switch(la_) {
        case 1:
            localctx = new OffsetRefContext(this, localctx);
            this.enterOuterAlt(localctx, 1);
            this.state = 56;
            localctx.aspect = this.match(indigoParser.ID);

            this.state = 57;
            this.match(indigoParser.OFFSET);

            this.state = 58;
            localctx.op = this.match(indigoParser.OP);
            this.state = 59;
            localctx.delta = this.match(indigoParser.INT);
            break;

        case 2:
            localctx = new RelationRefContext(this, localctx);
            this.enterOuterAlt(localctx, 2);
            this.state = 60;
            localctx.aspect = this.match(indigoParser.ID);
            this.state = 65;
            this._errHandler.sync(this);
            var _alt = this._interp.adaptivePredict(this._input,5,this._ctx)
            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
                if(_alt===1) {
                    this.state = 61;
                    this.match(indigoParser.OF);
                    this.state = 62;
                    localctx._ID = this.match(indigoParser.ID);
                    localctx.relations.push(localctx._ID); 
                }
                this.state = 67;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input,5,this._ctx);
            }

            this.state = 68;
            this.match(indigoParser.OF);
            this.state = 69;
            localctx.aspect = this.match(indigoParser.ID);
            break;

        case 3:
            localctx = new IntersectionRefContext(this, localctx);
            this.enterOuterAlt(localctx, 3);
            this.state = 70;
            localctx.aspect = this.match(indigoParser.ID);

            this.state = 71;
            this.match(indigoParser.IN);
            this.state = 72;
            localctx.intersection = this.match(indigoParser.ID);

            this.state = 74;
            this.match(indigoParser.AND);
            this.state = 75;
            localctx._ID = this.match(indigoParser.ID);
            localctx.intersections.push(localctx._ID);
            break;

        case 4:
            localctx = new ElementRefContext(this, localctx);
            this.enterOuterAlt(localctx, 4);
            this.state = 76;
            localctx.aspect = this.match(indigoParser.ID);
            this.state = 77;
            this.match(indigoParser.SBR);
            this.state = 78;
            localctx.element = this.match(indigoParser.ID);
            this.state = 83;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            while(_la===indigoParser.COMMA) {
                this.state = 79;
                this.match(indigoParser.COMMA);
                this.state = 80;
                localctx._ID = this.match(indigoParser.ID);
                localctx.elements.push(localctx._ID);
                this.state = 85;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
            }
            this.state = 86;
            this.match(indigoParser.SBR);
            break;

        case 5:
            localctx = new AspectRefContext(this, localctx);
            this.enterOuterAlt(localctx, 5);
            this.state = 87;
            localctx.aspect = this.match(indigoParser.ID);
            break;

        }
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function FunContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = indigoParser.RULE_fun;
    this.arg = null; // ExprContext
    this._expr = null; // ExprContext
    this.args = []; // of ExprContexts
    return this;
}

FunContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FunContext.prototype.constructor = FunContext;

FunContext.prototype.ID = function() {
    return this.getToken(indigoParser.ID, 0);
};

FunContext.prototype.BR = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.BR);
    } else {
        return this.getToken(indigoParser.BR, i);
    }
};


FunContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

FunContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(indigoParser.COMMA);
    } else {
        return this.getToken(indigoParser.COMMA, i);
    }
};


FunContext.prototype.enterRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.enterFun(this);
	}
};

FunContext.prototype.exitRule = function(listener) {
    if(listener instanceof indigoListener ) {
        listener.exitFun(this);
	}
};




indigoParser.FunContext = FunContext;

indigoParser.prototype.fun = function() {

    var localctx = new FunContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, indigoParser.RULE_fun);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 90;
        this.match(indigoParser.ID);
        this.state = 91;
        this.match(indigoParser.BR);
        this.state = 92;
        localctx.arg = this.expr(0);
        this.state = 97;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        while(_la===indigoParser.COMMA) {
            this.state = 93;
            this.match(indigoParser.COMMA);
            this.state = 94;
            localctx._expr = this.expr(0);
            localctx.args.push(localctx._expr);
            this.state = 99;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
        }
        this.state = 100;
        this.match(indigoParser.BR);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};


indigoParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 1:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

indigoParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 8);
		case 1:
			return this.precpred(this._ctx, 7);
		case 2:
			return this.precpred(this._ctx, 6);
		case 3:
			return this.precpred(this._ctx, 5);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.indigoParser = indigoParser;
