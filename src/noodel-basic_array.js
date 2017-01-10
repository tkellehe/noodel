(function(global, noodel, Pipe, Command, Token, Path, characters, NUMBER, STRING, ARRAY){

//------------------------------------------------------------------------------------------------------------
/// Array Based Operators
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
/// Flattens that particular data type (for arrays places into elements, strings turned into char arrays
/// and numbers into integers.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"_"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        for(var i = 0; i < f.value.length; ++i) path.top(f.value[i]);
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(f.value * f.value));
      } else if(f.type === "STRING") {
        for(var i = 0; i < f.value.length; ++i) path.top(new STRING(f.value[i]));
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Gets magnitude of that particular data type.
Command.add(0, noodel.commandify(characters.correct("ɲ")+"l"), function(cmd) {
  cmd.exec = function(path) {
    var f = this.tkn.inputs.front();
    if(f) {
      if(f.type === "NUMBER") {
        path.top(new NUMBER(Math.abs(f.value)));
      } else if(f.type === "STRING" || f.type === "ARRAY") {
        path.top(f);
        path.top(new NUMBER(f.length()));
      }
    }
  }
});

//------------------------------------------------------------------------------------------------------------
/// Takes the first element of strings/arrays and places it into the back. For numbers, it reciprocates.
Command.add(0, noodel.commandify(characters.correct("ẹ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        var e = f.value.shift();
        if(e) f.value.push(e);
        path.top(f);
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(1/f.value));
      } else if(f.type === "STRING") {
        var s = f.value;
        path.top(new STRING(s.slice(1, s.length) + s.slice(0, 1)));
      }
    } else path.top(f);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Takes the last element of strings/arrays and places it into the front. For numbers, it square roots.
Command.add(0, noodel.commandify(characters.correct("Ẹ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        var e = f.value.pop();
        if(e) f.value.unshift(e);
        path.top(f);
      } else if(f.type === "NUMBER") {
        path.top(new NUMBER(Math.sqrt(f.value)));
      } else if(f.type === "STRING") {
        var s = f.value, len = s.length;
        path.top(new STRING(s.slice(len-1, len) + s.slice(0, len-1)));
      }
    } else path.top(f);
  }
});

//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string. If is an integer in the pipe then it will use that as
/// the index and place the accessed first and increment the index for the next frame.
Command.add(0, noodel.commandify(characters.correct("ạ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var index, delta, count;
      if(f.type === "NUMBER") {
        f = f.integerify();
        index = f.value;
        delta = index < 0 ? -1 : 1;
        f = path.top();
        if(!f) {
          path.top(new NUMBER(index + delta));
          return;
        }
      }
      
      if(f.type === "NUMBER") {
        f = f.integerify();
        count = f.value;
        f = path.top();
        if(!f) {
          path.top(new NUMBER(index + (delta * count)));
          return;
        }
      }
      
      if(f.type === "NUMBER") {
        path.top(new NUMBER(Math.abs((index + (delta * count))) % f.value));
      } else {
        if(f.type === "STRING") f = f.arrayify();
        if(index === undefined) index = f.props("frame");
        if(index === undefined) { index = 0; delta = 1; }
        if(count === undefined) count = f.props("frame_count");
        if(count === undefined) count = f.length();
        if(delta === undefined) delta = f.props("frame_delta");
        
        var item;
        
        if(count !== 0) {
          index = f.correct_index(index);
          item = f.access(index);
          index += delta;
          --count;
        }
        
        if(count === 0) {
          f.props("frame", undefined);
          f.props("frame_count", undefined);
          f.props("frame_delta", undefined);
        } else {
          f.props("frame", index);
          f.props("frame_count", count);
          f.props("frame_delta", delta);
        }
        
        path.top(f);
        path.top(item);
      }
    }
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string. If is an integer in the pipe then it will use that as
/// the index and place the accessed first and increment the index for the next frame.
/// The number following the token will be used as the first number.
Command.add(0, new RegExp("^(" + characters.correct("ạ") + ")((?:\\-\\d*)|(?:\\d+))$"), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      var index = this.tkn.index,
          count = undefined;
      var delta = this.tkn.delta;
      
      if(f.type === "NUMBER") {
        f = f.integerify();
        count = f.value;
        f = path.top();
        if(!f) {
          path.top(new NUMBER(index + (delta * count)));
          return;
        }
      }
      
      if(f.type === "NUMBER") {
        path.top(new NUMBER((index + (delta * count))) % f.value);
      } else {
        if(f.type === "STRING") f = f.arrayify();
        if(f.props("frame") !== undefined) index = f.props("frame");
        if(count === undefined) count = f.props("frame_count");
        if(count === undefined) count = f.length();
        
        var item;
        
        if(count !== 0) {
          index = f.correct_index(index);
          item = f.access(index);
          index += delta;
          --count;
        }
        
        if(count === 0) {
          f.props("frame", undefined);
          f.props("frame_count", undefined);
          f.props("frame_delta", undefined);
        } else {
          f.props("frame", index);
          f.props("frame_count", count);
          f.props("frame_delta", delta);
        }
        
        path.top(f);
        path.top(item);
      }
    }
  }
  
  var old = cmd.tokenize;
  cmd.tokenize = function() {
    if(this.tkn.params[0] === "-") {
      this.tkn.index = -1;
      this.tkn.delta = -1;
    } else if(this.tkn.params[0] === "-0") {
      this.tkn.index = 0;
      this.tkn.delta = -1;
    } else {
      this.tkn.index = +this.tkn.params[0];
      this.tkn.delta = this.tkn.index < 0 ? -1 : 1;
    }
    
    return old.call(this);
  }
});
  
//------------------------------------------------------------------------------------------------------------
/// Accesses a particular frame of an array/string based off of an array.
Command.add(0, noodel.commandify(characters.correct("Ạ")), function(cmd) {
  cmd.exec = function(path) {
    var f = path.top();
    if(f) {
      if(f.type === "ARRAY") {
        var g = path.top();
        if(g) {
          if(g.type === "ARRAY") {
            if(f.props("frame") === undefined) f.props("frame", 0);
            var item = g.access(f.access(f.props("frame")));
            f.props("frame", f.correct_index(f.props("frame") + 1));

            path.top(g);
            path.top(f);
            path.top(item);
          }
        }
      }
    }
  }
});

})(this, this.noodel, this.Pipe, this.Command, this.Token, this.Path, this.characters, this.NUMBER, this.STRING, this.ARRAY)
