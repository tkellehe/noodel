(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Type cast operations.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Numberifies strings and arrays by elements if already a number it will flip the sign.
Command.add(0, noodel.commandify(characters.correct("ɲ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.length(); ++i) {
          f.value[i] = f.value[i].numberify();
        }
        path.top(f);
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(-1 * Math.abs(f.value)));
      } else if(f.type === "STRING") {
        var a = new ARRAY(string_null_break(f.value));
        for(var i = 0; i < a.length(); ++i) {
          a.value[i] = (new STRING(a.value[i])).numberify();
        }
        if(a.length() === 0) {
          a = new NUMBER(0);
        } else if(a.length() === 1) {
          a = a.value[0]
        }
        path.top(a);
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Stringifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"'"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.length(); ++i) {
          f.value[i] = f.value[i].stringify();
        }
        path.top(f);
      } else if(f.type === "NUMBER") {
        path.top(f.stringify());
      } else if(f.type === "STRING") {
        var s = "";
        for(var i = f.length(); i--;) {
          s += f.value[i];
        }
        path.top(new STRING(s));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Stringifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ɲ")+'"'), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "STRING") {
        path.top(new STRING(string_null_break(f.value).join("")));
      } else {
        path.top(f.stringify());
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Numberifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"#"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.length(); ++i) {
          f.value[i] = f.value[i].numberify();
        }
        path.top(f);
      } else if(f.type === "STRING") {
        path.top(f.numberify());
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(-1 * f.value));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Arrayifies the first item in the pipe.
Command.add(0, noodel.commandify(characters.correct("ʋ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "STRING") {
        path.top(f.arrayify());
      } else if(f.type === "NUMBER") {
        f = new ARRAY(factorize_number(f.value));
        for(var i = 0; i < f.length(); ++i) f.value[i] = new NUMBER(f.value[i]);
        path.top(f);
      } else if(f.type === "ARRAY") {
        for(var i = f.length(); i--;) f.value.reverse();
        path.top(f);
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Collects all of the items in the pipe and creates an array for them.
Command.add(0, noodel.commandify(characters.correct("ȧ")), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    while(path.first()) a.push(path.top());
    if(a.length) path.top(new ARRAY(a));
  }
});

//------------------------------------------------------------------------------------------------------------
/// Collects the number of items specified by the count and creates an array for them.
Command.add(0, noodel.commandify(characters.correct("ȧ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var a = [];
    for(var i = +this.tkn.params[0]; i-- && path.first();) a.push(path.top());
    if(a.length) {
      path.top(new ARRAY(a));
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Collects the number of items specified in the pipe and creates an array for them.
Command.add(0, noodel.commandify(characters.correct("µ") + characters.correct("ȧ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var a = [];
      for(var i = f.integerify().value; i-- && path.first();) a.push(path.top());
      if(a.length) {
        path.top(new ARRAY(a));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Numerically evalues an item on the stack and pushes the result.
Command.add(0, noodel.commandify(characters.correct("ȥ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.top(NUMBER.numerical_eval(f));
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Numerically evalues an item on the stack and pushes the result and negates if a number.
Command.add(0, noodel.commandify(characters.correct("ȥ") + "-"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      path.top(NUMBER.numerical_eval_negate(f));
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
