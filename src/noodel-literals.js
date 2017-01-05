(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Literals
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
// Handles simple string literals of printable characters.
Command.add(0, noodel.commandify(characters.regex.a_printable + "+"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new STRING(this.tkn.literal));
  }
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Handles basic compressed string literals of printable characters.
Command.add(0, noodel.commandify(characters.correct("“"), characters.regex.a_compressable + "*"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new STRING(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_basic(this.tkn.params[0]);
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each compressable characters following it.
Command.add(0, noodel.commandify(characters.correct("”"), characters.regex.a_compressable + "*"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var a = this.tkn.params[0].split(characters.correct("ð"));
    if(a.length === 1) {
      a = [];
      for(var i = 0; i < this.tkn.params[0].length; ++i)
        a.push(new STRING(this.tkn.params[0][i]));
      this.tkn.outputs.back(new ARRAY(a));
    } else {
      var s = [];
      for(var i = 0; i < a.length; ++i)
        s.push(new STRING(a[i]));
      this.tkn.outputs.back(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_basic(this.tkn.params[0]);
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Handles occur compressed string literals of printable characters.
Command.add(1, noodel.commandify(characters.regex.a_compressable + "+", characters.correct("‘"), characters.regex.a_compressable + "+"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new STRING(this.tkn.params[0]));
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_occur(this.tkn.params[0], this.tkn.params[1]);
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});

//------------------------------------------------------------------------------------------------------------
// Creates and array of strings from each compressable characters following it.
Command.add(0, noodel.commandify(characters.regex.a_compressable + "+", characters.correct("’"), characters.regex.a_compressable + "+"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var a = this.tkn.params[0].split(characters.correct("ð"));
    if(a.length === 1) {
      a = [];
      for(var i = 0; i < this.tkn.params[0].length; ++i)
        a.push(new STRING(this.tkn.params[0][i]));
      this.tkn.outputs.back(new ARRAY(a));
    } else {
      var s = [];
      for(var i = 0; i < a.length; ++i)
        s.push(new STRING(a[i]));
      this.tkn.outputs.back(new ARRAY(s));
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = characters.decompress_occur(this.tkn.params[0], this.tkn.params[1]);
    
    return old.call(this);
  };
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+")((?:\\-\\d+\\.\\d+)|(?:\\d*\\.\\d+)|(?:\\-?\\d+))$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new NUMBER(+this.tkn.params[0]));
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+"-)$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    this.tkn.outputs.back(new NUMBER(-1));
  }
  
  cmd.exec = noodel.in_to_out;
});
  
//------------------------------------------------------------------------------------------------------------
// Creates a number based off of a fraction and places it into the pipe.
Command.add(0, new RegExp("^("+characters.correct("ɲ")+")(-?\\d*\\/\\d+)$"), function(cmd) {
  cmd.exec = noodel.out_to_in;
  
  cmd.exec = function(path) {
    var a = this.tkn.params[0].split("/");
    var num = 1, den = +a[1];
    if(a[0].length) {
      if(a[0] === "-") num = -1;
      else num = +a[0];
    }
    this.tkn.outputs.back(new NUMBER(num/den));
  }
  
  cmd.exec = noodel.in_to_out;
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.types.NUMBER, this.types.STRING, this.types.ARRAY)
