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

var alignment_map = {
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
      for(var i = 1; i < rows.length; ++i) s += characters.correct("¬") + rows[i];
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
      for(var i = 1; i < rows.length; ++i) s += characters.correct("¬") + rows[i];
    }
    return s;
  }
};
  
//------------------------------------------------------------------------------------------------------------
/// Left aligns, right aligns, or centralizes a string.
Command.add(0, noodel.commandify(characters.correct("ụ"), "[lrc]"), function(cmd) {
  
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
    this.tkn.params[0] = alignment_map[this.tkn.params[0]];
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Left aligns, right aligns, or centralizes a string.
Command.add(0, noodel.commandify(characters.correct("ụ"), "[RC]"), function(cmd) {
  
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        f = f.integerify();
        g = g.stringify();
        path.top(new STRING(this.tkn.params[0](g.value, f.value)));
      } else path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = alignment_map[this.tkn.params[0].toLowerCase()];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Replace single occurance.
Command.add(0, noodel.commandify(characters.correct("ḳ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        var h = path.top();
        if(h) {
          f = f.stringify();
          g = g.stringify();
          if(h.type === "NUMBER") h = h.stringify();
          if(h.type === "ARRAY") {
            for(var i = 0; i < h.length(); ++i) {
              h.value[i] = h.value[i].stringify();
              h.value[i] = new STRING(h.value[i].value.replace(g.value, f.value));
            }
          } else {
            h = new STRING(h.value.replace(g.value, f.value));
          }
          path.top(h);
        } else { path.top(g); path.top(f); }
      } else path.top(f);
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Replace first N occurrances.
Command.add(0, noodel.commandify(characters.correct("ḳ"), "\\d+"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        var h = path.top();
        if(h) {
          f = f.stringify();
          g = g.stringify();
          if(h.type === "NUMBER") h = h.stringify();
          if(h.type === "ARRAY") {
            for(var i = 0; i < h.length(); ++i) {
              h.value[i] = h.value[i].stringify();
            }
            for(var j = this.tkn.params[0]; j--;) {
              for(var i = 0; i < h.length(); ++i) {
                h.value[i] = new STRING(h.value[i].value.replace(g.value, f.value));
              }
            }
          } else {
            for(var i = this.tkn.params[0]; i--;) {
              h = new STRING(h.value.replace(g.value, f.value));
            }
          }
          path.top(h);
        } else { path.top(g); path.top(f); }
      } else path.top(f);
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    this.tkn.params[0] = +this.tkn.params[0];
    return old.call(this);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Replace all occurances.
Command.add(0, noodel.commandify(characters.correct("Ḳ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var g = path.top();
      if(g) {
        var h = path.top();
        if(h) {
          f = f.stringify();
          g = g.stringify();
          if(h.type === "NUMBER") h = h.stringify();
          if(h.type === "ARRAY") {
            for(var i = 0; i < h.length(); ++i) {
              h.value[i] = h.value[i].stringify();
              h.value[i] = new STRING(h.value[i].value.replace(new RegExp(g.value, "g"), f.value));
            }
          } else {
            h = new STRING(h.value.replace(new RegExp(g.value, "g"), f.value));
          }
          path.top(h);
        } else { path.top(g); path.top(f); }
      } else path.top(f);
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
