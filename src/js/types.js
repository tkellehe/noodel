(function(global){

var types = {};

function hr(s) { return s[s.length-1] };
var int_to_char = [
'ð','¶','¤','!','"','#','$','%','&',"'",'(',')','*','+',',','-',
'.','/','0','1','2','3','4','5','6','7','8','9',':',';','<','=',
'>','?','@','A','B','C','D','E','F','G','H','I','J','K','L','M',
'N','O','P','Q','R','S','T','U','V','W','X','Y','Z','[','\\',']',
'^','_','`','a','b','c','d','e','f','g','h','i','j','k','l','m',
'n','o','p','q','r','s','t','u','v','w','x','y','z','{','|','}',
'~','Æ','Ç','Ð','Ñ','Ø','Œ','Þ','ß','æ','ç','ı','ȷ','ñ','ø','œ',
'þ','Ɓ','Ƈ','Ɗ','Ƒ','Ɠ','Ƙ','Ɲ','Ƥ','Ƭ','Ʋ','Ȥ','ɓ','ƈ','ɗ','ƒ',
'ɠ','ɦ','ƙ','ɱ','ɲ','ƥ','ʠ','ɼ','ʂ','ƭ','ʋ','ȥ','Ạ','Ḅ','Ḍ','Ẹ',
'Ḥ','Ị','Ḳ','Ḷ','Ṃ','Ṇ','Ọ','Ṛ','Ṣ','Ṭ','Ụ','Ṿ','Ẉ','Ỵ','Ẓ','Ȧ',
'Ḃ','Ċ','Ḋ','Ė','Ḟ','Ġ','Ḣ','İ','Ŀ','Ṁ','Ṅ','Ȯ','Ṗ','Ṙ','Ṡ','Ṫ',
'Ẇ','Ẋ','Ẏ','Ż','ạ','ḅ','ḍ','ẹ','ḥ','ị','ḳ','ḷ','ṃ','ṇ','ọ','ṛ',
'ṣ','ṭ','ụ','ṿ','ẉ','ỵ','ẓ','ȧ','ḃ','ċ','ḋ','ė','ḟ','ġ','ḣ','ŀ',
'ṁ','ṅ','ȯ','ṗ','ṙ','ṡ','ṫ','ẇ','ẋ','ẏ','ż','µ','€','¢','£','¥',
'\t','\n',' ','¡','¿','×','÷','¦','©','¬','®','«','»','‘','’','“',
'”','°','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹','⁺','⁻','⁼','⁽','⁾'
];

var char_to_int = {};

(function(){
  for(var i = int_to_char.length; i--;) {
    int_to_char[i] = hr(int_to_char[i]);
    char_to_int[int_to_char[i]] = i;
  }
})()

function is_nan(o) { return o !== o; };
function is_undefined(o) { return o === undefined };
function is_null(o) { return o === null };
function is_invalid(o) { return is_nan(o) || is_undefined(o) || is_null(o) };

function is_string(o) { return typeof(o) === "string" };
function is_number(o) { return typeof(o) === "number" && !is_nan(o) };
function is_integer(o) { return is_number(o) && (Math.floor(o) === o) };
function is_array(o) { return typeof(o) === "array" };
function is_char_code(o) { return (is_string(o) && !is_undefined(char_to_int[o])) };
function is_char(o) { return is_char_code(o) || (is_integer(o) && 0 <= o && o < 256) };

function string_to_array(o) {
  var a = [];
  for(var i = o.length; i--;) a.unshift(o[i])
  return a;
}
function array_to_string(o) {
  var s = ""
  for(var i = o.length; i--;) s += to_string(o[i]);
  return s;
}
function to_string(o) {
  var s = "";
  if(is_array(o)) for(var i = 0; i < o.length; ++i) s += to_string(o[i]);
  else if(is_invalid(o)) s = "";
  else s += o;
  
  return s;
};
function to_number(o) {
  var v = 0;
  if(is_array(o)) for(var i = 0; i < o.length; ++i) v += to_number(o[i]);
  else if(is_invalid(o)) v = 0;
  else if(is_string(o) && is_nan(+o)) v = to_number(string_to_array(o));
  else if(is_nan(+o)) v = 0;
  else v = +o;
  
  return v;
};
function to_integer(o) { return Math.floor(to_number(o)) };
function to_char(o) {
  var c = 0;
  if(is_string(o)) c = to_integer(string_to_array(o)) % 256;
  else c = to_integer(o) % 256;
  return c;
};
function to_number_packed(o) {
  var n = 0;
  if(is_number(o)) n = o;
  else {
    if(is_string(o)) o = string_to_array(o);
    for(var l = o.length, i = l; i--;) n += Math.pow(to_char(o[i]), l - i);
  }
  return n;
}
function to_array(o) {
  var a = o;
  if(is_string(o)) a = string_to_array(o);
  else if(is_invalid(o)) a = [];
  else if(!is_array(o)) a = [o];
  return a;
}

function is_CHAR(o) { return o.type === "CHAR" };
function is_STRING(o) { return o.type === "STRING" };
function is_ARRAY(o) { return o.type === "ARRAY" };
function is_NUMBER(o) { return o.type === "NUMBER" };
function is_TYPE(o) { return is_CHAR(o) || is_STRING(o) || is_ARRAY(o) || is_NUMBER(o) };

//------------------------------------------------------------------------------------------------------------
function CHAR(v) {
  this.value = to_char(v);
}

CHAR.prototype.type = "CHAR";

CHAR.prototype.toString = function() {
  return to_string(int_to_char[this.value]);
}

CHAR.prototype.copy = function() {
  return new CHAR(this.value);
}

/// Conversions
CHAR.prototype.valueify = function() {
  return this.value;
}
CHAR.prototype.charify = function() {
  return this.copy();
}
CHAR.prototype.stringify = function() {
  return new STRING(int_to_char[this.value]);
}
CHAR.prototype.arrayify = function() {
  return new ARRAY([this.copy()]);
}
CHAR.prototype.numberify = function() {
  return new NUMBER(this.value);
}
CHAR.prototype.integerify = function() {
  return new NUMBER(this.value);
}

/// Operators
CHAR.prototype.add = function(rhs, tkn) {
  var v = rhs;
  if(is_TYPE(v)) v = v.valueify();
  return new CHAR((this.value + to_char(v)) % 256);
}

CHAR.prototype.sub = function(rhs, tkn) {
  var v = rhs;
  if(is_TYPE(v)) v = v.valueify();
  return new CHAR((this.value - to_char(v)) % 256);
}

types.CHAR = CHAR;

//------------------------------------------------------------------------------------------------------------
function NUMBER(v) {
  this.value = to_number(v);
}

NUMBER.prototype.type = "NUMBER";

NUMBER.prototype.toString = function() {
  return to_string(int_to_char[this.value]);
}

NUMBER.prototype.copy = function() {
  return new NUMBER(this.value);
}

/// Conversions
NUMBER.prototype.valueify = function() {
  return this.value;
}
NUMBER.prototype.charify = function() {
  return new CHAR(to_char(this.value));
}
NUMBER.prototype.stringify = function() {
  return new STRING(this.value+"");
}
NUMBER.prototype.arrayify = function() {
  return new ARRAY([this.copy()]);
}
NUMBER.prototype.numberify = function() {
  return this.copy();
}
NUMBER.prototype.integerify = function() {
  return new NUMBER(to_integer(this.value));
}

/// Operators
NUMBER.prototype.add = function(rhs, tkn) {
  var v = rhs;
  if(is_TYPE(v)) v = v.valueify();
  return new NUMBER(this.value + to_number(v));
}

NUMBER.prototype.sub = function(rhs, tkn) {
  var v = rhs;
  if(is_TYPE(v)) v = v.valueify();
  return new NUMBER(this.value - to_number(v));
}

types.NUMBER = NUMBER;

//------------------------------------------------------------------------------------------------------------
function STRING(v) {
  this.value = to_string(v);
}

STRING.prototype.type = "STRING";

STRING.prototype.toString = function() {
  return this.value;
}

STRING.prototype.copy = function() {
  return new STRING(this.value);
}

/// Conversions
STRING.prototype.valueify = function() {
  return this.value;
}
STRING.prototype.charify = function() {
  return new CHAR(to_char(this.value));
}
STRING.prototype.stringify = function() {
  return this.copy();
}
STRING.prototype.arrayify = function() {
  return new ARRAY(string_to_array(this.value));
}
STRING.prototype.numberify = function() {
  return new NUMBER(to_number(this.value));
}
STRING.prototype.integerify = function() {
  return new NUMBER(to_integer(this.value));
}

/// Operators
STRING.prototype.add = function(rhs, tkn) {
  var v = rhs;
  if(is_TYPE(v)) v = v.valueify();
  return new STRING(this.value + to_string(v));
}

STRING.prototype.sub = function(rhs, tkn) {
  var v = rhs;
  if(is_TYPE(v)) v = v.valueify();
  return new STRING(this.value.replace(to_string(v), ""));
}

types.STRING = STRING;

//------------------------------------------------------------------------------------------------------------
function ARRAY(v) {
  this.value = is_array(v) ? v : [];
}

ARRAY.prototype.type = "ARRAY";

ARRAY.prototype.toString = function() {
  return this.stringify().toString();
}

ARRAY.prototype.copy = function() {
  var a = [];
  for(var i = 0; i < this.value.length; ++i) a.push(this.value[i].copy());
  return new ARRAY(a);
}

/// Conversions
ARRAY.prototype.valueify = function() {
  var a = [];
  for(var i = 0; i < this.value.length; ++i) a.push(this.value[i].valueify());
  return a;
}
ARRAY.prototype.charify = function() {
  return new CHAR(to_char(this.valueify()));
}
ARRAY.prototype.stringify = function() {
  var s = "";
  for(var i = 0; i < this.value.length; ++i) s += this.value[i].stringify().toString();
  return s;
}
ARRAY.prototype.arrayify = function() {
  return this.copy();
}
ARRAY.prototype.numberify = function() {
  return new NUMBER(to_number(this.valueify()));
}
ARRAY.prototype.integerify = function() {
  return new NUMBER(to_integer(this.valueify()));
}

/// Operators
ARRAY.prototype.add = function(rhs, tkn) {
  var c = [];
  for(var i = 0; i < this.value.length; ++i) {
    c.push(this.value[i].add(rhs, tkn));
  }
  return new ARRAY(c);
}

ARRAY.prototype.sub = function(rhs, tkn) {
  var c = [];
  for(var i = 0; i < this.value.length; ++i) {
    c.push(this.value[i].sub(rhs, tkn));
  }
  return new ARRAY(c);
}

types.ARRAY = ARRAY;

//------------------------------------------------------------------------------------------------------------
global.types = types;

})(this, this.Pipe, this.Command, this.Token, this.Path)
