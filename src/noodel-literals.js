(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Literals
//------------------------------------------------------------------------------------------------------------

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
    var a = string_break(this.tkn.params[0]);
    for(var i = 0; i < a.length; ++i) a[i] = new STRING(a[i]);
    path.top(new ARRAY(a));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_basic(this.tkn.params[0]);
    
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
    var a = string_break(this.tkn.params[0]);
    for(var i = 0; i < a.length; ++i) a[i] = new STRING(a[i]);
    path.top(new ARRAY(a));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_occur(this.tkn.params[0], this.tkn.params[1]);
    
    return old.call(this);
  };
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+")(\-?\\d*\\.?\\d+)$"), function(cmd) {
  cmd.exec = function(path) {
    path.top(new NUMBER(+this.tkn.params[0]));
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
    var a = this.tkn.params[0].split("/");
    var num = 1, den = +a[1];
    if(a[0].length) {
      if(a[0] === "-") num = -1;
      else num = +a[0];
    }
    path.top(new NUMBER(num/den));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates a string based off of the range of characters.
Command.add(2, noodel.commandify('"', characters.regex.a_printable, characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    var s = "";
    var left = characters.char_to_int(this.tkn.params[1]),
        right = characters.char_to_int(this.tkn.params[3]);
    var min = (left < right ? left : right),
        max = (left < right ? right : left);
    
    for(var i = min; i <= max; ++i) {
      s += characters.int_to_char(i);
    }
    
    if(min === right) s = s.split("").reverse().join("");
    
    path.top(new STRING(s));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of characters.
Command.add(2, noodel.commandify("'", characters.regex.a_printable, characters.correct("…"), characters.regex.a_printable), function(cmd) {
  cmd.exec = function(path) {
    var s = [];
    var left = characters.char_to_int(this.tkn.params[1]),
        right = characters.char_to_int(this.tkn.params[3]);
    var min = (left < right ? left : right),
        max = (left < right ? right : left);
    
    for(var i = min; i <= max; ++i) {
      s.push(characters.int_to_char(i));
    }
    
    if(min === right) s = s.reverse();
    
    path.top(new ARRAY(s));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Generates an array of numbers.
Command.add(2, noodel.commandify("\\d+", characters.correct("…"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var s = [];
    var left = +this.tkn.params[0],
        right = +this.tkn.params[2];
    var min = (left < right ? left : right),
        max = (left < right ? right : left);
    
    for(var i = min; i <= max; ++i) {
      s.push(i);
    }
    
    if(min === right) s = s.reverse();
    
    path.top(new ARRAY(s));
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
