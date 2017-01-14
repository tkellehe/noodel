//------------------------------------------------------------------------------------------------------------
function ARRAY(v) {
  this.props = make_props();
  this.value = v === undefined ? [] : v;
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
  for(var i = 0; i < this.value.length; ++i) s += this.value[i].stringify().toString() + characters.correct("ð");
  // Removes the last block character.
  s = s.slice(0, s.length - 1);
  return new STRING(s);
}
ARRAY.prototype.arrayify = function() {
  return this.copy();
}
ARRAY.prototype.numberify = function() {
  var a = [];
  for(var i = 0; i < this.value.length; ++i) a.push(this.value[i].numberify());
  var sum = 0;
  for(i = 0; i < this.value.length; ++i) sum += a[i].value;
  return new NUMBER(sum);
}
ARRAY.prototype.integerify = function() {
  var a = [];
  for(var i = 0; i < this.value.length; ++i) a.push(this.value[i].integerify());
  var sum = 0;
  for(i = 0; i < this.value.length; ++i) sum += a[i].value;
  return new NUMBER(sum);
}
ARRAY.prototype.printify = function() {
  var s = "";
  for(var i = 0; i < this.value.length; ++i) s += this.value[i].printify() + characters.correct("ð");
  // Removes the last block character.
  s = s.slice(0, s.length - 1);
  return s;
}

/// Operators
ARRAY.prototype.increment = function(path) {
  var f = path.top();
  if(f) {
    this.value.push(f);
  }
  return this;
}

ARRAY.prototype.decrement = function(path) {
  var s = this.value.shift();
  if(s) path.top(s);
  return this;
}

ARRAY.prototype.increment_flip = function(path) {
  var f = path.top();
  if(f) {
    this.value.unshift(f);
  }
  return this;
}

ARRAY.prototype.decrement_flip = function(path) {
  var s = this.value.pop();
  if(s) path.top(s);
  return this;
}

ARRAY.prototype.add = function(rhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].add(rhs);
  }
  return this;
}

ARRAY.prototype.sub = function(rhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].sub(rhs);
  }
  return this;
}

ARRAY.prototype.add_flip = function(lhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].add_flip(lhs);
  }
  return this;
}

ARRAY.prototype.sub_flip = function(lhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].sub_flip(lhs);
  }
  return this;
}

ARRAY.prototype.mul = function(rhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].mul(rhs);
  }
  return this;
}

ARRAY.prototype.mul_flip = function(lhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].mul_flip(lhs);
  }
  return this;
}

ARRAY.prototype.div = function(rhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].div(rhs);
  }
  return this;
}

ARRAY.prototype.div_flip = function(lhs) {
  for(var i = 0; i < this.value.length; ++i) {
    this.value[i] = this.value[i].div_flip(lhs);
  }
  return this;
}

/// Array specific commands.
ARRAY.prototype.correct_index = function(index) {
  // Overkill for what it is actually doing...
  return ((index % this.length()) + this.length()) % this.length();
};


ARRAY.prototype.access = function(index) {
  return this.value[this.correct_index(index)].copy();
};

ARRAY.prototype.length = function() {
  return this.value.length;
};

/// Misc.

ARRAY.prototype.to_lowercase = function() {
  for(var i = 0; i < this.value.length; ++i) this.value[i] = this.value[i].to_lowercase();
  return this;
}

ARRAY.prototype.to_uppercase = function() {
  for(var i = 0; i < this.value.length; ++i) this.value[i] = this.value[i].to_uppercase();
  return this;
}

ARRAY.prototype.switchcase = function() {
  for(var i = 0; i < this.value.length; ++i) this.value[i] = this.value[i].switchcase();
  return this;
}

ARRAY.prototype.is_truthy = function() {
  return new NUMBER(this.length() ? 1 : 0);
}

ARRAY.prototype.is_falsy = function() {
  return new NUMBER(this.length() ? 0 : 1);
}

ARRAY.prototype.relocate = function(from, to) {
  var s = this.value.splice(from, 1);
  this.value.splice(to, 0, s[0]);
  return this;
}
