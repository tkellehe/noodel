(function(global, characters){

var types = {};

function is_nan(o) { return o !== o; };
function is_undefined(o) { return o === undefined };
function is_null(o) { return o === null };
function is_invalid(o) { return is_nan(o) || is_undefined(o) || is_null(o) };

function is_string(o) { return typeof(o) === "string" };
function is_number(o) { return typeof(o) === "number" && !is_nan(o) };
function is_integer(o) { return is_number(o) && (Math.floor(o) === o) };
function is_array(o) { return o instanceof Array };
function is_char_code(o) { return (is_string(o) && characters.is_valid_char(o)) };

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
function to_array(o) {
  var a = o;
  if(is_string(o)) a = string_to_array(o);
  else if(is_invalid(o)) a = [];
  else if(!is_array(o)) a = [o];
  return a;
};

function is_STRING(o) { return o.type === "STRING" };
function is_ARRAY(o) { return o.type === "ARRAY" };
function is_NUMBER(o) { return o.type === "NUMBER" };
function is_TYPE(o) { return is_STRING(o) || is_ARRAY(o) || is_NUMBER(o) };

//------------------------------------------------------------------------------------------------------------
function NUMBER(v) {
  this.value = to_number(v);
}

NUMBER.prototype.type = "NUMBER";

NUMBER.prototype.toString = function() {
  return this.value+"";
}

NUMBER.prototype.copy = function() {
  return new NUMBER(this.value);
}

/// Conversions
NUMBER.prototype.valueify = function() {
  return this.value;
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
NUMBER.prototype.printify = function() {
  return this.toString();
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

NUMBER.prototype.add_flip = function(lhs, tkn) {
  var v = lhs;
  if(is_TYPE(v)) v = v.valueify();
  return new NUMBER(to_number(v) + this.value);
}

NUMBER.prototype.sub_flip = function(lhs, tkn) {
  var v = lhs;
  if(is_TYPE(v)) v = v.valueify();
  return new NUMBER(to_number(v) - this.value);
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
STRING.prototype.stringify = function() {
  return this.copy();
}
STRING.prototype.arrayify = function() {
  var a = [];
  for(var i = 0; i < this.value.length; ++i) a.push(new STRING(this.value[i]));
  return new ARRAY(a);
}
STRING.prototype.numberify = function() {
  return new NUMBER(to_number(this.value));
}
STRING.prototype.integerify = function() {
  return new NUMBER(to_integer(this.value));
}
STRING.prototype.printify = function() {
  return characters.printify_string(this.value);
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

STRING.prototype.add_flip = function(lhs, tkn) {
  var v = lhs;
  if(is_TYPE(v)) v = v.valueify();
  return new STRING(to_string(v) + this.value);
}

STRING.prototype.sub_flip = function(lhs, tkn) {
  var v = lhs;
  if(is_TYPE(v)) v = v.valueify();
  return new STRING(to_string(v).replace(this.value, ""));
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
  return this;
}

/// Conversions
ARRAY.prototype.valueify = function() {
  var a = [];
  for(var i = 0; i < this.value.length; ++i) a.push(this.value[i].valueify());
  return a;
}
ARRAY.prototype.stringify = function() {
  var s = "";
  for(var i = 0; i < this.value.length; ++i) s += this.value[i].stringify().toString();
  return new STRING(s);
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
ARRAY.prototype.printify = function() {
  var s = "";
  for(var i = 0; i < this.value.length; ++i) s += this.value[i].printify();
  return s;
}

/// Operators
ARRAY.prototype.add = function(rhs, tkn) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].add(rhs, tkn);
  }
  return this;
}

ARRAY.prototype.sub = function(rhs, tkn) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].sub(rhs, tkn);
  }
  return this;
}

ARRAY.prototype.add_flip = function(lhs, tkn) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].add_flip(lhs, tkn);
  }
  return this;
}

ARRAY.prototype.sub_flip = function(lhs, tkn) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].sub_flip(lhs, tkn);
  }
  return this;
}

types.ARRAY = ARRAY;

//------------------------------------------------------------------------------------------------------------
global.types = types;
global.char_codes = int_to_char;

})(this, this.characters)
