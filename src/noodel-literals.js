(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Literals
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(1, noodel.commandify(characters.correct("µ"), characters.regex.a_printable + "+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = f.integerify();
      for(var i = f.value; i--;) {
        path.top(new STRING(this.tkn.literal));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.regex.a_printable + "+"), function(cmd) {
  cmd.exec = function(path) {
    for(var i = this.tkn.params[0]; i--;) {
      path.top(new STRING(this.tkn.literal));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(0, noodel.commandify(characters.regex.a_printable + "+"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new STRING(this.tkn.literal));
  }
});

//------------------------------------------------------------------------------------------------------------
// Handles basic compressed string literals of printable characters.
Command.add(0, noodel.commandify(characters.correct("“"), characters.regex.a_compressable + "*"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new STRING(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_basic(this.tkn.params[0]);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each compressable characters following it.
Command.add(0, noodel.commandify(characters.correct("”"), characters.regex.a_compressable + "*"), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    for(var i = 0; i < this.tkn.params[0].length; ++i) a.push(new STRING(this.tkn.params[0][i]));
    path.top(new ARRAY(a));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_basic(this.tkn.params[0]);
    this.tkn.params[0] = string_break(this.tkn.params[0]);
    
    return old.call(this);
  };
});
  
//------------------------------------------------------------------------------------------------------------
// Handles occur compressed string literals of printable characters.
Command.add(1, noodel.commandify(characters.regex.a_compressable + "+", characters.correct("‘"), characters.regex.a_compressable + "+"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new STRING(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_occur(this.tkn.params[0], this.tkn.params[1]);
    
    return old.call(this);
  };
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each compressable characters following it.
Command.add(1, noodel.commandify(characters.regex.a_compressable + "+", characters.correct("’"), characters.regex.a_compressable + "+"), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    for(var i = 0; i < this.tkn.params[0].length; ++i) a.push(new STRING(this.tkn.params[0][i]));
    path.top(new ARRAY(a));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_occur(this.tkn.params[0], this.tkn.params[1]);
    this.tkn.params[0] = string_break(this.tkn.params[0]);
    
    return old.call(this);
  };
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+")(\-?\\d*\\.?\\d+)$"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+"-)$"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(-1));
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number based off of a fraction and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+")(-?\\d*\\/\\d+)$"), function(cmd) {
  cmd.exec = function(path) {
    
    path.top(new NUMBER(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var a = this.tkn.params[0].split("/");
    var num = 1, den = +a[1];
    if(a[0].length) {
      if(a[0] === "-") num = -1;
      else num = +a[0];
    }
    
    this.tkn.params[0] = num / den;
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates a string based off of the range of characters.
Command.add(1, noodel.commandify(characters.regex.a_printable, characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    path.top(new STRING(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    var s = "";
    var left = characters.char_to_int(this.tkn.params[0]),
        right = characters.char_to_int(this.tkn.params[1]);
    var min = Math.min(left, right),
        max = Math.max(left, right);
    
    for(var i = min; i <= max; ++i) {
      s += characters.int_to_char(i);
    }
    
    if(min === right) s = s.split("").reverse().join("");
    
    this.tkn.params[0] = s;
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of characters.
Command.add(2, noodel.commandify("'", characters.regex.a_printable, characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    var s = [];
    
    for(var i = this.tkn.min; i <= this.tkn.max; ++i) {
      s.push(new STRING(characters.int_to_char(i)));
    }
    
    if(this.tkn.min === this.tkn.params[2]) s = s.reverse();
    
    path.top(new ARRAY(s));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[1] = characters.char_to_int(this.tkn.params[1]);
    this.tkn.params[2] = characters.char_to_int(this.tkn.params[2]);
    
    this.tkn.min = Math.min(this.tkn.params[1], this.tkn.params[2]);
    this.tkn.max = Math.max(this.tkn.params[1], this.tkn.params[2]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of numbers.
Command.add(2, noodel.commandify("#", "\\d+", characters.correct("…"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var s = [];
    
    for(var i = this.tkn.min; i <= this.tkn.max; ++i) {
      s.push(new NUMBER(i));
    }
    
    if(this.tkn.min === this.tkn.params[2]) s = s.reverse();
    
    path.top(new ARRAY(s));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[1] = +this.tkn.params[1];
    this.tkn.params[2] = +this.tkn.params[2];
    
    this.tkn.min = Math.min(this.tkn.params[1], this.tkn.params[2]);
    this.tkn.max = Math.max(this.tkn.params[1], this.tkn.params[2]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates a string based off of the range of characters.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = f.value,
          right = this.tkn.params[0];
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = "";
    
      for(var i = max; min <= i; --i) {
        s += NUMBER.numerical_eval(new NUMBER(i)).value;
      }
      
      if(min === left) { s = s.split("").reverse().join("") }
      
      path.top(new STRING(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.char_to_int(this.tkn.params[0]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of characters.
Command.add(0, noodel.commandify("'" + characters.correct("µ") + characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = f.value,
          right = this.tkn.params[0];
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = [];
    
      for(var i = max; min <= i; --i) {
        s.push(NUMBER.numerical_eval(new NUMBER(i)));
      }
      
      if(min === left) { s = s.reverse() }
      
      path.top(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.char_to_int(this.tkn.params[0]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of numbers.
Command.add(0, noodel.commandify("#" + characters.correct("µ") + characters.correct("…"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = f.value,
          right = this.tkn.params[0];
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = [];
    
      for(var i = max; min <= i; --i) {
        s.push(new NUMBER(i));
      }
      
      if(min === left) { s = s.reverse() }
      
      path.top(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Generates a string based off of the range of characters.
Command.add(1, noodel.commandify(characters.regex.a_printable, characters.correct("…") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = this.tkn.params[0],
          right = f.value;
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = "";
    
      for(var i = max; min <= i; --i) {
        s += NUMBER.numerical_eval(new NUMBER(i)).value;
      }
      
      if(min === left) { s = s.split("").reverse().join("") }
      
      path.top(new STRING(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.char_to_int(this.tkn.params[0]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of characters.
Command.add(2, noodel.commandify("'", characters.regex.a_printable, characters.correct("…") +  characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = this.tkn.params[0],
          right = f.value;
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = [];
    
      for(var i = max; min <= i; --i) {
        s.push(NUMBER.numerical_eval(new NUMBER(i)));
      }
      
      if(min === left) { s = s.reverse() }
      
      path.top(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.char_to_int(this.tkn.params[1]);
    
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of numbers.
Command.add(2, noodel.commandify("#", "\\d+", characters.correct("…") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      f = NUMBER.numerical_eval_numbers(f).integerify();
      var left = this.tkn.params[0],
          right = f.value;
      var min = Math.min(left, right),
          max = Math.max(left, right),
          s = [];
    
      for(var i = max; min <= i; --i) {
        s.push(new NUMBER(i));
      }
      
      if(min === left) { s = s.reverse() }
      
      path.top(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[1];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Generates a string based off of the range of characters.
Command.add(0, noodel.commandify(characters.correct("…")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        f = NUMBER.numerical_eval_numbers(f).integerify();
        g = NUMBER.numerical_eval_numbers(g).integerify();
        var left = f.value,
            right = g.value;
        var min = Math.min(left, right),
            max = Math.max(left, right),
            s = "";

        for(var i = max; min <= i; --i) {
          s += NUMBER.numerical_eval(new NUMBER(i)).value;
        }

        if(min === left) { s = s.split("").reverse().join("") }

        path.top(new STRING(s));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of characters.
Command.add(0, noodel.commandify("'" + characters.correct("…")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top()
      if(g) {
        f = NUMBER.numerical_eval_numbers(f).integerify();
        g = NUMBER.numerical_eval_numbers(g).integerify();
        var left = f.value,
            right = g.value;
        var min = Math.min(left, right),
            max = Math.max(left, right),
            s = [];

        for(var i = max; min <= i; --i) {
          s.push(NUMBER.numerical_eval(new NUMBER(i)));
        }

        if(min === left) { s = s.reverse() }

        path.top(new ARRAY(s));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of numbers.
Command.add(0, noodel.commandify("#" + characters.correct("…")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        f = NUMBER.numerical_eval_numbers(f).integerify();
        g = NUMBER.numerical_eval_numbers(g).integerify();
        var left = f.value,
            right = g.value;
        var min = Math.min(left, right),
            max = Math.max(left, right),
            s = [];

        for(var i = max; min <= i; --i) {
          s.push(new NUMBER(i));
        }

        if(min === left) { s = s.reverse() }

        path.top(new ARRAY(s));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
// Shortcuts to get a string of characters.
Command.add(0, noodel.commandify(characters.correct("ɲ"), "[ZzAaDdNn]"), function(cmd) {
  var map = {
    "Z": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "z": "abcdefghijklmnopqrstuvwxyz",
    "A": "¤!\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
    "a": "¶¤!\"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
    "D": "9876543210",
    "d": "0123456789",
    "N": "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "n": "0123456789abcdefghijklmnopqrstuvwxyz"
  }
  
  cmd.exec = function(path) {
    path.top(new STRING(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = map[this.tkn.params[0]];
    return old.call(this);
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
