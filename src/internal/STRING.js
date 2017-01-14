//------------------------------------------------------------------------------------------------------------
function string_null_break(string) {
  return string.split(characters.correct("ð"));
};

function string_break(string) {
  var s = string_null_break(string);
  if(s.length === 1) {
    s = string.split("");
  }
  return s;
};

function STRING(v) {
  this.props = make_props();
  this.value = v === undefined ? "" : (v+"");
}

STRING.prototype.type = "STRING";

(function(){
  STRING.formats = [];
  function format(str) {
    var string = "", end = 0, res = "", add = "", temp;
    while(end < str.length) {
      for(var c = end; c < str.length; ++c) {
        string += str[c];
        for(var i = 0; i < STRING.formats.length; ++i) {
          temp = STRING.formats[i].call(this, string);
          if(temp !== undefined) {
            add = temp;
          }
        }
      }
      end += add.length;
      string = "";
      res += add;
    }
    return res;
  };
  STRING.prototype.format = format;
  Object.defineProperty(STRING, "format", {
    get: function() { return STRING.formats },
    set: function(v) { STRING.formats.push(v) },
    enumberable: true
  });
  STRING.format = function(str) {
    if(str.length === 1) return str;
  }
})()

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
  var a = string_break(this.value);
  for(var i = 0; i < a.length; ++i) a[i] = new STRING(a[i]);
  return new ARRAY(a);
}
STRING.prototype.numberify = function() {
  var temp = +this.value;
  if(temp !== temp) {
    return NUMBER.numerical_eval(this);
  }
  return new NUMBER(temp);
}
STRING.prototype.integerify = function() {
  return (this.numberify()).integerify();
}
STRING.prototype.printify = function() {
  return this.format(characters.printify_string(this.value));
}

/// Operators
STRING.prototype.increment = function(path) {
  var s = "", f = path.top();
  if(f) {
    s = f.stringify();
  }
  return new STRING(this.value + s);
}

STRING.prototype.decrement = function(path) {
  var s = this.value.slice(0, 1);
  path.top(new STRING(s));
  return new STRING(this.value.slice(1, this.value.length));
}

STRING.prototype.increment_flip = function(path) {
  var s = "", f = path.top();
  if(f) {
    s = f.stringify();
  }
  return new STRING(s + this.value);
}

STRING.prototype.decrement_flip = function(path) {
  var s = this.value.slice(this.value.length-1, this.value.length);
  path.top(new STRING(s));
  return new STRING(this.value.slice(0, this.value.length-1));
}

STRING.prototype.add = function(rhs) {
  var v = rhs.stringify().value;
  return new STRING(this.value + v);
}

STRING.prototype.sub = function(rhs) {
  var v = rhs.stringify().value;
  return new STRING(this.value.replace(v, ""));
}

STRING.prototype.add_flip = function(lhs) {
  var v = lhs.stringify().value;
  return new STRING(v + this.value);
}

STRING.prototype.sub_flip = function(lhs) {
  var v = lhs.stringify().value;
  return new STRING(v.replace(this.value, ""));
}

STRING.prototype.mul = function(rhs) {
  var s = "";
  if(rhs.type === "NUMBER") {
    for(var c = Math.floor(rhs.value); c--;) {
      s += this.value;
    }
  } else if(rhs.type === "STRING") {
    for(var i = 0; i < this.length(); ++i) {
      for(var j = 0; j < rhs.length(); ++j) {
        s += this.value[i] + rhs.value[j] + characters.correct("ð");
      }
    }
    s = s.slice(0, s.length - 1);
  } else if(rhs.type === "ARRAY") {
    for(var i = 0; i < rhs.length(); ++i) {
      s += this.mul(rhs.value[i]).value;
    }
  }
  return new STRING(s);
}

STRING.prototype.mul_flip = function(lhs) {
  var s = "";
  if(lhs.type === "NUMBER") {
    var flip = false;
    for(var c = Math.floor(lhs.value); c--;) {
      s += flip ? this.value.split("").reverse().join("") : this.value;
      flip = !flip;
    }
  } else if(lhs.type === "STRING") {
    for(var i = 0; i < this.length(); ++i) {
      for(var j = 0; j < lhs.length(); ++j) {
        s += lhs.value[j] + this.value[i] + characters.correct("ð");
      }
    }
    s = s.slice(0, s.length - 1);
  } else if(lhs.type === "ARRAY") {
    for(var i = 0; i < lhs.length(); ++i) {
      s = this.mul_flip(lhs.value[i]).value + s;
    }
  }
  return new STRING(s);
}

STRING.prototype.div = function(rhs) {
  var a = [];
  if(rhs.type === "NUMBER") {
    for(var i = 0, slice = Math.floor(this.length()/rhs.value); i < this.length(); i += slice) {
      a.push(new STRING(this.value.slice(i, i + slice)));
    }
    return new ARRAY(a);
  } else if(rhs.type === "STRING") {
    a = this.value.split(rhs.value);
  } else if(rhs.type === "ARRAY") {
    for(var i = 0; i < rhs.length(); ++i) {
      a = a.concat(this.div(rhs.value[i]).value);
    }
  }
  return new ARRAY(a);
}

STRING.prototype.div_flip = function(lhs) {
  var a = [];
  if(lhs.type === "NUMBER") {
    for(var i = this.length(), slice = Math.floor(this.length()/lhs.value); 0 <= i; i -= slice) {
      a.push(new STRING(this.value.slice(i, i + slice)));
    }
    return new ARRAY(a);
  } else if(lhs.type === "STRING") {
    a = this.value.split(lhs.value).split("").reverse().join("");
  } else if(lhs.type === "ARRAY") {
    for(var i = 0; i < lhs.length(); ++i) {
      a = a.concat(this.div_flip(lhs.value[i]).value);
    }
  }
  return new ARRAY(a);
}

/// Array specific commands.
STRING.prototype.correct_index = function(index) {
  // Overkill for what it is actually doing...
  return ((index % this.length()) + this.length()) % this.length();
};


STRING.prototype.access = function(index) {
  return new STRING(this.value[this.correct_index(index)]);
};

STRING.prototype.length = function() {
  return this.value.length;
};

/// Misc.

STRING.prototype.to_lowercase = function() {
  return new STRING(this.value.toLowerCase());
}

STRING.prototype.to_uppercase = function() {
  return new STRING(this.value.toUpperCase());
}

STRING.prototype.switchcase = function() {
  var s = "";
  for(var i = 0; i < this.value.length; ++i) {
    var t = this.value[i];
    t = t.toLowerCase();
    if(t === this.value[i]) t = t.toUpperCase();
    s += t;
  }
  return new STRING(s);
}

STRING.prototype.is_truthy = function() {
  return new NUMBER(this.length() ? 1 : 0);
}

STRING.prototype.is_falsy = function() {
  return new NUMBER(this.length() ? 0 : 1);
}

STRING.prototype.relocate = function(from, to) {
  var s = this.value[from];
  var slice = this.value.slice(0, from) + this.value.slice(from+1, this.value.length);
  slice = slice.slice(0, to) + s + slice.slice(to, slice.length);
  return new STRING(slice);
}
