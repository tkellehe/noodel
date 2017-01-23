(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// String Manipulation Commands.
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Converts element into lowercase.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "L"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.top(f.to_lowercase());
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Converts element into uppercase.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "U"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.top(f.to_uppercase());
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Switches case of item.
Command.add(0, noodel.commandify(characters.correct("ɲ") + "S"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) path.top(f.switchcase());
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Relocates an element in an object.
Command.add(0, noodel.commandify(characters.correct("ṙ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        var h = path.top();
        if(h) {
          path.top(h.relocate(f.integerify().value, g.integerify().value));
        } else {
          path.top(g);
          path.top(h);
        }
      } else {
        path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Joins the an array.
Command.add(0, noodel.commandify(characters.correct("İ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "NUMBER") f = f.stringify();
      if(f.type === "STRING") {
        var g = path.top();
        if(g) {
          g = g.arrayify();
          path.top(new STRING(g.value.join(f.value)));
        } else path.top(f);
      } else {
        var g = path.top();
        if(g) {
          g = g.stringify();
          path.top(new STRING(f.value.join(g.value)));
        } else path.top(f);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Left aligns, right aligns, or centralizes a string.
Command.add(0, noodel.commandify(characters.correct("ụ"), "[lrc]"), function(cmd) {
  var map = {
    l: function(string) {
      var rows = string_row_break(string);
      for(var i = 0; i < rows.length; ++i) {
        for(var j = 0; j < rows[i].length; ++j) {
          if(rows[i][j] !== characters.correct("¤")) {
            break;
          }
        }
        rows[i] = rows[i].slice(j, rows[i]);
      }
      var s = "";
      if(rows.length) {
        s = rows[0];
        for(var i = 1; i < rows.length; ++i) s += characters.correct("¬") + rows[i];
      }
      return s;
    },
    r: function(string, max_length) {
      var rows = string_row_break(string);
      if(max_length === undefined) {
        max_length = 0
        for(var i = 0; i < rows.length; ++i) {
          if(rows[i].length > max_length) max_length = rows[i].length;
        }
      }
      for(var i = 0; i < rows.length; ++i) {
        while(rows[i].length < max_length) {
          rows[i] = characters.correct("¤") + rows[i];
        }
      }
      var s = "";
      if(rows.length) {
        s = rows[0];
        for(var i = 1; i < rows.length; ++i) s += rows[i];
      }
      return s;
    },
    c: function(string, max_length) {
      var rows = string_row_break(string);
      if(max_length === undefined) {
        max_length = 0
        for(var i = 0; i < rows.length; ++i) {
          if(rows[i].length > max_length) max_length = rows[i].length;
        }
      }
      for(var i = 0; i < rows.length; ++i) {
        var add = Math.ceil((max_length - rows[i].length)/2);
        if(0 < add) {
          while(add--) rows[i] = characters.correct("¤") + rows[i];
        }
      }
      var s = "";
      if(rows.length) {
        s = rows[0];
        for(var i = 1; i < rows.length; ++i) s += rows[i];
      }
      return s;
    }
  };
  
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "NUMBER") {
        var g = path.top();
        if(g) {
          f = f.integerify();
          g = g.stringify();
          path.top(new STRING(this.tkn.params[0](g.value, f.value)));
        } else path.top(f);
      } else {
        f = f.stringify();
        path.top(new STRING(this.tkn.params[0](f.value)));
      }
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = map[this.tkn.params[0]];
    return old.call(this);
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
