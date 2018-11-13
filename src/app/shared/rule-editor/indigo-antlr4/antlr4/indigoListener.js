// Generated from indigo.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by indigoParser.
function indigoListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

indigoListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
indigoListener.prototype.constructor = indigoListener;

// Enter a parse tree produced by indigoParser#assign.
indigoListener.prototype.enterAssign = function(ctx) {
};

// Exit a parse tree produced by indigoParser#assign.
indigoListener.prototype.exitAssign = function(ctx) {
};


// Enter a parse tree produced by indigoParser#GridExpr.
indigoListener.prototype.enterGridExpr = function(ctx) {
};

// Exit a parse tree produced by indigoParser#GridExpr.
indigoListener.prototype.exitGridExpr = function(ctx) {
};


// Enter a parse tree produced by indigoParser#Divid.
indigoListener.prototype.enterDivid = function(ctx) {
};

// Exit a parse tree produced by indigoParser#Divid.
indigoListener.prototype.exitDivid = function(ctx) {
};


// Enter a parse tree produced by indigoParser#Mult.
indigoListener.prototype.enterMult = function(ctx) {
};

// Exit a parse tree produced by indigoParser#Mult.
indigoListener.prototype.exitMult = function(ctx) {
};


// Enter a parse tree produced by indigoParser#NumExpr.
indigoListener.prototype.enterNumExpr = function(ctx) {
};

// Exit a parse tree produced by indigoParser#NumExpr.
indigoListener.prototype.exitNumExpr = function(ctx) {
};


// Enter a parse tree produced by indigoParser#Plus.
indigoListener.prototype.enterPlus = function(ctx) {
};

// Exit a parse tree produced by indigoParser#Plus.
indigoListener.prototype.exitPlus = function(ctx) {
};


// Enter a parse tree produced by indigoParser#Parentheses.
indigoListener.prototype.enterParentheses = function(ctx) {
};

// Exit a parse tree produced by indigoParser#Parentheses.
indigoListener.prototype.exitParentheses = function(ctx) {
};


// Enter a parse tree produced by indigoParser#FunExpr.
indigoListener.prototype.enterFunExpr = function(ctx) {
};

// Exit a parse tree produced by indigoParser#FunExpr.
indigoListener.prototype.exitFunExpr = function(ctx) {
};


// Enter a parse tree produced by indigoParser#Minus.
indigoListener.prototype.enterMinus = function(ctx) {
};

// Exit a parse tree produced by indigoParser#Minus.
indigoListener.prototype.exitMinus = function(ctx) {
};


// Enter a parse tree produced by indigoParser#grid.
indigoListener.prototype.enterGrid = function(ctx) {
};

// Exit a parse tree produced by indigoParser#grid.
indigoListener.prototype.exitGrid = function(ctx) {
};


// Enter a parse tree produced by indigoParser#OffsetRef.
indigoListener.prototype.enterOffsetRef = function(ctx) {
};

// Exit a parse tree produced by indigoParser#OffsetRef.
indigoListener.prototype.exitOffsetRef = function(ctx) {
};


// Enter a parse tree produced by indigoParser#RelationRef.
indigoListener.prototype.enterRelationRef = function(ctx) {
};

// Exit a parse tree produced by indigoParser#RelationRef.
indigoListener.prototype.exitRelationRef = function(ctx) {
};


// Enter a parse tree produced by indigoParser#IntersectionRef.
indigoListener.prototype.enterIntersectionRef = function(ctx) {
};

// Exit a parse tree produced by indigoParser#IntersectionRef.
indigoListener.prototype.exitIntersectionRef = function(ctx) {
};


// Enter a parse tree produced by indigoParser#ElementRef.
indigoListener.prototype.enterElementRef = function(ctx) {
};

// Exit a parse tree produced by indigoParser#ElementRef.
indigoListener.prototype.exitElementRef = function(ctx) {
};


// Enter a parse tree produced by indigoParser#AspectRef.
indigoListener.prototype.enterAspectRef = function(ctx) {
};

// Exit a parse tree produced by indigoParser#AspectRef.
indigoListener.prototype.exitAspectRef = function(ctx) {
};


// Enter a parse tree produced by indigoParser#fun.
indigoListener.prototype.enterFun = function(ctx) {
};

// Exit a parse tree produced by indigoParser#fun.
indigoListener.prototype.exitFun = function(ctx) {
};



exports.indigoListener = indigoListener;