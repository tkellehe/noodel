(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){
  
//------------------------------------------------------------------------------------------------------------
/// Operands
//------------------------------------------------------------------------------------------------------------
  
//------------------------------------------------------------------------------------------------------------
// Adds two items in the pipe where the first is the lhs and the second is the rhs.
Command.add(0, noodel.commandify(characters.correct("⁺")), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.add(rhs));
      } else path.top(lhs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁻")), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.sub(rhs));
      } else path.top(lhs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁺")+"s"), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.add_flip(rhs));
      } else path.top(lhs);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
Command.add(0, noodel.commandify(characters.correct("⁻")+"s"), function(cmd) {
  cmd.exec = function(path) {
    var lhs = path.top();
    if(lhs) {
      var rhs = path.top();
      if(rhs) {
        path.top(lhs.sub_flip(rhs));
      } else path.top(lhs);
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Add the next n items in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁺")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c-- && path.first()) f = f.add(path.top());
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Subtracts the next n items in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁻")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c-- && path.first()) f = f.sub(path.top());
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Add the next n items in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁺") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c-- && path.first()) f = f.add_flip(path.top());
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Subtracts the next n items in the pipe.
Command.add(1, noodel.commandify(characters.regex.a_tiny_digit + "+", characters.correct("⁻") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c-- && path.first()) f = f.sub_flip(path.top());
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +characters.tiny_num_to_num(this.tkn.params[0]);
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Add the next n items in the pipe.
Command.add(1, noodel.commandify(characters.correct("µ") + characters.correct("⁺")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        while(c-- && path.first()) g = g.add(path.top());
        path.top(g);
      } else {
        path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Subtracts the next n items in the pipe.
Command.add(1, noodel.commandify(characters.correct("µ") + characters.correct("⁻")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        while(c-- && path.first()) g = g.sub(path.top());
        path.top(g);
      } else {
        path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Add the next n items in the pipe.
Command.add(1, noodel.commandify(characters.correct("µ") + characters.correct("⁺") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        while(c-- && path.first()) g = g.add_flip(path.top());
        path.top(g);
      } else {
        path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Subtracts the next n items in the pipe.
Command.add(1, noodel.commandify(characters.correct("µ") + characters.correct("⁻") + "s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        while(c-- && path.first()) g = g.sub_flip(path.top());
        path.top(g);
      } else {
        path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁺"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c--) f = f.increment(path);
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁻"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c--) f = f.decrement(path);
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁺") + "s", "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c--) f = f.increment_flip(path);
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁻") + "s", "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = this.tkn.params[0];
      while(c--) f = f.decrement_flip(path);
      path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁺") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value * c));
        } else {
          while(c--) g = g.increment(path);
          path.top(g);
        }
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁻") + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value / c));
        } else {
          while(c--) g = g.decrement(path);
          path.top(g);
        }
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Increments the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁺") +"s" + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value * c));
        } else {
          while(c--) g = g.increment_flip(path);
          path.top(g);
        }
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Decrements the item in the pipe.
Command.add(0, noodel.commandify(characters.correct("⁻") + "s" + characters.correct("µ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var c = f.integerify().value;
      var g = path.top();
      if(g) {
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value / c));
        } else {
          while(c--) g = g.decrement_flip(path);
          path.top(g);
        }
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Modulates two items in the stack.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "%"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        f = f.integerify();
        if(g.type === "NUMBER") {
          path.top(new NUMBER(g.value % f.value));
        } else if(g.type === "STRING") {
          var width = Math.floor(g.length() / f.value);
          var length = (width * f.value);
          var upper = g.value.slice(0, length),
              lower = g.value.slice(length, g.length());
          path.top(new STRING(upper));
          path.top(new STRING(lower));
        } else if(g.type === "ARRAY") {
          var width = Math.floor(g.length() / f.value);
          var length = (width * f.value);
          var upper = g.value.slice(0, length),
              lower = g.value.slice(length, g.length());
          path.top(new ARRAY(upper));
          path.top(new ARRAY(lower));
        }
      } else path.top(f);
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
// Modulates two items in the stack.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "%s"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        g = g.integerify();
        if(f.type === "NUMBER") {
          path.top(new NUMBER(f.value % g.value));
        } else if(f.type === "STRING") {
          var width = Math.floor(f.length() / g.value);
          var length = (width * f.value);
          var upper = f.value.slice(0, length),
              lower = f.value.slice(length, f.length());
          path.top(new STRING(upper));
          path.top(new STRING(lower));
        } else if(f.type === "ARRAY") {
          var width = Math.floor(f.length() / g.value);
          var length = (width * g.value);
          var upper = f.value.slice(0, length),
              lower = f.value.slice(length, f.length());
          path.top(new ARRAY(upper));
          path.top(new ARRAY(lower));
        }
      } else path.top(f);
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
