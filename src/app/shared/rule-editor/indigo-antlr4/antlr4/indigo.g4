grammar indigo;
assign : l=grid EQ r=expr EOF;

expr : BR content=expr BR #Parentheses
| l=expr OPS r=expr #Mult
| l=expr OPS r=expr #Divid
| l=expr OPS r=expr #Plus
| l=expr OPS r=expr #Minus
| grid #GridExpr
| NUM #NumExpr
| INT #NumExpr
| fun #FunExpr
;

grid : property=ID ((OF firstRef=ref) (WITH otherRefs+=ref)*)? ;

ref : aspect=ID (OFFSET) ( op=OP delta=INT) #OffsetRef
| aspect=ID (OF relations+=ID)* (OF aspect=ID) #RelationRef
| aspect=ID (IN intersection=ID)(AND intersections+=ID) #IntersectionRef
| aspect=ID SBR element=ID (COMMA elements+=ID)* SBR #ElementRef
| aspect=ID #AspectRef
;

fun : ID BR arg=expr (COMMA args+=expr)* BR ;

COMMA: ([ \t])* ',' ([ \t])*;
EQ: ([ \t])* '=' ([ \t])*;
OPS: ([ \t])* ('+'|'-'|'*'|'/'|'^') ([ \t])*;
OFFSET: ([ \t])* 'offset' ([ \t])*;
OF: ([ \t])* ('of'|'of this') ([ \t])*;
WITH: ([ \t])* 'with' ([ \t])*;
AND: ([ \t])* 'and' ([ \t])*;
IN: ([ \t])* 'in' ([ \t])*;
OP: ([ \t])* ('+'|'-') ([ \t])*;
BR: ([ \t])* ('('|')') ([ \t])*;
SBR: ([ \t])* ('['|']') ([ \t])*;
NUM : ([ \t])* [0-9]+ ('.' [0-9]) ([ \t])*;
INT : ([ \t])* [0-9]+ ([ \t])*;
ID : [a-zA-Z0-9]+;
WS : ( ' ' | '\t' | '\r' | '\n' )+ -> skip;
