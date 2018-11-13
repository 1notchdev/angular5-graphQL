// Generated from /home/sinh/upwork/paid_job/indigo-ui/src/app/shared/rule-editor/indigo-antlr4/antlr4/indigo.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class indigoParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		COMMA=1, EQ=2, OPS=3, OFFSET=4, OF=5, WITH=6, AND=7, IN=8, OP=9, BR=10, 
		SBR=11, NUM=12, INT=13, ID=14, WS=15;
	public static final int
		RULE_assign = 0, RULE_expr = 1, RULE_grid = 2, RULE_ref = 3, RULE_fun = 4;
	public static final String[] ruleNames = {
		"assign", "expr", "grid", "ref", "fun"
	};

	private static final String[] _LITERAL_NAMES = {
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, "COMMA", "EQ", "OPS", "OFFSET", "OF", "WITH", "AND", "IN", "OP", 
		"BR", "SBR", "NUM", "INT", "ID", "WS"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "indigo.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public indigoParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class AssignContext extends ParserRuleContext {
		public GridContext l;
		public ExprContext r;
		public TerminalNode EQ() { return getToken(indigoParser.EQ, 0); }
		public TerminalNode EOF() { return getToken(indigoParser.EOF, 0); }
		public GridContext grid() {
			return getRuleContext(GridContext.class,0);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public AssignContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assign; }
	}

	public final AssignContext assign() throws RecognitionException {
		AssignContext _localctx = new AssignContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_assign);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(10);
			((AssignContext)_localctx).l = grid();
			setState(11);
			match(EQ);
			setState(12);
			((AssignContext)_localctx).r = expr(0);
			setState(13);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ExprContext extends ParserRuleContext {
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
	 
		public ExprContext() { }
		public void copyFrom(ExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class GridExprContext extends ExprContext {
		public GridContext grid() {
			return getRuleContext(GridContext.class,0);
		}
		public GridExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class DividContext extends ExprContext {
		public ExprContext l;
		public ExprContext r;
		public TerminalNode OPS() { return getToken(indigoParser.OPS, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public DividContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class MultContext extends ExprContext {
		public ExprContext l;
		public ExprContext r;
		public TerminalNode OPS() { return getToken(indigoParser.OPS, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public MultContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class NumExprContext extends ExprContext {
		public TerminalNode NUM() { return getToken(indigoParser.NUM, 0); }
		public TerminalNode INT() { return getToken(indigoParser.INT, 0); }
		public NumExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class PlusContext extends ExprContext {
		public ExprContext l;
		public ExprContext r;
		public TerminalNode OPS() { return getToken(indigoParser.OPS, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public PlusContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class ParenthesesContext extends ExprContext {
		public ExprContext content;
		public List<TerminalNode> BR() { return getTokens(indigoParser.BR); }
		public TerminalNode BR(int i) {
			return getToken(indigoParser.BR, i);
		}
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ParenthesesContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class FunExprContext extends ExprContext {
		public FunContext fun() {
			return getRuleContext(FunContext.class,0);
		}
		public FunExprContext(ExprContext ctx) { copyFrom(ctx); }
	}
	public static class MinusContext extends ExprContext {
		public ExprContext l;
		public ExprContext r;
		public TerminalNode OPS() { return getToken(indigoParser.OPS, 0); }
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public MinusContext(ExprContext ctx) { copyFrom(ctx); }
	}

	public final ExprContext expr() throws RecognitionException {
		return expr(0);
	}

	private ExprContext expr(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExprContext _localctx = new ExprContext(_ctx, _parentState);
		ExprContext _prevctx = _localctx;
		int _startState = 2;
		enterRecursionRule(_localctx, 2, RULE_expr, _p);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(24);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				{
				_localctx = new ParenthesesContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(16);
				match(BR);
				setState(17);
				((ParenthesesContext)_localctx).content = expr(0);
				setState(18);
				match(BR);
				}
				break;
			case 2:
				{
				_localctx = new GridExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(20);
				grid();
				}
				break;
			case 3:
				{
				_localctx = new NumExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(21);
				match(NUM);
				}
				break;
			case 4:
				{
				_localctx = new NumExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(22);
				match(INT);
				}
				break;
			case 5:
				{
				_localctx = new FunExprContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(23);
				fun();
				}
				break;
			}
			_ctx.stop = _input.LT(-1);
			setState(40);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(38);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
					case 1:
						{
						_localctx = new MultContext(new ExprContext(_parentctx, _parentState));
						((MultContext)_localctx).l = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(26);
						if (!(precpred(_ctx, 8))) throw new FailedPredicateException(this, "precpred(_ctx, 8)");
						setState(27);
						match(OPS);
						setState(28);
						((MultContext)_localctx).r = expr(9);
						}
						break;
					case 2:
						{
						_localctx = new DividContext(new ExprContext(_parentctx, _parentState));
						((DividContext)_localctx).l = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(29);
						if (!(precpred(_ctx, 7))) throw new FailedPredicateException(this, "precpred(_ctx, 7)");
						setState(30);
						match(OPS);
						setState(31);
						((DividContext)_localctx).r = expr(8);
						}
						break;
					case 3:
						{
						_localctx = new PlusContext(new ExprContext(_parentctx, _parentState));
						((PlusContext)_localctx).l = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(32);
						if (!(precpred(_ctx, 6))) throw new FailedPredicateException(this, "precpred(_ctx, 6)");
						setState(33);
						match(OPS);
						setState(34);
						((PlusContext)_localctx).r = expr(7);
						}
						break;
					case 4:
						{
						_localctx = new MinusContext(new ExprContext(_parentctx, _parentState));
						((MinusContext)_localctx).l = _prevctx;
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(35);
						if (!(precpred(_ctx, 5))) throw new FailedPredicateException(this, "precpred(_ctx, 5)");
						setState(36);
						match(OPS);
						setState(37);
						((MinusContext)_localctx).r = expr(6);
						}
						break;
					}
					} 
				}
				setState(42);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,2,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	public static class GridContext extends ParserRuleContext {
		public Token property;
		public RefContext firstRef;
		public RefContext ref;
		public List<RefContext> otherRefs = new ArrayList<RefContext>();
		public TerminalNode ID() { return getToken(indigoParser.ID, 0); }
		public TerminalNode OF() { return getToken(indigoParser.OF, 0); }
		public List<RefContext> ref() {
			return getRuleContexts(RefContext.class);
		}
		public RefContext ref(int i) {
			return getRuleContext(RefContext.class,i);
		}
		public List<TerminalNode> WITH() { return getTokens(indigoParser.WITH); }
		public TerminalNode WITH(int i) {
			return getToken(indigoParser.WITH, i);
		}
		public GridContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_grid; }
	}

	public final GridContext grid() throws RecognitionException {
		GridContext _localctx = new GridContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_grid);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(43);
			((GridContext)_localctx).property = match(ID);
			setState(54);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,4,_ctx) ) {
			case 1:
				{
				{
				setState(44);
				match(OF);
				setState(45);
				((GridContext)_localctx).firstRef = ref();
				}
				setState(51);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(47);
						match(WITH);
						setState(48);
						((GridContext)_localctx).ref = ref();
						((GridContext)_localctx).otherRefs.add(((GridContext)_localctx).ref);
						}
						} 
					}
					setState(53);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,3,_ctx);
				}
				}
				break;
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RefContext extends ParserRuleContext {
		public RefContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ref; }
	 
		public RefContext() { }
		public void copyFrom(RefContext ctx) {
			super.copyFrom(ctx);
		}
	}
	public static class IntersectionRefContext extends RefContext {
		public Token aspect;
		public Token intersection;
		public Token ID;
		public List<Token> intersections = new ArrayList<Token>();
		public List<TerminalNode> ID() { return getTokens(indigoParser.ID); }
		public TerminalNode ID(int i) {
			return getToken(indigoParser.ID, i);
		}
		public TerminalNode IN() { return getToken(indigoParser.IN, 0); }
		public TerminalNode AND() { return getToken(indigoParser.AND, 0); }
		public IntersectionRefContext(RefContext ctx) { copyFrom(ctx); }
	}
	public static class ElementRefContext extends RefContext {
		public Token aspect;
		public Token element;
		public Token ID;
		public List<Token> elements = new ArrayList<Token>();
		public List<TerminalNode> SBR() { return getTokens(indigoParser.SBR); }
		public TerminalNode SBR(int i) {
			return getToken(indigoParser.SBR, i);
		}
		public List<TerminalNode> ID() { return getTokens(indigoParser.ID); }
		public TerminalNode ID(int i) {
			return getToken(indigoParser.ID, i);
		}
		public List<TerminalNode> COMMA() { return getTokens(indigoParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(indigoParser.COMMA, i);
		}
		public ElementRefContext(RefContext ctx) { copyFrom(ctx); }
	}
	public static class OffsetRefContext extends RefContext {
		public Token aspect;
		public Token op;
		public Token delta;
		public TerminalNode ID() { return getToken(indigoParser.ID, 0); }
		public TerminalNode OFFSET() { return getToken(indigoParser.OFFSET, 0); }
		public TerminalNode OP() { return getToken(indigoParser.OP, 0); }
		public TerminalNode INT() { return getToken(indigoParser.INT, 0); }
		public OffsetRefContext(RefContext ctx) { copyFrom(ctx); }
	}
	public static class AspectRefContext extends RefContext {
		public Token aspect;
		public TerminalNode ID() { return getToken(indigoParser.ID, 0); }
		public AspectRefContext(RefContext ctx) { copyFrom(ctx); }
	}
	public static class RelationRefContext extends RefContext {
		public Token aspect;
		public Token ID;
		public List<Token> relations = new ArrayList<Token>();
		public List<TerminalNode> ID() { return getTokens(indigoParser.ID); }
		public TerminalNode ID(int i) {
			return getToken(indigoParser.ID, i);
		}
		public List<TerminalNode> OF() { return getTokens(indigoParser.OF); }
		public TerminalNode OF(int i) {
			return getToken(indigoParser.OF, i);
		}
		public RelationRefContext(RefContext ctx) { copyFrom(ctx); }
	}

	public final RefContext ref() throws RecognitionException {
		RefContext _localctx = new RefContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_ref);
		int _la;
		try {
			int _alt;
			setState(88);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				_localctx = new OffsetRefContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(56);
				((OffsetRefContext)_localctx).aspect = match(ID);
				{
				setState(57);
				match(OFFSET);
				}
				{
				setState(58);
				((OffsetRefContext)_localctx).op = match(OP);
				setState(59);
				((OffsetRefContext)_localctx).delta = match(INT);
				}
				}
				break;
			case 2:
				_localctx = new RelationRefContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(60);
				((RelationRefContext)_localctx).aspect = match(ID);
				setState(65);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
				while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
					if ( _alt==1 ) {
						{
						{
						setState(61);
						match(OF);
						setState(62);
						((RelationRefContext)_localctx).ID = match(ID);
						((RelationRefContext)_localctx).relations.add(((RelationRefContext)_localctx).ID);
						}
						} 
					}
					setState(67);
					_errHandler.sync(this);
					_alt = getInterpreter().adaptivePredict(_input,5,_ctx);
				}
				{
				setState(68);
				match(OF);
				setState(69);
				((RelationRefContext)_localctx).aspect = match(ID);
				}
				}
				break;
			case 3:
				_localctx = new IntersectionRefContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(70);
				((IntersectionRefContext)_localctx).aspect = match(ID);
				{
				setState(71);
				match(IN);
				setState(72);
				((IntersectionRefContext)_localctx).intersection = match(ID);
				}
				{
				setState(74);
				match(AND);
				setState(75);
				((IntersectionRefContext)_localctx).ID = match(ID);
				((IntersectionRefContext)_localctx).intersections.add(((IntersectionRefContext)_localctx).ID);
				}
				}
				break;
			case 4:
				_localctx = new ElementRefContext(_localctx);
				enterOuterAlt(_localctx, 4);
				{
				setState(76);
				((ElementRefContext)_localctx).aspect = match(ID);
				setState(77);
				match(SBR);
				setState(78);
				((ElementRefContext)_localctx).element = match(ID);
				setState(83);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==COMMA) {
					{
					{
					setState(79);
					match(COMMA);
					setState(80);
					((ElementRefContext)_localctx).ID = match(ID);
					((ElementRefContext)_localctx).elements.add(((ElementRefContext)_localctx).ID);
					}
					}
					setState(85);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(86);
				match(SBR);
				}
				break;
			case 5:
				_localctx = new AspectRefContext(_localctx);
				enterOuterAlt(_localctx, 5);
				{
				setState(87);
				((AspectRefContext)_localctx).aspect = match(ID);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunContext extends ParserRuleContext {
		public ExprContext arg;
		public ExprContext expr;
		public List<ExprContext> args = new ArrayList<ExprContext>();
		public TerminalNode ID() { return getToken(indigoParser.ID, 0); }
		public List<TerminalNode> BR() { return getTokens(indigoParser.BR); }
		public TerminalNode BR(int i) {
			return getToken(indigoParser.BR, i);
		}
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public List<TerminalNode> COMMA() { return getTokens(indigoParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(indigoParser.COMMA, i);
		}
		public FunContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_fun; }
	}

	public final FunContext fun() throws RecognitionException {
		FunContext _localctx = new FunContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_fun);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(90);
			match(ID);
			setState(91);
			match(BR);
			setState(92);
			((FunContext)_localctx).arg = expr(0);
			setState(97);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(93);
				match(COMMA);
				setState(94);
				((FunContext)_localctx).expr = expr(0);
				((FunContext)_localctx).args.add(((FunContext)_localctx).expr);
				}
				}
				setState(99);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(100);
			match(BR);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 1:
			return expr_sempred((ExprContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expr_sempred(ExprContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 8);
		case 1:
			return precpred(_ctx, 7);
		case 2:
			return precpred(_ctx, 6);
		case 3:
			return precpred(_ctx, 5);
		}
		return true;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\21i\4\2\t\2\4\3\t"+
		"\3\4\4\t\4\4\5\t\5\4\6\t\6\3\2\3\2\3\2\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\3\3\3\3\3\5\3\33\n\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\7\3)\n\3\f\3\16\3,\13\3\3\4\3\4\3\4\3\4\3\4\3\4\7\4\64\n\4\f\4\16\4"+
		"\67\13\4\5\49\n\4\3\5\3\5\3\5\3\5\3\5\3\5\3\5\7\5B\n\5\f\5\16\5E\13\5"+
		"\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\7\5T\n\5\f\5\16\5"+
		"W\13\5\3\5\3\5\5\5[\n\5\3\6\3\6\3\6\3\6\3\6\7\6b\n\6\f\6\16\6e\13\6\3"+
		"\6\3\6\3\6\2\3\4\7\2\4\6\b\n\2\2\2t\2\f\3\2\2\2\4\32\3\2\2\2\6-\3\2\2"+
		"\2\bZ\3\2\2\2\n\\\3\2\2\2\f\r\5\6\4\2\r\16\7\4\2\2\16\17\5\4\3\2\17\20"+
		"\7\2\2\3\20\3\3\2\2\2\21\22\b\3\1\2\22\23\7\f\2\2\23\24\5\4\3\2\24\25"+
		"\7\f\2\2\25\33\3\2\2\2\26\33\5\6\4\2\27\33\7\16\2\2\30\33\7\17\2\2\31"+
		"\33\5\n\6\2\32\21\3\2\2\2\32\26\3\2\2\2\32\27\3\2\2\2\32\30\3\2\2\2\32"+
		"\31\3\2\2\2\33*\3\2\2\2\34\35\f\n\2\2\35\36\7\5\2\2\36)\5\4\3\13\37 \f"+
		"\t\2\2 !\7\5\2\2!)\5\4\3\n\"#\f\b\2\2#$\7\5\2\2$)\5\4\3\t%&\f\7\2\2&\'"+
		"\7\5\2\2\')\5\4\3\b(\34\3\2\2\2(\37\3\2\2\2(\"\3\2\2\2(%\3\2\2\2),\3\2"+
		"\2\2*(\3\2\2\2*+\3\2\2\2+\5\3\2\2\2,*\3\2\2\2-8\7\20\2\2./\7\7\2\2/\60"+
		"\5\b\5\2\60\65\3\2\2\2\61\62\7\b\2\2\62\64\5\b\5\2\63\61\3\2\2\2\64\67"+
		"\3\2\2\2\65\63\3\2\2\2\65\66\3\2\2\2\669\3\2\2\2\67\65\3\2\2\28.\3\2\2"+
		"\289\3\2\2\29\7\3\2\2\2:;\7\20\2\2;<\7\6\2\2<=\7\13\2\2=[\7\17\2\2>C\7"+
		"\20\2\2?@\7\7\2\2@B\7\20\2\2A?\3\2\2\2BE\3\2\2\2CA\3\2\2\2CD\3\2\2\2D"+
		"F\3\2\2\2EC\3\2\2\2FG\7\7\2\2G[\7\20\2\2HI\7\20\2\2IJ\7\n\2\2JK\7\20\2"+
		"\2KL\3\2\2\2LM\7\t\2\2M[\7\20\2\2NO\7\20\2\2OP\7\r\2\2PU\7\20\2\2QR\7"+
		"\3\2\2RT\7\20\2\2SQ\3\2\2\2TW\3\2\2\2US\3\2\2\2UV\3\2\2\2VX\3\2\2\2WU"+
		"\3\2\2\2X[\7\r\2\2Y[\7\20\2\2Z:\3\2\2\2Z>\3\2\2\2ZH\3\2\2\2ZN\3\2\2\2"+
		"ZY\3\2\2\2[\t\3\2\2\2\\]\7\20\2\2]^\7\f\2\2^c\5\4\3\2_`\7\3\2\2`b\5\4"+
		"\3\2a_\3\2\2\2be\3\2\2\2ca\3\2\2\2cd\3\2\2\2df\3\2\2\2ec\3\2\2\2fg\7\f"+
		"\2\2g\13\3\2\2\2\13\32(*\658CUZc";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}