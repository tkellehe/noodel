function factorize_number(num) {
  var half = Math.floor(num / 2),
      array = [1],
      i, j;

  // Determine our increment value for the loop and starting point.
  num % 2 === 0 ? (i = 2, j = 1) : (i = 3, j = 2);

  for (; i <= half; i += j) {
    if(num % i === 0) array.push(i);
  }

  array.push(num);
  return array.
}

//------------------------------------------------------------------------------------------------------------
function NUMBER(v) {
  this.props = make_props();
  v = +v;
  this.value = v === v ? v : 0;
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
  return new NUMBER(Math.floor(this.value));
}
NUMBER.prototype.printify = function() {
  return this.toString();
}

/// Operators
NUMBER.prototype.increment = function(path) {
  return new NUMBER(this.value + 1);
}

NUMBER.prototype.decrement = function(path) {
  return new NUMBER(this.value - 1);
}

NUMBER.prototype.increment_flip = function(path) {
  return new NUMBER(1 + this.value);
}

NUMBER.prototype.decrement_flip = function(path) {
  return new NUMBER(1 - this.value);
}

NUMBER.prototype.add = function(rhs) {
  var v = rhs.numberify().value;
  return new NUMBER(this.value + v);
}

NUMBER.prototype.sub = function(rhs) {
  var v = rhs.numberify().value;
  return new NUMBER(this.value - v);
}

NUMBER.prototype.add_flip = function(lhs) {
  var v = lhs.numberify().value;
  return new NUMBER(v + this.value);
}

NUMBER.prototype.sub_flip = function(lhs) {
  var v = lhs.numberify().value;
  return new NUMBER(v - this.value);
}

/// Misc.

NUMBER.prototype.to_lowercase = function() {
  return new NUMBER(Math.floor(this.value));
}

NUMBER.prototype.to_uppercase = function() {
  return new NUMBER(Math.ceil(this.value));
}

NUMBER.prototype.to_switchcase = function() {
  return new NUMBER(Math.round(this.value));
}

NUMBER.prototype.is_truthy = function() {
  return new NUMBER(this.value ? 1 : 0);
}

NUMBER.prototype.is_falsy = function() {
  return new NUMBER(this.value ? 0 : 1);
}

NUMBER.prototype.relocate = function(from, to) {
  var string = this.value + "";
  var s = string[from];
  var slice = string.slice(0, from) + string.slice(from+1, string.length);
  slice = slice.slice(0, to) + s + slice.slice(to, slice.length);
  return new NUMBER(+slice);
}
